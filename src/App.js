import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, ProgressBar, Alert } from 'react-bootstrap';
import { FaCloudUploadAlt, FaImage, FaImages } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [choice, setChoice] = useState(null);
  const [image, setImage] = useState(null);
  const [collection, setCollection] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState(null);

  const handleChoiceChange = (selectedChoice) => {
    setChoice(selectedChoice);
    setImage(null);
    setCollection(null);
    setUploadProgress(0);
    setUploadStatus(null);
  };

  return (
    <Container fluid className="bg-dark min-vh-100 d-flex flex-column">
      <Row className="justify-content-center my-auto">
        <Col xs={12} md={8} lg={6}>
          <Card className="shadow-lg">
            <Card.Header className="bg-secondary text-white">
              <h1 className="text-center mb-0">
                <FaCloudUploadAlt className="me-2" />
                Image Upload App
              </h1>
            </Card.Header>
            <Card.Body className="p-4">
              {!choice && <UploadOptions onChoiceChange={handleChoiceChange} />}
              {choice === 'image' && (
                <UploadImage
                  image={image}
                  setImage={setImage}
                  setUploadProgress={setUploadProgress}
                  setUploadStatus={setUploadStatus}
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
                />
              )}
              {uploadProgress > 0 && (
                <ProgressBar
                  animated
                  now={uploadProgress}
                  label={`${uploadProgress}%`}
                  className="mt-3"
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
            <Card.Footer className="text-center">
              <Button
                variant="outline-secondary"
                onClick={() => handleChoiceChange(null)}
                className="mt-2"
              >
                Back to Options
              </Button>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
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