import { useState } from "react";
import database from './Firebase'
import { collection, where, getDocs, query, updateDoc, Timestamp, addDoc, doc } from "firebase/firestore"
import { useNavigate } from "react-router-dom";
import './style.css';

/*Code Reference:
[1] https://www.telerik.com/blogs/how-to-create-validate-react-form-hooks
*/

const LoginForm = props => {

    const navigate = useNavigate();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async e => {
        e.preventDefault();
        console.log('test   ')
        const db = database;
        if(email === ''){
            alert("Email id required")
            return
        }
        if(password === ''){
            alert("Password required")
            return
        }

        /* Code Reference:
        [2] https://react-query-firebase.invertase.dev/firestore/querying-collections
        [3] https://firebase.google.com/docs/firestore/query-data/queries
        [4] https://react-query-firebase.invertase.dev/firestore/querying-documents
        */

        const userCollection = collection(db, "Users")
        const userQuery = query(userCollection, where('email', '==', email), where('password', '==', password))
        const querySnapshot = await getDocs(userQuery);
        console.log('asd')

        if (querySnapshot.empty) {
            console.log('Invalid username or password')
            alert("Invalid login credentials")
            setEmail("");
            setPassword("");
        } else {
            const docData = querySnapshot.docs[0].data();
            const docReference = query(collection(db, "State"), where('email', '==', email))
            await getDocs(docReference).then(async (snapshot) => {
                
                if (!snapshot.empty) {
                    const data = {
                        "timestamp": Timestamp.now(),
                        "state": "online"
                    }
                    const document = doc(db, "State", snapshot.docs[0].id)
                    await updateDoc(document, data)

                    localStorage.setItem("stateId", snapshot.docs[0].id)
                }
                else {
                    const docRef = await addDoc(collection(db, "State"), {
                        "email": email,
                        "name": docData.name,
                        "state": "online",
                        "timestamp": Timestamp.now()
                    })

                    localStorage.setItem("stateId", docRef.id)
                }
                navigate('/profile', { state: docData })
            });
        }
    };

    return (
        <div className='form'>
            <div className='form-body'>
            <div>
                <h3>Login</h3></div>  
            </div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label className="form__label">Email</label>
                    <input
                    className="form__input"
                    type="text"
                    name="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label className="form__label">Password</label>
                    <input
                    className="form__input"
                    type="password"
                    name="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    />
                </div>
                <div class = "footer">
                    <button type="submit">
                    Login
                    </button>
                </div>
            </form>
        </div>
    )
}

export default LoginForm;