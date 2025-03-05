import React from "react";
import CheckoutForm from "../../../components/generic/home/checkout/CheckoutForm";
import CheckoutShipping from "../../../components/generic/home/checkout/CheckoutShipping";
import CheckoutSummary from "../../../components/generic/home/checkout/CheckoutSummary";
import logo1 from '../../../assets/Elecee_logo.jpg';
import { Link } from "react-router-dom";

const CheckoutPage: React.FC = () => {
    return (
        <div className="checkout-page flex justify-center items-start gap-6 p-6">
            <div className="flex flex-col gap-6 w-2/3">
                {/* Logo */}
                <div className="flex flex-col">
                    <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
                        <img
                            src={logo1}
                            alt="Eureka Logo"
                            className="w-10 h-10 rounded-full object-cover shadow-sm"
                        />
                        <span className="text-2xl font-bold bg-gradient-to-r from-red-600 to-black text-transparent bg-clip-text tracking-tight">
                            Elecee
                        </span>
                    </Link>
                    <hr className="border-t border-gray-300 mt-6" />
                </div>
                <CheckoutForm />
                <div className="-mt-6">
                    <CheckoutShipping />
                </div>
            </div>
            <CheckoutSummary />
        </div>
    );
};

export default CheckoutPage;
