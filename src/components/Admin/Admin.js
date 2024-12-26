import SideBar from "./SideBar"
import { FaBars } from 'react-icons/fa'
import { useState } from "react"
import { Outlet } from 'react-router-dom'
import PerfectScrollbar from 'react-perfect-scrollbar'
import Language from '../Header/Language'
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useTranslation } from 'react-i18next';
import './Admin.scss'

const Admin = (props) => {

    const [collapsed, setCollapsed] = useState(false)
    const { t, i18n } = useTranslation();

    return (
        <div className="admin-container">
            <div className="admin-sidebar">
                <SideBar collapsed={collapsed} />
            </div>

            <div className="admin-content">
                <div className="admin-header">
                    <span onClick={() => setCollapsed(!collapsed)}>
                        <FaBars className="left_side"/> 
                    </span>
                    <div className="right_side">
                        <Language />
                        <NavDropdown title={i18n.language === 'vi' ? "Cài đặt" : "Settings"} id="basic-nav-dropdown">
                            <NavDropdown.Item>{t('navDropdownSetting.profile')}</NavDropdown.Item>
                            <NavDropdown.Item>{t('navDropdownSetting.logout')}</NavDropdown.Item>
                        </NavDropdown>
                    </div>
                </div>
                
                    <div className="admin-main">
                        <PerfectScrollbar>
                            <Outlet />
                        </PerfectScrollbar>
                    </div>
            </div>
        </div>
    )
}

export default Admin