import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

const EditNewsPage = () => {
    // Получаем ID новости из URL
    const { id } = useParams();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [imgUrl, setImgUrl] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isLoading, setIsLoading] = useState(false); // Для состояния отправки формы
    const [isFetchingInitialData, setIsFetchingInitialData] = useState(true); // Для состояния загрузки начальных данных
    const navigate = useNavigate();

    // Эффект для загрузки данных новости при монтировании компонента
    useEffect(() => {
        console.log('EditNewsPage mounted, id =', id);

        if (!id) {
            console.warn('ID новости не указан в URL. Проверьте маршрут /admin/edit/:id и как вы переходите на эту страницу.');
            setError('ID новости не указан в URL.');
            setIsFetchingInitialData(false);
            return;
        }

        const controller = new AbortController();
        const signal = controller.signal;

        const fetchNews = async () => {
            try {
                setIsFetchingInitialData(true);
                const token = localStorage.getItem('access_token');
                console.log('Запрос новости, id=', id, 'token=', !!token);
                const response = await fetch(`https://magnit-arena.ru/api/news/${id}`, {
                    headers: {
                        ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
                    },
                    signal,
                });

                console.log('Fetch completed, status=', response.status);

                if (!response.ok) {
                    const errorData = await response.json().catch(() => ({}));
                    throw new Error(errorData.message || `Ошибка сервера: ${response.status}`);
                }

                const newsData = await response.json();
                console.log('Получены данные новости:', newsData);
                setTitle(newsData.title ?? '');
                setDescription(newsData.description ?? '');
                setImgUrl(newsData.imgUrl ?? '');
            } catch (err) {
                if (err.name === 'AbortError') {
                    console.warn('Запрос новости был отменён');
                } else {
                    console.error('Ошибка при загрузке новости:', err);
                    setError(err.message || 'Ошибка при загрузке новости.');
                }
            } finally {
                setIsFetchingInitialData(false);
            }
        };

        fetchNews();

        // таймаут на случай долгого ответа (необязательно)
        const timeout = setTimeout(() => {
            if (isFetchingInitialData) {
                console.warn('Долгая загрузка новости (>10s).');
            }
        }, 10000);

        return () => {
            clearTimeout(timeout);
            controller.abort();
        };
    }, [id]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setIsLoading(true);

        if (!title || !description || !imgUrl) {
            setError('Пожалуйста, заполните все обязательные поля (Заголовок, Содержание, URL изображения).');
            setIsLoading(false);
            return;
        }
        try {
            const token = localStorage.getItem('access_token');
            const response = await fetch(`https://magnit-arena.ru/api/news/${id}`, { // Используем ID в URL и PUT метод
                method: 'PUT', // Изменено с POST на PUT
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
                throw new Error(errorData.message || 'Ошибка при обновлении новости.');
            }

            setSuccess('Новость успешно обновлена!'); // Изменено сообщение
            // Можно очистить поля или оставить их заполненными,
            // но так как мы перенаправляем, это не критично.
            // setTitle('');
            // setContent('');
            // setImageUrl('');

            setTimeout(() => {
                navigate('/admin');
            }, 1500);

        } catch (err) {
            console.error('Ошибка при обновлении новости:', err); // Изменено сообщение в консоли
            setError(err.message || 'Произошла ошибка при обновлении новости.');
        } finally {
            setIsLoading(false);
        }
    };

    if (isFetchingInitialData) {
        return (
            <>
                <Container fluid style={{ backgroundColor: "#006699" }}>
                    <div className="fs-1 p-3 text-white">
                        Админ панель
                    </div>
                </Container>
                <Container className="mt-5">
                    <h2 className="mb-4">Редактировать новость</h2>
                    <div className="d-flex justify-content-center align-items-center" style={{ height: '200px' }}>
                        <Spinner animation="border" role="status">
                            <span className="visually-hidden">Загрузка данных новости...</span>
                        </Spinner>
                    </div>
                </Container>
            </>
        );
    }

// Если данные не были загружены (например, ID не найден), но isFetchingInitialData стало false
    // и есть ошибка, показываем ее.
    if (!isFetchingInitialData && error) {
        return (
            <>
                <Container fluid style={{ backgroundColor: "#006699" }}>
                    <div className="fs-1 p-3 text-white">
                        Админ панель
                    </div>
                </Container>
                <Container className="mt-5">
                    <h2 className="mb-4">Редактировать новость</h2>
                    <Button variant="secondary" onClick={() => navigate('/admin')} className="mb-4">
                        ← Вернуться к списку новостей
                    </Button>
                    <Alert variant="danger">{error}</Alert>
                </Container>
            </>
        );
    }

    return (
        <>
            <Container fluid style={{ backgroundColor: "#006699" }}>
                <div className="fs-1 p-3 text-white">
                    Админ панель
                </div>
            </Container>
            <Container>
                <h2 className="mt-5 mb-4">Редактировать новость</h2> {/* Изменено название */}
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
                        {isLoading ? 'Обновление...' : 'Обновить новость'} {/* Изменено название кнопки */}
                    </Button>
                </Form>
            </Container>
        </>
    );
};

export default EditNewsPage;
