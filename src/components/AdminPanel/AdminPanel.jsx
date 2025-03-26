import AccountSideBar from "./AccountSideBar";
import "./AdminPanel.css";
import { Link } from "react-router-dom";
import {FaBoxOpen} from "react-icons/fa";
import AccountBox from "./AccountBox";
import {MdManageAccounts} from "react-icons/md";
import {AiOutlineFolderView} from "react-icons/ai";
import {MdOutlineProductionQuantityLimits} from "react-icons/md";

function AdminPanel(){  
    return(
        <div className="view-account-main-div">
            <AccountSideBar/>
            <div className="view-account-right">
                <div className="view-account-right-main-heading">Admin Panel</div>
                <div className="view-account-right-main-div">
                    <Link to='/admin-panel/manage-users'><AccountBox icon={<MdManageAccounts className="view-account-react-icon"/>} text="Manage Users"/></Link>
                    <Link to='/admin-panel/view-orders'><AccountBox icon={<AiOutlineFolderView className="view-account-react-icon"/>} text="View Orders"/></Link>
                    <Link to= '/admin-panel/add-product'><AccountBox icon={<FaBoxOpen className="view-account-react-icon"/>} text="Add Products"/></Link>
                    <Link to={'/admin-panel/manage-products'}><AccountBox icon={<MdOutlineProductionQuantityLimits className="view-account-react-icon"/>} text="Manage Products"/></Link>
                </div>
            </div>
        </div>
    )
}
export default AdminPanel;