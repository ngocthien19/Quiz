import { useState } from 'react';
import { postUpdatePassword } from '../../services/apiService';
import Button from 'react-bootstrap/Button';
import _ from 'lodash'
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
function Password() {
    const { t, i18n } = useTranslation();

    const [currentPassword, setCurrentPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const handleSubmitChangePassword = async () => {
        if(!currentPassword || !newPassword || !confirmPassword) {
            toast.error('Invalid password')
            return
        }
        if (newPassword !== confirmPassword) {
            toast.error('Confirm password does not match')
            return
        }


        let data = await postUpdatePassword(currentPassword, newPassword)
        console.log(data)
        if (data && data.EC === 0) {
            toast.success(data.EM)
            setCurrentPassword("")
            setNewPassword("")
            setConfirmPassword("")
        }
    }

    return (
        <>
            <form className="row g-3 info-container mb-3">
                <div className="col-md-4">
                    <label className="form-label">{t('password.current')}</label>
                    <input 
                        type="email" 
                        className="form-control" 
                        value={currentPassword}
                        onChange={(event) => setCurrentPassword(event.target.value)}
                    />
                </div>
                <div className="col-md-4">
                    <label className="form-label">{t('password.new')}</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        value={newPassword}
                        onChange={(event) => setNewPassword(event.target.value)}
                    />
                </div>
                <div className="col-md-4">
                    <label className="form-label">{t('password.confirm')}</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        value={confirmPassword}
                        onChange={(event) => setConfirmPassword(event.target.value)}
                    />
                </div>
            </form>
            <Button variant="primary" onClick={handleSubmitChangePassword} >
                {t('info.button')}
            </Button>
        </>
    )
}

export default Password
