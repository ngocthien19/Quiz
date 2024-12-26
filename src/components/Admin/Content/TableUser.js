import { useTranslation } from 'react-i18next';

function TableUser({ listUsers, handleClickBtnUpdate, handleClickBtnView, handleClickBtnDelete }) { 

    const { t } = useTranslation();
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
        </>
    )
}

export default TableUser