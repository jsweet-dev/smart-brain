import React, { useState } from "react";


const Register = ({ loadProfile, onRouteChange }) => {
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPwd, setRegisterPwd] = useState("");
    const [registerName, setRegisterName] = useState("");

    
    const onEmailChange = (event) => {
        setRegisterEmail(event.target.value);
    }

    const onPasswordChange = (event) => {
        setRegisterPwd(event.target.value);
    }

    const onNameChange = (event) => {
        setRegisterName(event.target.value);
    }

    const onSubmitRegister = () => {
        const registerParams = {
            email: registerEmail.toLowerCase(),
            password: registerPwd,
            name: registerName
        };
        if(registerParams.email && registerParams.password && registerParams.name){
            fetch("https://sbjsapi.herokuapp.com/register", {
                method: "POST",
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify(registerParams)
            })
            .then(response => response.json())
            .then(data => {
                console.log("register response",data);
                if(data.id){
                    loadProfile({
                        id: data.id,
                        name: data.name,
                        email: data.email,
                        entries: data.entries,
                        joined: data.joined
                      });
                    onRouteChange('home')
                }
            });
        } else {
            console.error("Required form fields missing");
        }
    }

    return (
        <article className="br3 shadow-3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 center">
            <main className="pa4 black-80">
            <div className="measure">
                <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                <legend className="f1 fw6 ph0 mh0">Register</legend>
                <div className="mt3">
                    <label className="db fw6 lh-copy f4" htmlFor="name">Name</label>
                    <input className="pa2 bw2 input-reset ba  bg-near-black o-50 hover-bg-black hover-white w-100" 
                    type="text" 
                    name="name"  
                    id="name" 
                    onChange={onNameChange}
                    />
                </div>
                <div className="mt3">
                    <label className="db fw6 lh-copy f4" htmlFor="email-address">Email</label>
                    <input className="pa2 bw2 input-reset ba  bg-near-black o-50 hover-bg-black hover-white w-100" 
                    type="email" 
                    name="email-address"  
                    id="email-address" 
                    onChange={onEmailChange}
                    />
                </div>
                <div className="mv3">
                    <label className="db fw6 lh-copy f4" htmlFor="password">Password</label>
                    <input className="b pa2 bw2 input-reset ba bg-near-black o-50 hover-bg-black hover-white w-100" 
                    type="password" 
                    name="password"  
                    id="password" 
                    onChange={onPasswordChange}
                    />
                </div>
                </fieldset>
                <div className="">
                    <input 
                      className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                      type="submit" 
                      value="Register" 
                      onClick={onSubmitRegister}
                    />
                </div>
            </div>
            </main>
        </article>
    );
}

export default Register;