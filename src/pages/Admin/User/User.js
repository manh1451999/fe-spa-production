import React, { useState, useEffect } from 'react';
import LayoutTableAdmin from '../Layout/LayoutTableAdmin';
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css';
function User(props) {


    const [users, setUsers] = useState([])
    const [userEdit, setUserEdit] = useState(null)


    useEffect(() => {
        axios.get("/user").then(res => {
            setUsers(res.data);
        });

    }, [])

    function handleLock(index) {
        let newUsers = [...users]
        let user = newUsers[index]
        let id = user._id

        confirmAlert({
            title: 'khoá User',
            message: 'Bạn có chắc chắn muốn khoá người dùng này',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        if (id)
                            axios.post(`/user/lock/${id}`)
                                .then(res => {
                                    newUsers[index].isBlock = true;
                                    setUsers(newUsers)
                                })
                    }

                },
                {
                    label: 'No'
                }
            ]
        });


    }

    function handleUnlock(index) {
        let newUsers = [...users]
        let user = newUsers[index]
        let id = user._id

        confirmAlert({
            title: 'Mở khoá User',
            message: 'Bạn có chắc chắn muốn mở khoá người dùng này',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        if (id)
                            axios.post(`/user/unlock/${id}`)
                                .then(res => {
                                    newUsers[index].isBlock = false;
                                    setUsers(newUsers)
                                })
                    }

                },
                {
                    label: 'No'
                }
            ]
        });
    }






    function handleDelete(user) {


        confirmAlert({
            title: 'Xoá User',
            message: 'Bạn có chắc chắn xoá người dùng này',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => deleteUser(user)
                },
                {
                    label: 'No'
                }
            ]
        });


    }

    function deleteUser(user) {
        let id = user._id;

        axios.delete(`/user/${id}`)
            .then(res => {
                let newUsers = [...users];
                const index = newUsers.indexOf(user)
                newUsers.splice(index, 1)
                setUsers(newUsers)
            })
    }

    return (
        <div class="admin-user">
            <LayoutTableAdmin>


                <h2>User</h2>
                <br />
                {/* <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#addUser"
                    onClick={(e) => this.setState({ newUser: null })}><i class="fas fa-plus"></i>&ensp;Add User</button> */}

                <div className="card">
                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Tên</th>
                                <th>Email</th>
                                <th>Số điện thoại</th>
                                <th>Địa chỉ</th>
                                <th>Hành động</th>
                            </tr>
                        </thead>
                        <tbody>

                            {users.map((user, index) => {

                                return (<tr>
                                    <td>{index}</td>
                                    <td>{user.lastName} {user.firstName}</td>
                                    <td>{user.email}</td>
                                    <td>{user.phone}</td>
                                    <td>{user.address}</td>
                                    <td>
                                        <form class="form-group" >
                                            {user.isBlock && <button type="button" class="btn btn-success" data-toggle="modal" data-target="#editUser"
                                                onClick={(e) => handleUnlock(index)}><i class="fas fa-lock-open"></i></button>}
                                            {user.isBlock == false && <button type="button" class="btn btn-warning" data-toggle="modal" data-target="#editUser"
                                                onClick={(e) => handleLock(index)}><i class="fas fa-lock"></i></button>}
                                                 &ensp;

                            <button type="button" class="btn btn-danger" onClick={(e) => handleDelete(user)}><i class="far fa-trash-alt"></i></button>
                                        </form>
                                    </td>
                                </tr>
                                )

                            })}

                        </tbody>
                    </table>
                </div>
            </LayoutTableAdmin>

        </div>
    );
}

export default User;