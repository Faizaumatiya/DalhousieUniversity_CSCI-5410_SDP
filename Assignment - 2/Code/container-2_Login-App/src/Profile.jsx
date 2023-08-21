import { updateDoc, doc } from "firebase/firestore";
import { useLocation, useNavigate } from "react-router-dom";
import db from "./Firebase"

/* Code Refernce:
[1] https://reactrouter.com/en/main/hooks/use-navigate
*/

function Profile(props){

    const location = useLocation()
    const navigate = useNavigate()

    const logout = async(e) => {
        e.preventDefault()

        console.log(localStorage.getItem("stateId"))
        const docRef = await updateDoc(doc(db, "State", localStorage.getItem("stateId")), {
            "state": "offline"
        })

        navigate("/")

    }

    return(
        <div className='form'>
            <div className='form-body'>
                <div>
                    <h3>Profile Page</h3>
                </div>
                <form>
                    <div>
                        <label className="form__label" for='name'>Name:</label>
                        {location.state.name}
                    </div>
                    <div>
                        <label className="form__label" for='email'>Email:</label>
                        {location.state.email}
                    </div>
                    <div>
                        <label className='form__label' for='location'>Location: </label>
                        {location.state.location}
                    </div> 
                    <div class = "footer">
                        <button type="submit" onClick={logout}> Logout </button>
                    </div>
                </form>
            </div>
        </div>
   );
}

export default Profile;

