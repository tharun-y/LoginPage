import React, { useState } from "react";
import { usesignupStore } from "../store/signup"; 
import './signin.style.css';

const Signin = () => {
    const [newuser, setnewuser] = useState({
        email: "",
        password: "",
    });
    const [userDetails, setUserDetails] = useState(null); 
    const [errorMessage, setErrorMessage] = useState(""); 
    const { getiddetails } = usesignupStore(); 

    const handleGetDetails = async () => {
        const { success, data, message } = await getiddetails(newuser);
        if (success) {
            setnewuser({email:"" , password : ""});
            console.log("Details:", data);
            setUserDetails(data); 
            setErrorMessage(""); 
        } else {
            setnewuser({email:"" , password : ""});
            console.log("Message:", message);
            setUserDetails(null); 
            setErrorMessage(message); 
        }
    };

    return (
        <div>
            <h1>Enter your Email and Password to get your details</h1>
            <input 
                type="text"
                placeholder="Enter your email"
                name="email"
                value={newuser.email}
                onChange={(e) => setnewuser({ ...newuser, email: e.target.value })}
            />
            <input
                type="password"
                placeholder="Enter your Password"
                name="password"
                value={newuser.password}
                onChange={(e) => setnewuser({ ...newuser, password: e.target.value })}
            />
            <button onClick={handleGetDetails}>Sign In</button>

            {errorMessage && (
                <div style={{ color: "red" }}>
                    <p><strong>Error:</strong> {errorMessage}</p>
                </div>
            )}

            {userDetails && (
                <div>
                    <h2>User Details</h2>
                    <p><strong>ID:</strong> {userDetails._id}</p>
                    <p><strong>Email:</strong> {userDetails.email}</p>
                    <p><strong>Phone Number:</strong> {userDetails.phonenumber}</p>
                    <p><strong>Created At:</strong> {new Date(userDetails.createdAt).toLocaleString()}</p>
                    <p><strong>Updated At:</strong> {new Date(userDetails.updatedAt).toLocaleString()}</p>
                </div>
            )}
        </div>
    );
};

export default Signin;
