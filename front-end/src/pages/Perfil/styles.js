import styled from "styled-components";

export const Container = styled.div`
    padding: 60px 150px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    h2 {
        font-size: 30px;
    }

    p {
        font-size: 15px;
        margin-bottom: 15px;
    }
`;

export const ContainerForm = styled.div`
    padding: 35px;
    width: 370px;
    background-color: var(--white);
    border-radius: 5px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

export const Label = styled.div`
    display: flex;
    margin-bottom: 10px;
    font-weight: 500;
`;

export const Form = styled.form`
    width: 100%;
`;

export const Links = styled.div`
    padding-top: 15px;
    font-size: 16px;
    text-align: center;

    a {
        color: var(--tercery);
        text-decoration: none;

        &:hover {
            text-decoration: underline;
        }
    }
`;

export const InputField = styled.input`
    height: 50px;
    padding: 8px 15px;
    border-radius: 5px;
    width: 100%;
    color: var(--secondary);
    font-size: 15px;
    margin-bottom: 10px;
    outline: none;
    border: 1px solid var(--gray);
    letter-spacing: 1px;

    &:disabled {
        background-color: var(--light-gray);
        cursor: not-allowed;
    }
`;

export const Button = styled.button`
    height: 50px;
    width: 100%;
    background-color: var(--primary);
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s;
    margin-top: 10px;

    &:hover {
        background-color: var(--primary-dark);
    }

    &:disabled {
        background-color: var(--gray);
        cursor: not-allowed;
    }
`;
