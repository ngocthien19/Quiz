import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import { deleteUser } from '../../../services/apiService';

function ModalDeleteUser({ show, setShow, dataDelete, fetchListUsersWithPaginate, setCurrentPage }) {

  const handleClose = () => setShow(false);

  const handleSubmitDeleteUser = async () => {
    let data = await deleteUser(dataDelete.id);
    if (data && data.EC === 0) {
      toast.success(data.EM)
      handleClose()
      setCurrentPage(1)
      await fetchListUsersWithPaginate(1)
    }

    if (data && data.EC !== 0) {
      toast.error(data.EM)
    }
  }
  return (
    <>
      <Modal 
        show={show} 
        onHide={handleClose}
        backdrop='static'

      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete The User?</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure to delete this user. email <b>{dataDelete && dataDelete.email ? dataDelete.email : ""}</b></Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => handleSubmitDeleteUser()}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalDeleteUser