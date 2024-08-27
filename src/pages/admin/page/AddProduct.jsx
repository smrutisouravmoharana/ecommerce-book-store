import React, { useContext } from 'react';
import { FaTimes } from 'react-icons/fa';
import myContext from '../../../context/data/myContext';

// Example URL for background image
const backgroundImageUrl = 'https://img.freepik.com/free-photo/3d-view-books_23-2150473308.jpg?t=st=1720747696~exp=1720751296~hmac=3a25bfb4b9509ed426ca4611fbb95ba2a835390c9a80660b489992b887db221b&w=826';

function AddProduct() {
    const context = useContext(myContext);
    const { products, setProducts, addProduct } = context;

    const goBack = () => {
        window.history.back(); // Navigate back
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
                        value={products.title}
                        onChange={(e) => setProducts({ ...products, title: e.target.value })}
                        name='title'
                        className='bg-gray-600 mb-4 px-2 py-2 w-full rounded-lg text-white placeholder:text-gray-200 outline-none'
                        placeholder='Product title'
                    />
                </div>
                <div>
                    <input
                        type='text'
                        value={products.price}
                        onChange={(e) => setProducts({ ...products, price: e.target.value })}
                        name='price'
                        className='bg-gray-600 mb-4 px-2 py-2 w-full rounded-lg text-white placeholder:text-gray-200 outline-none'
                        placeholder='Product price'
                    />
                </div>
                <div>
                    <input
                        type='text'
                        value={products.salePrice}
                        onChange={(e) => setProducts({ ...products, salePrice: e.target.value })}
                        name='salePrice'
                        className='bg-gray-600 mb-4 px-2 py-2 w-full rounded-lg text-white placeholder:text-gray-200 outline-none'
                        placeholder='Product sale price'
                    />
                </div>
                <div>
                    <input
                        type='text'
                        value={products.shipping}
                        onChange={(e) => setProducts({ ...products, shipping: e.target.value })}
                        name='shipping'
                        className='bg-gray-600 mb-4 px-2 py-2 w-full rounded-lg text-white placeholder:text-gray-200 outline-none'
                        placeholder='Product shipping'
                    />
                </div>
                <div>
                    <input
                        type='text'
                        value={products.brandName}
                        onChange={(e) => setProducts({ ...products, brandName: e.target.value })}
                        name='brandName'
                        className='bg-gray-600 mb-4 px-2 py-2 w-full rounded-lg text-white placeholder:text-gray-200 outline-none'
                        placeholder='Product author name'
                    />
                </div>
                <div>
                    <input
                        type='text'
                        value={products.imageUrl}
                        onChange={(e) => setProducts({ ...products, imageUrl: e.target.value })}
                        name='imageurl'
                        className='bg-gray-600 mb-4 px-2 py-2 w-full rounded-lg text-white placeholder:text-gray-200 outline-none'
                        placeholder='Product imageUrl'
                    />
                </div>
                <div>
                    <input
                        type='text'
                        value={products.category}
                        onChange={(e) => setProducts({ ...products, category: e.target.value })}
                        name='category'
                        className='bg-gray-600 mb-4 px-2 py-2 w-full rounded-lg text-white placeholder:text-gray-200 outline-none'
                        placeholder='Product category'
                    />
                </div>
                <div>
                    <textarea
                        cols='30'
                        rows='10'
                        name='description'
                        value={products.description}
                        onChange={(e) => setProducts({ ...products, description: e.target.value })}
                        className='bg-gray-600 mb-4 px-2 py-2 w-full rounded-lg text-white placeholder:text-gray-200 outline-none'
                        placeholder='Product description'
                    ></textarea>
                </div>
                <div>
                    <select
                        name='stockStatus'
                        value={products.stockStatus}
                        onChange={(e) => setProducts({ ...products, stockStatus: e.target.value })}
                        className='bg-gray-600 mb-4 px-2 py-2 w-full rounded-lg text-white outline-none'
                    >
                        <option value=''>Select Stock Status</option>
                        <option value='In Stock'>In Stock</option>
                        <option value='Out of Stock'>Out of Stock</option>
                    </select>
                </div>
                <div className='flex justify-center mb-3'>
                    <button
                        onClick={addProduct}
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
