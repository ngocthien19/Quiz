import ReactPaginate from 'react-paginate' 
import { useTranslation } from 'react-i18next';

function TableUserPaginate({ 
    listUsers, 
    pageCount, 
    currentPage,
    handleClickBtnUpdate, 
    handleClickBtnView, 
    handleClickBtnDelete, 
    fetchListUsersWithPaginate,
    setCurrentPage
}) { 
    const { t, i18n } = useTranslation()

    const handlePageClick = (event) => {
        fetchListUsersWithPaginate(+event.selected + 1)
        setCurrentPage(event.selected + 1);
        console.log(`User requested page number ${event.selected}`);
    };
    return (
        <>
            <table className="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">{t('table.username')}</th>
                        <th scope="col">Email</th>
                        <th scope="col">{t('table.role')}</th>
                        <th scope="col">{t('table.action')}</th>
                    </tr>
                </thead>
                <tbody>
                    {listUsers && listUsers.length > 0 && 
                        listUsers.map((user, index) => {
                            return (
                                <tr key={`table-user-${index}`}>
                                    <td>{user.id}</td>
                                    <td>{user.username}</td>
                                    <td>{user.email}</td>
                                    <td>{user.role}</td>
                                    <td>
                                        <button className="btn btn-secondary" onClick={() => handleClickBtnView(user)}>{t('table.view')}</button>
                                        <button className="btn btn-warning mx-3" onClick={() => handleClickBtnUpdate(user)}>{t('table.update')}</button>
                                        <button className="btn btn-danger" onClick={() => handleClickBtnDelete(user)}>{t('table.delete')}</button>
                                    </td>
                                </tr>
                            )
                        })
                    }

                    {listUsers && listUsers.length === 0 && 
                        <tr>
                            <td colSpan={'4'}>{t('table.not_found')}</td>
                        </tr>
                    }
                </tbody>
            </table>
            <div className='user-pagination'>
                <ReactPaginate
                    nextLabel={i18n.language === 'vi' ? "Tiếp >" : "Next >"}
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={3}
                    marginPagesDisplayed={2}
                    pageCount={pageCount}
                    previousLabel={i18n.language === 'vi' ? "< Trước" : "< previous"}
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"
                    breakLabel="..."
                    breakClassName="page-item"
                    breakLinkClassName="page-link"
                    containerClassName="pagination"
                    activeClassName="active"
                    renderOnZeroPageCount={null}
                    forcePage={currentPage - 1}
                />
            </div>
        </>
    )
}

export default TableUserPaginate