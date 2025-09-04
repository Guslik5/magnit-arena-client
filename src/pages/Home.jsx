import React from 'react';
import FirstBannerCarousel from "../components/FirstBannerCarousel.jsx";
import Advantages from "../components/Advantages.jsx";
import Line from "../components/Line.jsx";
import CardSlider from "../components/CardSlider.jsx";
import news1 from '../assets/news1.jpg';
import additionalServices1 from '../assets/additionalServices1.jpg';
import StatisticsBlock from "../components/StatisticsBlock.jsx";
import InfoSlider from "../components/InfoSlider.jsx";

function Home() {
    const newsData = [
        {
            image: news1,
            date: "2016-06-06",
            title: "Заголовок новости 1(Новые раздевалки)",
        },
        {
            image: news1,
            date: "2016-06-06",
            title: "Заголовок новости 2(Новые раздевалки)",
        },
        {
            image: news1,
            date: "2016-06-06",
            title: "Заголовок новости 3(Новые раздевалки)",
        },
        {
            image: news1,
            date: "2016-06-06",
            title: "Заголовок новости 4(Новые раздевалки)",
        },
        {
            image: news1,
            date: "2016-06-06",
            title: "Заголовок новости 5(Новые раздевалки)",
        },
        {
            image: news1,
            date: "2016-06-06",
            title: "Заголовок новости 6(Новые раздевалки)",
        },
        {
            image: news1,
            date: "2016-06-06",
            title: "Заголовок новости 7(Новые раздевалки)",
        },
    ]

    const additionalServicesData = [
        {
            image: additionalServices1,
            title: "Заголовок доп услуг 1",
        },
        {
            image: additionalServices1,
            title: "Заголовок доп услуг 2",
        },
        {
            image: additionalServices1,
            title: "Заголовок доп услуг 3",
        },
        {
            image: additionalServices1,
            title: "Заголовок доп услуг 4",
        },        {
            image: additionalServices1,
            title: "Заголовок доп услуг 5",
        },
        {
            image: additionalServices1,
            title: "Заголовок доп услуг 6",
        },        {
            image: additionalServices1,
            title: "Заголовок доп услуг 7",
        },
        {
            image: additionalServices1,
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
                data={additionalServicesData} // Предполагается, что у вас есть массив данных eventsData
                showDate={false} // Не отображать дату
                title="Дополнительные услули"  // Заголовок блока
                id='services-section'

            />
            <InfoSlider/>
        </>
    )
}

export default Home
