import React, {useEffect, useState} from 'react';
import Container from "react-bootstrap/Container";
import {Col, Row} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {useNavigate} from "react-router-dom";

function formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${day}.${month}.${year} ${hours}:${minutes}`;
}

const AdminPage = () => {
    const [adminData, setAdminData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const [newsData, setNewsData] = useState([]);

    useEffect(() => {
        fetch('http://localhost:4200/api/news')
            .then(res => res.json())
            .then(data => setNewsData(data));
    }, []);

    useEffect(() => {
        const token = localStorage.getItem('access_token');

        if (!token) {
            navigate('/login');
            return;
        }

        const fetchAdminData = async () => {
            setIsLoading(true);
            try {
                const response = await fetch('http://localhost:4200/api/auth/me', { // Замени на адрес своего бэкенда
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    localStorage.removeItem('access_token');
                    navigate('/login');
                    throw new Error('Failed to fetch admin data');
                }

                const data = await response.json();
                setAdminData(data);
                setError('');
            } catch (error) {
                console.error('Error fetching admin data:', error);
                localStorage.removeItem('access_token');
                navigate('/login');
                setError('Failed to fetch admin data. Please login again.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchAdminData();
    }, [navigate]);

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p style={{ color: 'red' }}>{error}</p>;
    }

    return (
        <>
            <Container fluid style={{backgroundColor: "#006699"}}>
                <div className="fs-1 p-3 text-white">
                    Админ панель
                </div>
            </Container>
            <Container>
                <div className="fs-2 mt-5 mb-5">Новости</div>
                <Container className="bg-body-tertiary p-5">
                    {newsData.map((news, index) => (
                        <Row key={index} className="mb-2"> {/* mb-2 добавляет небольшой отступ между строками */}
                            <Col md={5} className="d-flex align-items-center">
                                {news.title}
                            </Col>
                            <Col md={2} className="d-flex align-items-center">
                                {formatDate(news.updateAt)}
                            </Col>
                            <Col md={3} className="d-flex justify-content-end">
                                <Button variant="warning" className="mr-2">Редактировать</Button>
                            </Col>
                            <Col md={2} className="d-flex justify-content-end">
                                <Button variant="danger">Удалить</Button>
                            </Col>
                        </Row>
                    ))}
                </Container>
            </Container>
        </>
    );
}

export default AdminPage;