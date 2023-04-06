import React, {useState} from "react";



const Signin = ({ loadProfile, onRouteChange, sbApiURL }) => {
    const [signinEmail, setSigninEmail] = useState("");
    const [signinPwd, setSigninPwd] = useState("");

    
    const onEmailChange = (event) => {
        setSigninEmail(event.target.value);
    }

    const onPasswordChange = (event) => {
        setSigninPwd(event.target.value);
    }

    const onSubmitSignin = () => {
        const signinParams = {
            email: signinEmail.toLowerCase(),
            password: signinPwd
        };
        fetch(sbApiURL + "/signin", {
            method: "POST",
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(signinParams)
        })
        .then(response => response.json())
        .then(data => {
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

    }
    
    return (
        <article className="br3 shadow-3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 center db mt3">
            <main className="pa4 black-80">
            <div className="measure">
                <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                <legend className="f1 fw6 ph0 mh0">Sign In</legend>
                <div className="mt3">
                    <label className="db fw6 lh-copy f4" htmlFor="email-address">Email</label>
                    <input 
                        className="white pa2 bw2 input-reset ba bg-near-black o-50 hover-bg-black hover-white w-100" 
                        type="email" 
                        name="email-address"  
                        id="email-address" 
                        onChange={onEmailChange}
                        />
                </div>
                <div className="mv3">
                    <label className="db fw6 lh-copy f4" htmlFor="password">Password</label>
                    <input 
                        className="b pa2 bw2 input-reset ba bg-near-black o-50 hover-bg-black hover-white w-100" 
                        type="password" 
                        name="password"  
                        id="password" 
                        onChange={onPasswordChange}/>
                </div>
                </fieldset>
                <div className="">
                    <input 
                      className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                      type="submit" 
                      value="Sign in" 
                      onClick={() => onSubmitSignin()}
                    />
                    </div>
                    <div className="lh-copy mt3">
                    <p onClick={() => onRouteChange('register')} className="f5 link dim black db pointer">Register</p>
                </div>
            </div>
            </main>
        </article>
    );
}

export default Signin;