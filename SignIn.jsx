import React from "react";
import './SignIn.css'
import TextField from '@mui/material/TextField';
import { Button } from "@mui/material";
import { useState } from "react";
import { loginApi } from "../../services/userServices";
const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/;
const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&-+=()])([a-zA-Z0-9]*).{8,}$/;

function SignIn () {

     const [signInObj, setSignInObj] = useState({emailId: '', password: ''}) //for fundoo .net
    //const [signInObj, setSignInObj] = useState({email: '', password: ''})  //for bridgelab
    const [regexObj, setRegexObj] = useState({emailBorder: false, emailHelper: '', passBorder: false, passHelper: ''})

    const takingEmail = (e) => {
        // setSignInObj({email: e.target.value})
        setSignInObj(prevState=>({
            ...prevState,
            emailId: e.target.value
        }))
    }

    const takingPass = (e) => {
        // setSignInObj({password: e.target.value})
        setSignInObj(prevState=> ({
            ...prevState,
            password: e.target.value
        }))
    }
    console.log(signInObj)

    const verifyEmailPass = () => {
        let emailTest = emailRegex.test(signInObj.emailId)
        let passTest = passwordRegex.test(signInObj.password)

        if(emailTest === false) {
            setRegexObj(prevState=>({
                ...prevState,
                emailBorder: true,
                emailHelper: "Enter a valid email."
            }))
        }
        else if(emailTest === true){
            setRegexObj(prevState=>({
                ...prevState,
                emailBorder: false,
                emailHelper: ''
            }))
        }

        if(passTest === false){
            setRegexObj(prevState=>({
                ...prevState,
                passBorder: true,
                passHelper: "Enter a valid password."
            }))
        }
        else if(passTest === true)
        {
            setRegexObj(prevState=>({
                ...prevState,
                passBorder: false,
                passHelper: ''
            }))
        }
        if(emailTest === true && passTest === true){
            loginApi(signInObj).then((response)=>{
                console.log(response)
                //localStorage.setItem("token", response.data.id)
                 localStorage.setItem("token", response.data.result)
                 console.log(response.data.result)
            }).catch((error)=>{
                console.log(error)
            })
        }

    }

    return (
        <div className="signInPage">
            <div className="signInBlock">
                <div className="login-image">
                    
                    <img src="./googleLogo.png" alt="logo" className="google-logo"/>
                </div>
                <div className="text1">Sign in</div>
                <div className="text2">Use your Google Account</div>
                
                

                <div className="email-txtfield">
                    <TextField onChange={takingEmail} error={regexObj.emailBorder} helperText={regexObj.emailHelper} id="outlined-basic" label="Email or phone" variant="outlined" size="small" fullWidth = "true"/>
                    <a href="#" className="link-text">Forget email?</a>
                </div>
                <div className="pass-txtfield">
                    <TextField onChange={takingPass} error={regexObj.passBorder} helperText={regexObj.passHelper} id="outlined-basic" label="password" variant="outlined" size="small" fullWidth = "true"/>
                    <a href="#" className="link-text">Forget password?</a>
                </div>
                       {/* <input type="text" placeholder="Email or phone"></input> */}
                        {/* <p className="forget">Forget email?</p> */}
                <div className="learnMore">
                    <span className="text3">Not your computer? Use Guest mode to sign in privately.</span>
                    <span className="text4"><a href="#" className="link-text">Learn more</a></span>
                </div>
                <div className="buttonblock">
                    
                    <span className="create-acc-btn"><a href='#' className="link-text">Create account</a></span>
                    <Button onClick={verifyEmailPass} className="next-btn" variant="contained" >Next</Button>
                
                </div>

            </div>
            
            
            
        </div>
    
    );
}

export default SignIn
