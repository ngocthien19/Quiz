import './Login.scss'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { postLogin } from '../../services/apiService'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { doLogin } from '../../redux/action/userAction'
import { ImSpinner10 } from 'react-icons/im'
import Language from '../Header/Language'

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [isLoading, setIsLoading] = useState(false)


    const validateEmail = (email) => {
        return String(email) 
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            )
    }

    const handleLogin = async () => {
        // validate 
        const isValidEmail = validateEmail(email);
        if (!isValidEmail) {
            toast.error('Invalid email')
            return
        }

        if(!password) {
            toast.error('Invalid password')
            return
        }
        setIsLoading(true)
        //submit    
        let data = await postLogin(email, password)
        if (data && data.EC === 0) {
            dispatch(doLogin(data))
            toast.success(data.EM)
            setIsLoading(false)
            navigate('/')
        }

        if (data && data.EC !== 0) {
            toast.error(data.EM)
            setIsLoading(false)
        }
    }

    const handleKetDown = (event) => {
        if (event && event.key === 'Enter') {
            handleLogin()
        }
    }
    
    return (
        <div className="login-container">
            <div className='header'>
                <span>Don't have ac account yet?</span>
                <button className='btn-signup'
                    onClick={() => navigate('/register')}
                >
                    Sign up
                </button>
                <Language />
            </div>
            <div className='title col-4 mx-auto'>
                HoiDanIT
            </div>
            <div className='welcome col-4 mx-auto'>
                Hello, who's this?
            </div>
            <div className='content-form col-4 mx-auto'>
                <div className='form-group'>
                    <label>Email</label>
                    <input 
                        type='email' 
                        className='form-control'
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    >
                        
                    </input>
                </div>

                <div className='form-group'>
                    <label>Password</label>
                    <input 
                        type='password' 
                        className='form-control'
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        onKeyDown={(event) => handleKetDown(event)}
                    >

                    </input>
                </div>
                <span className='forgot-password'>Forgot password ?</span>
                <div>
                    <button className='btn-submit'
                        onClick={() => handleLogin()}
                        disabled={isLoading}
                    >
                        {isLoading === true && <ImSpinner10 className='loader-icon'/> }
                        <span>Login to HoiDanIT</span>
                    </button>
                </div> 
                <div className='text-center back'>
                    <span onClick={() => navigate('/')}> &#60;&#60; Go to Homepage</span>
                </div>
            </div>
        </div>
    )
}

export default Login