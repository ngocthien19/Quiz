import './DashBoard.scss'
import { ResponsiveContainer, BarChart, XAxis, YAxis, Tooltip, Legend, Bar } from 'recharts';
import { getOverview } from '../../../services/apiService';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next';

const DashBoard = (props) => {
    const { t, i18n } = useTranslation();
    const [dataOverview, setDataOverview] = useState([])
    const [dataChart, setDataChart] = useState([])

    useEffect(() => {
        fetchDataOverview()
    }, [])

    const fetchDataOverview = async () => {
        let res = await getOverview()
        if (res && res.EC === 0) {
            setDataOverview(res.DT)
            // data hien thi chart

            let Us = 0, Qz = 0, Qs = 0, As = 0
            Us = res?.DT?.users?.total ?? 0
            Qz = res?.DT?.others?.countQuiz ?? 0
            Qs = res?.DT?.others?.countQuestions ?? 0
            As = res?.DT?.others?.countAnswers ?? 0

            const data = [
                {
                    name: "Users",
                    Us
                },
                {
                    name: "Quizzes",
                    Qz
                },
                {
                    name: "Questions",
                    Qs
                },
                {
                    name: "Answers",
                    As
                },
            ]
            setDataChart(data)
        } else {
            toast.error(res.EM)
        }
    }
 
    return (
        <div className="dashboard-container">
            <h1 className='title'>{t('dashboard.title')}</h1>
            <p className='desc'>{t('dashboard.desc')}</p>
            <div className='content'>
                <div className='content-left'>
                    <div className='box'>
                        <div className='title-1'>{t('dashboard.user')}</div>
                        <div className='stat'>
                            {dataOverview && dataOverview.users &&
                                dataOverview.users.total ? <>{dataOverview.users.total}</> : <>0</>
                            }
                        </div>
                    </div>
                    <div className='box'>
                        <div className='title-1'>{t('dashboard.question')}</div>
                        <div className='stat'>
                            {dataOverview && dataOverview.others &&
                                dataOverview.others.countQuestions ? <>{dataOverview.others.countQuestions}</> : <>0</>
                            }
                        </div>
                    </div>
                    <div className='box'>
                        <div className='title-1'>{t('dashboard.quiz')}</div>
                        <div className='stat'>
                            {dataOverview && dataOverview.others &&
                                dataOverview.others.countQuiz ? <>{dataOverview.others.countQuiz}</> : <>0</>
                            }
                        </div>
                    </div>
                    <div className='box'>
                        <div className='title-1'>{t('dashboard.answer')}</div>
                        <div className='stat'>
                            {dataOverview && dataOverview.others &&
                                dataOverview.others.countAnswers ? <>{dataOverview.others.countAnswers}</> : <>0</>
                            }
                        </div>
                    </div>
                </div>
                <div className='content-right'>
                    <ResponsiveContainer width='100%' height={"100%"}>
                        <BarChart data={dataChart}>
                            <XAxis dataKey="name" />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="Us" fill="#7B68EE" />
                            <Bar dataKey="Qz" fill="#8884d8" />
                            <Bar dataKey="Qs" fill="#82ca9d" />
                            <Bar dataKey="As" fill="#fcb12a" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    )
}

export default DashBoard