import React, {useRef} from 'react';
import Axios from "axios";

const AddUser = () => {

    const nameRef = useRef()
    const emailRef = useRef()
    //  const [user, setUser] = useState([])

    const handleAddUser = e => {
        e.preventDefault()
        const name = nameRef.current.value
        const email = emailRef.current.value
        const newUser = {name, email}

        const update = async () => {

            try {
                let res = await Axios({
                    method: 'post',
                    url: 'http://localhost:5000/users',
                    data: newUser
                })

                let data = res.data
                console.log(data)
                alert('user insertedId')
                e.target.reset()

                return data;

            } catch (error) {
                console.log(error.response); // this is the main part. Use the response property from the error object

                return error.response;
            }

        }
        update().catch(console.dir)

        /* axios.post('http://localhost:5000/users', newUser)
             .then(response =>{
                 return response.data
             })
             .then(data => {
                 console.log(data)
                 console.log(data.insertedId)

                 alert('user added successfully')
                 e.target.reset()
             })
             .catch(error => {
                 console.log(error.response.data.error)
             })*/
    }
    return (
        <div>
            <h2>Add User</h2>

            <form onSubmit={handleAddUser}>

                <input type="text" ref={nameRef} name="" id="" placeholder="Name"/>
                <br/>
                <input type="email" ref={emailRef} name="" id="" placeholder="Email"/>
                <br/>
                <input type="submit" value="submit"/>
            </form>
        </div>
    );
};

export default AddUser;