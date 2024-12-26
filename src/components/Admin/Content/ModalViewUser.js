import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FcPlus } from 'react-icons/fc';
import { toast } from 'react-toastify'
import { postCreateNewUser, putUpdateNewUser } from '../../../services/apiService'
import _ from 'lodash'


function ModalViewUser({ show, setShow, dataView, fetchListUsers, }) {

  const handleClose = () => {
    setShow(false)
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
    if (!_.isEmpty(dataView)) {
        setEmail(dataView.email)
        setUsername(dataView.username)
        setRole(dataView.role)
        if (dataView.image)
          setPreviewImage(`data:image/jpeg;base64,${dataView.image}`)
    }
  }, [dataView])

  const handleUploadImage = (event) => {
    if (event.target && event.target.files && event.target.files[0]) {
      setPreviewImage(URL.createObjectURL(event.target.files[0]))
      setUserImage(event.target.files[0])
    } else {
      // setPreviewImage("")
    }
  }

  return (
    <>
      {/* <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button> */}

      <Modal show={show} onHide={handleClose} size='xl' backdrop='static' className='modal-add-user'>
        <Modal.Header closeButton>
          <Modal.Title>View a user</Modal.Title>
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
                      disabled
                      onChange={(event) => setUsername(event.target.value)}
                    />
                </div>
                <div className="col-md-4">
                    <label className="form-label">Role</label>
                    <select className="form-select" disabled onChange={(event) => setRole(event.target.value)}>
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
                      disabled
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
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalViewUser