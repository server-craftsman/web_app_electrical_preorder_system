import { Link } from 'react-router-dom';  
import COVER_IMAGE from '../../assets/imageuilogin.jpg';
import LOGO from '../../assets/Elecee_logo.jpg';
import { Button} from "antd";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { CLIENT_ID } from '../../const/authentication';
import GoogleModal from '../../components/google/google.model'; 

const colors = {
    primary: "#060606",
    background: "#f5f5f5",
    disabled: "#090909"
};

const Login = () => {
    const onLoginSuccess = (token: string, googleId: string) => {
        console.log("Login successful", token, googleId);
    };

    const onLoginError = (error: string) => {
        console.error("Login error", error);
    };

    return (
        <div className="flex items-center justify-center w-full h-screen bg-gradient-to-r from-[#cf4851] to-white-600 relative">
            <div className="flex w-full max-w-[1200px] shadow-2xl">
                <div className="hidden md:flex w-1/2 shadow-2xl">
                    <Link to="/"> {/* Wrap img with Link to navigate to the home page */}
                        <img
                            src={COVER_IMAGE}
                            alt="Description of image"
                            className="w-full h-full object-cover shadow-xl rounded-l-lg "
                        />
                    </Link>
                </div>

                <div className='w-full max-w-[600px] flex flex-col p-10 bg-white rounded-r-lg shadow-2xl max-h-[600px] overflow-y-auto'>
                    <h1 className="text-3xl text-black font-semibold mb-4 flex items-center">
                        <img src={LOGO} alt="Logo" className="h-9 mr-3" />
                        Elecee
                    </h1>

                    <div >
                        <div className="w-full flex flex-col">
                            <div className="w-full flex flex-col mb-4">
                                <h3 className="text-xl font-semibold mb-2">Xin Chào!!!</h3>
                                <p className="text-base mb-2">Đăng nhập tài khoản của bạn</p>
                            </div>

                            <div className='w-full flex flex-col'>
                                <input
                                    type="email"
                                    placeholder='Email'
                                    className='w-full text-black my-2 bg-transparent border-b border-black outline-none focus:outline-none focus:border-blue-500' />

                                <input
                                    type="password"
                                    placeholder='Password'
                                    className='w-full text-black my-2 bg-transparent border-b border-black outline-none focus:outline-none focus:border-blue-500' />
                            </div>

                            <div className="w-full flex items-center justify-between">
                                <div className='w-full items-center flex '>
                                    <input type="checkbox" className="w-4 h-4 mr-2" />
                                    <p className='text-sm'> Ghi nhớ mật khẩu</p>
                                </div>

                                <p className="text-sm font-medium whitespace-nowrap cursor-pointer underline underline-offset-2 mt-3">Quên mật khẩu</p>
                            </div>

                            <div className="w-full flex flex-col my-4">
                                <Button
                                    type="primary"
                                    className="w-full my-2 font-semibold bg-[#cc262e]"
                                    htmlType="submit"
                                >
                                    Login
                                </Button>
                            </div>

                            <div className="w-full flex items-center justify-center relative py-3">
                                <div className="w-full h-[1px] bg-black/40"></div>
                                <p className="text-lg absolute text-black/80 bg-white">Hoặc</p>
                            </div>
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

                    <div className="w-full flex items-center justify-center mt-20 ">
                        <p className="text-sm font-normal text-black">
                            Bạn đã có tài khoản?
                            <span className="font-semibold underline underline-offset-2 cursor-pointer">
                            Đăng kí
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
