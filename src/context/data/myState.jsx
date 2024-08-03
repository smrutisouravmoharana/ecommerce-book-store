/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from 'react';
import MyContext from './myContext';
import { Timestamp, addDoc, collection, deleteDoc, doc, getDocs, onSnapshot, orderBy, query, setDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { fireDB } from '../../fireabase/FirebaseConfig';

function myState(props) {
    const [mode, setMode] = useState('light');
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState({
        title: '',
        price: '',
        imageUrl: '',
        category: '',
        description: '',
        stockStatus: '', // Add stockStatus field
        time: Timestamp.now(),
        date: new Date().toLocaleString("en-US", { month: "short", day: "2-digit", year: "numeric" })
    });
    const [product, setProduct] = useState([]);
    const [order, setOrder] = useState([]);
    const [user, setUser] = useState([]);
    const [searchkey, setSearchkey] = useState('');
    const [filterType, setFilterType] = useState('');
    const [filterBrandName, setFilterBrandName] = useState('');

    const toggleMode = () => {
        if (mode === 'light') {
            setMode('dark');
            document.body.style.backgroundColor = "rgb(17, 24, 39)";
        } else {
            setMode('light');
            document.body.style.backgroundColor = "white";
        }
    };

    const addProduct = async () => {
        if (!products.title || !products.price || !products.imageUrl || !products.category || !products.description || !products.stockStatus) {
            return toast.error("All fields are required");
        }

        setLoading(true);

        try {
            const productRef = collection(fireDB, 'products');
            await addDoc(productRef, products);
            toast.success("Product added successfully");
            setTimeout(() => {
                window.location.href = '/dashboard';
            }, 800);
            getProductData();
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    const getProductData = async () => {
        setLoading(true);

        try {
            const q = query(collection(fireDB, 'products'), orderBy('time'));
            const data = onSnapshot(q, (QuerySnapshot) => {
                let productArray = [];
                QuerySnapshot.forEach((doc) => {
                    productArray.push({ ...doc.data(), id: doc.id });
                });
                setProduct(productArray);
                setLoading(false);
            });

            return () => data;
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    useEffect(() => {
        getProductData();
    }, []);

    const edithandle = (item) => {
        setProducts(item);
    };

    const updateProduct = async () => {
        setLoading(true);
        try {
            await setDoc(doc(fireDB, 'products', products.id), products);
            toast.success("Product updated successfully");
            setTimeout(() => {
                window.location.href = '/dashboard';
            }, 800);
            getProductData();
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    const getUserData = async () => {
        setLoading(true);
        try {
            const result = await getDocs(collection(fireDB, "users"));
            const usersArray = [];
            result.forEach((doc) => {
                usersArray.push(doc.data());
            });
            setUser(usersArray);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    const deleteProduct = async (item) => {
        setLoading(true);
        try {
            await deleteDoc(doc(fireDB, 'products', item.id));
            toast.success('Product deleted successfully');
            getProductData();
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    const [orderitems, setOrderitems] = useState({
        title: '',
        image: '',
        price: '',
        date: '',
        quantity: '',
        category: '',
        brandName: '',
        grandtotal: '',
        email: '',
        uid: '',
        pincode: '',
        phone: '',
        address: '',
        orderStatus: 'Pending',
        time: Timestamp.now(),
        orderDate: new Date().toLocaleString("en-US", { month: "short", day: "2-digit", year: "numeric" }),
    });

    const addOrderItems = async (uid, totalAmount, cartItems) => {
        setLoading(true);
        try {
            const orderRef = collection(fireDB, 'order');
            for (const item of cartItems) {
                const orderItem = {
                    ...item,
                    uid,
                    grandtotal: totalAmount,
                    email: 'pustaksangrah540@gmail.com',
                    time: Timestamp.now(),
                    orderDate: new Date().toLocaleString("en-US", { month: "short", day: "2-digit", year: "numeric" })
                };
                await addDoc(orderRef, orderItem);
            }

            toast.success("Order added successfully");
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    const getOrderData = async () => {
        setLoading(true);
        try {
            const result = await getDocs(collection(fireDB, "order"));
            const ordersArray = [];
            result.forEach((doc) => {
                ordersArray.push({ ...doc.data(), id: doc.id });
            });
            setOrder(ordersArray);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    useEffect(() => {
        getOrderData();
        getUserData();
    }, []);

    // const updateOrderStatus = async (orderId, newStatus) => {
    //     setLoading(true);
    //     try {
    //         await setDoc(doc(fireDB, 'order', orderId), { orderStatus: newStatus }, { merge: true });
    //         toast.success("Order status updated successfully");
    //         getOrderData();
    //         setLoading(false);
    //     } catch (error) {
    //         console.log(error);
    //         setLoading(false);
    //     }
    // };

     // Add cancelOrder function
     const cancelOrder = async (orderId) => {
    setLoading(true);
    try {
        await setDoc(doc(fireDB, 'order', orderId), { status: 'Cancelled' }, { merge: true });
        toast.success("Order cancelled successfully");
        getOrderData();
        setLoading(false);
    } catch (error) {
        console.log(error);
        toast.error("Failed to cancel order");
        setLoading(false);
    }
};
const editOrder = (item) => {
    setOrder(prevOrders => prevOrders.map(o => o.id === item.id ? item : o));
};

const updateOrder = async (updatedOrder) => {
    setLoading(true);
    try {
        await setDoc(doc(fireDB, 'order', updatedOrder.id), updatedOrder);
        toast.success("Order updated successfully");
        getOrderData();
        setLoading(false);
    } catch (error) {
        console.log(error);
        setLoading(false);
    }
};

    return (
        <MyContext.Provider
            value={{
                products,
                setProducts,
                product,
                setProduct,
                addProduct,
                updateProduct,
                deleteProduct,
                edithandle,
                loading,
                setLoading,
                searchkey,
                setSearchkey,
                filterType,
                setFilterType,
                filterBrandName,
                setFilterBrandName,
                mode,
                setMode,
                toggleMode,
                user,
                setUser,
                order,
                setOrder,
                addOrderItems,
                orderitems,
                // updateOrderStatus,
                updateOrder,
                cancelOrder,  // Add cancelOrder to the provider
                editOrder
            }}
        >
            {props.children}
        </MyContext.Provider>
    );
}

export default myState;
