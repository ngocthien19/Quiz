import { useState } from 'react'
import Select from 'react-select'
import { postCreateNewQuiz } from '../../../../services/apiService'
import { toast } from 'react-toastify'
import './ManageQuiz.scss'
import TableQuiz from './TableQuiz'
import Accordion from 'react-bootstrap/Accordion';
import QuizQA from './QuizQA'
import AssignQuiz from './AssginQuiz'
import { useTranslation } from 'react-i18next';


const options = [
  { value: 'EASY', label: 'EASY' },
  { value: 'MEDIUM', label: 'MEDIUM' },
  { value: 'HARD', label: 'HARD' },
];
function ManageQuiz() {
    const { t } = useTranslation();
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [type, setType] = useState('')
    const [image, setImage] = useState(null)

    const handleChangeFile = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            setImage(event.target.files[0])
        } 
    }

    const handleSubmitQuiz = async () => {
        // validate
        if (!name || !description) {
            toast.error('Name/ Description is required')
            return 
        }

        let res = await postCreateNewQuiz(description, name, type?.value, image)
        if (res && res.EC === 0) {
            toast.success(res.EM)
            setName('')
            setDescription('')
            setImage(null)
        } else {
            toast.error(res.EM)
        }
    }

    return (
        <div className="quiz-container">
            <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                    <Accordion.Header>{t('manageQuiz.title')}</Accordion.Header>
                    <Accordion.Body>
                        <div className="add-new">
                            <fieldset className="border rounded-3 p-3">
                                <legend className="float-none w-auto px-3">{t('manageQuiz.legend')}</legend>
                                <div className="form-floating mb-3">
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        placeholder='your quiz name' 
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                    <label htmlFor="floatingInput">{t('manageQuiz.name')}</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        placeholder='description...'
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    />
                                    <label htmlFor="floatingPassword">{t('manageQuiz.desc')}</label>
                                </div>
                                <div className='my-3'>
                                    <Select
                                        defaultValue={type}
                                        onChange={setType}
                                        options={options}
                                        placeholder={"Quiz type..."}
                                    />
                                </div>
                                <div className='more-actions form-group' >
                                    <label className='mb-1'>{t('manageQuiz.image')}</label>
                                    <input 
                                        type='file' 
                                        className='form-control'
                                        onChange={(event) => handleChangeFile(event)}
                                    />
                                </div>
                                <div className='mt-3'>
                                    <button 
                                        className='btn btn-warning'
                                        onClick={() => handleSubmitQuiz()}
                                    >
                                        {t('manageQuiz.save')}
                                    </button>
                                </div>
                            </fieldset>
                        </div>
                        <div className="list-detail">
                            <TableQuiz />
                        </div>
                    </Accordion.Body>
                </Accordion.Item>

                {/* Item 2 */}
                <Accordion.Item eventKey="1">
                    <Accordion.Header>{t('manageQuiz.update')}</Accordion.Header>
                    <Accordion.Body>
                        <QuizQA />
                    </Accordion.Body>
                </Accordion.Item>

                {/* item 3 */}
                <Accordion.Item eventKey="2">
                    <Accordion.Header>{t('manageQuiz.assign')}</Accordion.Header>
                    <Accordion.Body>
                        <AssignQuiz />
                    </Accordion.Body>
                </Accordion.Item>

            </Accordion>
        </div>
    )
}

export default ManageQuiz