import Carousel from 'react-bootstrap/Carousel';
import carouselItem from '../assets/carouselItem.jpg';

function FirstBannerCarousel() {
    return (
        <Carousel>
            <Carousel.Item>
                <img
                    className="d-block w-100 m-0 p-0" // Стандартные классы Bootstrap для карусели
                    src={carouselItem}  // Используйте путь к изображению
                    alt="First slide"
                />
                <Carousel.Caption>
                    <h3>First slide label</h3>
                    <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100 m-0 p-0" // Стандартные классы Bootstrap для карусели
                    src={carouselItem}  // Используйте путь к изображению
                    alt="First slide"
                />
                <Carousel.Caption>
                    <h3>second slide label</h3>
                    <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                </Carousel.Caption>
            </Carousel.Item>

        </Carousel>
    );
}

export default FirstBannerCarousel;