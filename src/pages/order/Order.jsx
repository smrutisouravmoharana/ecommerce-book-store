import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import myContext from '../../context/data/myContext';
import Layout from '../../components/layout/Layout';
import Loader from '../../components/loader/Loader';
import { collection, onSnapshot } from 'firebase/firestore';
import { fireDB } from '../../fireabase/FirebaseConfig';

function Order() {
  const user = JSON.parse(localStorage.getItem('user'));
  const userid = user ? user.user.uid : null;
  const email = user ? user.user.email : null;
  const context = useContext(myContext);
  const { mode, loading, setLoading, order, setOrder } = context;
  const navigate = useNavigate();

  useEffect(() => {
    if (!userid) {
      navigate('/login');
    } else if (email === "pustaksangrah540@gmail.com") {
      navigate('/dashboard');
    }
  }, [email, userid, navigate]);

  useEffect(() => {
    if (userid) {
      setLoading(true);
      const unsubscribe = onSnapshot(collection(fireDB, 'order'), (snapshot) => {
        const ordersArray = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
        setOrder(ordersArray);
        setLoading(false);
      });

      return () => unsubscribe();
    }
  }, [userid, setLoading, setOrder]);

  if (!userid) {
    return null;
  }

  const userOrders = order.filter(obj => obj.userid === userid);

  const handleCancelOrder = (orderId) => {
    console.log('Cancel Order Clicked', orderId);
    context.cancelOrder(orderId);
  };

  return (
    <Layout>
      {loading && <Loader />}
      {userOrders.length > 0 ? (
        <div className="h-full pt-10 overflow-x-auto">
          <table className={`min-w-full ${mode === 'dark' ? 'bg-black text-white' : 'bg-white text-black'} table-auto`}>
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">S.NO</th>
                <th className="py-2 px-4 border-b">Payment ID</th>
                <th className="py-2 px-4 border-b">Address</th>
                <th className="py-2 px-4 border-b">Pincode</th>
                <th className="py-2 px-4 border-b">Phone Number</th>
                <th className="py-2 px-4 border-b">Email</th>
                <th className="py-2 px-4 border-b">Date</th>
                <th className="py-2 px-4 border-b">Image</th>
                <th className="py-2 px-4 border-b">Title</th>
                <th className="py-2 px-4 border-b">Price</th>
                <th className="py-2 px-4 border-b">Grand Total</th>
                <th className="py-2 px-4 border-b">Status</th>
                <th className="py-2 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {userOrders.map((order, orderIndex) => (
                <React.Fragment key={orderIndex}>
                  {order.cartItems.map((item, itemIndex) => (
                    <tr key={`${orderIndex}-${itemIndex}`}>
                      <td className="py-2 px-4 border-b">{orderIndex + 1}</td>
                      <td className="py-2 px-4 border-b">{order.paymentId}</td>
                      <td className="py-2 px-4 border-b">{order.addressInfo.address}</td>
                      <td className="py-2 px-4 border-b">{order.addressInfo.pincode}</td>
                      <td className="py-2 px-4 border-b">{order.addressInfo.phoneNumber}</td>
                      <td className="py-2 px-4 border-b">{order.email}</td>
                      <td className="py-2 px-4 border-b">{order.addressInfo.date}</td>
                      <td className="py-2 px-4 border-b">
                        <img src={item.imageUrl} alt="product-image" className="w-20 h-20 object-cover" />
                      </td>
                      <td className="py-2 px-4 border-b">{item.title}</td>
                      <td className="py-2 px-4 border-b">₹{item.price}</td>
                      <td className="py-2 px-4 border-b">₹{order.grandTotal}</td>
                      <td className="py-2 px-4 border-b">{order.status}</td>
                      <td className="py-2 px-4 border-b">
                        {order.status !== 'Cancelled' && (
                          <button 
                            onClick={() => handleCancelOrder(order.id)} 
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                          >
                            Cancel Order
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>

          <div className="mt-8"></div>
        </div>
      ) : (
        <h2 className='text-center text-2xl text-white'>No Orders</h2>
      )}

      <footer className="mt-8">
        {/* Your footer content here */}
      </footer>
    </Layout>
  );
}

export default Order;
