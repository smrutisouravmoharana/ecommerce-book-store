/* eslint-disable no-unused-vars */
import React, { useContext } from "react";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import { GrLocation } from "react-icons/gr";
import { MdOutlinePhone, MdOutlineMailOutline, MdOutlineFax, MdOutlineAddLocation } from "react-icons/md";
import myContext from '../../context/data/myContext';
import img1 from "../../assets/close-up-colorful-books-pile.jpg";



const ContactUs = () => {

  const context = useContext(myContext);
  const { mode } = context;
  const posts = [
    {
      id: 1,
      title: 'Our Main Office',
      icon: <MdOutlineAddLocation size={30} className="text-orange-600" />,
      description: 'Opp sbi main branch, Koshi college road,Khagaria, Bihar-851205',
    },
    {
      id: 2,
      title: 'Phone Number',
      icon: <MdOutlinePhone size={30} className="text-orange-600" />,
      description: '+91-7479965857',
    },
    {
      id: 3,
      title: 'Fax',
      icon: <MdOutlineFax size={30} className="text-orange-600" />,
      description: '123466789',
    },
    {
      id: 4,
      title: 'Email',
      icon: <MdOutlineMailOutline size={30} className="text-orange-600" />,
      description: 'pustaksangrah134@gmail.com',
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div
        className="flex-grow bg-cover bg-center py-24 sm:py-32"
        style={{ backgroundImage: `url(${img1})` }}
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Contact Us
            </h2>
            <p className="mt-2 text-lg leading-8 text-gray-300">
              Get in touch with us now.
            </p>
          </div>
          <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-4">
            {posts.map((post) => (
              <div
                key={post.id}
                className="flex flex-col items-center p-6 rounded-lg shadow-lg"
                style={{ backgroundColor: mode === 'dark' ? '#282c34' : '#acaef5', borderColor: mode === 'dark' ? 'white' : 'transparent', borderWidth: '1px', borderStyle: 'solid' }}
              >
                <div className="text-5xl mb-4 text-white">{post.icon}</div>
                <h3 className="text-lg font-bold text-white">{post.title}</h3>
                <p className="mt-2 text-sm text-white">{post.description}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-col lg:flex-row justify-center items-start gap-10 flex-wrap mt-10 p-10 rounded-lg shadow-lg">
            <form
              action=""
              method="post"
              className="flex flex-col justify-start w-full lg:w-2/5 order-0 lg:order-0 lg:mr-44"
            >
              <input
                type="text"
                name="name"
                placeholder="Enter Your Name"
                className="w-full h-12 px-0 mb-4 rounded bg-transparent border-b border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 text-white"
                style={{ caretColor: 'white', color: 'white', WebkitTextFillColor: 'white' }} />
              <input
                type="text"
                name="email"
                placeholder="Enter Your Email"
                className="w-full h-12 px-0 mb-4 rounded bg-transparent border-b border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 text-white"
                style={{ caretColor: 'white', color: 'white', WebkitTextFillColor: 'white' }}
              />

              <input
                type="tel"
                name="number"
                placeholder="Enter Your Number"
                className="w-full h-12 px-0 mb-4 rounded bg-transparent border-b border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 text-white"
                style={{ caretColor: 'white', color: 'white', WebkitTextFillColor: 'white' }} />
              <textarea
                name="message"
                placeholder="Your Message"
                className="w-full h-32 px-0 mb-4 rounded bg-transparent border-b border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                style={{ caretColor: 'white', color: 'white', WebkitTextFillColor: 'white' }}
              />
              <button
                type="submit"
                className="w-full py-3 bg-orange-500 text-white rounded hover:bg-orange-600"
                disabled
              >
                Submit
              </button>
            </form>
            <div className="w-full lg:w-2/5">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d12021.776970700173!2d86.44524235325544!3d25.50815882543738!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sopp%20sbi%20main%20branch%20koshi%20college%20road%20khagaria%20bihar-851205!5e1!3m2!1sen!2sin!4v1722659331361!5m2!1sen!2sin"
                className="w-full h-72 lg:h-96 rounded-lg"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Map"
                style={{ minHeight: '300px', border: mode === 'dark' ? '2px solid blue' : 'none' }}
              ></iframe>
              
            </div>

          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ContactUs;
