import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Container from "react-bootstrap/Container";
import styled from "styled-components";
import Button from "react-bootstrap/Button";


const StyledButton = styled(Button)`
  background-color: #CC3333;
  border-color: #CC3333;
  color: white;
  transition: background-color 0.2s ease, border-color 0.2s ease;

  &:hover {
    background-color: #9C2727;
    border-color: #CC2727;
  }

  &:active {
    background-color: #9C2727 !important;
  }
`;

function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); // для редиректа



    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('https://magnit-arena.ru/api/auth/login', { // Замени на адрес своего бэкенда
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                    password: password,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json(); // Попытка получить JSON с ошибкой от сервера
                const errorMessage = errorData.message || 'Invalid username or password'; // Извлекаем сообщение об ошибке, если есть
                throw new Error(errorMessage);
            }

            const data = await response.json();
            const { access_token } = data;
            localStorage.setItem('access_token', access_token); // Сохраняем токен в localStorage
            navigate('/admin');
        } catch (error) {
            console.error('Login failed:', error);
            setError(error.message || 'Invalid username or password'); // Используем error.message, если он есть
        }
    };


    return (
        <Container className="d-flex flex-column justify-content-center align-items-center" style={{ height: '100vh' }}>
            <div className="p-5" style={{backgroundColor: "#006699"}}>
                <h1 className="text-center pb-5 text-white">Вход администратора</h1>

                <form onSubmit={handleSubmit}>
                    <div>
                        <input
                            className="w-100 mb-2"
                            type="text"
                            id="username"
                            placeholder="Логин"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div>
                        <input
                            className="w-100 mb-2"
                            type="password"
                            id="password"
                            placeholder="Пароль"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    {error && <p style={{ color: '#CC3333' }}>{error}</p>}
                    <StyledButton type="submit">Войти</StyledButton>
                </form>
            </div>
        </Container>
    );
}

export default LoginPage;
