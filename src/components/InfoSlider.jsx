import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styled from 'styled-components';
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import infoSliderBg from '../assets/infoSliderBG.jpg';
import photo1 from '../assets/news1.jpg';

// Styled Components
const StyledSliderContainer = styled.div`
    display: flex;
    align-items: center;
  background-image: url(${infoSliderBg});
  padding: 30px;
  color: white;
  position: relative;
  overflow: hidden;
`;

const StyledTextContainer = styled.div`
  text-align: center;
  padding: 20px;
    
`;

const StyledTextSecondary = styled.div`
    font-size: 1.8em;
    @media (max-width: 768px) {
        font-size: 1.1em !important;
    }
`

const StyledImage = styled.img`
  border-radius: 10px;
  width: 100%;
  object-fit: cover;
  max-height: 400px;
`;

const StyledArrow = styled.div`
  &.slick-arrow {
    display: block;
    border-radius: 50%;
    padding: 5px;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 1;
    cursor: pointer;
    font-size: 4em; 
    color: white;
    opacity: 0.7;
    transition: opacity 0.3s ease;

    &:hover {
      opacity: 1;
    }

    &:before {
      display: none; /* Убираем стандартную иконку стрелки Slick */
    }
  }

  /* Располагаем стрелки слева и справа от слайдера */
  &.slick-prev {
    left: -60px; /* Выводим стрелку за пределы слайдера слева */
  }

  &.slick-next {
    right: -30px; /* Выводим стрелку за пределы слайдера справа */
  }

  @media (max-width: 768px) {
      font-size: 2.5em !important;
      &.slick-prev {
          left: -30px; /* Выводим стрелку за пределы слайдера слева */
      }

      &.slick-next {
          right: -10px; /* Выводим стрелку за пределы слайдера справа */
      }
  }
`;

// Функциональные компоненты для стрелок
function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <StyledArrow
            className={`${className} slick-next`}
            style={{ ...style }}
            onClick={onClick}
        >
            &gt;
        </StyledArrow>
    );
}

function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <StyledArrow
            className={`${className} slick-prev`}
            style={{ ...style}}
            onClick={onClick}
        >
            &lt;
        </StyledArrow>
    );
}

const ImageSlider = () => {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        arrows: true,
        prevArrow: <SamplePrevArrow />,
        nextArrow: <SampleNextArrow />,
        responsive: [
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

    const images = [
        photo1,
        photo1,
        photo1,
        photo1,
        photo1
    ];

    return (
        <StyledSliderContainer>
            <Container>
                <Slider {...settings}>
                    {images.map((image, index) => (
                        <div key={index} className="px-2">
                            <StyledImage src={image} alt={`Слайд ${index + 1}`} />
                        </div>
                    ))}
                </Slider>

                <StyledTextContainer>
                    <h1 className="mb-4">Окунитесь в мир льда и скорости!</h1>
                    <StyledTextSecondary>
                        Посмотрите, что происходит за кулисами Магнит арены. Здесь рождаются
                        чемпионы, кипят страсти и создаются незабываемые моменты. Приглашаем вас на
                        захватывающее путешествие по нашей арене!
                    </StyledTextSecondary>
                </StyledTextContainer>
            </Container>
        </StyledSliderContainer>
    );
};

export default ImageSlider;