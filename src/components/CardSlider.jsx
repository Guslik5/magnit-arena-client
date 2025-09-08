import React, { useRef, useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Card } from 'react-bootstrap';
import Container from "react-bootstrap/Container";
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';
import styled from "styled-components";

const StyledSlider = styled(Slider)`
    .slick-list {
        overflow: hidden !important;
    }

    .slick-track {
        display: flex !important;

    }

    .slick-slide {
        height: auto !important;
    }

    @media (max-width: 768px) {
        .slick-slide {
            width: 100% !important;
        }
    }
`;

const StyledCard = styled(Card)`
    border: none;
    background-color: rgba(var(--bs-tertiary-bg-rgb), var(--bs-bg-opacity)) !important;
    width: 100% !important;
`;

const CardSlider = ({ data, showDate, title, id }) => {
    const sliderRef = useRef(null);
    const [slidesToShow, setSlidesToShow] = useState(4); // Инициализируем с 4 (по умолчанию)

    useEffect(() => {
        const handleResize = () => {
            const screenWidth = window.innerWidth;

            if (screenWidth < 768) {
                setSlidesToShow(1);
            } else if (screenWidth < 992) {
                setSlidesToShow(2);
            } else {
                setSlidesToShow(4);
            }
        };

        // Вызываем handleResize при монтировании компонента
        handleResize();

        // Добавляем слушатель события resize
        window.addEventListener('resize', handleResize);

        // Убираем слушатель события при размонтировании компонента
        return () => window.removeEventListener('resize', handleResize);
    }, []); // Пустой массив зависимостей - эффект выполняется только при монтировании и размонтировании

    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: slidesToShow, // Используем состояние slidesToShow
        slidesToScroll: 1,
    };

    const goToNext = () => {
        sliderRef.current.slickNext();
    };

    const goToPrev = () => {
        sliderRef.current.slickPrev();
    };

    return (
        <Container id={id} className="bg-body-tertiary">
            <h1 className="m-5">{title}</h1>
            <StyledSlider ref={sliderRef} {...settings}>
                {data.map((item, index) => (
                    <div key={index}>
                        <StyledCard className="p-4">
                            <Card.Img variant="top" src={item.image} style={{ width: '100%', objectFit: 'cover' }} />
                            <Card.Body>
                                {showDate && <Card.Text>{item.date}</Card.Text>}
                                <Card.Title>{item.title}</Card.Title>
                            </Card.Body>
                        </StyledCard>
                    </div>
                ))}
            </StyledSlider>
            <div style={{ margin: '10px' }}>
                <BiChevronLeft size={60} onClick={goToPrev} className="bg-dark-custom m-2" style={{ cursor: 'pointer', color: "white", borderRadius: "30px" }} />
                <BiChevronRight size={60} onClick={goToNext} className="bg-dark-custom m-2" style={{ cursor: 'pointer', color: "white", borderRadius: "30px" }} />
            </div>
        </Container>
    );
};

export default CardSlider;
