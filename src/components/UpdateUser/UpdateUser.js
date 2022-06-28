import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import axios from "axios";

const UpdateUser = () => {

    const {id} = useParams()
    const [user, setUser] = useState([])
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
    return (
        <div>
            <h2> Update: {user.name}</h2>
            <p><small>{id}</small></p>
        </div>
    );
};

export default UpdateUser;