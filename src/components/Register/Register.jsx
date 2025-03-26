import { Link, useNavigate } from "react-router-dom";
import "./Register.css";
import { useRef, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import axios from "axios";

function Register(){

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [createPass, setCreatePass] = useState("");
    const [confirmPass, setConfirmPass] = useState("");

    const [messageInfo, setMessageInfo] = useState(undefined);

    const [loading, setLoading] = useState(false);
    const mainDiv = useRef();

    const navigate = useNavigate();

    async function handleSubmit(){
        setLoading(true);
        if(name==='' || email==='' || mobile==='' || createPass==='' || confirmPass===''){
            setMessageInfo('Please Fill All the Fields');
        }
        else if(confirmPass!==createPass){
            setMessageInfo('Password Must be Same');
        }
        else if (!email.includes("@")) {
            setMessageInfo('Invalid Email');
        }
        else if (!email.includes(".com")) {
            setMessageInfo('Invalid Email');
        }
        else{
            await axios.post(process.env.REACT_APP_BASE_URL+"/auth/register", {name, mobile, email, password: createPass, confirmPassword: confirmPass, role: 'User'}).then(response => {
                setMessageInfo(response?.data?.message);
            })
            .catch(error => {
                setMessageInfo(error?.response?.data?.message);
            });
        }
        setLoading(false);
    }

    return (
        <div onKeyDown={(e)=>{
            if(e.keyCode===13){
                handleSubmit();
            };
        }} ref={mainDiv} className="register-page-outer-main-div">
            {
                loading ? <LoadingScreen/>
                 :
                <>
                    <div className="register-main-div">
                        <div className="auth-option-block">
                            <Link to='/register' className="auth-links register-nav-link">Sign Up</Link>
                            <Link to='/login' className="auth-links">Login</Link>
                        </div>
                        <div className="main-field-div">
                            <div className="field-contain-div">
                                <label htmlFor="custName">Name: </label>
                                <input autoFocus onChange={(e)=>setName(e.target.value)} value={name} type="text" name="custName" id="custName" />
                            </div>
                            <div className="field-contain-div">
                                <label htmlFor="custEmail">Email: </label>
                                <input onChange={(e)=>setEmail(e.target.value)} value={email} type="email" name="custEmail" id="custEmail" />
                            </div>
                            <div className="field-contain-div">
                                <label htmlFor="custMobileNo">Mobile Number: </label>
                                <input onChange={(e)=>setMobile(e.target.value)} value={mobile} type="number" name="custMobileNo" id="custMobileNo" />
                            </div>
                            <div className="field-contain-div">
                                <label htmlFor="custCreatePass">Create Password: </label>
                                <input onChange={(e)=>setCreatePass(e.target.value)} value={createPass} type="password" name="custCreatePass" id="custCreatePass" />
                            </div>
                            <div className="field-contain-div">
                                <label htmlFor="custConfirmPass">Confirm Password: </label>
                                <input onChange={(e)=>setConfirmPass(e.target.value)} value={confirmPass} type="password" name="custConfirmPass" id="custConfirmPass" />
                            </div>
                        </div>
                        <div className="continue-btn-main-div">
                            <div className="login-status-div">{messageInfo}</div>
                            <button onClick={handleSubmit} className="sign-up-btn">Sign Up</button>
                            <div className="already-account-div">
                                Already have an Account? <Link to='/login'>Login</Link>
                                <ToastContainer />
                            </div>
                        </div>
                    </div>
                </>
            }
        </div>
    )
}

export default Register;