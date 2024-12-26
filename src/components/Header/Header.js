import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { postLogOut } from '../../services/apiService';
import { toast } from 'react-toastify';
import { doLogout } from '../../redux/action/userAction';
import Language from './Language';
import { FaReact } from "react-icons/fa";
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import Profile from './Profile';

const Header = () => {
  const navigate = useNavigate()
  const { t, i18n } = useTranslation();

  const isAuthenticated = useSelector(state => state.user.isAuthenticated)
  const account = useSelector(state => state.user.account)
  const dispatch = useDispatch()
  const [showProfile, setShowProfile] = useState(false)

  const handleLogin = () => {
    navigate('/login')
  }

  const handleRegister = () => {
    navigate('/register')
  }

  const handleLogOut = async () => {
    let res = await postLogOut(account.email, account.refresh_token)
    if(res && res.EC === 0) {
      dispatch(doLogout())
      navigate('/login')
    } else {
      toast.error(res.EM)
    }
  }

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <NavLink to="/" className='navbar-brand'>
            <FaReact className='icon-react'/>
            Hoi Dan IT
          </NavLink>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                  <NavLink to="/" className='nav-link'>{t('header.home')}</NavLink>
                  <NavLink to="/users" className='nav-link'>{t('header.users')}</NavLink>  
                  <NavLink to="/admin" className='nav-link'>{t('header.admin')}</NavLink>  
              </Nav>
              <Nav>
              <Language />
                {!isAuthenticated ? 
                  <>
                    <button className='btn-login' onClick={() => handleLogin()}>{t('login_signup.login')}</button>
                    <button className='btn-signup' onClick={() => handleRegister()}>{t('login_signup.signup')}</button>
                  </>
                  :
                  <NavDropdown title={i18n.language === 'vi' ? "Cài đặt" : "Settings"} id="basic-nav-dropdown">
                      <NavDropdown.Item onClick={() => setShowProfile(true)}>{t('navDropdownSetting.profile')}</NavDropdown.Item>
                      <NavDropdown.Item onClick={() => handleLogOut()}>{t('navDropdownSetting.logout')}</NavDropdown.Item>
                  </NavDropdown>
                }
              </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Profile
        show={showProfile}
        setShow={setShowProfile}
        account={account}
      />
    </>
  );
}

export default Header;