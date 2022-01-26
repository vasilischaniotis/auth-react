import React, {useState} from 'react';
import {useAuth} from '../contexts/AuthContext';
import {useNavigate} from "react-router-dom";

function Home(props) {
    const [error, setError] = useState('');
    const {currentUser, logout} = useAuth();
    const navigate = useNavigate();

    return (
        <>
            <div>Welcome home!</div>
            {error && <div>{error}</div>}
        </>
    );
}

export default Home;
