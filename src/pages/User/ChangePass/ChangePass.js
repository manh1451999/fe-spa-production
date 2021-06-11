import { FormHelperText } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import React, { useState } from 'react';
import './ChangePass.css';
import axios from 'axios'
import {toast, ToastContainer} from 'react-toastify'


function ChangePass(props) {


    const [state, setState] = useState({
        currentPassword: '',
        newPassword: '',
        comfirmPassword: ''
    })

    const [err, setErr] = useState(false)



    function handleEdit(e) {
        const { name, value } = e.target;
        setState({
            ...state,
            [name]: value
        })
    }

    function onSubmit(e) {
        e.preventDefault();
        if (state.comfirmPassword !== state.newPassword || state.comfirmPassword.length<6 || state.newPassword.length<6) setErr(true)
        else {
            setErr(false)
            const cPass = state.currentPassword
            axios.post('/user/changepass',{oldPass: state.currentPassword, newPass: state.newPassword})
            .then( res => {
                console.log('oj')
                toast.success('Thanh cong!')
            }).catch( err => toast.error('That bai! Mat khau khong dung!'))
        }
    }
    return (
        <div class="user-changepass" style={{ backgroundImage: "url(../city.jpg)" }} >
            <br />
            <ToastContainer />
            <div className="card change-pass col-sm-5" style={{ marginTop: '100px', marginBottom: '70px', opacity: 0.81 }} >
                <h2 style={{ 'margin': '20px' }}>Change Password</h2>


                <form style={{ 'margin': '20px' }} onSubmit={onSubmit}>
                    <TextField
                        type="password"
                        id="currentPass"
                        label="Current Password"
                        name="currentPassword"
                        variant="outlined"
                        fullWidth
                        autoFocus
                        value={state.currentPassword}
                        onChange={handleEdit}
                        margin="normal"
                        required
                    />

                    <TextField
                        type="password"
                        id="newPass"
                        label="New Password"
                        name="newPassword"
                        variant="outlined"
                        fullWidth
                        value={state.newPassword}
                        onChange={handleEdit}
                        margin="normal"
                        required
                    />

                    <TextField
                        type="password"
                        id="comfirmPass"
                        label="Comfirm Password"
                        name="comfirmPassword"
                        variant="outlined"
                        fullWidth
                        value={state.comfirmPassword}
                        onChange={handleEdit}
                        margin="normal"
                        required
                    />

                    {err && <FormHelperText id="component-error-text" style={{ color: 'red' }}>mật khẩu mới không khớp hoặc ít hơn 6 kí tự</FormHelperText>}


                    <button type="submit" class="btn btn-outline-primary"
                    >
                        <i class="fa fa-save"></i>&ensp;Update
                    </button>

                </form>
            </div>

        </div>
    );
}

export default ChangePass;