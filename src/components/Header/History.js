import { useState, useEffect } from "react"
import { getHistory } from "../../services/apiService"
import  moment from "moment"  
import { useTranslation } from 'react-i18next';

function History() {
    const [listHistory, setListHistory] = useState([])
    const { t, i18n } = useTranslation();
    useEffect(() => {
        fetchHistoryData()
    }, [])

    const fetchHistoryData = async () => {
        let res = await getHistory()
        if(res && res.EC === 0) {
            let newData = res?.DT?.data?.map(item => {
                return {
                    total_correct: item.total_correct,
                    total_questions: item.total_questions,
                    name: item?.quizHistory?.name ?? "N/A",
                    id: item.id,
                    date: moment(item.createdAt).utc().format('DD/MM/YYYY hh:mm:ss A')
                }
            })
            setListHistory(newData)
        }
    }
    return (
        <div>
            <table className="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">{t('history.name')}</th>
                        <th scope="col">{t('history.question')}</th>
                        <th scope="col">{t('history.correct')}</th>
                        <th scope="col">{t('history.date')}</th>
                    </tr>
                </thead>
                <tbody>
                    {listHistory && listHistory.length > 0 && 
                        listHistory.map((item, index) => {
                            return (
                                <tr key={`table-user-${index}`}>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.total_questions}</td>
                                    <td>{item.total_correct}</td>
                                    <td>{item.date}</td>
                                </tr>
                            )
                        })
                    }

                    {listHistory && listHistory.length === 0 && 
                        <tr>
                            <td colSpan={'4'}>{t('history.not_found')}</td>
                        </tr>
                    }
                </tbody>
            </table>
        </div>
    )
}

export default History