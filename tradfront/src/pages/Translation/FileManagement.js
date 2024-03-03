// src/pages/Translation/FileManagement.js
import React, { useState } from 'react';
import './FileManagement.css';

function FileManagement() {
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleFileChange = (e) => {
    const files = e.target.files;
    setUploadedFiles([...uploadedFiles, ...files]);
  };

  const handleDeleteFile = (index) => {
    const newFiles = [...uploadedFiles];
    newFiles.splice(index, 1);
    setUploadedFiles(newFiles);
  };

  return (
    <div className="container">
      <h2>File Management</h2>
      <form>
        <label>
          Upload Files:
          <input type="file" multiple onChange={handleFileChange} />
        </label>
        <button type="submit">Submit</button>
      </form>

      <ul>
        {uploadedFiles.map((file, index) => (
          <li key={index} className="file-item">
            <span>{file.name}</span>
            <span className="delete-button" onClick={() => handleDeleteFile(index)}>
              Delete
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FileManagement;
