import videoHomePage from '../../assets/hero.mp4'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useTranslation, Trans } from 'react-i18next';

const HomePage = () => {

    const isAuthenticated = useSelector(state => state.user.isAuthenticated)
    const navigate = useNavigate()
    const { t } = useTranslation();

    return (
        <div className="homepage-container">
            <video poster="/static/homepage/hero/hero-poster.webp" width="750px" loop autoPlay playsInline preload='none' x-webkit-airplay="deny">
                <source data-testid="currentDefaultVideo" src={videoHomePage} type="video/mp4" />
            </video>

            <div className='homepage-content'>
                <h1 className='title'>
                    {t('homepage.title1')}
                </h1>
                <p className='desc'>
                    {t('homepage.desc')}
                </p>
                {isAuthenticated === false ? 
                    <button className='btn-action' onClick={() => navigate('/login')}>{t('homepage.btn_action.login')}</button>
                    :   
                    <button className='btn-action' onClick={() => navigate('/users')}>{t('homepage.btn_action.doing')}</button>
                }
            </div>
        </div>
    )
}

export default HomePage