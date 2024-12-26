import { useState, useEffect } from 'react'
import Select from 'react-select'
import { BsFillPatchPlusFill, BsPatchMinusFill } from 'react-icons/bs' 
import { AiFillPlusCircle, AiOutlineMinusCircle } from 'react-icons/ai' 
import { RiImageAddFill } from 'react-icons/ri'
import { v4 as uuidv4 } from 'uuid'
import { useTranslation } from 'react-i18next';
import Lightbox from "react-awesome-lightbox"
import _ from 'lodash'
import './Questions.scss'
import { toast } from 'react-toastify'
import { getAllQuizForAdmin, postCreateNewQuestionForQuiz, postCreateNewAnswerForQuestion } from '../../../../services/apiService'


function Questions () {
    const [selectedQuiz, setSelectedQuiz] = useState({})
    const { t } = useTranslation();
    const initQuestions = [
            {
                id: uuidv4(),
                description: '',
                imageFile: '',
                imageName: '',
                answers: [
                    {
                        id: uuidv4(),
                        description: '',
                        isCorrect: false,
                    },
                ]
            },
        ]

    const [questions, setQuestions] = useState(initQuestions)

    const [isPreviewImage, setIsPreviewImage] = useState(false)
    const [dataImagePreview, setDataImagePreview] = useState({
        title: '',
        url: '',
    })

    const [ListQuiz, setListQuiz] = useState([])

    useEffect(() => {
        fetchQuiz()
    }, [])

    const fetchQuiz = async () => {
        let res = await getAllQuizForAdmin()
        if (res && res.EC === 0) {
            let newQuiz = res.DT.map(item => {
                return {
                    value: item.id,
                    label: `${item.id} - ${item.description}`
                }
            })
            setListQuiz(newQuiz)
        }
    }

    const handleAddRemoveQuestion = (type, id) => {
        // ADD
        if (type === 'ADD') {
            const newQuestion = {
                id: uuidv4(),
                description: '',
                imageFile: '',
                imageName: '',
                answers: [
                    {
                        id: uuidv4(),
                        description: '',
                        isCorrect: false,
                    },
                ]
            }

            setQuestions([...questions, newQuestion])
        }

        // REMOVE
        if (type === 'REMOVE') {
            let questionsClone = _.cloneDeep(questions)
            questionsClone = questionsClone.filter((question) => question.id !== id)
            setQuestions(questionsClone)
        }
    }

    const handleAddRemoveAnswer = (type, questionId, answerId) => {
        // ADD
        let questionsClone = _.cloneDeep(questions)
        if (type === 'ADD') {
            const newAnswer = {
                        id: uuidv4(),
                        description: '',
                        isCorrect: false,
                    }
            let index = questionsClone.findIndex(item => item.id === questionId)
            questionsClone[index].answers.push(newAnswer)

            setQuestions(questionsClone)
        }

        // REMOVE
        if (type === 'REMOVE') {
            let index = questionsClone.findIndex(item => item.id === questionId)
            questionsClone[index].answers = questionsClone[index].answers.filter(item => item.id !== answerId)
            setQuestions(questionsClone)
        }
    }

    // handle Input
    const handleOnChange = (type, questionId, value) => {
        if (type === 'QUESTION') {
            let questionsClone = _.cloneDeep(questions)
            let index = questionsClone.findIndex(item => item.id === questionId)
            if (index > -1) {
                questionsClone[index].description = value
                setQuestions(questionsClone)
            }
        }
    }

    const handleOnChangeFileQuestion = (questionId, event) => {
        let questionsClone = _.cloneDeep(questions)
        let index = questionsClone.findIndex(item => item.id === questionId)
        if (index > -1 && event.target && event.target.files && event.target.files[0]) {
            questionsClone[index].imageFile = event.target.files[0]
            questionsClone[index].imageName = event.target.files[0].name
            setQuestions(questionsClone)
        }
    }

    const handleAnswerQuestion = (type, questionId, answerId, value) => {
        let questionsClone = _.cloneDeep(questions)
        let index = questionsClone.findIndex(item => item.id === questionId)
        if (index > -1) {
            questionsClone[index].answers= questionsClone[index].answers.map(answer => {
                if (answer.id === answerId) {
                    if (type === 'CHECKBOX') {
                        answer.isCorrect = value === true
                    } 
                    if (type === 'INPUT') {
                        answer.description = value
                    }
                }
                return answer
            })
            setQuestions(questionsClone)
        }
    }

    const handleSubmitQuestionForQuiz = async () => {
        // validate
        if (_.isEmpty(selectedQuiz)) {
            toast.error('Please select a Quiz!')
            return
        }

        // validate question
        let isValidQuestion = true
        let indexQuestion = 0
        for (let i = 0;i < questions.length; i++) {
            if (!questions[i].description) {
                isValidQuestion = false;
                indexQuestion = i
                break;
            }
        }
        if (isValidQuestion === false) {
            toast.error(`Not empty Question ${indexQuestion + 1}`)
            return
        }

        // validate answer
        let isValidAnswer = true
        let indexQ = 0, indexA = 0
        for (let i = 0; i < questions.length; i++) {
            for (let j = 0; j < questions[i].answers.length; j++) {
                if (!questions[i].answers[j].description) {
                    isValidAnswer = false;
                    indexA = j
                    break;
                }
                indexQ = i
                if (isValidAnswer === false) {
                    break;
                }
            }
        }
        if (isValidAnswer === false) {
            toast.error(`Not empty Answer ${indexA + 1} at Question ${indexQ + 1}`)
            return
        }

        // submit question
        for (const question of questions) {
            const q = await postCreateNewQuestionForQuiz(+selectedQuiz.value, question.description, question.imageFile)
            // submit answer
            for (const answer of question.answers) {
                await postCreateNewAnswerForQuestion(answer.description, answer.isCorrect, q.DT.id)
            }
        }

        toast.success('Create questions and answers successfully!')
        setQuestions(initQuestions)
    }

    const handlePreviewImage = (questionId) => {
        let questionsClone = _.cloneDeep(questions)
        let index = questionsClone.findIndex(item => item.id === questionId)
        if (index > -1) {
            setIsPreviewImage(!isPreviewImage)
            setDataImagePreview({
                title: questionsClone[index].imageName,
                url: URL.createObjectURL(questionsClone[index].imageFile),
            })
        }
    }
    return (
        <div className="questions-container">
            <div className="title">
                {t('questions.title')}
            </div>
            <hr />
            <div className="add-new-questions">
                <div className='col-6 form-group'>
                    <label className='mb-2'>{t('questions.select')}</label>
                    <Select
                        defaultValue={selectedQuiz}
                        onChange={setSelectedQuiz}
                        options={ListQuiz}
                    />
                </div>
                <div className='mt-3 mb-2'>
                    {t('questions.add')}
                </div>
                { questions && questions.length > 0 &&
                    questions.map((question, index) => {
                        return (
                            <div className='q-main mb-4' key={question.id}>
                                <div className='questions-content'>    
                                    <div className="form-floating desc">
                                        <input 
                                            type="text"
                                            className='form-control'
                                            placeholder="name@example.com"
                                            value={question.description}
                                            onChange={(event) => handleOnChange('QUESTION', question.id, event.target.value)}
                                        />
                                        <label htmlFor="floatingInput">{t('questions.question')} {index + 1} {t('questions.char')} {t('questions.description')}</label>
                                    </div>
                                    <div className='group-upload'>
                                        <label className='label-upload' htmlFor={`${question.id}`}>
                                            <RiImageAddFill className='icon'/>
                                            <span>{t('questions.image')}</span>
                                        </label>
                                        <input 
                                            id={`${question.id}`}
                                            type='file' 
                                            hidden
                                            onChange={(event) => handleOnChangeFileQuestion(question.id, event)}
                                        />
                                        <span className='q-preview'>{question.imageName ? 
                                                <span onClick={() => handlePreviewImage(question.id)}>{question.imageName}</span> 
                                                : 
                                                <span>{t('questions.upload')}</span>    
                                            }
                                        </span>
                                    </div>
                                    <div className='btn-add'>
                                        <span onClick={() => handleAddRemoveQuestion('ADD', '')}>
                                            <BsFillPatchPlusFill className='icon-add'/>
                                        </span>
                                        {questions.length > 1 && 
                                            <span onClick={() => handleAddRemoveQuestion('REMOVE', question.id)}>
                                                <BsPatchMinusFill className='icon-remove'/>
                                            </span>
                                        }
                                    </div>
                                </div>
                                {question.answers && question.answers.length > 0 &&
                                    question.answers.map((answer, index) => {
                                        return (
                                            <div className='answers-content' key={answer.id}>
                                                <input 
                                                    className="form-check-input iscorrect" 
                                                    type="checkbox" 
                                                    checked={answer.isCorrect}
                                                    onChange={(event) => handleAnswerQuestion('CHECKBOX', question.id, answer.id, event.target.checked)}
                                                />
                                                <div className="form-floating answer-name">
                                                    <input 
                                                        type="text" 
                                                        className='form-control'
                                                        placeholder="name@example.com"
                                                        value={answer.description}
                                                        onChange={(event) => handleAnswerQuestion('INPUT', question.id, answer.id, event.target.value)}
                                                    />
                                                    <label htmlFor="floatingInput">{t('questions.answer')} {index +  1}</label>
                                                </div>
                                                <div className='btn-group'>
                                                    <span onClick={() => handleAddRemoveAnswer('ADD', question.id)}>
                                                        <AiFillPlusCircle className='icon-add'/>
                                                    </span>
                                                    {question.answers.length > 1 && 
                                                        <span onClick={() => handleAddRemoveAnswer('REMOVE', question.id, answer.id)}>
                                                            <AiOutlineMinusCircle className='icon-remove'/>
                                                        </span>
                                                    }
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        )
                    })
                }
                {
                    questions && questions.length > 0 &&
                    <div>
                        <button 
                            className='btn btn-warning'
                            onClick={() => handleSubmitQuestionForQuiz()}
                        >
                            {t('questions.save')}
                        </button>
                    </div>
                }
                { isPreviewImage &&
                    <Lightbox 
                        image={dataImagePreview.url} 
                        title={dataImagePreview.title}
                        onClose={() => setIsPreviewImage(false)}
                    >
                    </Lightbox>
                }
            </div>
        </div>
    )
}

export default Questions