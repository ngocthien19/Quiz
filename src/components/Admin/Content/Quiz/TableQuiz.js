import { useEffect, useState } from "react"
import { getAllQuizForAdmin } from "../../../../services/apiService"
import ModalUpdateQuiz from "./ModalUpdateQuiz"
import ModalDeleteQuiz from "./ModalDeleteQuiz"
import { useTranslation } from 'react-i18next';

function TableQuiz() {
    const { t } = useTranslation();

    const [listQuiz, setListQuiz] = useState([])
    const [showModalUpdateQuiz, setModalUpdateQuiz] = useState(false)
    const [showModalDeleteQuiz, setModalDeleteQuiz] = useState(false)

    const [dataUpdate, setDataUpdate] = useState({})
    const [dataDelete, setDataDelete] = useState({})
    

    useEffect(() => {
        fetchQuiz()
    }, [])

    const fetchQuiz = async () => {
        setDataUpdate({})
        setDataDelete({})
        let res = await getAllQuizForAdmin()
        if (res && res.EC === 0) {
            setListQuiz(res.DT)
        }
    }

    const handleUpdate = (quiz) => {
        setDataUpdate(quiz)
        setModalUpdateQuiz(true)
    }

    const handleDelete = (quiz) => {
        setDataDelete(quiz)
        setModalDeleteQuiz(true)
    }
    console.log(dataDelete)
    return (
        <>
            <div>{t('tableQuiz.list')}</div>
            <table className="table table-hover table-bordered my-2">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">{t('tableQuiz.name')}</th>
                        <th scope="col">{t('tableQuiz.desc')}</th>
                        <th scope="col">{t('tableQuiz.type')}</th>
                        <th scope="col">{t('tableQuiz.action')}</th>
                    </tr>
                </thead>
                <tbody>
                    {listQuiz && listQuiz.map((item, index) => {
                        return (
                            <tr key={`table-quiz-${index}`}>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.description}</td>
                                <td>{item.difficulty}</td>
                                <td style={{display: "flex", gap: "15px"}}>
                                    <button className="btn btn-warning" onClick={() => handleUpdate(item)}>{t('tableQuiz.edit')}</button>
                                    <button className="btn btn-danger" onClick={() => handleDelete(item)}>{t('tableQuiz.delete')}</button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <ModalUpdateQuiz 
                show={showModalUpdateQuiz}
                setShow={setModalUpdateQuiz}
                dataUpdate={dataUpdate}
                fetchQuiz={fetchQuiz}
                setDataUpdate={setDataUpdate}
            />
            <ModalDeleteQuiz
                show={showModalDeleteQuiz}
                setShow={setModalDeleteQuiz}
                dataDelete={dataDelete}
                fetchQuiz={fetchQuiz}
            />
        </>
    )
}

export default TableQuiz