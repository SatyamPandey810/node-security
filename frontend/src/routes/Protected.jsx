import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import api from '../config/api';

export default function Protected(props) {
    const { Component } = props;
    const navigate = useNavigate();
    const [checking, setChecking] = useState(true); 

    useEffect(() => {
        api.get('/user/get-user')
            .then(() => setChecking(false))
            .catch(() => navigate("/sign-in"));
    }, [navigate])

    if (checking) return <div>Loading...</div>; 

    return (
        <div>
            <Component />
        </div>
    )
}