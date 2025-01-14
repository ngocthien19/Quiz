import axios from '../utils/axiosCustomize'

const postCreateNewUser = (email, password, username, role, userImage) => {
    // submit data
    const data = new FormData()

    data.append('email', email)
    data.append('password', password)
    data.append('username', username)
    data.append('role', role)
    data.append('userImage', userImage)
    return axios.post( 'api/v1/participant', data)
}

const getAllUsers = () => {
    return axios.get( 'api/v1/participant/all')
}

const putUpdateNewUser = (id, username, role, userImage) => {
    // submit data
    const data = new FormData()

    data.append('id', id)
    data.append('username', username)
    data.append('role', role)
    data.append('userImage', userImage)
    return axios.put( 'api/v1/participant', data)
}

const deleteUser = (userId) => {
    return axios.delete( 'api/v1/participant', {data: {id : userId} })
}

const getUserWithPaginate = (page, limit) => {
    return axios.get(`api/v1/participant?page=${page}&limit=${limit}`)
}

const postLogin = (email, password) => {
    return axios.post(`api/v1/login`, {email, password, delay: 5000})
}

const postRegister = (email, password, username) => {
    return axios.post(`api/v1/register`, {email, password, username})
}

const getQuizByUser = () => {
    return axios.get('api/v1/quiz-by-participant')
}

const getDataQuiz = (id) => {
    return axios.get(`api/v1/questions-by-quiz?quizId=${id}`)
}

const postSubmitQuiz = (data) => {
    return axios.post(`api/v1/quiz-submit`, {...data})
}

const postCreateNewQuiz = (description, name, difficulty, image) => {
    const data = new FormData()

    data.append('description', description)
    data.append('name', name)
    data.append('difficulty', difficulty)
    data.append('quizImage', image)
    return axios.post('api/v1/quiz', data)
}

const getAllQuizForAdmin = (id) => {
    return axios.get(`api/v1/quiz/all`)
}

const putUpdateQuizForAdmin = (id, description, name, difficulty, image) => {
    // submit data
    const data = new FormData()

    data.append('id', id)
    data.append('description', description)
    data.append('name', name)
    data.append('difficulty', difficulty)
    data.append('quizImage', image)
    return axios.put( 'api/v1/quiz', data)
}

const deleteQuizForAdmin = (id) => {
    return axios.delete( `api/v1/quiz/${id}`)
}

const postCreateNewQuestionForQuiz = (quiz_id, description, questionImage) => {
    const data = new FormData()

    data.append('quiz_id', quiz_id)
    data.append('description', description)
    data.append('questionImage', questionImage)
    return axios.post( 'api/v1/question', data)
} 

const postCreateNewAnswerForQuestion = (description, correct_answer, question_id) => {
    return axios.post( 'api/v1/answer', {
        description, correct_answer, question_id
    })
} 

const postAssignQuiz = (quizId, userId) => {
    return axios.post( 'api/v1/quiz-assign-to-user', {
        quizId, userId
    })
}

const getQuizWithQA = (quizId) => {
    return axios.get(`api/v1/quiz-with-qa/${quizId}`)
}

const postUpsertQA = (data) => {
    return axios.post('api/v1/quiz-upsert-qa', {...data})
}

const postLogOut = (email, refresh_token) => {
    return axios.post('api/v1/logout', {
        email, refresh_token
    })
}

const getOverview = () => {
    return axios.get('api/v1/overview')
}

const postUpdateProfile = (username, userImage) => {
    let formData = new FormData();
    formData.append('username', username);
    formData.append('userImage', userImage); // Gửi file ảnh

    return axios.post('api/v1/profile', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
};

const getHistory = () => {
    return axios.get('api/v1/history')
}
const postUpdatePassword = (current_password, new_password) => {
    return axios.post('api/v1/change-password', {
        current_password, new_password
    })
}


export { postCreateNewUser, getAllUsers, putUpdateNewUser,
    deleteUser, getUserWithPaginate, postLogin, postRegister,
    getQuizByUser, getDataQuiz, postSubmitQuiz, postCreateNewQuiz,
    getAllQuizForAdmin, putUpdateQuizForAdmin, deleteQuizForAdmin,
    postCreateNewQuestionForQuiz, postCreateNewAnswerForQuestion,
    postAssignQuiz, getQuizWithQA, postUpsertQA, postLogOut,
    getOverview, postUpdateProfile, postUpdatePassword, getHistory
}