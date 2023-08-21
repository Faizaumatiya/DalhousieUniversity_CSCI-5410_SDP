import './App.css';
import { Route, Routes } from "react-router-dom";
import LoginForm from './Login';
import Profile from "./Profile";

/*  
Code Reference:
[1] https://v5.reactrouter.com/web/guides/quick-start
[2] https://reactrouter.com/en/v6.3.0/getting-started/overview
*/

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path = '/' element={<LoginForm />}></Route>
        <Route path = '/profile' element={<Profile />} ></Route>
      </Routes>
     
    </div>
  );
}

export default App;
