import React, { Component, useState, useEffect, useContext } from 'react'
import './Profile.css'
import axios from 'axios'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { ToastContainer, toast } from 'react-toastify';
import UserContext from '../../../contexts/UserContext';



function Profile(props) {
    const [state, setState] = useState({ user: null })
    const userContext = useContext(UserContext)

    useEffect(() => {

        axios.get('/user/profile')
            .then(res => {
                setState({
                    user: res.data
                })
            })
            .catch(err => {
                console.log(err)
            })

    }, [])


    function handleEdit(e) {
        let { name, value } = e.target;

        let newEdit = { ...state.user };
        newEdit[name] = value

        setState({
            user: newEdit
        });

        console.table(state.user)
    }


    function updateProfile() {

        let { user } = state;
        if (user.email) delete user.email
        if (user.avatar) delete user.avatar
        axios.patch("/user/profile", user)
            .then(res => {
                setState({
                    user: res.data
                });
                toast.success('Update thông tin thành công', { position: "top-center" });
                let firstNameClient = localStorage?.firstName;
                if (firstNameClient != user.firstName) {
                    localStorage.setItem('firstName', user.firstName)
                    userContext.setFirstName(user.firstName)
                }
            })
            .catch((err) => toast.error(err))
    }


    const { user } = state

    return (
        <div class="user-admin" style={{ backgroundImage: "url(../profile.jpg)" }}>
            <br />
            <ToastContainer />
            <div className="card profile-card col-sm-6" style={{ marginTop: '100px', opacity: 0.81 }} >
                <h2 style={{ 'margin': '20px' }}>Profile</h2>

                {user &&
                    <form style={{ 'margin': '20px' }}>


                        <TextField
                            id="email"
                            label="Email"
                            name="email"
                            variant="filled"
                            fullWidth
                            value={user?.email}
                            // onChange={handleEdit.bind(this)}
                            margin="normal"
                            inputProps={
                                { readOnly: true, }
                            }
                        />

                        <TextField
                            id="firstName"
                            label="First Name"
                            name="firstName"
                            variant="outlined"
                            fullWidth
                            value={user?.firstName}
                            onChange={handleEdit.bind(this)}
                            autoFocus
                            margin="normal"
                        />

                        <TextField
                            id="lastName"
                            label="Last Name"
                            name="lastName"
                            variant="outlined"
                            fullWidth
                            value={user?.lastName}
                            onChange={handleEdit.bind(this)}
                            autoFocus
                            margin="normal"
                        />





                        <TextField
                            id="address"
                            label="Address"
                            name="address"
                            variant="outlined"
                            fullWidth
                            value={user?.address}
                            onChange={handleEdit.bind(this)}
                            margin="normal"
                        />

                        <TextField
                            id="phone"
                            label="Phone"
                            name="phone"
                            variant="outlined"
                            fullWidth
                            value={user?.phone}
                            onChange={handleEdit.bind(this)}
                            margin="normal"
                        />


                        <button type="button" class="btn btn-outline-primary" onClick={updateProfile}
                        >
                            <i class="fa fa-save"></i>&ensp;Update
                            </button>

                    </form>
                }
            </div>

        </div>

    );
}

export default Profile;

