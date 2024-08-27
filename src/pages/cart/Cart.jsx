import React, { useContext, useEffect, useState } from 'react';
import myContext from '../../context/data/myContext';
import Layout from '../../components/layout/Layout';
import { useDispatch, useSelector } from 'react-redux';
import { deleteFromCart } from '../../redux/cartSlice';
import { toast } from 'react-toastify';
import { addDoc, collection } from 'firebase/firestore';
import { fireDB } from '../../fireabase/FirebaseConfig';

function Cart() {
  const context = useContext(myContext);
  const { mode } = context;

  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);

  // State variables
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalGST, setTotalGST] = useState(0);
  const [totalShipping, setTotalShipping] = useState(0);
  const [isOutOfStock, setIsOutOfStock] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [paymentMode, setPaymentMode] = useState('Online'); // Default payment mode

  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [pincode, setPincode] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  // Delete item from cart
  const deleteCart = (item) => {
    dispatch(deleteFromCart(item));
    toast.success('Deleted from cart');
  };

  // Update localStorage whenever cartItems change
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Calculate totals and check stock status
  useEffect(() => {
    let tempAmount = 0;
    let tempGST = 0;
    let tempShipping = 0;
    let outOfStock = false;

    cartItems.forEach((cartItem) => {
      const itemSalePrice = parseFloat(cartItem.salePrice);
      const itemGST = itemSalePrice * 0.18; // 18% GST
      tempAmount += itemSalePrice;
      tempGST += itemGST;
      tempShipping += parseFloat(cartItem.shipping || 0);

      if (cartItem.stockStatus === 'Out of Stock') {
        outOfStock = true;
      }
    });

    setTotalAmount(tempAmount);
    setTotalGST(tempGST);
    setTotalShipping(tempShipping);
    setIsOutOfStock(outOfStock);
  }, [cartItems]);

  const grandTotal = totalAmount + totalGST + totalShipping;

  // Handle Buy Now click
  const handleBuyNowClick = () => {
    if (isOutOfStock) {
      toast.error('Some items are out of stock. Please remove them before proceeding.');
      return;
    }
    setShowForm(true); // Show the form
  };

  // Handle order placement
  const handleOrderPlacement = async () => {
    if (name === '' || address === '' || pincode === '' || phoneNumber === '') {
      toast.error('All fields are required');
      return;
    }

    const addressInfo = {
      name,
      address,
      pincode,
      phoneNumber,
      date: new Date().toLocaleString('en-US', {
        month: 'short',
        day: '2-digit',
        year: 'numeric',
      }),
    };

    const orderInfo = {
      cartItems,
      addressInfo,
      date: new Date().toLocaleString('en-US', {
        month: 'short',
        day: '2-digit',
        year: 'numeric',
      }),
      email: JSON.parse(localStorage.getItem('user'))?.user?.email || 'guest@example.com',
      userid: JSON.parse(localStorage.getItem('user'))?.user?.uid || 'guest',
      status: 'Pending',
      grandTotal: grandTotal.toFixed(2),
    };

    if (paymentMode === 'Online') {
      var options = {
        key: 'rzp_live_Lm9vQ2vcmembdx', // Replace with your Razorpay key
        amount: parseInt(grandTotal * 100), // Convert to paisa
        currency: 'INR',
        name: 'E-Bharat',
        description: 'Order Payment',
        handler: async function (response) {
          orderInfo.paymentId = response.razorpay_payment_id;
          try {
            const orderRef = collection(fireDB, 'order');
            await addDoc(orderRef, orderInfo);
    
            // Clear the cart after successful payment
            cartItems.forEach((item) => {
              dispatch(deleteFromCart(item));
            });
            toast.success('Order placed successfully');
          } catch (error) {
            console.error(error);
            toast.error('Failed to save order');
          } finally {
            setShowForm(false); // Ensure the form is closed after payment, regardless of success or failure
            // Reset form fields
            setName('');
            setAddress('');
            setPincode('');
            setPhoneNumber('');
          }
        },
        prefill: {
          name: addressInfo.name,
          email: orderInfo.email,
          contact: addressInfo.phoneNumber,
        },
        theme: {
          color: '#3399cc',
        },
      };
    
      var rzp = new window.Razorpay(options);
      rzp.on('payment.failed', function (response) {
        console.error(response.error); // Log the error for debugging
        toast.error('Payment failed. Please try again.');
      });
      rzp.open();
    } else if (paymentMode === 'Cash on Delivery') {
      orderInfo.paymentId = 'COD';
      try {
        const orderRef = collection(fireDB, 'order');
        await addDoc(orderRef, orderInfo);

        // Clear the cart after successful order placement
        cartItems.forEach((item) => {
          dispatch(deleteFromCart(item));      
        });
        toast.success('Order placed successfully');
        setShowForm(false); // Hide form after successful order placement
        // Reset form fields
        setName('');
        setAddress('');
        setPincode('');
        setPhoneNumber('');
      } catch (error) {
        console.error(error);
        toast.error('Failed to save order');
      }
    }
  };

  return (
    <Layout>
      <div
        className="min-h-screen bg-gray-100 pt-5 pb-10"
        style={{
          backgroundColor: mode === 'dark' ? '#282c34' : '',
          color: mode === 'dark' ? 'white' : '',
        }}
      >
        <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
        <div className="mx-auto max-w-5xl px-6 md:flex md:space-x-6 xl:px-0">
          {/* Cart Items */}
          <div className="rounded-lg md:w-2/3">
            {cartItems.length === 0 ? (
              <p className="text-center">Your cart is empty.</p>
            ) : (
              cartItems.map((item, index) => {
                const { title, salePrice, description, imageUrl, stockStatus } = item;

                return (
                  <div
                    className="justify-between mb-6 rounded-lg border drop-shadow-xl bg-white p-6 sm:flex sm:justify-start"
                    key={index}
                    style={{
                      backgroundColor: mode === 'dark' ? 'rgb(32 33 34)' : '',
                      color: mode === 'dark' ? 'white' : '',
                    }}
                  >
                    <img
                      src={imageUrl}
                      alt="product-image"
                      className="w-full rounded-lg sm:w-40"
                    />
                    <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                      <div className="mt-5 sm:mt-0">
                        <h2
                          className="text-lg font-bold text-gray-900"
                          style={{ color: mode === 'dark' ? 'white' : '' }}
                        >
                          {title}
                        </h2>
                        <p
                          className="mt-1 text-xs text-gray-700"
                          style={{ color: mode === 'dark' ? 'white' : '' }}
                        >
                          {description}
                        </p>
                        <p
                          className="mt-1 text-sm font-semibold text-gray-700"
                          style={{ color: mode === 'dark' ? 'white' : '' }}
                        >
                          ₹{parseFloat(salePrice).toFixed(2)}
                        </p>
                        {stockStatus === 'Out of Stock' && (
                          <p className="text-red-500 font-bold mt-2">Out of Stock</p>
                        )}
                      </div>
                      <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                        <button
                          onClick={() => deleteCart(item)}
                          className="text-black-500 hover:text-black-700"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Order Summary */}
          <div
            className="mt-6 rounded-lg border drop-shadow-xl bg-white p-6 md:w-1/3"
            style={{
              backgroundColor: mode === 'dark' ? 'rgb(32 33 34)' : '',
              color: mode === 'dark' ? 'white' : '',
            }}
          >
            <h2 className="text-lg font-bold mb-4">Order Summary</h2>
            <div className="flex justify-between text-gray-700">
              <span>Subtotal</span>
              <span>₹{totalAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-700 mt-2">
              <span>GST (18%)</span>
              <span>₹{totalGST.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-700 mt-2">
              <span>Shipping</span>
              <span>₹{totalShipping.toFixed(2)}</span>
            </div>
            <hr className="my-4" />
            <div className="flex justify-between font-bold">
              <span>Total</span>
              <span>₹{grandTotal.toFixed(2)}</span>
            </div>
            <button
              onClick={handleBuyNowClick}
              className="mt-6 w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
              disabled={cartItems.length === 0}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>

        {/* Checkout Form Modal */}
        {showForm && (
          <div className="fixed inset-0 z-10 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div
              className="bg-white p-6 rounded-lg shadow-lg"
              style={{
                maxWidth: '500px',
                width: '100%',
                backgroundColor: mode === 'dark' ? 'rgb(32 33 34)' : '',
                color: mode === 'dark' ? 'white' : '',
              }}
            >
              <h2 className="text-xl font-bold mb-4 text-center">Checkout Details</h2>
              <div className="mb-4">
                <label className="block mb-2">Name</label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="w-full p-2 border border-gray-300 rounded-md text-black"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Address</label>
                <textarea
                  placeholder="Enter your address"
                  className="w-full p-2 border border-gray-300 rounded-md text-black"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  rows={3}
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Pincode</label>
                <input
                  type="text"
                  placeholder="Enter your pincode"
                  className="w-full p-2 border border-gray-300 rounded-md text-black"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Phone Number</label>
                <input
                  type="text"
                  placeholder="Enter your phone number"
                  className="w-full p-2 border border-gray-300 rounded-md text-black"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
              <div className="mb-6">
                <label className="block mb-2">Payment Method</label>
                <select
                  className="w-full p-2 border border-gray-300 rounded-md text-black"
                  value={paymentMode}
                  onChange={(e) => setPaymentMode(e.target.value)}
                >
                  <option value="Online">Online Payment</option>
                  <option value="Cash on Delivery">Cash on Delivery</option>
                </select>
              </div>
              <div className="flex justify-between">
                <button
                  onClick={handleOrderPlacement}
                  className="w-full py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-300 mr-2"
                >
                  Place Order
                </button>
                <button
                  onClick={() => setShowForm(false)}
                  className="w-full py-2 px-4 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-300 ml-2"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default Cart;
