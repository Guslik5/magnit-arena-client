import React, {useRef} from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Card, Button } from 'react-bootstrap';
import Container from "react-bootstrap/Container";
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';
import "../App.css"
import styled from "styled-components";

const StyledCard = styled(Card)`
    border: none;
    background-color: rgba(var(--bs-tertiary-bg-rgb), var(--bs-bg-opacity)) !important;
    transition: transform 0.3s ease-in-out; /* Добавляем transition */
    
    &:hover {
        transform: scale(1.1);
    }
`

const StyledSlider = styled(Slider)`
    .slick-track {
        background-color: rgba(var(--bs-tertiary-bg-rgb), var(--bs-bg-opacity)) !important;
    }

    .slick-list {
        background-color: rgba(var(--bs-tertiary-bg-rgb), var(--bs-bg-opacity)) !important;
    }

    .slick-slide {
        background-color: rgba(var(--bs-tertiary-bg-rgb), var(--bs-bg-opacity)) !important;
    }


    .slick-prev,
    .slick-next {
        color: white; 
    }
`;

const CardSlider = ({data, showDate, title, id}) => {
    const sliderRef = useRef(null); // Создаем ссылку на компонент Slider

    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 4, // Количество карточек, отображаемых одновременно
        slidesToScroll: 1,
        responsive: [ // Адаптивность
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    const goToNext = () => {
        sliderRef.current.slickNext(); // Используем ссылку для вызова метода slickNext
    };

    const goToPrev = () => {
        sliderRef.current.slickPrev(); // Используем ссылку для вызова метода slickPrev
    };

    return (
        <Container id={id} className="bg-body-tertiary">
            <h1 className="m-5">{title}</h1>
            <StyledSlider ref={sliderRef} {...settings}> {/* Передаем ссылку компоненту Slider */}
                {data.map((item, index) => (
                    <StyledCard key={index} className="p-4">
                        <Card.Img variant="top" src={item.image} />
                        <Card.Body>
                            {showDate && <Card.Text>{item.date}</Card.Text>} {/* Условный рендеринг даты */}
                            <Card.Title>{item.title}</Card.Title>
                        </Card.Body>
                    </StyledCard>
                ))}

            </StyledSlider>
            <div style={{  margin: '10px' }}>
                <BiChevronLeft size={60} onClick={goToPrev} className="bg-dark-custom m-2" style={{ cursor: 'pointer', color: "white", borderRadius: "30px"}} />
                <BiChevronRight size={60} onClick={goToNext} className="bg-dark-custom m-2" style={{ cursor: 'pointer', color: "white", borderRadius: "30px"}} />
            </div>
        </Container>
    );
};

export default CardSlider;