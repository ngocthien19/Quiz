import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FcPlus } from 'react-icons/fc';
import { toast } from 'react-toastify'
import _ from 'lodash'
import { putUpdateQuizForAdmin } from '../../../../services/apiService';


function ModalUpdateQuiz({ show, setShow, dataUpdate, setDataUpdate, fetchQuiz }) {
  const handleClose = () => {
    setShow(false)
    setName("")
    setDescription("")
    setType("")
    setImage("")
    setPreviewImage("")
    setDataUpdate({})
  };

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [type, setType] = useState("")
  const [image, setImage] = useState("")
  const [previewImage, setPreviewImage] = useState("")

  useEffect(() => {
    if (!_.isEmpty(dataUpdate)) {
        setDescription(dataUpdate.description)
        setName(dataUpdate.name)
        setType(dataUpdate.difficulty)
        if (dataUpdate.image)
          setPreviewImage(`data:image/jpeg;base64,${dataUpdate.image}`)
    }
  }, [dataUpdate])

  const handleUploadImage = (event) => {
    if (event.target && event.target.files && event.target.files[0]) {
      setPreviewImage(URL.createObjectURL(event.target.files[0]))
      setImage(event.target.files[0])
    } else {
      // setPreviewImage("")
    }
  }

  const handleSubmitCreateQuiz = async() => {
    // validate
    if (!name) {
        toast.error('Invalid name');
        return;
    }

    if (!description) {
        toast.error('Invalid description');
        return;
    }

    let data = await putUpdateQuizForAdmin(dataUpdate.id, description, name, type, image)
    if (data && data.EC === 0) {
      toast.success(data.EM)
      await fetchQuiz()
      handleClose()
    }

    if (data && data.EC !== 0) {
      toast.error(data.EM)
    }
  }

  return (
    <>
      <Modal show={show} onHide={handleClose} size='xl' backdrop='static' className='modal-add-user'>
        <Modal.Header closeButton>
          <Modal.Title>Update The Quiz</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <form className="row g-3">
                <div className="col-md-6">
                    <label className="form-label">Name</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                    />
                </div>
                <div className="col-md-6">
                    <label className="form-label">Description</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      value={description}
                      onChange={(event) => setDescription(event.target.value)}
                    />
                </div>
                <div className="col-md-4">
                    <label className="form-label">Difficulty</label>
                    <select className="form-select" onChange={(event) => setType(event.target.value)} value={type}>
                        <option selected value="EASY">EASY</option>
                        <option value="MEDIUM">MEDIUM</option>
                        <option value="HARD">HARD</option>
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
          <Button variant="primary" onClick={() => handleSubmitCreateQuiz()}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalUpdateQuiz
