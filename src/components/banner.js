import Carousel from 'react-bootstrap/Carousel';
import imgSlide from "../images/DSC_3422.jpg";
import imgSlide2 from "../images/DSC_3378.jpg";
import imgSlide3 from "../images/DSC_3620.jpg";
function banner() {
  return (
    <Carousel>
      <Carousel.Item interval={1000}>
        <img
          className="d-block"
          src={imgSlide}
          alt="First slide"
          style={{ width: "1700px", height: "350px" }}
        />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={500}>
        <img
          className="d-block"
          src={imgSlide2}
          alt="Second slide"
          style={{ width: "1700px", height: "350px" }}
        />
        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block"
          src={imgSlide3}
          alt="Third slide"
          style={{ width: "1700px", height: "350px" }}
        />
        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default banner;