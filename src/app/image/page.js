"use client"
import React from 'react';
import styles from "./image.module.css";
import { useRouter } from 'next/navigation';
import {  signOut,useSession } from 'next-auth/react';
const ImageGallery = () => {
  const router = useRouter();
  const {data: session}=useSession();
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
    if (session && session.token && session.token.role === 'admin') {
      // Implement delete image logic
      console.log('Delete Image');
      router.push('/delete');
    } else {
      // Redirect to denied page or show an error message
      console.error('Access denied. User does not have admin role.');
      router.push('/denied');
    }
  };
  const handleLogout = async () => {
    // Perform sign out
    await signOut();

    // Redirect to the "/logout" endpoint
    router.push('http://localhost:3000/api/auth/signin');
  };


  return (
    <div className={styles.container}>
      <h2>Image route</h2>
    
      <button className={`${styles.btn} ${styles.viewimage}`} onClick={handleViewAllImages}>
        View Images</button>
      <button className={`${styles.btn} ${styles.removeimage}` }onClick={handleDeleteImage}>Delete Image</button>
      <button className={`${styles.btn} ${styles.uploadimage}`} onClick={handleUploadImage}>Upload Image</button>
      <button onClick={handleLogout}>Logout</button>
    
    </div>
  );
};

export default ImageGallery;