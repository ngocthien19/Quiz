import './Register.scss'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { postRegister } from '../../services/apiService'
import { toast } from 'react-toastify'
import { FaEye, FaEyeSlash   } from "react-icons/fa";
import Language from '../Header/Language'

function Register() {
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [isShowPassword, setIsShowPassword] = useState(false)

    const navigate = useNavigate()

    const validateEmail = (email) => {
        return String(email) 
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            )
    }

    const handleRegister = async () => {
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
        //submit
        let data = await postRegister(email, password, username)
        if (data && data.EC === 0) {
            toast.success(data.EM)
            navigate('/login')
        }

        if (data && data.EC !== 0) {
            toast.error(data.EM)
        }
    }
    return (
        <div className="register-container">
            <div className='header'>
                <span>Already have an account? </span>
                <button className='btn-login' onClick={() => navigate('/login')}>Log in</button>
                <Language />
            </div>
            <div className='title col-4 mx-auto'>
                Hỏi Dân IT &amp; Eric
            </div>
            <div className='welcome col-4 mx-auto'>
                Start your journey?
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
                    <div className='form-container'>
                        <input 
                            type={isShowPassword ? 'text' : 'password'} 
                            className='form-control'
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                        >
                        </input>
                        {isShowPassword ?
                            <span className='eye' onClick={() => setIsShowPassword(false)}>
                                <FaEye />
                            </span>
                            :
                            <span className='eye' onClick={() => setIsShowPassword(true)}>
                                <FaEyeSlash />
                            </span>
                        }
                    </div>
                </div>  
                 <div className='form-group'>
                    <label>Username</label>
                    <input 
                        type='text' 
                        className='form-control'
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                    >

                    </input>
                </div>
                <div>
                    <button className='btn-submit'
                        onClick={() => handleRegister()}
                    >
                        Create my free account  
                    </button>
                </div>
                <div className='text-center back'>
                    <span onClick={() => navigate('/')}> &#60;&#60; Go to Homepage</span>
                </div>
            </div>
        </div>
    )
}

export default Register