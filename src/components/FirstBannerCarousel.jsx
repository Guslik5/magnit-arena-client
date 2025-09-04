import Carousel from 'react-bootstrap/Carousel';
import carouselItem from '../assets/carouselItem.jpg';



function FirstBannerCarousel() {

    const CarouselItems = [
        carouselItem,
        carouselItem,
    ]

    return (
        <Carousel>
            {CarouselItems.map((item, index) => (
                <Carousel.Item key={index}>
                    <img
                        src={item}
                        alt="photo"
                        className="d-block w-100 m-0 p-0"
                    />
                </Carousel.Item>
            ))}
        </Carousel>
    );
}

export default FirstBannerCarousel;