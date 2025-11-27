import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const CreateNewsPage = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [imgUrl, setImgUrl] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setIsLoading(true);

        // ОБНОВЛЕННАЯ ВАЛИДАЦИЯ: Заголовок, содержание и URL картинки обязательны
        if (!title || !description || !imgUrl) {
            setError('Пожалуйста, заполните все обязательные поля (Заголовок, Содержание, URL изображения).');
            setIsLoading(false);
            return;
        }

        try {
            const token = localStorage.getItem('access_token');
            console.log('Content type:', typeof description, 'Content value:', description);
            console.log('ImageUrl type:', typeof imgUrl, 'ImageUrl value:', imgUrl);

            const response = await fetch('https://magnit-arena.ru/api/news', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    title,
                    description,
                    imgUrl,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Ошибка при добавлении новости.');
            }

            setSuccess('Новость успешно добавлена!');
            setTitle('');
            setDescription('');
            setImgUrl('');

            setTimeout(() => {
                navigate('/admin');
            }, 1500);

        } catch (err) {
            console.error('Ошибка при создании новости:', err);
            setError(err.message || 'Произошла ошибка при добавлении новости.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <Container fluid style={{backgroundColor: "#006699"}}>
                <div className="fs-1 p-3 text-white">
                    Админ панель
                </div>
            </Container>
            <Container>
                <h2 className="mt-5 mb-4">Добавить новую новость</h2>
                <Button variant="secondary" onClick={() => navigate('/admin')} className="mb-4">
                    ← Вернуться к списку новостей
                </Button>
                {error && <Alert variant="danger">{error}</Alert>}
                {success && <Alert variant="success">{success}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="newsTitle">
                        <Form.Label>Заголовок</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Введите заголовок новости"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="newsImageUrl">
                        <Form.Label>URL изображения</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Введите URL изображения"
                            value={imgUrl}
                            onChange={(e) => setImgUrl(e.target.value)}
                            required
                        />
                        <Form.Text className="text-muted">
                            Введите прямую ссылку на изображение.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="newsContent">
                        <Form.Label>Содержание</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={5}
                            placeholder="Введите содержание новости"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit" disabled={isLoading}>
                        {isLoading ? 'Добавление...' : 'Добавить новость'}
                    </Button>
                </Form>
            </Container>
        </>
    );
};

export default CreateNewsPage;

