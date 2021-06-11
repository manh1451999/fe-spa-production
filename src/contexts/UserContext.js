import React, { useEffect, useState } from 'react';
import cookie from 'react-cookies'
import axios from 'axios';
const UserContext = React.createContext();
export default UserContext
export const UserConsumer = UserContext.Consumer;

export function UserProvider(props) {

    const [isLogin, setIsLogin] = useState(false)
    const [isAdmin, setIsAdmin] = useState(localStorage.isAdmin  || false)
    const [firstName, setFirstName] = useState('')

    function Logout() {
        setIsLogin(false);
        setFirstName('');
        localStorage.removeItem('firstName')
        localStorage.removeItem('isAdmin')

        axios.post('/auth/logout')
            .then(res => {
                console.log('xoá token thành công')
            })
            .catch(err => {
                console.log('xoá cookie thất bại')
            })

        cookie.remove('refresh_token')
        cookie.remove('access_token')
        window.location.href = "/"

    }

    useEffect(() => {
        if (localStorage.firstName && localStorage.firstName != 'undefined') {
            setIsLogin(true);
            setFirstName(localStorage.firstName)
            if (localStorage.isAdmin && localStorage.isAdmin != 'undefined') setIsAdmin(true)
        }
        else {
            setIsLogin(false);
            localStorage.removeItem('firstName')
            localStorage.removeItem('isAdmin')
        }
    }, [])


    return (
        <UserContext.Provider value={{
            isLogin,
            isAdmin,
            firstName,
            setIsLogin,
            setIsAdmin,
            setFirstName,
            Logout
        }}>
            {props.children}
        </UserContext.Provider>
    );
}

