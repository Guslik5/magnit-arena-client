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
                const response = await fetch('https://magnit-arena.ru/api/news'); // Замените на ваш URL
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
            title: "Доп услуги планируются",
        },
        {
            imgUrl: additionalServices1,
            title: "Доп услуги планируются",
        },
        {
            imgUrl: additionalServices1,
            title: "Доп услуги планируются",
        },
        {
            imgUrl: additionalServices1,
            title: "Доп услуги планируются",
        },        {
            imgUrl: additionalServices1,
            title: "Доп услуги планируются",
        },
    ]


    return (
        <>
            <FirstBannerCarousel/>
            <Advantages />
            <Line/>
            <CardSlider
                data={newsData} 
                showDate={true}
                title="Новости" 
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
