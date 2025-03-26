import "./AdminPanel.css";
import AccountSideBar from "./AccountSideBar";
import axios from "axios";
import { useState, useContext, useEffect } from "react";
import { Context } from "../../Context";

function ManageUser(){

    const [users, setUsers] = useState(undefined);
    const {loginInfo} = useContext(Context);

    async function accountInfo(){
        await axios.post(process.env.REACT_APP_BASE_URL+'/auth/users', {email: loginInfo?.email, role: loginInfo?.role}).then(res=>{
            setUsers(res?.data?.data);
        }).catch(error=>{
            console.log(error?.response?.data?.message)
        })
    }

    useEffect(()=>{
        if(loginInfo?.status){
            accountInfo();
        }
    }, [loginInfo])

    return(
        loginInfo?.status ?
            <div className="view-account-main-div">
                <AccountSideBar/>
                <div className="view-account-right">
                    <div className="view-account-right-main-heading">Manage Users</div>
                    <div className="view-account-right-main-div">
                        <div className="account-info-main-div">
                            {
                                users?.map((user)=>(
                                    <div className="user-details-main-div1">
                                        <div className="account-info-text1"><b>Name: </b> {user?.name} </div>
                                        <div className="account-info-text1"><b>Email: </b> {user?.email} </div>
                                        <div className="account-info-text1"><b>Mobile No: </b> {user?.mobile} </div>
                                        <div className="account-info-text"><b>Address: </b> {
                                            // <Link to='/view-account/edit'><button>Add Address</button></Link> 
                                            <>
                                            <br />
                                            Address Line 1: {user?.address1} <br />
                                            Address Line 2: {user?.address2} <br />
                                            City: {user?.city} <br />
                                            State: {user?.state} <br />
                                            Pincode: {user?.pincode} <br />
                                            </>
                                        } </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        : <div className="not-login-error">Login to View this Page</div>
    )
}

export default ManageUser;