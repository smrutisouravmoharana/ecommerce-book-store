/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React, { useContext } from 'react';
import myContext from '../../context/data/myContext';
import { Link } from 'react-router-dom';

function Footer() {
  const context = useContext(myContext);
  const { mode } = context;

  const footerStyles = {
    backgroundImage: `url('https://img.freepik.com/free-photo/hands-putting-some-books-wooden-surface_23-2147624847.jpg?t=st=1720745971~exp=1720749571~hmac=81224c5082a185b061c6c1eda2a208df99ef3ca21f88e4a118af94d6108e09f8&w=740')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '',
    color: mode === 'dark' ? 'white' : '',
    position: 'relative', // Ensure positioning context for absolute child
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div>
      <footer className="text-white body-font" style={footerStyles}>
        <div className="container px-5 py-12 mx-auto">
          <div className="flex flex-wrap md:text-left text-center order-first">
            <div className="lg:w-1/4 md:w-1/2 w-full px-4">
              <h2 className="title-font font-bold tracking-widest text-sm mb-3" style={{ color: 'black' }}>
                CATEGORIES
              </h2>

              <nav className="list-none mb-10">
                <li>
                  <Link to={'/'} className="text-white font-bold hover:text-gray-800" style={{ color: mode === 'dark' ? 'white' : '' }} onClick={scrollToTop}>Home</Link>
                </li>
                <li>
                  <Link to={'/'} className="text-white font-bold hover:text-gray-800" style={{ color: mode === 'dark' ? 'white' : '' }} onClick={scrollToTop}>Order</Link>
                </li>
                <li>
                  <Link to={'/'} className="text-white font-bold hover:text-gray-800" style={{ color: mode === 'dark' ? 'white' : '' }} onClick={scrollToTop}>Local For Vocal</Link>
                </li>
                <li>
                  <Link to={'/'} className="text-white font-bold hover:text-gray-800" style={{ color: mode === 'dark' ? 'white' : '' }} onClick={scrollToTop}>Cart</Link>
                </li>
              </nav>
            </div>
            <div className="lg:w-1/4 md:w-1/2 w-full px-4">
              <h2 className="title-font font-bold tracking-widest text-sm mb-3 uppercase" style={{ color: 'black' }}>
                Customer Service
              </h2>

              <nav className="list-none mb-10">
                <li>
                  <Link to={'/'} className="text-white font-bold hover:text-gray-800" style={{ color: mode === 'dark' ? 'white' : '' }} onClick={scrollToTop}>Return Policy</Link>
                </li>
                <li>
                  <Link to={'/'} className="text-white font-bold hover:text-gray-800" style={{ color: mode === 'dark' ? 'white' : '' }} onClick={scrollToTop}>About</Link>
                </li>
                <li>
                  <Link to="/contactpage" className="text-white font-bold hover:text-gray-800" style={{ color: mode === 'dark' ? 'white' : '' }} onClick={scrollToTop}>
                    Contact Us
                  </Link>
                </li>
              </nav>
            </div>

            {/* Google Map embedded in the top-right corner
            <div style={{ position: 'absolute', top: '10px', right: '10px', zIndex: '10' }}>
              <iframe
                width="200"
                height="200"
                style={{ border: 0 }}
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3621.4764739737107!2d93.933285474428!3d24.81337414714178!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x374927b1c771e2d3%3A0xd43b7c8901a240f6!2sZound&#39;s%20Musik%20Nagamapal!5e0!3m2!1sen!2sin!4v1719764330580!5m2!1sen!2sin"
                allowFullScreen=""
                aria-hidden="false"
                tabIndex="0"
                allow="fullscreen"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div> */}

            <div className="lg:w-1/4 md:w-1/2 w-full px-4 mt-4 md:mt-0"> {/* Adjusted margin here */}
              <h2 className="title-font font-bold text-gray-900 tracking-widest text-sm mb-3 uppercase" style={{ color: 'black' }}>
                Services
              </h2>

              <nav className="list-none mb-10">
                <li>
                  <Link to={'/'} className="text-white font-bold hover:text-gray-800" style={{ color: mode === 'dark' ? 'white' : '' }} onClick={scrollToTop}>Privacy</Link>
                </li>
              </nav>
            </div>

            {/* Image below the Services section */}
            <div className="lg:w-1/4 md:w-1/2 w-full px-4 mt-32 md:mt-0">
              <img src="https://ecommerce-sk.vercel.app/pay.png" alt="" />
            </div>
          </div>
        </div>

        <div className="container px-5 py-3 mx-auto flex items-center sm:flex-row flex-col">
          <Link to={'/'} className='flex' onClick={scrollToTop}>
            <div className="flex">
              <h1 className='text-2xl font-bold text-black px-2 py-1 rounded' style={{ color: 'black' }}>
              PUSTAK SANGRAH
              </h1>

            </div>
          </Link>
          <p className="text-sm text-white sm:ml-6 sm:mt-0 mt-4" style={{ color: mode === 'dark' ? 'white' : '' }}>© 2024 PUSTAK SANGRAH —
            <a href="https://twitter.com/knyttneve" rel="noopener noreferrer" className="text-white ml-1" target="_blank" style={{ color: mode === 'dark' ? 'white' : '' }}>www.pustaksangrah.com</a>
          </p>
          <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
            <a className="text-gray-500 ml-3" href="https://facebook.com/yourpage" target="_blank" rel="noopener noreferrer">
              <img src="https://cdn-icons-png.freepik.com/256/2504/2504903.png?uid=R147306243&ga=GA1.1.1087679078.1714562823&semt=ais_hybrid" alt="Facebook" className="w-8 h-8" />
            </a>
            <a className="text-gray-500 ml-3" href="https://facebook.com/yourpage" target="_blank" rel="noopener noreferrer">
              <img src="https://cdn-icons-png.freepik.com/256/12107/12107611.png?uid=R147306243&ga=GA1.1.1087679078.1714562823&semt=ais_hybrid" alt="Facebook" className="w-8 h-8" />
            </a>
            <a className="text-gray-500 ml-3" href="https://facebook.com/yourpage" target="_blank" rel="noopener noreferrer">
              <img src="https://cdn-icons-png.freepik.com/256/2111/2111463.png?uid=R147306243&ga=GA1.1.1087679078.1714562823&semt=ais_hybrid" alt="Facebook" className="w-8 h-8" />
            </a>
            <a className="text-gray-500 ml-3" href="https://facebook.com/yourpage" target="_blank" rel="noopener noreferrer">
              <img src="https://cdn-icons-png.freepik.com/256/3536/3536445.png?uid=R147306243&ga=GA1.1.1087679078.1714562823&semt=ais_hybrid" alt="Facebook" className="w-8 h-8" />
            </a>
          </span>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
