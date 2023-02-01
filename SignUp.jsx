import React from "react";
import './SignUp.css'
import TextField from '@mui/material/TextField';
import { Button, ButtonBase } from "@mui/material";
import { useState } from "react";
import { SignUpApi } from "../../services/userServices";
import { loginApi } from "../../services/userServices";
const nameRegex = /^([A-Z]{1}[a-z,A-Z]{2,})$/;
const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/;
const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&-+=()])([a-zA-Z0-9]*).{8,}$/;

function SignUp () {
    const [signUpObj, setSignUpObj] = useState({firstName: '', lastName: '', emailId: '', password: '', confirmPass: ''})
    const [regexObj, setRegexObj] = useState({
        firstNameBorder: false, 
        firstNameHelper: '', 
        lastNameBorder: false, 
        lastNameHelper: '', 
        emailBorder: false, 
        emailHelper: '', 
        passwordBorder: false, 
        passwordHelper: '', 
        confirmBorder: false, 
        confirmHelper: ''
    })

    const takingFirstName = (e) => {
        setSignUpObj (prevState => ({
            ...prevState,
            firstName: e.target.value
        }))
    }

    const takingLastName = (e) => {
        setSignUpObj(prevState => ({
            ...prevState,
            lastName: e.target.value
        }))
    }

    const takingEmail = (e) => {
        setSignUpObj(prevState => ({
            ...prevState,
            emailId: e.target.value
        }))
    }

    const takingPassword = (e) => {
        setSignUpObj(prevState => ({
            ...prevState,
            password: e.target.value
        }))
    }

    const takingConfirmPass = (e) => {
        setSignUpObj(prevState => ({
            ...prevState,
            confirmPass: e.target.value
        }))
    }
    console.log(signUpObj)

    const verifyUserSignUp = () => {
        let firstNameTest = nameRegex.test(signUpObj.firstName)
        let lastNameTest = nameRegex.test(signUpObj.lastName)
        let emailTest = emailRegex.test(signUpObj.emailId)
        let passwordTest = passwordRegex.test(signUpObj.password)
        let confirmPassTest = passwordRegex.test(signUpObj.confirmPass)
        let passConfirmCheck = (signUpObj.password).matchAll(signUpObj.confirmPass)

        if(firstNameTest === false) {
            setRegexObj(prevState => ({
                ...prevState,
                firstNameBorder: true,
                firstNameHelper: "Please enter a valid name." 
            }))
        }

        if(firstNameTest === true) {
            setRegexObj(prevState => ({
                ...prevState,
                firstNameBorder: false,
                firstNameHelper: '' 
            }))
        }

        if(lastNameTest === false) {
            setRegexObj(prevState =>({
                ...prevState,
                lastNameBorder: true,
                lastNameHelper: "Please enter a valid name."
            }))
        }

        if(lastNameTest === true) {
            setRegexObj(prevState =>({
                ...prevState,
                lastNameBorder: false,
                lastNameHelper: ''
            }))
        }

        if(emailTest === false) {
            setRegexObj(prevState => ({
                ...prevState,
                emailBorder: true,
                emailHelper: "Please enter a valid email."
            })) 
        }

        if(emailTest === true) {
            setRegexObj(prevState => ({
                ...prevState,
                emailBorder: false,
                emailHelper: ''
            })) 
        }

        if(passwordTest === false) {
            setRegexObj(prevState => ({
                ...prevState,
                passwordBorder: true,
                passwordHelper: "Please enter a valid password."
            }))
        }

        if(passwordTest === true) {
            setRegexObj(prevState => ({
                ...prevState,
                passwordBorder: false,
                passwordHelper: ''
            }))
        }

        if(confirmPassTest === false) {
            setRegexObj(prevState => ({
                ...prevState,
                confirmBorder: true,
                confirmHelper: "Please enter a valid password."
            }))
        }

        if(confirmPassTest === true) {
            setRegexObj(prevState => ({
                ...prevState,
                confirmBorder: false,
                confirmHelper: ''
            }))
        }

        if(passConfirmCheck === false)
        {
            setRegexObj(prevState => ({
                ...prevState,
                confirmBorder: true,
                confirmHelper: 'Confirm Password must be same as the password'
            }))
        }

        if(passConfirmCheck === true) {
            setRegexObj(prevState => ({
                ...prevState,
                confirmBorder: false,
                confirmHelper: ''
            }))
        }

        // if(password != confirm){

        // }

        if(firstNameTest === true && lastNameTest === true && emailTest === true && passwordTest === true && passConfirmCheck === true){
            SignUpApi(signUpObj).then((response)=>{
                console.log(response)
            }).catch((error)=>{
                console.log(error)
            })
        }
    }
 

    return (
        <div className="signup-page">
            <div className="main-content">
                <div className="signup-block">
                    <div className="logo-head">
                        <img src="./googleLogo.png" alt="logo" />
                    </div>
                    <div className="head-label"><p>Create your Google Account</p></div>
                    <div className="fullname">
                        <TextField onChange={takingFirstName} error = {regexObj.firstNameBorder} helperText={regexObj.firstNameHelper} label="First name" variant="outlined" size="small"/>
                        <TextField onChange={takingLastName} error={regexObj.lastNameBorder} helperText={regexObj.lastNameHelper} label="Last name" variant="outlined" size="small"/>
                    </div>
                    <div className="username">
                        <TextField onChange={takingEmail} error={regexObj.emailBorder} helperText={regexObj.emailHelper} label="Username" variant="outlined" fullWidth size="small"/>
                        <small>You can use letters,numbers & periods</small>
                    </div>
                    <div className="current-email"><a href="">Use my current email address instead</a></div>
                    <div className="password">
                        <TextField onChange={takingPassword} error={regexObj.passwordBorder} helperText={regexObj.passwordHelper} label="Password" variant="outlined" size="small"/>
                        <TextField onChange={takingConfirmPass} error={regexObj.confirmBorder} helperText={regexObj.confirmHelper} label="Confirm" variant="outlined" size="small"/>
                        <small className="pass-text">Use 8 or more characters with a mix of letters, numbers & symbols</small>
                    </div>
                    <div className="show-password">
                        <input type={"checkbox"} value = "Show password" />Show password
                        
                    </div>
                    <div className="buttons">
                    <span className="sign-in-btn"><a href='#' className="link-text">Sign in instead</a></span>
                    <Button onClick={verifyUserSignUp} className=".next-button" variant="contained" >Next</Button>
                    </div>
                    
                </div>
                <div className="side-logo">
                    <img src="./createlogo.png" alt="google account" className="side-logo-img"/>
                    <p className="side-logo-text">One Account. All of Google working for you.</p>
                </div>
                
                    
            </div>
            
        </div>
    
    );
}

export default SignUp