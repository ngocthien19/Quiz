import ModalCreateUser from "./ModalCreateUser"
import './ManageUser.scss'
import { FcPlus } from 'react-icons/fc'
import { useEffect, useState } from "react"
import { getAllUsers, getUserWithPaginate } from "../../../services/apiService"
import ModalUpdateUser from "./ModalUpdateUser"
import ModalViewUser from "./ModalViewUser"
import ModalDeleteUser from "./ModalDeleteUser"
import TableUserPaginate from "./TableUserPaginate"
import { useTranslation } from 'react-i18next';

const ManageUser = (props) => {
    const { t } = useTranslation();
    const LIMIT_USER = 5   
    const [pageCount, setPageCount] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)

    const [showModalCreateUser, setShowModalCreateUser] = useState(false)
    const [showModalUpdateUser, setShowModalUpdateUser] = useState(false)
    const [dataUpdate, setDataUpdate] = useState({})
    
    const [showModalView, setShowModalView] = useState(false)
    const [dataView, setDataView] = useState({})
    
    const [showModalDeleteUser, setShowModalDeleteUser] = useState(false)
    const [dataDelete, setDataDelete] = useState({})

    const [listUsers, setListUsers] = useState([])

    useEffect(() => {
        // fetchListUsers()  
        fetchListUsersWithPaginate(1)
          
    }, [])

    const fetchListUsers = async() => {
        let res = await getAllUsers()
        if (res.EC === 0) {
            setListUsers(res.DT)
        }
    }

    const fetchListUsersWithPaginate = async(page) => {
        let res = await getUserWithPaginate(page, LIMIT_USER)
        if (res.EC === 0) {
            setListUsers(res.DT.users)
            setPageCount(res.DT.totalPages)
        }
    }

    const handleClickBtnUpdate = (user) => {
        setShowModalUpdateUser(true)
        setDataUpdate(user)
    }

    const resetUpdateUser = (user) => {
        setDataUpdate(user)
    }

    const handleClickBtnView = (user) => {
        setShowModalView(true)
        setDataView(user)
    }

    const handleClickBtnDelete = (user) => {
        setShowModalDeleteUser(true)
        setDataDelete(user)
    }
    return (
        <div className="manage-user-container">
            <div className="title"> 
                {t('manageUser.title')}
            </div>
            <div className="users-content">
                <div className="btn-add-new">
                    <button className="btn btn-primary"
                        onClick={() => setShowModalCreateUser(true)}
                    >
                        <FcPlus />
                        {t('manageUser.button')}
                    </button>
                </div>
                <div className="table-users-container">
                    <TableUserPaginate 
                        listUsers={listUsers} 
                        handleClickBtnUpdate={handleClickBtnUpdate}
                        handleClickBtnView={handleClickBtnView}
                        handleClickBtnDelete={handleClickBtnDelete}
                        fetchListUsersWithPaginate={fetchListUsersWithPaginate}
                        pageCount={pageCount}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                    />
                </div>
                <ModalCreateUser 
                    show={showModalCreateUser} 
                    setShow={setShowModalCreateUser} 
                    fetchListUsers={fetchListUsers}
                    fetchListUsersWithPaginate={fetchListUsersWithPaginate}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
                <ModalUpdateUser 
                    show={showModalUpdateUser} 
                    setShow={setShowModalUpdateUser} 
                    dataUpdate={dataUpdate} 
                    fetchListUsers={fetchListUsers}
                    resetUpdateUser={resetUpdateUser}
                    fetchListUsersWithPaginate={fetchListUsersWithPaginate}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
                <ModalViewUser 
                    show={showModalView} 
                    setShow={setShowModalView} 
                    dataView={dataView} 
                    fetchListUsers={fetchListUsers}
                    fetchListUsersWithPaginate={fetchListUsersWithPaginate}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
                <ModalDeleteUser 
                    show={showModalDeleteUser}
                    setShow={setShowModalDeleteUser}
                    dataDelete={dataDelete} 
                    fetchListUsers={fetchListUsers}
                    fetchListUsersWithPaginate={fetchListUsersWithPaginate}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
            </div>
            
        </div>
    )
}

export default ManageUser