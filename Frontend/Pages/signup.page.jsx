import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { usesignupStore } from "../store/signup";

import './signup.style.css'
import Signin from "./signin.page";

const Signup = () => {
    const [newuser, setnewuser] = useState({
        email: "",
        password: "",
        phonenumber: "",
    });
    const [errorMessage, setErrorMessage] = useState(""); 
    const [successMessage , setSuccessMessage] = useState("");
    const { createnewIds } = usesignupStore();
    const navigate = useNavigate();

    const handleSignup = async () => {
        try {
            const { success, message } = await createnewIds(newuser);
            console.log("Success:", success);
            console.log("Message:", message);

            if (success) {
                setnewuser({ email: "", password: "", phonenumber: "" });
                setErrorMessage(""); 
                setSuccessMessage(message || "Signup completed Successfully !");
            } else {
                setErrorMessage(message || "Signup failed. Please try again.");
                setSuccessMessage("");
            }
        } catch (error) {
            console.error("Error during signup:", error);
            setErrorMessage("An unexpected error occurred. Please try again.");
        }
    };

    const handleNavigateToSignin = () => {
        navigate("/signin");
    };

    return (
        <div>
            <h1>Enter Your Email, Password, and Phone Number</h1>
            <input
                type="text"
                placeholder="Enter your Email"
                name="email"
                value={newuser.email}
                onChange={(e) => setnewuser({ ...newuser, email: e.target.value })}
            />
            <input
                type="password"
                placeholder="Enter your password"
                name="password"
                value={newuser.password}
                onChange={(e) => setnewuser({ ...newuser, password: e.target.value })}
            />
            <input
                type="number"
                placeholder="Enter your Phone Number"
                name="phonenumber"
                value={newuser.phonenumber}
                onChange={(e) => setnewuser({ ...newuser, phonenumber: e.target.value })}
            />
            <button onClick={handleSignup}>Sign Up</button>
            <h1 className="signin">Already Registered ? <Link className="sign"to={"./Signin"}>Signin</Link> here</h1>
            {errorMessage && (
                <div style={{ color: "red" }}>
                    <p><strong>Error:</strong> {errorMessage}</p>
                </div>
            )}
            {successMessage && (
                <div style={{ color: "green" }}>
                    <p> {successMessage}</p>
                </div>
            )}
        </div>
    );
};

export default Signup;
