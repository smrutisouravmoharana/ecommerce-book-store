import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

function HeroSection() {
  const imgStyle = {
    width: '100%',
    height: '600px', // Set a fixed height
    objectFit: 'cover', // Ensures the image covers the entire area
  };

  return (
    <div>
      <Carousel
        autoPlay
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        interval={3000} // Time between slides in milliseconds
        transitionTime={500} // Transition time between slides in milliseconds
        stopOnHover={false} // Stop autoplay on hover
        emulateTouch={true} // Enable swipe gestures on touch devices
        dotColor="#000000" // Set dot color to black
      >
        <div>
          <Link to="/allproducts">
            <img src="https://img.freepik.com/free-photo/rainbow-books-stack-with-yellow-ribbon_23-2148882778.jpg?t=st=1720745145~exp=1720748745~hmac=82fe551e42925f4de218b555622d65c064955f70c256be5283c30c6a02a9b531&w=740" alt="Image 1" style={imgStyle} />
          </Link>
        </div>
        <div>
          <Link to="/allproducts">
            <img src="https://img.freepik.com/free-photo/various-books-arranged-table_1252-711.jpg?t=st=1720745183~exp=1720748783~hmac=461de1603d1aebff594564688618141be8c07e342fe2992cb00bbbe9845f15c2&w=740" alt="Image 2" style={imgStyle} />
          </Link>
        </div>
        <div>
          <Link to="/allproducts">
            <img src="https://img.freepik.com/free-photo/stack-books-black-wooden-table_93675-135413.jpg?t=st=1720745220~exp=1720748820~hmac=a1516d7d9028e4ad83597515ffa01e6e9cfba4ac14bd48beabf93b30c32e5aea&w=740" alt="Image 3" style={imgStyle} />
          </Link>
        </div>
        
      </Carousel>
    </div>
  );
}

export default HeroSection;
