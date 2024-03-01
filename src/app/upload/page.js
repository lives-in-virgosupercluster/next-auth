// components/UploadImage.js
"use client"
import React, { useState } from 'react';
import { useSession } from 'next-auth/react';

const UploadImage = () => {
  const [file, setFile] = useState(null);
  const[user,setUser]=useState(null);
  const {data: session}=useSession();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      console.error('Please select a file to upload');
      return;
    }
    console.log(session);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('user',session.user.name);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        console.log('Image uploaded successfully');
        alert("file uploaded")
      } else {
        console.error('Failed to upload image');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default UploadImage;
