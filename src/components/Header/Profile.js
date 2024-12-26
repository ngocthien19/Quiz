import Modal from 'react-bootstrap/Modal';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Button from 'react-bootstrap/Button';
import Info from './Info';
import Password from './Password';
import History from './History';
import { useTranslation } from 'react-i18next';

function Profile({ show, setShow, account }) {
    const { t, i18n } = useTranslation();
    const handleClose = () => {
        setShow(false)
    }

    return (
        <>
            <Modal 
                show={show} 
                onHide={handleClose}
                backdrop='static'
                size='xl'
            >
                <Modal.Header closeButton>
                    <Modal.Title>{t('profile.title')}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Tabs
                        defaultActiveKey="profile"
                        id="uncontrolled-tab-example"
                        className="mb-3"
                    >
                        <Tab eventKey="main_info" title={i18n.language === 'vi' ? "Thông tin cá nhân" : "Personal Information"}>
                            <Info 
                                account={account}
                            />
                        </Tab>
                        <Tab eventKey="password" title={i18n.language === 'vi' ? "Mật Khẩu" : "Password"}>
                            <Password />
                        </Tab>
                        <Tab eventKey="history" title={i18n.language === 'vi' ? "Lịch sử làm Quiz" : "History doing Quiz"}>
                            <History />
                        </Tab>
                    </Tabs>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        {t('profile.close')}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Profile