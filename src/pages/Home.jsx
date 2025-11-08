import React, {useEffect, useState} from 'react';
import FirstBannerCarousel from "../components/FirstBannerCarousel.jsx";
import Advantages from "../components/Advantages.jsx";
import Line from "../components/Line.jsx";
import CardSlider from "../components/CardSlider.jsx";
import news1 from '../assets/news1.jpg';
import additionalServices1 from '../assets/additionalServices1.jpg';
import StatisticsBlock from "../components/StatisticsBlock.jsx";
import InfoSlider from "../components/InfoSlider.jsx";
import {useNavigate} from "react-router-dom";

function Home() {

    const [newsData, setNewsData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        const fetchNewsData = async () => {
            try {
                const response = await fetch('http://localhost:4200/api/news'); // Замените на ваш URL
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                const sortedNews = data.sort((a, b) => new Date(b.updateAt) - new Date(a.updateAt));
                setNewsData(sortedNews);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchNewsData();
    }, []);

    if (loading) {
        return <div>Загрузка...</div>;
    }

    if (error) {
        return <div>Ошибка: {error.message}</div>;
    }

    const additionalServicesData = [
        {
            imgUrl: additionalServices1,
            title: "Заголовок доп услуг 1",
        },
        {
            imgUrl: additionalServices1,
            title: "Заголовок доп услуг 2",
        },
        {
            imgUrl: additionalServices1,
            title: "Заголовок доп услуг 3",
        },
        {
            imgUrl: additionalServices1,
            title: "Заголовок доп услуг 4",
        },        {
            imgUrl: additionalServices1,
            title: "Заголовок доп услуг 5",
        },
        {
            imgUrl: additionalServices1,
            title: "Заголовок доп услуг 6",
        },        {
            imgUrl: additionalServices1,
            title: "Заголовок доп услуг 7",
        },
        {
            imgUrl: additionalServices1,
            title: "Заголовок доп услуг 8",
        },
    ]


    return (
        <>
            <FirstBannerCarousel/>
            <Advantages />
            <Line/>
            <CardSlider
                data={newsData}  // Предполагается, что у вас есть массив данных newsData
                showDate={true} // Отображать дату
                title="Новости"   // Заголовок блока
                id='news-section'
            />

            <StatisticsBlock/>

            <CardSlider
                data={additionalServicesData}
                showDate={false}
                title="Дополнительные услуги"
                id='services-section'
            />
            <InfoSlider/>
        </>
    )
}

export default Home
