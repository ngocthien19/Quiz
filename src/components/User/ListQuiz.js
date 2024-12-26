import { useEffect, useState } from "react"
import { getQuizByUser } from "../../services/apiService"
import { useNavigate } from "react-router-dom"
import { useTranslation } from 'react-i18next';
import './ListQuiz.scss'

function ListQuiz() {
    const navigate = useNavigate()
    const { t } = useTranslation();

    const [arrQuiz, setArrQuiz] = useState([]) 

    useEffect(() => {
        getQuizData()
    }, [])

    const getQuizData = async () => {
        const res = await getQuizByUser()
        if (res && res.EC === 0 ) { 
            setArrQuiz(res.DT)
        }
    }
    return (
        <div className="list-quiz-container container">
            {arrQuiz && arrQuiz.length > 0 &&
                arrQuiz.map((quiz, index) => {
                    return (
                        <div className="card" style={{width: "18rem"}} key={index}>
                            <img src={`data:image/jpeg;base64,${quiz.image}`} className="card-img-top" alt="..." />
                            <div className="card-body">
                                <h5 className="card-title">{t('listQuiz.quiz')} {index + 1}</h5>
                                <p className="card-text">{quiz.description}</p>
                                <button className="btn-action" onClick={() => navigate(`/quiz/${quiz.id}`, { state: { quizTitle: quiz.description } })}>
                                    {t('listQuiz.button')}
                                </button>
                            </div>
                        </div>
                    )
                })
            }

            {arrQuiz && arrQuiz.length === 0 &&
                <div>
                    {t('listQuiz.desc')}
                </div>
            }
        </div>
    )
}

export default ListQuiz