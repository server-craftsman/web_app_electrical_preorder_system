import { Link } from 'react-router-dom';
import { useState } from 'react';
import LOGO from '../../assets/Elecee_logo.jpg';
import { GoogleOAuthProvider } from "@react-oauth/google";
import { CLIENT_ID } from '../../const/authentication';
import GoogleModal from '../../components/google/google.model'; 
import Lottie from 'lottie-react';
import orderAnimation from '../../assets/orderanimation.json';
import { ROUTER_URL } from '../../const/router.path';
import { Divider } from 'antd';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const onLoginSuccess = (token: string, googleId: string) => {
        console.log("Login successful", token, googleId);
    };

    const onLoginError = (error: string) => {
        console.error("Login error", error);
    };

    return (
        <div className="flex items-center justify-center w-full h-screen bg-white relative">
            <div className="flex w-full max-w-[1200px] shadow-2xl">
                <div className="hidden md:flex w-1/2 shadow-2xl">
                    <Link to="/">
                        <Lottie animationData={orderAnimation} loop={true} className="h-[600px] w-[600px] animate-pulse opacity-95 drop-shadow-2xl filter transition-all duration-500 hover:scale-110" />
                    </Link>
                </div>

                <div className='w-full max-w-[600px] flex flex-col p-10 bg-white rounded-r-lg shadow-2xl max-h-[600px] overflow-y-auto'>
                    <h1 className="text-3xl text-black font-semibold mb-4 flex items-center">
                        <img src={LOGO} alt="Logo" className="h-9 mr-3 rounded-full" />
                        Elecee
                    </h1>

                    <div>
                        <div className="w-full flex flex-col">
                            <div className="w-full flex flex-col mb-4">
                                <h3 className="text-xl font-semibold mb-2">Xin Chào!!!</h3>
                                <p className="text-base mb-2">Đăng nhập tài khoản của bạn</p>
                            </div>

                            <div className='w-full flex flex-col'>                             
                                <div className="relative">
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder=" "
                                        className="w-full px-4 py-3 text-black border-2 border-gray-200 rounded-lg mb-5 outline-none transition-all duration-200 focus:border-red-500 peer"
                                    />
                                    <label className="absolute left-4 top-3 text-gray-500 transition-all duration-200 -translate-y-7 peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-7 peer-focus:text-red-500 text-sm bg-white px-2">
                                        Email
                                    </label>
                                </div>
                              
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder=" "
                                        className="w-full px-4 py-3 text-black border-2 border-gray-200 rounded-lg outline-none transition-all duration-200 focus:border-red-500 peer"
                                    />
                                    <label className="absolute left-4 top-3 text-gray-500 transition-all duration-200 -translate-y-7 peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-7 peer-focus:text-red-500 text-sm bg-white px-2">
                                        Mật khẩu
                                    </label>
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-3.5 text-gray-400 hover:text-gray-600"
                                    >
                                        {showPassword ? (
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                        ) : (
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                            </svg>
                                        )}
                                    </button>
                                </div>
                            </div>

                            <div className="w-full flex items-center justify-between mt-4">
                                <p className="text-sm font-medium text-red-600 hover:text-red-700 transition-colors cursor-pointer">
                                    Quên mật khẩu?
                                </p>
                            </div>

                            <div className="w-full flex flex-col my-4">
                                <button
                                    className="btn-custom"
                                    type="submit"
                                >
                                    Đăng nhập
                                </button>
                            </div>

                            <Divider plain className="text-gray-400">
                                Hoặc
                            </Divider>
                        </div>
                    </div>

                    <div className="flex-grow mt-6">
                        <GoogleOAuthProvider clientId={CLIENT_ID}>
                            <GoogleModal
                                onLoginSuccess={onLoginSuccess}
                                onLoginError={onLoginError}
                                context="login"
                            />
                        </GoogleOAuthProvider>
                    </div>

                    <div className="w-full flex items-center justify-center mt-6">
                        <p className="text-sm text-gray-600">
                            Bạn chưa có tài khoản?{' '}
                            <Link to={ROUTER_URL.REGISTER} className="text-red-600 hover:text-red-800 font-semibold">
                                Đăng ký ngay
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
