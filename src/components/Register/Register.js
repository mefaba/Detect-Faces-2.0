import React, { useState } from 'react';


function Register({onRouteChange,loadUser}){
    const [registerEmail, setregisterEmail] = useState("");
    const [registerPassword, setregisterPassword] = useState("");
    const [registerName, setregisterName] = useState("")

    function onEmailChange(event){
        setregisterEmail(event.target.value)
    }

    function onPasswordChange(event){
        setregisterPassword(event.target.value)
    }
    function onNameChange(event){
        setregisterName(event.target.value)
    }
    

    function onSubmitRegister(){
        if (!registerName & !registerEmail & !registerPassword){
            return console.log("enter valid name, email,password")
        } 
            fetch(`http://localhost:5000/register`,{
                method: "post",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    email: registerEmail,
                    password: registerPassword,
                    name: registerName
                })
            })
            .then(response =>  {
                return response.json()
            } )
            .then(user => {
                if(user){
                    loadUser(user)
                    onRouteChange("home")
                }
            })
          
        /* console.log(signInEmail,signInPassword) */
        
    }


    return(
        <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
            <main className="pa4 black-80">
            <div className="measure center">
                <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                <legend className="f1 fw6 ph0 mh0">Register</legend>
                <div className="mt3">
                    <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                    <input 
                        onChange = {onNameChange}
                        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                        type="text" 
                        name="name"  
                        id="name" />
                </div>
                <div className="mt3">
                    <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                    <input 
                        onChange={onEmailChange} 
                        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                        type="email" name="email-address"  id="email-address" />
                </div>
                <div className="mv3">
                    <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                    <input 
                        onChange={onPasswordChange}
                        className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                        type="password" name="password"  id="password" />
                </div>
                </fieldset>
                    <div className="">
                        <input 
                            onClick ={onSubmitRegister}
                            className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                            type="submit" 
                            value="Register" />
                    </div>

            </div>
            </main>
        </article>
)
}

export default Register