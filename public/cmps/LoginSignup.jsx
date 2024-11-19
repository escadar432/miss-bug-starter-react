const { useState } = React

import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { userService } from "../services/user.service.js"

export function LoginSignup({ onSetUser }) {

    const [credentials, setCredentails] = useState(userService.getEmptyCredentials())
    const [isSignup, setIsSignUp] = useState(false)


    console.log('credentials', credentials);
    
    function handleChange({ target }) {
        
        const { name: field, value } = target
        setCredentails(prevCred => ({ ...prevCred, [field]: value }))

    }



    function handleSubmit(ev) {
        console.log('HANDLE SUBMIT credentials', isSignup, credentials);
        
        ev.preventDefault()
        isSignup ? signup(credentials) : login(credentials)
    }
    function login(credentials) {
        userService.login(credentials)
            .then(onSetUser)
            .then(() => { showSuccessMsg('Logged in successfully') })
            .catch((err) => { showErrorMsg('Oops try again') })
    }

    function signup(credentials) {
        userService.signup(credentials)
            .then(onSetUser)
            .then(() => { showSuccessMsg('Signed in successfully') })
            .catch((err) => { showErrorMsg('Oops try again') })
    }

    return <section>
        <form onSubmit={handleSubmit}>
            <input type="text"
                    name="username"
                    value={credentials.username}
                    placeholder="Username"
                    onChange={handleChange}
                    required
                    autoFocus />
            <input   type="password"
                    name="password"
                    value={credentials.password}
                    placeholder="Password"
                    onChange={handleChange}
                    required
                    autoComplete="off" />
            <button>{isSignup ? 'Signup' : 'Login'}</button>
        </form>

        <div className="btns">
            <a href="#" onClick={() => setIsSignUp(!isSignup)}>
                {isSignup ?
                    'Already a member? Login' :
                    'New user? Signup here'
                }
            </a >
        </div>
    </section>
}