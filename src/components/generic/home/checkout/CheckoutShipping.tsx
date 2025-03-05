import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Typography, Radio, Button } from "antd";

const { Title } = Typography;

const CheckoutShipping: React.FC = () => {
    const [paymentMethod, setPaymentMethod] = useState("cod");
    const navigate = useNavigate();
    const successUrl = "http://localhost:3000/payment-success";
    const qrCodeUrl = `https://quickchart.io/qr?text=${encodeURIComponent(successUrl)}&size=200`;

    return (
        <div>
            <Title level={3}>Phương thức thanh toán</Title>
            <div className="mt-4">
                <Card className="p-4 mt-6 w-full">
                    <Radio.Group 
                        onChange={(e) => setPaymentMethod(e.target.value)} 
                        value={paymentMethod}
                        className="w-full"
                    >
                        <div className="pb-4">
                            <Radio value="cod">Thanh toán khi giao hàng (COD)</Radio>
                        </div>

                
                        <div className="border-t border-gray-300 w-full my-4"></div>

                        <div className="pt-4">
                            <Radio value="vnpay">Thanh toán online qua VNPay</Radio>
                        </div>
                    </Radio.Group>
                </Card>

              
                {paymentMethod === "vnpay" && (
                    <div className="mt-6 flex flex-col items-center">
                        <Title level={4}>Quét mã QR để thanh toán</Title>
                        <img src={qrCodeUrl} alt="QR Code" className="w-40 h-40 mt-4" />
                        <p className="text-gray-500 text-sm mt-2">
                            Sau khi quét, bạn sẽ được chuyển đến trang xác nhận thanh toán.
                        </p>

                     
                        <Button 
                            type="primary" 
                            className="mt-4 bg-blue-600 hover:bg-blue-700"
                            onClick={() => navigate("/payment-success")}
                        >
                            Tôi đã thanh toán
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CheckoutShipping;
