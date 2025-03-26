import "./Advertisement.css";

// Delete
function Advertisement({text}){
    return(
        <div className="advertise-section">
            <div className="advertise-text">
                {text}
            </div>
        </div>
    )
}

export default Advertisement;