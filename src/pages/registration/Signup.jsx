import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import myContext from '../../context/data/myContext';
import { toast } from 'react-toastify';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, fireDB } from '../../fireabase/FirebaseConfig';
import { Timestamp, addDoc, collection } from 'firebase/firestore';
import Loader from '../../components/loader/Loader';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

// Example background image URL (replace with your own)
const backgroundImageUrl = 'https://img.freepik.com/free-photo/various-books-with-spectacles-table_1252-713.jpg?t=st=1720747641~exp=1720751241~hmac=311c0ce54c910b72c698ac4b111519db12873315bbdfecbf55a2cd8f27ada62a&w=740';

function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const context = useContext(myContext);
    const { loading, setLoading } = context;
    const navigate = useNavigate();

    const signup = async () => {
        setLoading(true);
        if (name === "" || email === "" || password === "") {
            setLoading(false);
            return toast.error("All fields are required");
        }

        try {
            const users = await createUserWithEmailAndPassword(auth, email, password);

            const user = {
                name: name,
                uid: users.user.uid,
                email: users.user.email,
                time: Timestamp.now()
            };
            const userRef = collection(fireDB, "users");
            await addDoc(userRef, user);
            toast.success("Signup Successfully");
            setName("");
            setEmail("");
            setPassword("");
            setLoading(false);
            
        } catch (error) {
            setLoading(false);
            if (error.code === 'auth/email-already-in-use') {
                toast.error("Email is already in use");
            } else {
                toast.error("Signup failed. Please try again.");
                console.log(error);
            }
        }
    }

    const handleClose = () => {
        navigate("/");
    }

    return (
        <div className='flex justify-center items-center h-screen' style={{ backgroundImage: `url(${backgroundImageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            {loading && <Loader />}
            <div className='bg-gray-800 px-10 py-10 rounded-xl relative'>
                <button
                    onClick={handleClose}
                    className='absolute top-2 right-2 text-white cursor-pointer hover:text-gray-300'
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                <div className="">
                    <h1 className='text-center text-white text-xl mb-4 font-bold'>Signup</h1>
                </div>
                <div>
                    <input type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        name='name'
                        className='bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder-text-gray-200 outline-none'
                        placeholder='Name'
                    />
                </div>

                <div>
                    <input type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        name='email'
                        className='bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder-text-gray-200 outline-none'
                        placeholder='Email'
                    />
                </div>
                <div className='relative'>
                    <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className='bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder-text-gray-200 outline-none'
                        placeholder='Password'
                    />
                    <button
                        onClick={() => setShowPassword(!showPassword)}
                        className='absolute top-2 right-2 text-white cursor-pointer hover:text-gray-300'
                    >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                </div>
                <div className='flex justify-center mb-3'>
                    <button
                        onClick={signup}
                        className='bg-red-500 w-full text-white font-bold px-2 py-2 rounded-lg'>
                        Signup
                    </button>
                </div>
                <div>
                    <h2 className='text-white'>Have an account <Link className='text-red-500 font-bold' to={'/login'}>Login</Link></h2>
                </div>
            </div>
        </div>
    )
}

export default Signup;
