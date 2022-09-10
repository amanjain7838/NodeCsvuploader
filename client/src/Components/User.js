import React, { useEffect, useState } from 'react';
import Moment from 'react-moment';
import { fetchUser } from '../Methods/user';
import PhoneNumber from '../Utils/PhoneNumber';

const User=()=>{
    const [users,setUsers]=useState([]);
    useEffect(()=>{
        fetchUser().then((users)=>{
            if(users.data.status)
                setUsers(users.data.data);
        })
    },[]);

    return (
        <div className='container-fluid'>
            <div className='row justify-content-center pt-2'>
                <div className='col-8'>
                    <table className='table table-bordered table-sm table-hover'>
                        <thead>
                            <tr>
                                <th scope="col">id</th>
                                <th scope="col">name</th>
                                <th scope="col">email</th>
                                <th scope="col-7">phones</th>
                                <th scope="col">creation date</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            users.map((user)=>{
                                return (
                                    <tr key={`user-data-${user.id}`}>
                                        <td>{user.id}</td>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td><PhoneNumber phones={user.phones}/></td>
                                        <td><Moment format="D/M/YY">{user.createdAt}</Moment></td>
                                    </tr>                        
                                )
                            })
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
};
export default User;