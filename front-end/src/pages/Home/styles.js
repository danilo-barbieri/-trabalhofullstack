import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
  background-color: #f0f0f0;
  padding: 20px;
`;

export const Button = styled.a`
  display: inline-block;
  padding: 10px 20px;
  margin: 10px;
  font-size: 16px;
  color: white;
  background-color: #007bff;
  border-radius: 5px;
  text-decoration: none;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;
