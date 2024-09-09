import jwt from 'jsonwebtoken';

export default function auth(request, response, next) {
    const { authorization } = request.headers;

    if (!authorization) {
        return response.status(401).json({ message: 'Token não fornecido' });
    }

    const token = authorization.replace('Bearer').trim(); 

    try {
        const data = jwt.verify(token, process.env.JWT_KEY); 
        const { id } = data;
        request.userId = id;
        return next();
    } catch (error) {
        let message = 'Erro ao autenticar o token';

        if (error.message === 'jwt expired') {
            message = 'Token expirado';
        } else if (error.message === 'jwt malformed') {
            message = 'Token inválido';
        }

        return response.status(401).json({ message, details: error.message });
    }
}
