import React, { useState } from 'react';
import { Container, Row, Tab, Tabs, Col, Card, Button, ProgressBar, Alert, Nav, Navbar, Modal } from 'react-bootstrap';
import { FaCloudUploadAlt, FaImage, FaArrowLeft, FaImages, FaQuestionCircle, FaCog, FaUser } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [choice, setChoice] = useState(null);
  const [image, setImage] = useState(null);
  const [collection, setCollection] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState(null);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [theme, setTheme] = useState('dark');

  const handleChoiceChange = (selectedChoice) => {
    setChoice(selectedChoice);
    setImage(null);
    setCollection(null);
    setUploadProgress(0);
    setUploadStatus(null);
  };

  return (
    <Container fluid className={`bg-${theme} min-vh-100 d-flex flex-column p-0`}>
      <Navbar bg={theme} variant={theme} expand="lg" className="mb-3">
        <Container>
          <Navbar.Brand href="#home" className="text-light">
            <FaCloudUploadAlt className="me-2" />
            Image Upload App
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="#" onClick={() => setShowHelpModal(true)} className="text-light">
                <FaQuestionCircle className="me-1" /> Help
              </Nav.Link>
              <Nav.Link href="#" onClick={() => setShowSettingsModal(true)} className="text-light">
                <FaCog className="me-1" /> Settings
              </Nav.Link>
              <Nav.Link href="#" className="text-light">
                <FaUser className="me-1" /> Profile
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Row className="justify-content-center my-4 flex-grow-1">
        <Col xs={12} md={10} lg={8} xl={6}>
          <Card className={`shadow-lg bg-${theme === 'dark' ? 'light' : 'light'}`}>
            <Card.Header className={`bg-${theme === 'dark' ? 'dark' : 'primary'} text-white`}>
              <h2 className="text-center mb-0">
                <FaCloudUploadAlt className="me-2" />
                Upload Your Content
              </h2>
            </Card.Header>
            <Card.Body className="p-4">
              {!choice ? (
                <Tabs
                  defaultActiveKey="single"
                  id="upload-options-tabs"
                  className="mb-3"
                  fill
                >
                  <Tab eventKey="single" title={<><FaImage className="me-2" />Single Image</>}>
                    <UploadOptions onChoiceChange={handleChoiceChange} option="image" theme={theme} />
                  </Tab>
                  <Tab eventKey="collection" title={<><FaImages className="me-2" />Image Collection</>}>
                    <UploadOptions onChoiceChange={handleChoiceChange} option="collection" theme={theme} />
                  </Tab>
                </Tabs>
              ) : (
                <>
                  <Button
                    variant={theme === 'dark' ? 'outline-info' : 'outline-primary'}
                    onClick={() => handleChoiceChange(null)}
                    className="mb-3"
                  >
                    <FaArrowLeft className="me-2" />
                    Back to Options
                  </Button>
                  {choice === 'image' && (
                    <UploadImage
                      image={image}
                      setImage={setImage}
                      setUploadProgress={setUploadProgress}
                      setUploadStatus={setUploadStatus}
                      theme={theme}
                    />
                  )}
                  {choice === 'collection' && (
                    <UploadImageCollection
                      image={image}
                      setImage={setImage}
                      collection={collection}
                      setCollection={setCollection}
                      setUploadProgress={setUploadProgress}
                      setUploadStatus={setUploadStatus}
                      theme={theme}
                    />
                  )}
                </>
              )}
              {uploadProgress > 0 && (
                <ProgressBar
                  animated
                  now={uploadProgress}
                  label={`${uploadProgress}%`}
                  className="mt-3"
                  variant={theme === 'dark' ? 'info' : 'primary'}
                />
              )}
              {uploadStatus && (
                <Alert
                  variant={uploadStatus.type}
                  className="mt-3"
                >
                  {uploadStatus.message}
                </Alert>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <footer className={`bg-${theme === 'dark' ? 'secondary' : 'light'} text-center py-3 mt-auto`}>
        <p className={`mb-0 ${theme === 'dark' ? 'text-light' : 'text-dark'}`}>
          &copy; 2023 Image Upload App. All rights reserved.
        </p>
      </footer>

      <Modal show={showHelpModal} onHide={() => setShowHelpModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Help</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>How to use the Image Upload App:</h5>
          <ol>
            <li>Choose between uploading a single image or an image with a collection.</li>
            <li>Select your file(s) using the file input.</li>
            <li>Preview your selection.</li>
            <li>Click the upload button to start the process.</li>
            <li>Wait for the upload to complete and check the status message.</li>
          </ol>
        </Modal.Body>
      </Modal>

      <Modal show={showSettingsModal} onHide={() => setShowSettingsModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Settings</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>Theme</h5>
          <Button
            variant={theme === 'dark' ? 'light' : 'dark'}
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            Switch to {theme === 'dark' ? 'Light' : 'Dark'} Mode
          </Button>
        </Modal.Body>
      </Modal>
    </Container>
  );
}

function UploadOptions({ onChoiceChange }) {
  return (
    <Row className="g-4">
      <Col xs={12} sm={6}>
        <Button
          variant="outline-primary"
          size="lg"
          className="w-100 py-4"
          onClick={() => onChoiceChange('image')}
        >
          <FaImage className="mb-2" size={30} />
          <br />
          Upload Image
        </Button>
      </Col>
      <Col xs={12} sm={6}>
        <Button
          variant="outline-success"
          size="lg"
          className="w-100 py-4"
          onClick={() => onChoiceChange('collection')}
        >
          <FaImages className="mb-2" size={30} />
          <br />
          Upload Image and Collection
        </Button>
      </Col>
    </Row>
  );
}

function UploadImage({ image, setImage, setUploadProgress, setUploadStatus }) {
  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    if (!image) return;

    const formData = new FormData();
    formData.append('image', image);

    try {
      const response = await fetch('/api/upload-image', {
        method: 'POST',
        body: formData,
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(percentCompleted);
        },
      });
      const data = await response.json();
      console.log('API response:', data);
      setUploadStatus({ type: 'success', message: 'Image uploaded successfully!' });
    } catch (error) {
      console.error('Error uploading image:', error);
      setUploadStatus({ type: 'danger', message: 'Error uploading image. Please try again.' });
    }
  };

  return (
    <div>
      <div className="mb-3">
        <label htmlFor="imageUpload" className="form-label">Select Image</label>
        <input
          type="file"
          id="imageUpload"
          accept="image/*"
          onChange={handleImageChange}
          className="form-control"
        />
      </div>
      {image && (
        <div className="mb-3 text-center">
          <img
            src={URL.createObjectURL(image)}
            alt="Preview"
            className="img-fluid rounded"
            style={{ maxHeight: '300px' }}
          />
        </div>
      )}
      <Button
        variant="primary"
        onClick={handleSubmit}
        disabled={!image}
        className="w-100"
      >
        <FaCloudUploadAlt className="me-2" />
        Upload Image
      </Button>
    </div>
  );
}

function UploadImageCollection({ image, setImage, collection, setCollection, setUploadProgress, setUploadStatus }) {
  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleCollectionChange = (e) => {
    if (e.target.files[0]) {
      setCollection(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    if (!image || !collection) return;

    const formData = new FormData();
    formData.append('image', image);
    formData.append('collection', collection);

    try {
      const response = await fetch('/api/upload-image-collection', {
        method: 'POST',
        body: formData,
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(percentCompleted);
        },
      });
      const data = await response.json();
      console.log('API response:', data);
      setUploadStatus({ type: 'success', message: 'Image and collection uploaded successfully!' });
    } catch (error) {
      console.error('Error uploading image and collection:', error);
      setUploadStatus({ type: 'danger', message: 'Error uploading files. Please try again.' });
    }
  };

  return (
    <div>
      <div className="mb-3">
        <label htmlFor="imageUpload" className="form-label">Select Image</label>
        <input
          type="file"
          id="imageUpload"
          accept="image/*"
          onChange={handleImageChange}
          className="form-control"
        />
      </div>
      {image && (
        <div className="mb-3 text-center">
          <img
            src={URL.createObjectURL(image)}
            alt="Image Preview"
            className="img-fluid rounded"
            style={{ maxHeight: '200px' }}
          />
        </div>
      )}
      <div className="mb-3">
        <label htmlFor="collectionUpload" className="form-label">Select Collection</label>
        <input
          type="file"
          id="collectionUpload"
          accept=".zip,.rar,.7zip"
          onChange={handleCollectionChange}
          className="form-control"
        />
      </div>
      {collection && (
        <div className="mb-3">
          <Alert variant="info">
            Selected collection: {collection.name}
          </Alert>
        </div>
      )}
      <Button
        variant="success"
        onClick={handleSubmit}
        disabled={!image || !collection}
        className="w-100"
      >
        <FaCloudUploadAlt className="me-2" />
        Upload Image and Collection
      </Button>
    </div>
  );
}

export default App;