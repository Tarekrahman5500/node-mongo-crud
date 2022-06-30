import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import axios from "axios";

const UpdateUser = () => {

    const {id} = useParams()
    const [user, setUser] = useState({})
    const LoadData = () => {
        (async () => {
            try {
                const response = await axios.get(`http://localhost:5000/users/${id}`)
                setUser(response.data)
            } catch (e) {
                console.error(e)
            }
        })()
    }
    useEffect(LoadData, [id])

    const handleUpdate = e => {
        e.preventDefault()
        const url = `http://localhost:5000/users/${id}`
        axios.put(url, user)
            .then(response => {

                if(response.data.modifiedCount > 0) {
                        window.alert('update user successfully')
                        setUser({})
                }
            })

    }

    const handleNameChange = e => {
        const updateName = e.target.value
        const updateUser = {name:updateName, email: user.email}
        setUser(updateUser)
    }

    const handleEmailChange = e => {

        const updateEmail = e.target.value
        const updateUser = {...user}
        updateUser.email = updateEmail
        setUser(updateUser)

    }
    return (
        <div>
            <h2> Update: {user.name}</h2>
            <p><small>{id}</small></p>

            <form onSubmit={handleUpdate}>
                <input type="text" onChange={handleNameChange} value={user.name || ' '}/>
                <br/>
                <br/>
                <input type="email" onChange={handleEmailChange} value={user.email || ' '}/>
                <br/>
                <input type="submit" value="Update"/>

            </form>
        </div>
    );
};

export default UpdateUser;