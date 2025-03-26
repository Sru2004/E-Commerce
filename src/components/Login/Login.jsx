import { useRef, useState, useContext } from "react";
import "../Register/Register.css";
import { Link, useNavigate } from "react-router-dom";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import axios from "axios";
import { Context } from "../../Context";

function Login(){
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const mainDiv = useRef();

    const navigate = useNavigate();

    const {setLoginInfo} = useContext(Context);

    const [loginStatus, setLoginStatus] = useState(undefined);

    async function handleSubmit(){
        setLoading(true);
        if(email==='' || password===''){
            setLoginStatus("Please Fill All the Fields");
        }
        else{
            await axios.post(process.env.REACT_APP_BASE_URL+"/auth/login", {email, password, role: "User"}).then(response => {
                setLoginStatus(response?.data?.message);
                setLoginInfo({status: true, email: email, name: response?.data?.name, role: "User"});
                navigate('/')
            })
            .catch(error => {
                setLoginStatus(error?.response?.data?.message);
            });
        }
        setLoading(false);
    }

    return (
        <>
        <div onKeyDown={(e)=>{
            if(e.keyCode===13){
                handleSubmit();
            };
        }} ref={mainDiv} className="register-page-outer-main-div">
            {
                loading ? 
                    <LoadingScreen/> 
                : 
                <>
                        <div className="register-main-div">
                            <div className="auth-option-block">
                                <Link to='/register' className="auth-links">Sign Up</Link>
                                <Link to='/login' className="auth-links login-nav-link">Login</Link>
                            </div>
                            <div className="main-field-div">
                                <div className="field-contain-div">
                                    <label htmlFor="custEmail">Email: </label>
                                    <input autoFocus onChange={(e) => setEmail(e.target.value)} value={email} type="email" name="custEmail" id="custEmail" />
                                </div>
                                <div className="field-contain-div">
                                    <label htmlFor="custCreatePass">Password: </label>
                                    <input onChange={(e)=>setPassword(e.target.value)} value={password} type="password" name="custCreatePass" id="custCreatePass" />
                                </div>
                            </div>
                            <div className="continue-btn-main-div">
                                <div className="login-status-div">{loginStatus}</div>
                                <button onClick={handleSubmit} className="sign-up-btn">Login</button>
                                <div className="already-account-div">
                                    Don't have an Account? <Link to='/register'>Sign Up</Link>
                                </div>
                            </div>
                        </div>
                </>
            }
        </div>
        </>
    )
}

export default Login;