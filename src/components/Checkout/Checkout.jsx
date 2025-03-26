import "./Checkout.css";
import OrderItem from "./OrderItem/OrderItem";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Context } from "../../Context";
import axios from "axios";

function Checkout() {
    const { loginInfo, cart = [], getCartDetailsFunc } = useContext(Context); // Default cart to an empty array
    const [user, setUser] = useState({});
    const [paymentMethod, setPaymentMethod] = useState(""); // To track selected payment method
    const [subTotal, setSubTotal] = useState(0);
    const [delivery, setDelivery] = useState(50);

    const navigate = useNavigate();

    // State for address fields
    const [name, setName] = useState("");
    const [add1, setAdd1] = useState("");
    const [add2, setAdd2] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [pinCode, setPinCode] = useState("");
    const [mobile, setMobile] = useState("");

    // Fetch user account information
    async function accountInfo() {
        try {
            const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/auth/info`, {
                email: loginInfo?.email,
                role: loginInfo?.role,
            });
            setUser(response?.data.data || {});
        } catch (error) {
            console.error(error?.response?.data?.message || "Error fetching account info");
        }
    }

    // Clear the cart after order confirmation
    async function emptyCartFunc() {
        try {
            await axios.post(`${process.env.REACT_APP_BASE_URL}/auth/empty-cart`, {
                email: loginInfo.email,
                role: loginInfo.role,
            });
            getCartDetailsFunc();
            navigate("/payment-success");
        } catch (error) {
            toast.error(error?.response?.data?.message || "Error clearing cart", {
                position: "bottom-right",
            });
        }
    }

    // Handle COD payment
    async function handleCODPayment() {
        if (!validateDeliveryDetails()) return;

        const order = {
            order: cart,
            total: subTotal + delivery,
            address: {
                name,
                address1: add1,
                address2: add2,
                city,
                state,
                pincode: pinCode,
                mobile,
            },
            email: loginInfo.email,
            accepted: false,
            delivered: false,
        };

        try {
            await axios.post(`${process.env.REACT_APP_BASE_URL}/order/create-order`, {
                ...order,
                role: loginInfo.role,
            });
            toast.success("Your Order is Confirmed! Thank you for shopping with us.", {
                position: "bottom-right",
            });
            emptyCartFunc();
        } catch (error) {
            toast.error(error?.response?.data?.message || "Error confirming order", {
                position: "bottom-right",
            });
        }
    }

    // Handle UPI payment
    function handleUPIPayment() {
        if (!validateDeliveryDetails()) return;

        const paymentWindow = window.open(
            "https://buy.stripe.com/test_7sIcPY2Wwerj5PyaEE",
            "Payment Window",
            "width=700,height=700"
        );

        if (!paymentWindow) {
            toast.error("Popup blocked! Please allow popups for this site.", {
                position: "bottom-right",
            });
            return;
        }

        // Check if the payment window is closed and then proceed to finalize the order
        const timer = setInterval(() => {
            if (paymentWindow.closed) {
                clearInterval(timer);
                finalizeUPIPayment();
            }
        }, 1000);
    }

    // Finalize UPI payment
    async function finalizeUPIPayment() {
        const order = {
            order: cart,
            total: subTotal + delivery,
            address: {
                name,
                address1: add1,
                address2: add2,
                city,
                state,
                pincode: pinCode,
                mobile,
            },
            email: loginInfo.email,
            accepted: false,
            delivered: false,
        };

        try {
            await axios.post(`${process.env.REACT_APP_BASE_URL}/order/create-order`, {
                ...order,
                role: loginInfo.role,
            });
            toast.success("Payment Successful! Your order is confirmed.", {
                position: "bottom-right",
            });
            emptyCartFunc();
        } catch (error) {
            toast.error(error?.response?.data?.message || "Error confirming order", {
                position: "bottom-right",
            });
        }
    }

    // Validate delivery details
    function validateDeliveryDetails() {
        if (!name || !add1 || !add2 || !city || !state || !pinCode || !mobile) {
            toast.error("Please fill in all delivery details.", {
                position: "bottom-right",
            });
            return false;
        }
        return true;
    }

    // Update user details from `user` state
    useEffect(() => {
        if (user) {
            setName(user.name || "");
            setAdd1(user.address1 || "");
            setAdd2(user.address2 || "");
            setCity(user.city || "");
            setState(user.state || "");
            setPinCode(user.pincode || "");
            setMobile(user.mobile || "");
        }
    }, [user]);

    // Calculate the subtotal based on cart items
    useEffect(() => {
        const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
        setSubTotal(total);
    }, [cart]);

    // Fetch account info on mount if logged in
    useEffect(() => {
        if (loginInfo?.status) {
            accountInfo();
        }
    }, [loginInfo]);

    return (
        <>
            {loginInfo?.status ? (
                <div className="checkout-page-main-div">
                    {/* Order Summary */}
                    <div className="checkout-sections">
                        <div className="checkout-section-heading">Order Summary:</div>
                        <div className="checkout-section-box">
                            {cart.map((product) => (
                                <OrderItem
                                    key={`${product.title}-${product.size}-${product.qty}`}
                                    img={product.img}
                                    title={product.title}
                                    price={product.price}
                                    size={product.size}
                                    quantity={product.qty}
                                />
                            ))}
                            <div className="checkout-section-subheading-group">
                                <div className="checkout-section-subheading">
                                    Sub Total: ₹{subTotal}/-
                                </div>
                                <div className="checkout-section-subheading">
                                    Delivery Charges: ₹{delivery}/-
                                </div>
                                <div className="checkout-section-subheading grand-total-text">
                                    Grand Total: <span>₹{subTotal + delivery}/-</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Delivery Address */}
                    <div className="checkout-sections">
                        <div className="checkout-section-heading">Delivery Address:</div>
                        <div className="add-address-page-main-div">
                            <div className="main1-field-div">
                                <div className="field-contain-div">
                                    <label>Name:</label>
                                    <input value={name} onChange={(e) => setName(e.target.value)} type="text" />
                                </div>
                                <div className="field-contain-div">
                                    <label>Address Line 1:</label>
                                    <input value={add1} onChange={(e) => setAdd1(e.target.value)} type="text" />
                                </div>
                                <div className="field-contain-div">
                                    <label>Address Line 2:</label>
                                    <input value={add2} onChange={(e) => setAdd2(e.target.value)} type="text" />
                                </div>
                                <div className="field-contain-div">
                                    <label>City:</label>
                                    <input value={city} onChange={(e) => setCity(e.target.value)} type="text" />
                                </div>
                                <div className="field-contain-div">
                                    <label>State:</label>
                                    <input value={state} onChange={(e) => setState(e.target.value)} type="text" />
                                </div>
                                <div className="field-contain-div">
                                    <label>Pin Code:</label>
                                    <input value={pinCode} onChange={(e) => setPinCode(e.target.value)} type="number" />
                                </div>
                                <div className="field-contain-div">
                                    <label>Mobile Number:</label>
                                    <input value={mobile} onChange={(e) => setMobile(e.target.value)} type="number" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Payment Options */}
                    <div className="checkout-sections select-payment-option">
                        <div className="checkout-section-heading">Payment Option:</div>
                        <div className="checkout-section-box select-payment-option-box">
                            <div className="payment-option-text">
                                <input
                                    type="radio"
                                    id="cod-payment"
                                    name="payment-method"
                                    value="cod"
                                    onChange={() => setPaymentMethod("cod")}
                                />
                                <label htmlFor="cod-payment">Cash on Delivery (COD)</label>
                            </div>
                            <div className="payment-option-text">
                                <input
                                    type="radio"
                                    id="upi-payment"
                                    name="payment-method"
                                    value="upi"
                                    onChange={() => setPaymentMethod("upi")}
                                />
                                <label htmlFor="upi-payment">UPI Payment</label>
                            </div>
                            <div className="checkout-btn-group">
                                <button
                                    onClick={() =>
                                        paymentMethod === "cod" ? handleCODPayment() : handleUPIPayment()
                                    }
                                    className="add-new-address-btn"
                                >
                                    Proceed
                                </button>
                            </div>
                        </div>
                    </div>
                    <ToastContainer />
                </div>
            ) : (
                <div className="not-login-error">Login to View this Page</div>
            )}
        </>
    );
}

export default Checkout;
