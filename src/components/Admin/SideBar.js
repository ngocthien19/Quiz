import 'react-pro-sidebar/dist/css/styles.css'
import { Link, useNavigate } from 'react-router-dom'
import { ProSidebar, Menu, MenuItem, SubMenu, SidebarHeader, SidebarFooter, SidebarContent } from 'react-pro-sidebar'
import { FaGem, FaTachometerAlt, FaList, FaGithub } from 'react-icons/fa'
import { useTranslation } from 'react-i18next';
import sidebarBg from '../../assets/bg2.jpg'
import { DiReact } from 'react-icons/di'
import './SideBar.scss'

function SideBar({ image, collapsed, toggled, handleToggleSidebar }) {
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();

    return (
        <>
            <ProSidebar
                image={sidebarBg}
                collapsed = {collapsed}
                toggled = {toggled}
                breakPoint='md'
                onToggle={handleToggleSidebar}
            >
                <SidebarHeader>
                    <div
                        style={{
                            padding: '24px',
                            textTransform: 'uppercase',
                            fontWeight: 'bold',
                            fontSize: 14,
                            letterSpacing: '1px',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                        }}
                    >
                        <div onClick={() => navigate('/')} className='pointer'>
                            <DiReact size={'3em'} color={'00bfff'} />
                            <span>Hoi Dan IT</span>
                        </div>
                    </div>
                </SidebarHeader>

                <SidebarContent>
                    <Menu iconShape='circle'>
                        <MenuItem
                            icon={<FaTachometerAlt />}
                        >
                            {t('sidebar.dashboard')}
                            <Link to='/admin' />
                        </MenuItem>
                    </Menu>
                    <Menu icon="circle">
                        <SubMenu
                            icon={<FaGem />}  
                            title={i18n.language === 'vi' ? "Quản lý" : "Features"}
                        >
                            <MenuItem>
                                {t('sidebar.user')}
                                <Link to='/admin/manage-users' />
                            </MenuItem>
                            <MenuItem>
                                {t('sidebar.quiz')}
                                <Link to='/admin/manage-quizzes'/>
                            </MenuItem>
                            <MenuItem>
                                {t('sidebar.question')}
                                <Link to='/admin/manage-questions'/>
                            </MenuItem>    
                        </SubMenu>
                    </Menu>
                </SidebarContent>

                <SidebarFooter style={{ textAlign: 'center' }}>
                    <div
                        className='sidebar-btn-wrapper'
                        style={{
                            padding: '20px 24px', 
                        }}
                    >
                        <a
                            href='https://github.com/azouaoui-med/react-pro-sidebar'
                            target='_blank'
                            className='sidebar-btn'
                            rel='noopener noreferrer'
                        >
                            <FaGithub />
                            <span style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                                {t('sidebar.view')}
                            </span>
                        </a>
                    </div>
                </SidebarFooter>
            </ProSidebar>;
        </>
    )
}

export default SideBar