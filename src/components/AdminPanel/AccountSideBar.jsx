import { useContext, useEffect, useState } from "react";
import "./AdminPanel.css";
import { Link} from "react-router-dom";
import axios from "axios";
import { Context } from "../../Context";


function AccountSideBar(){

    const [users, setUsers] = useState(undefined);
    const {loginInfo} = useContext(Context);

    async function accountInfo(){
        await axios.post(process.env.REACT_APP_BASE_URL+'/auth/info', {email: loginInfo?.email, role: loginInfo?.role}).then(res=>{
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
        <div className="view-account-left">
            <div className="left-account-div-main">
                <div className="user-account-img-main">
                    <div className="user-account-img">{users?.name?.charAt(0)}</div>
                </div>
                <div className="user-greeting-text"><Link className='user-greeting-text' to='/admin-panel'>{users?.name}</Link></div>
                <div className="account-info-btn view-account-page-btn"><Link to='/admin-panel/manage-users'>Manage Users</Link></div>
                <div className="edit-account-btn view-account-page-btn"><Link to='/admin-panel/view-orders'>View Orders</Link></div>
                <div className="view-orders-btn view-account-page-btn"><Link to={'/admin-panel/add-product'}>Add Products</Link></div>
                <div className="view-wishlist-btn view-account-page-btn"><Link to={'/admin-panel/manage-products'}>Manage Products</Link></div>
                <div className="account-sign-out-btn">Sign Out</div>
            </div>
        </div>
    )
}

export default AccountSideBar;