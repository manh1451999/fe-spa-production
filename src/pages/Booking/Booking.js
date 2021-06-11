import Calendar from './Calendar/Calendar';
import React, { useContext } from 'react';
import UserContext from '../../contexts/UserContext';
import { Redirect } from 'react-router-dom';

function Booking(props) {
    const user = useContext(UserContext)
    if (!user.isLogin) return <Redirect to='/login' />
    return (
        <Calendar />
    )
}

export default Booking;