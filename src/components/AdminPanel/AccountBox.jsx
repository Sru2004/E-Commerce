import './AdminPanel.css';

function AccountBox({icon, text}) {
    return (
        <div className="view-account-box">
            <div className="view-account-box-icon">{icon}</div>
            <div className="view-account-box-text">{text}</div>
        </div>
    )
}

export default AccountBox;