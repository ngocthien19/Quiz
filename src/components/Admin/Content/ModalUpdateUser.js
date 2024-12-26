import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FcPlus } from 'react-icons/fc';
import { toast } from 'react-toastify'
import { putUpdateNewUser } from '../../../services/apiService'
import _ from 'lodash'


function ModalUpdateUser({ show, setShow, dataUpdate, currentPage, resetUpdateUser, fetchListUsersWithPaginate, }) {

  const handleClose = () => {
    setShow(false)
    resetUpdateUser()
    setEmail("")
    setPassword("")
    setUsername("")
    setRole("USER")
    setUserImage("")
    setPreviewImage("")
  };

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [username, setUsername] = useState("")
  const [role, setRole] = useState("USER")
  const [userImage, setUserImage] = useState("")
  const [previewImage, setPreviewImage] = useState("")

  useEffect(() => {
    if (!_.isEmpty(dataUpdate)) {
        setEmail(dataUpdate.email)
        setUsername(dataUpdate.username)
        setRole(dataUpdate.role)
        if (dataUpdate.image)
          setPreviewImage(`data:image/jpeg;base64,${dataUpdate.image}`)
    }
  }, [dataUpdate])

  const handleUploadImage = (event) => {
    if (event.target && event.target.files && event.target.files[0]) {
      setPreviewImage(URL.createObjectURL(event.target.files[0]))
      setUserImage(event.target.files[0])
    } else {
      // setPreviewImage("")
    }
  }

  const validateEmail = (email) => {
    return String(email) 
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
  }

  const handleSubmitCreateUser = async() => {
    // validate
    const isValidEmail = validateEmail(email);
    if (!isValidEmail) {
      toast.error('Invalid email')
      return;
    }

    let data = await putUpdateNewUser(dataUpdate.id, username, role, userImage)
    if (data && data.EC === 0) {
      toast.success(data.EM)
      handleClose()
      // setCurrentPage(1)
      await fetchListUsersWithPaginate(currentPage)
    }

    if (data && data.EC !== 0) {
      toast.error(data.EM)
    }
  }

  return (
    <>
      {/* <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button> */}

      <Modal show={show} onHide={handleClose} size='xl' backdrop='static' className='modal-add-user'>
        <Modal.Header closeButton>
          <Modal.Title>Update a user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <form className="row g-3">
                <div className="col-md-6">
                    <label className="form-label">Email</label>
                    <input 
                      type="email" 
                      className="form-control" 
                      value={email}
                      disabled
                      onChange={(event) => setEmail(event.target.value)}
                    />
                </div>
                <div className="col-md-6">
                    <label className="form-label">Password</label>
                    <input 
                      type="password" 
                      className="form-control" 
                      value={password}
                      disabled 
                      onChange={(event) => setPassword(event.target.value)}
                    />
                </div>
                <div className="col-md-6">
                    <label className="form-label">Username</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      value={username}
                      onChange={(event) => setUsername(event.target.value)}
                    />
                </div>
                <div className="col-md-4">
                    <label className="form-label">Role</label>
                    <select className="form-select" onChange={(event) => setRole(event.target.value)}>
                        <option selected value="USER">USER</option>
                        <option value="ADMIN">ADMIN</option>
                    </select>
                </div>
                <div className='col-md-12'>
                    <label className="form-label label-upload" htmlFor='labelUpload'>
                      <FcPlus />
                      Upload file Image
                    </label>
                    <input 
                      type='file' 
                      hidden 
                      id='labelUpload'
                      onChange={(event) => handleUploadImage(event)}
                    />
                </div>
                <div className='col-md-12 img-review'>
                  {previewImage ?
                    <img src={previewImage}/>
                    :
                    <span>Preview Image</span>
                  }
                  
                  
                </div>
            </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleSubmitCreateUser()}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalUpdateUser