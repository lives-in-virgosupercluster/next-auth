"use client"
import React from 'react';
import styles from "./image.module.css";
import { useRouter } from 'next/navigation';
const ImageGallery = () => {
  const router = useRouter();
  const handleUploadImage = () => {
    // Implement upload image logic
    console.log('Upload Image');
    router.push("/upload");
  };

  const handleViewAllImages = () => {
    // Implement view all images logic
    console.log('View All Images');
    router.push("/view");
  };

  const handleDeleteImage = () => {
    // Implement delete image logic
    console.log('Delete Image');
    router.push('/delete');
  };

  return (
    <div className={styles.container}>
      <h2>Image route</h2>
    
      <button className={`${styles.btn} ${styles.viewimage}`} onClick={handleViewAllImages}>
        View Images</button>
      <button className={`${styles.btn} ${styles.removeimage}` }onClick={handleDeleteImage}>Delete Image</button>
      <button className={`${styles.btn} ${styles.uploadimage}`} onClick={handleUploadImage}>Upload Image</button>
    
    </div>
  );
};

export default ImageGallery;