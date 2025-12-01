import Carousel from 'react-bootstrap/Carousel';
import carouselItem2 from '../assets/carouselItem2.jpg';
import carouselItem3 from '../assets/carouselItem3.jpg';
import carouselItem4 from '../assets/carouselItem4.jpg';



function FirstBannerCarousel() {

    const CarouselItems = [
        carouselItem2,
        carouselItem3,
        carouselItem4,

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
