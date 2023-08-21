import './App.css';
import { useState, useEffect } from "react";
import { query, collection, getDocs, where } from "firebase/firestore"
import db from "./Firebase"

function App() {

  //[1] https://www.pluralsight.com/guides/consume-data-from-firebase-firestore-in-a-react-app
  const [states, setStates] = useState([])

  const getData = async () => {
    const q = query(collection(db, "State"), where("state", "==", "online"))

    return await getDocs(q).then((snapshot) => {
      let data = []

      snapshot.docs.forEach((d) => {
        data.push(d.data())
      })

      console.log(data)
      return data
    });


  }

  //[2] https://reactjs.org/docs/hooks-effect.html
  useEffect(() => {
    getData().then((response) => {
      setStates(response)
    })
  }, [])

  //[3] https://www.geeksforgeeks.org/how-to-create-a-table-in-reactjs/
  return (
    <div className="App">
      <table className="table" border="2px">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>State</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {states ? states.map((data) => {
            return (
              <tr>
                <th>{data["name"]}</th>
                <th>{data["email"]}</th>
                <th>{data["state"]}</th>
                {/* https://stackoverflow.com/questions/48689876/how-to-convert-timestamp-in-react-js */}
                {/* <th>{new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(data["timestamp"])}</th> */}
                <th>{new Date(data["timestamp"].seconds * 1000).toLocaleString()}</th>
              </tr>
            )
          }) : <tr></tr>}
        </tbody>
      </table>

    </div>
  );
}

export default App;
