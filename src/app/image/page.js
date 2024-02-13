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
    router.putsh('/delete');
  };

  return (
    <div className={styles.container}>
      <button className={`${styles.btn} ${styles.viewimage}`}></button>
      <button className={`${styles.btn} ${styles.removeimage}`}></button>
      <button className={`${styles.btn} ${styles.uploadimage}`}></button>
    
    </div>
  );
};

export default ImageGallery;