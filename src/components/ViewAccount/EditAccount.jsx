import "./ViewAccount.css";
import AccountSideBar from "./AccountSideBar";
import { useEffect, useState } from "react";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRef, useContext } from "react";
import { Context } from "../../Context";
import axios from "axios";

function EditAccount(){
    
    const {loginInfo} = useContext(Context);

    const [user, setUser] = useState("");
    const [loading, setLoading] = useState(false);
    const mainDiv = useRef();
    
    const [addressl1, setAddressL1] = useState("");
    const [addressl2, setAddressL2] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [pincode, setPincode] = useState("");

    async function handleUpdate(){
        mainDiv.current.style.height = "500px";
        setLoading(true);
        await axios.post(process.env.REACT_APP_BASE_URL+"/auth/update-info", {
            email: loginInfo.email, 
            role: loginInfo.role, 
            address1: addressl1,
            address2: addressl2,
            city,
            state,
            pincode
        }).then(res=>{
            toast.success(res?.data?.message, {
                position: "bottom-right"
            })
            setLoading(false);
        }).catch(error=>{
            toast.error(error?.response?.data?.message, {
                position: "bottom-right"
            })
            setLoading(false);
        })
    }

    async function accountInfo(){
        await axios.post(process.env.REACT_APP_BASE_URL+'/auth/info', {email: loginInfo?.email, role: loginInfo?.role}).then(res=>{
            setUser(res?.data.data);
        }).catch(error=>{
            console.log(error?.response?.data?.message)
        })
    }

    useEffect(()=>{
        if(loginInfo?.status){
            accountInfo();
        }
    }, [loginInfo])

    useEffect(()=>{
        setAddressL1(user.address1);
        setAddressL2(user.address2);
        setCity(user.city);
        setState(user.state);
        setPincode(user.pincode);
    }, [user])

    return(
        <div ref={mainDiv}>
            {
                loginInfo?.status ?
                    <>
                        {   
                            
                            loading ? <LoadingScreen/>
                            :    
                            <div className="view-account-main-div">
                                <AccountSideBar/>
                                <div className="view-account-right">
                                    <div className="view-account-right-main-heading">Edit Account</div>
                                    <div className="view-account-right-main-div">
                                        <div className="account-info-main-div">
                                            <div className="account-info-text"><b>Address Line 1: </b><input onChange={(e)=>setAddressL1(e.target.value)} type="text" value={addressl1} /></div>
                                            <div className="account-info-text"><b>Address Line 2: </b><input onChange={(e)=>setAddressL2(e.target.value)} type="text" value={addressl2} /></div>
                                            <div className="account-info-text"><b>City: </b><input onChange={(e)=>setCity(e.target.value)} type="text" value={city} /></div>
                                            <div className="account-info-text"><b>State: </b><input onChange={(e)=>setState(e.target.value)} type="text" value={state} /></div>
                                            <div className="account-info-text"><b>Pin Code: </b><input onChange={(e)=>setPincode(e.target.value)} type="number" value={pincode ? pincode : ""} /></div>
                                            <div className="account-info-text update-btn"><button onClick={handleUpdate}>Update</button></div>
                                        </div>
                                    </div>
                                </div>
                                <ToastContainer />
                            </div>
                        }
                    </>   
                : <div className="not-login-error">Login to View this Page</div>                   
            }
        </div>
    )
}

export default EditAccount;