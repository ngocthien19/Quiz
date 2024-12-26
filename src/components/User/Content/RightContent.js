import CountDown from "./CountDown"
import { useEffect, useRef } from "react"

function RightContent({ dataQuiz, handleFinishQuiz, setIndex }) {

    const refDiv = useRef([])

    const onTimeUp = () => {
        handleFinishQuiz()
    }

    const getClassQuestion = (question) => {
        for (const q of question.answers) {
            if (q.isSelected === true) {
                return "question selected"
            }
        }       
        return "question"
    }

    const handleClickQuestion = (index, question) => {
        setIndex(index)
        if (refDiv.current) {
            refDiv.current.forEach((item) => {
                if (item && item.className === "question clicked") {
                    item.className = "question"
                }
            })
        }
        for (const q of question.answers) {
            if (q.isSelected === true) {
                return
            }
        }   
        refDiv.current[index].className = "question clicked"
    }

    return (
        <>
            <div className="main-timer">
                <CountDown
                    onTimeUp={onTimeUp}
                />
            </div>
            <div className="main-question">
                {dataQuiz && dataQuiz.length > 0 &&
                    dataQuiz.map((item, index) => {
                        return (
                                <div 
                                    className={getClassQuestion(item)}
                                    key={item.questionId}
                                    onClick={() => handleClickQuestion(index, item)}
                                    ref={ref => refDiv.current[index] = ref}
                                >
                                    {index + 1}
                                </div>
                        )
                    })
                }
            </div>
            
        </>
    )
}

export default RightContent