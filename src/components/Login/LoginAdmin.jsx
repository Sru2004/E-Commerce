import { useRef, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import { Context } from "../../Context";
import "../Register/Register.css";
import axios from "axios";

function LoginAdmin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const mainDiv = useRef();

    const navigate = useNavigate();
    const { setLoginInfo } = useContext(Context);
    const [loginStatus, setLoginStatus] = useState("");

    // Handle Admin Login
    // async function handleSubmit() {
    //     setLoading(true);

    //     // Check for empty fields
    //     if (email.trim() === "" || password.trim() === "") {
    //         setLoginStatus("Please fill in all the fields.");
    //         setLoading(false);
    //         return;
    //     }

    //     // Admin credentials check
    //     if (email === "admin@gmail.com" && password === "@123") {
    //         setLoginInfo({ status: true, email, name: "Admin", role: "Admin" });
    //         setLoginStatus(""); // Clear previous messages
    //         navigate("/home");
    //     } else {
    //         setLoginStatus("Invalid Admin Credentials");
    //     }

    //     setLoading(false);
    // }

    async function handleSubmit(){
        setLoading(true);
        if(email==='' || password===''){
            setLoginStatus("Please Fill All the Fields");
        }
        else{
            await axios.post(process.env.REACT_APP_BASE_URL+"/auth/login", {email, password, role: "Admin"}).then(response => {
                setLoginStatus(response?.data?.message);
                setLoginInfo({status: true, email: email, name: response?.data?.name, role: "Admin"});
                navigate('/')
            })
            .catch(error => {
                setLoginStatus(error?.response?.data?.message);
            });
        }
        setLoading(false);
    }

    return (
        <div
            onKeyDown={(e) => {
                if (e.key === "Enter") {
                    handleSubmit();
                }
            }}
            ref={mainDiv}
            className="register-page-outer-main-div"
        >
            {loading ? (
                <LoadingScreen />
            ) : (
                <div className="register-main-div">
                    <h2>Admin Login</h2>
                    <div className="main-field-div">
                        <div className="field-contain-div">
                            <label htmlFor="custEmail">Email: </label>
                            <input
                                autoFocus
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                type="email"
                                name="custEmail"
                                id="custEmail"
                                placeholder="Enter admin email"
                            />
                        </div>
                        <div className="field-contain-div">
                            <label htmlFor="custCreatePass">Password: </label>
                            <input
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                                type="password"
                                name="custCreatePass"
                                id="custCreatePass"
                                placeholder="Enter password"
                            />
                        </div>
                    </div>
                    <div className="continue-btn-main-div">
                        <div className="login-status-div">{loginStatus}</div>
                        <button onClick={handleSubmit} className="sign-up-btn">
                            Login
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default LoginAdmin;
