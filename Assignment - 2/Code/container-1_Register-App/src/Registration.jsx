import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import React, { useState } from 'react';
import { db } from './Firebase';
import './style.css';

/*Code Reference: 
[1] https://www.section.io/engineering-education/registration-form-react.js-firebase/
[2] https://www.youtube.com/watch?v=F7t-n5c7JsE&t=217s
*/

export default function RegistrationForm() {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [location, setLocation] = useState('')
    //[3] https://regexr.com/3e48o
    const validEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("in handlesubmit function");
        if (name === '') {
            alert("User name required")
            return
        }
        if (email === '') {
            alert("Email id required")
            return
        }
        if(!validEmail.test(email)){
            alert("Invalid email")
            return
        }
        if (password === '') {
            alert("Password required")
            return
        }
        //[4] https://stackoverflow.com/questions/68115335/how-to-validate-email-and-password-using-react-hooks
        if(password.length < 8){
            alert("Password must be atleast 8 characters long");
            return
        }
        if (location === '') {
            alert("Location required")
            return
        }
        // [5] https://firebase.google.com/docs/firestore/query-data/queries 
        const registrationCollectionRef = collection(db, 'Users')
        const validateRef = query(registrationCollectionRef, where("email", "==", email));
        await getDocs(validateRef).then(async (snapshot) => {
            if (!snapshot.empty) {
                console.log("User exists")
                alert("User with this email already exists")
            }
            else {
                    await addDoc(registrationCollectionRef, { name: name, email: email, password: password, location: location }).then(response => {
                    console.log(response)
                    alert("Successfully registered");
                    setName("");
                    setEmail("");
                    setPassword("");
                    setLocation("");
                }).catch(error => {
                    console.log(error.message)
                })
            }
        });
    }
    return (
        <div className='form'>
            <div className='form-body'>
                <div>
                    <h3>Registration</h3>
                </div>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label className="form__label" for='name'>Name </label>
                        <input 
                        className='form__input'
                        type='text'
                        value={name}
                        onChange={e => setName(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="form__label" for='email'>Email </label>
                        <input 
                        className="form__input"
                        id='email'
                        type='email'
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    </div>
                    <div>
                        <label className='form__label' for='password'>Password </label>
                        <input 
                        className="form__input"
                        id='password'
                        type='password'
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    </div>
                    <div>
                        <label className='form__label' for='location'>Location </label>
                        <input
                        className="form__input"
                        id='location'
                        type='location'
                        value={location}
                        onChange={e => setLocation(e.target.value)}
                    />
                    </div>
                    <div class = "footer">
                        <button type='submit'>Register</button> 
                    </div>
                </form>  
            </div>
        </div>
    )
}





