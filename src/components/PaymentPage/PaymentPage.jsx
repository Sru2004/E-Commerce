import './PaymentPage.css';
import { useNavigate } from 'react-router-dom';

function PaymentPage(){

    const navigate = useNavigate();

    return(
        <div className='payment-page-main-div'>
            Order Placed Successfully !!
            <button onClick={()=>navigate('/')} className='shop-more-btn'>Shop More</button>
        </div>
    )
}

export default PaymentPage;