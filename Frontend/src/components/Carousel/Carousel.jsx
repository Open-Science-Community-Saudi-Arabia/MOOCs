import './Carousel.css'
import  Slider from 'react-slick'
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import LeftArrow from '../vectors/LeftArrow'
import RightArrow from '../vectors/RightArrow'
const Carousel = ({children}) => {
  const  settings = {
        infinite:true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        initialSlide: 0,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePreviousArrow />,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              infinite: true,
              dots: true
            }
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              initialSlide: 2
            }
          },
          {
            breakpoint: 425,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]
  }
  return (
    <Slider {...settings} className='carosel'>
        {children}
    </Slider>
  )
}

export default Carousel

const SampleNextArrow = ({
    onClick,
  }) => {
    return (
      <div
        className=" next "
        onClick={onClick}
      >
      
        <RightArrow/>
      </div>
    );
  };
  
  const SamplePreviousArrow = ({
    onClick,
  }) => {
    return (
      <div
        className="prev"
        onClick={onClick}
      >
        <LeftArrow/>
      </div>
    );
  };