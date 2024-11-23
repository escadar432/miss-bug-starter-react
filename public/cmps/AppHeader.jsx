const { Link,NavLink } = ReactRouterDOM

const { useState } = React
const { useNavigate } = ReactRouter

import { userService } from '../services/user.service.js'
import { LoginSignup } from './LoginSignup.jsx'

export function AppHeader() {

    const [user, setUser] = useState(userService.getLoggedinUser())
	const navigate = useNavigate()

	function onLogout() {
		userService.logout()
            .then(() => onSetUser(null))
            .catch(err => showErrorMsg('OOPs try again'))
	}


    function onSetUser(user) {
		setUser(user)
        navigate('/')
	}

    return (
        <header className='container'>
            <section className="header-container">
                <nav>
                    <NavLink to="/">Home</NavLink> |<NavLink to="/bug">Bugs</NavLink> |
                    <NavLink to="/about">About</NavLink>
                    <NavLink to="/bug">Bugs</NavLink>
                </nav>
            </section>
            {user ?
                (<section>
                    <Link className="header-username" to={`/user/${user._id}`}> Hello  {user.fullname}</Link>
                    <button onClick={onLogout}>Logout</button>

                </section>
                ) : 
                (<section>
                    <LoginSignup onSetUser={onSetUser} />
                </section>)
            }

        </header>
    )
}
