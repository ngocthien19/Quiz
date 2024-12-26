import { useEffect, useState } from 'react';
import { FcPlus } from 'react-icons/fc';
import { postUpdateProfile } from '../../services/apiService';
import Button from 'react-bootstrap/Button';
import { useTranslation } from 'react-i18next';
import './Info.scss'
import _ from 'lodash'
import { toast } from 'react-toastify';

function Info({ account }) {

    const { t, i18n } = useTranslation();

    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [role, setRole] = useState("USER")
    const [userImage, setUserImage] = useState("")
    const [previewImage, setPreviewImage] = useState("")

    useEffect(() => {
    if (!_.isEmpty(account)) {
        setEmail(account.email)
        setUsername(account.username)
        setRole(account.role)
        if (account.image)
          setPreviewImage(`data:image/jpeg;base64,${account.image}`)
    }
  }, [account])

    const handleUploadImage = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            setPreviewImage(URL.createObjectURL(event.target.files[0]))
            setUserImage(event.target.files[0])
        } else {
        // setPreviewImage("")
        }
    }

    const handleSubmitInfoProfile = async () => {
        // Kiểm tra file và username trước khi gửi
        if (!username) {
            toast.error("Username is required");
            return;
        }

        let res = await postUpdateProfile(username, userImage);
        console.log(res);

        if (res && res.EC === 0) {
            toast.success("Profile updated successfully!");
        } else {
            toast.error("Failed to update profile");
        }
    }

    return (
        <>
            <form className="row g-3 info-container">
                <div className="col-md-4">
                    <label className="form-label">Email</label>
                    <input 
                        type="email" 
                        className="form-control" 
                        value={email}
                        disabled
                    />
                </div>
                <div className="col-md-4">
                    <label className="form-label">{t('info.username')}</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                    />
                </div>
                <div className="col-md-4">
                    <label className="form-label">{t('info.role')}</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        value={role}
                        disabled
                    />
                </div>
                <div className='col-md-12'>
                    <label className="form-label label-upload" htmlFor='labelUpload'>
                        <FcPlus />
                        {t('info.image')}
                    </label>
                    <input 
                        type='file' 
                        hidden 
                        id='labelUpload'
                        onChange={(event) => handleUploadImage(event)}
                    />
                </div>
                <div className='col-md-12 img-review'>
                    {previewImage ?
                        <img src={previewImage}/>
                        :
                        <span>{t('info.preview')}</span>
                    }
                </div>
            </form>
            <Button variant="primary" onClick={handleSubmitInfoProfile}>
                {t('info.button')}
            </Button>
        </>
    )
}

export default Info