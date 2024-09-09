import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";
const prisma = new PrismaClient();

export default {
    async createUser(request, response) {
        const { name, cpf, phone, email, password } = request.body;

        try {
            let user = await prisma.user.findUnique({
                where: { email }
            });

            if (user) {
                return response.status(409).json({ 
                    error: true,
                    message: 'E-mail já cadastrado' 
                });
            }

            user = await prisma.user.findUnique({
                where: { cpf }
            });

            if (user) {
                return response.status(409).json({
                    error: true,
                    message: 'CPF já cadastrado' 
                });
            }

            const HashPassword = await hash(password, 10);

            user = await prisma.user.create({
                data: {
                    name,
                    cpf,
                    phone,
                    email,
                    password: HashPassword,
                }
            });

            return response.json({
                message: 'Usuário cadastrado com sucesso!',
                user
            });

        } catch (error) {
            return response.json({ message: error.message });
        }
    },

    async findAllUser(request, response) {
        try {
            const users = await prisma.user.findMany();
            return response.json(users);
        } catch (error) {
            return response.json({ message: error.message });
        }
    },

    async findUser(request, response) {
        try {
            const { userId } = request.params;

            const user = await prisma.user.findUnique({
                where: { id: Number(userId) }
            });
            delete user.password;
            return response.json(user);

        } catch (error) {
            return response.json({ message: error.message });
        }
    },

    async updateUser(request, response) {
        const { userId } = request.params;
        const { name, cpf, phone, email, password } = request.body;

        try {

            let user = await prisma.user.findUnique({
                where: { id: Number(userId) }
            });

            if (!user) {
                return response.status(404).json({
                    error: true,
                    message: 'Usuário não encontrado'
                });
            }


            let userWithEmail = await prisma.user.findUnique({
                where: { email }
            });

            if (userWithEmail && userWithEmail.id !== Number(userId)) {
                return response.status(409).json({
                    error: true,
                    message: 'E-mail já cadastrado'
                });
            }

            let userWithCpf = await prisma.user.findUnique({
                where: { cpf }
            });

            if (userWithCpf && userWithCpf.id !== Number(userId)) {
                return response.status(409).json({
                    error: true,
                    message: 'CPF já cadastrado'
                });
            }

    
            let updatedData = { name, cpf, phone, email };

            if (password) {
                const HashPassword = await hash(password, 10);
                updatedData.password = HashPassword;
            }

        
            user = await prisma.user.update({
                where: { id: Number(userId) },
                data: updatedData
            });

            return response.json({
                error: false,
                message: 'Dados do usuário atualizados com sucesso!',
                user
            });

        } catch (error) {
            return response.json({ message: error.message });
        }
    }, 
    
    async getProfile(request, response) {
        console.log('Request User:', request.user); // Add this line to check the user object
        
        const userId = request.user?.id; // Use optional chaining to avoid TypeError
    
        if (!userId) {
            return response.status(400).json({ error: true, message: 'User ID is missing' });
        }
    
        try {
            const user = await prisma.user.findUnique({
                where: { id: Number(userId) }
            });
            if (!user) {
                return response.status(404).json({
                    error: true,
                    message: 'Usuário não encontrado'
                });
            }
            delete user.password;
            return response.json(user);
    
        } catch (error) {
            return response.json({ message: error.message });
        }
    }
}
