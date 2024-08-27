import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import myContext from '../../context/data/myContext';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../fireabase/FirebaseConfig';
import { toast } from 'react-toastify';
import Loader from '../../components/loader/Loader';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const backgroundImageUrl = 'https://img.freepik.com/free-photo/front-view-education-day-concept_23-2148779756.jpg?t=st=1720747555~exp=1720751155~hmac=5ebc2c1401c43ad29eb2b5a3e5f6615f7e057bf67b867eb80435b333aae35d80&w=740';

function Login() {
    const context = useContext(myContext);
    const { loading, setLoading } = context;

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [showResetForm, setShowResetForm] = useState(false);
    const [resetEmail, setResetEmail] = useState('');

    const navigate = useNavigate();

    const login = async () => {
        setLoading(true);
        try {
            const result = await signInWithEmailAndPassword(auth, email, password);
            toast.success("Login successful", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            localStorage.setItem('user', JSON.stringify(result));
            navigate('/');
            setLoading(false);
        } catch (error) {
            setError("Invalid username or password");
            setLoading(false);
        }
    };

    const handleClose = () => {
        navigate('/');
    };

    const handlePasswordReset = async () => {
        setLoading(true);
        try {
            await sendPasswordResetEmail(auth, resetEmail);
            toast.success("Password reset email sent", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            setResetEmail('');
            setShowResetForm(false);
            setLoading(false);
        } catch (error) {
            setError("Error sending password reset email");
            setLoading(false);
        }
    };

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
                    <h1 className='text-center text-white text-xl mb-4 font-bold'>Login</h1>
                </div>
                {error && <div className="text-red-500 text-center mb-4">{error}</div>}
                {!showResetForm ? (
                    <>
                        <div>
                            <input type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                name='email'
                                className='bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                                placeholder='Email'
                            />
                        </div>
                        <div className='relative'>
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className='bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
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
                                onClick={login}
                                className='bg-yellow-500 w-full text-black font-bold px-2 py-2 rounded-lg'>
                                Login
                            </button>
                        </div>
                        <div className='mb-3'>
                            <button
                                onClick={() => setShowResetForm(true)}
                                className='text-yellow-500 hover:underline'>
                                Forgot Password?
                            </button>
                        </div>
                        <div>
                            <h2 className='text-white'>Don't have an account <Link className='text-yellow-500 font-bold' to={'/signup'}>Signup</Link></h2>
                        </div>
                    </>
                ) : (
                    <div>
                        <input
                            type="email"
                            value={resetEmail}
                            onChange={(e) => setResetEmail(e.target.value)}
                            className='bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                            placeholder='Enter your email'
                        />
                        <div className='flex justify-center mb-3'>
                            <button
                                onClick={handlePasswordReset}
                                className='bg-yellow-500 w-full text-black font-bold px-2 py-2 rounded-lg'>
                                Reset Password
                            </button>
                        </div>
                        <div className='mb-3'>
                            <button
                                onClick={() => setShowResetForm(false)}
                                className='text-yellow-500 hover:underline'>
                                Back to Login
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Login;
