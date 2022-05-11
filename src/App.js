import './App.css';
import { useForm } from "react-hook-form";
import authService from './services/api/AuthService';
import authHeader from './services/api/AuthHeader';

import { useState, useEffect } from 'react' 
import Login from './components/Login';
import Home from './components/Home';
import Navbar from './components/Navbar';
import {Navigate} from 'react-router-dom';

function App() {

  const [currentUser, setCurrentUser] = useState(authService.getCurrentUser());
  // = authService.getCurrentUser();
  //console.log(currentUser);

  //useEffect(()=>{
    //console.log(authService.getCurrentUser());
    //setCurrentUser(authService.getCurrentUser());
  //})

  return (
    <div className="App">
      <Navbar />
      {currentUser ? (<Home></Home>) : (<Navigate replace to="/login" />)}
    </div>
  );
}

export default App;
