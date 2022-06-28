import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Link} from "react-router-dom";

const Users = () => {

    const [user, setUser] = useState([])

    const LoadData = () => {
        (async () => {
            try {
                const response = await axios.get("http://localhost:5000/users")
                setUser(response.data)
            } catch (e) {
                console.error(e)
            }
        })()
    }
    useEffect(LoadData, [])

    //delete user

    const handleDeleteUser = id => {

        const proceed = window.confirm('Are you sure you want to delete')
        if (proceed) {
            const url = `http://localhost:5000/users/${id}`

            axios.delete(url)
                .then(response => {
                    if (response.data.deletedCount) {
                        window.alert('successfully deleted')

                        const remainingUser = user.filter(user => user._id !== id)
                        setUser(remainingUser)
                    }
                })
        }
    }

    return (
        <div>
            <h2> Total User: {user.length}</h2>
            <ul>
                {
                    user.map(user => <li key={user._id}>
                        {user.name}: {user.email}
                        <br/>
                        <Link to={`/users/update/${user._id}`}>
                            <button style={{marginRight: '5px'}}>update</button>
                        </Link>
                        <button onClick={() => handleDeleteUser(user._id)}>delete</button>

                    </li>)
                }
            </ul>
        </div>
    );
};

export default Users;