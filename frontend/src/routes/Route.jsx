import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import RegisterPage from '../auth/Register'
import LoginPage from '../auth/Login'
import Protected from './Protected'

export default function Router() {
    return (
        <Routes>
            <Route path='/' element={<Protected Component={Home} />} />
            <Route path='/sign-up' element={<RegisterPage />} />
            <Route path='/sign-in' element={<LoginPage />} />
        </Routes>
    )
}
