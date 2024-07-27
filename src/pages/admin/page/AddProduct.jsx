import React, { useContext, useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import myContext from '../../../context/data/myContext';

// Example URL for background image
const backgroundImageUrl = 'https://img.freepik.com/free-photo/3d-view-books_23-2150473308.jpg?t=st=1720747696~exp=1720751296~hmac=3a25bfb4b9509ed426ca4611fbb95ba2a835390c9a80660b489992b887db221b&w=826';

function AddProduct() {
    const context = useContext(myContext);
    const { products, setProducts, addProduct } = context;

    // Local state for product details including stock quantity
    const [productDetails, setProductDetails] = useState({
        title: '',
        price: '',
        salePrice: '',
        brandName: '',
        imageUrl: '',
        category: '',
        description: '',
        stockQuantity: ''
    });

    const goBack = () => {
        window.history.back(); // Navigate back
    };

    // Handle changes in input fields
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductDetails({ ...productDetails, [name]: value });
    };

    // Add product with updated stock quantity
    const handleAddProduct = () => {
        // Add logic to update the products context
        setProducts((prevProducts) => [...prevProducts, productDetails]);
        addProduct(); // Assuming addProduct is a function that processes the addition
        // Reset form after adding
        setProductDetails({
            title: '',
            price: '',
            salePrice: '',
            brandName: '',
            imageUrl: '',
            category: '',
            description: '',
            stockQuantity: ''
        });
    };

    return (
        <div className='flex justify-center items-center min-h-screen' style={{ backgroundImage: `url(${backgroundImageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <div className='bg-gray-800 px-6 py-6 rounded-xl w-full max-w-md relative mt-4 mb-4 overflow-hidden'>
                <FaTimes className='text-white cursor-pointer text-3xl absolute top-4 right-4' onClick={goBack} />

                <div>
                    <h1 className='text-center text-white text-xl mb-4 font-bold'>Add Product</h1>
                </div>
                <div>
                    <input
                        type='text'
                        name='title'
                        value={productDetails.title}
                        onChange={handleChange}
                        className='bg-gray-600 mb-4 px-2 py-2 w-full rounded-lg text-white placeholder:text-gray-200 outline-none'
                        placeholder='Product title'
                    />
                </div>
                <div>
                    <input
                        type='text'
                        name='price'
                        value={productDetails.price}
                        onChange={handleChange}
                        className='bg-gray-600 mb-4 px-2 py-2 w-full rounded-lg text-white placeholder:text-gray-200 outline-none'
                        placeholder='Product price'
                    />
                </div>
                <div>
                    <input
                        type='text'
                        name='salePrice'
                        value={productDetails.salePrice}
                        onChange={handleChange}
                        className='bg-gray-600 mb-4 px-2 py-2 w-full rounded-lg text-white placeholder:text-gray-200 outline-none'
                        placeholder='Product sale price'
                    />
                </div>
                <div>
                    <input
                        type='text'
                        name='brandName'
                        value={productDetails.brandName}
                        onChange={handleChange}
                        className='bg-gray-600 mb-4 px-2 py-2 w-full rounded-lg text-white placeholder:text-gray-200 outline-none'
                        placeholder='Product brand name'
                    />
                </div>
                <div>
                    <input
                        type='text'
                        name='imageUrl'
                        value={productDetails.imageUrl}
                        onChange={handleChange}
                        className='bg-gray-600 mb-4 px-2 py-2 w-full rounded-lg text-white placeholder:text-gray-200 outline-none'
                        placeholder='Product image URL'
                    />
                </div>
                <div>
                    <input
                        type='text'
                        name='category'
                        value={productDetails.category}
                        onChange={handleChange}
                        className='bg-gray-600 mb-4 px-2 py-2 w-full rounded-lg text-white placeholder:text-gray-200 outline-none'
                        placeholder='Product category'
                    />
                </div>
                <div>
                    <textarea
                        cols='30'
                        rows='10'
                        name='description'
                        value={productDetails.description}
                        onChange={handleChange}
                        className='bg-gray-600 mb-4 px-2 py-2 w-full rounded-lg text-white placeholder:text-gray-200 outline-none'
                        placeholder='Product description'
                    ></textarea>
                </div>
                <div>
                    <input
                        type='number'
                        name='stockQuantity'
                        value={productDetails.stockQuantity}
                        onChange={handleChange}
                        className='bg-gray-600 mb-4 px-2 py-2 w-full rounded-lg text-white placeholder:text-gray-200 outline-none'
                        placeholder='Product stock quantity'
                    />
                </div>
                <div className='flex justify-center mb-3'>
                    <button
                        onClick={handleAddProduct}
                        className='bg-yellow-500 w-full text-black font-bold px-2 py-2 rounded-lg'
                    >
                        Add Product
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AddProduct;
