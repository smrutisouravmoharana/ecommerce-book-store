import React, { useContext, useEffect, useState } from 'react';
import myContext from '../../context/data/myContext';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../redux/cartSlice';
import { toast } from 'react-toastify';

function ProductCard() {
    const context = useContext(myContext);
    const { mode, product, searchkey, filterType, filterBrandName, filterPrice } = context;

    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart);

    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 8;

    const addCart = (product) => {
        dispatch(addToCart(product));
        toast.success('Added to cart');
    };

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

    // Filter products based on search key, category, brand name, and price
    const filteredProducts = product.filter((item) => {
        return (
            (searchkey ? item.title.toLowerCase().includes(searchkey.toLowerCase()) : true) &&
            (filterType ? item.category.toLowerCase() === filterType.toLowerCase() : true) &&
            (filterBrandName ? item.brandName.toLowerCase() === filterBrandName.toLowerCase() : true) &&
            (filterPrice ? item.price.toString().includes(filterPrice.toString()) : true)
        );
    });

    // Calculate total pages based on the number of products per page
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

    // Calculate current products to display based on current page
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    // Handle next page click
    const nextPage = () => {
        setCurrentPage((prev) => prev + 1);
    };

    // Handle previous page click
    const prevPage = () => {
        setCurrentPage((prev) => prev - 1);
    };

    return (
        <section className="text-gray-600 body-font">
            <div className="container px-5 py-8 md:py-16 mx-auto">
                <div className="lg:w-1/2 w-full mb-6 lg:mb-10">
                    <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900" style={{ color: mode === 'dark' ? 'white' : '' }}>Our Latest Collection</h1>
                    <div className="h-1 w-20 bg-pink-600 rounded"></div>
                </div>
                <div className="flex flex-wrap -m-4">
                    {currentProducts.map((item, index) => {
                        const { title, price, salePrice, brandName, imageUrl, id, stockStatus } = item;
                        return (
                            <div key={index} className="p-4 md:w-1/4 drop-shadow-lg">
                                <div className="h-full border-2 hover:shadow-gray-100 hover:shadow-2xl transition-shadow duration-300 ease-in-out border-gray-200 border-opacity-60 rounded-2xl overflow-hidden"
                                    style={{
                                        backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '#acaef5',
                                        color: mode === 'dark' ? 'white' : '',
                                    }}
                                >
                                    <div onClick={() => window.location.href = `/productinfo/${id}`} className="flex justify-center cursor-pointer">
                                        <img className="w-full h-80 hover:scale-110 transition-scale-110 duration-300 ease-in-out" src={imageUrl} alt="Product" />
                                    </div>
                                    <div className="p-5 border-t-2">
                                        <h2 className="tracking-widest text-xs title-font font-medium text-white-400 mb-1" style={{ color: mode === 'dark' ? 'white' : '#ffffff' }}>{brandName}</h2>
                                        <h1 className="title-font text-lg font-medium text-gray-900 mb-3" style={{ color: mode === 'dark' ? 'white' : '#ffffff' }}>
                                            {title.length > 25 ? `${title.slice(0, 25)}...` : title}
                                        </h1>
                                        <p className="leading-relaxed mb-3" style={{ color: mode === 'dark' ? 'white' : '#ffffff' }}>
                                            {salePrice ? (
                                                <>
                                                    <span className="line-through font-sm text-white">₹{price}</span>
                                                    <span className="text-white ml-2">₹{salePrice}</span>
                                                </>
                                            ) : (
                                                `₹${price}`
                                            )}
                                        </p>
                                        {stockStatus && (
                                            <span
                                                className={`ml-4 font-semibold ${stockStatus === 'Out of Stock' ? 'text-red-500' : 'text-green-500'}`}
                                                style={{
                                                    fontSize: '1.25rem',
                                                    position: 'relative',  // Allows for relative positioning adjustments
                                                    top: '-10px',          // Moves the text upwards
                                                    left: '-12px'          // Moves the text to the left
                                                }}
                                            >
                                                {stockStatus}
                                            </span>
                                        )}


                                        <button type="button"
                                            onClick={() => addCart(item)}
                                            className="focus:outline-none text-black bg-white hover:bg-gray-200 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm w-full py-2">
                                            Add To Cart
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                    {currentProducts.length === 0 && (
                        <div className="col-span-4 text-center text-gray-500">
                            No products found.
                        </div>
                    )}
                </div>
                {totalPages > 1 && (
                    <div className="flex justify-center mt-4">
                        {currentPage > 1 && (
                            <button
                                onClick={prevPage}
                                className="mx-1 py-1 px-3 focus:outline-none bg-gray-200 text-gray-600 rounded-lg"
                            >
                                Previous
                            </button>
                        )}
                        {currentPage < totalPages && (
                            <button
                                onClick={nextPage}
                                className="mx-1 py-1 px-3 focus:outline-none bg-gray-200 text-gray-600 rounded-lg"
                            >
                                Next
                            </button>
                        )}
                    </div>
                )}
            </div>
        </section>
    );
}

export default ProductCard;
