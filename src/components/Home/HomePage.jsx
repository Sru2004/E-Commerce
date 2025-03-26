import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function HomePage() {
    const navigate = useNavigate();

    useEffect(() => {
        // Navigate to '/' only once when the component mounts
        navigate('/');
    }, [navigate]); // Ensure `navigate` is included as a dependency

    return (
        <div>
            <p>Redirecting to the homepage...</p>
        </div>
    );
}

export default HomePage;
