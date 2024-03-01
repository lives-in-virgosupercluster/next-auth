"use client"
import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
const RemoveImage = () => {
  const { data: session } = useSession();
  const [userImages, setUserImages] = useState([]);
  const router=useRouter();

  useEffect(() => {
    const fetchUserImages = async () => {
      if (session?.user?.name) {
        try {
          const queryParams = new URLSearchParams({
            username: session.user.name
          });
          const response = await fetch(`/api/view?${queryParams}`, {
            method: 'GET',
          });
          const data = await response.json();

          if (response.ok) {
            console.log(data);
            setUserImages(data.images);
          } else {
            console.error('Failed to fetch user images:', data.error);
          }
        } catch (error) {
          console.error('Error occurred while fetching user images:', error);
        }
      }
    };

    fetchUserImages();
  }, [session]);

  const onClickHandler = async (filePath) => {
    const shouldDelete = window.confirm(`Are you sure you want to delete this image?\n\n${filePath}`);

    if (shouldDelete) {
      try {
        const response = await fetch('/api/delete', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ imageUrl: filePath }),
        });

        if (response.ok) {
          console.log('Image deleted successfully:', filePath);
          router.reload();
          // Optionally, update your component state or trigger a re-fetch of image data
        } else {
          console.error('Error deleting image:', response.statusText);
          // Handle error accordingly
        }
      } catch (error) {
        console.error('Error deleting image:', error);
        // Handle error accordingly
      }
    }
  };

  return (
    <div>
      <h1>User Images for {session?.user?.name}</h1>
      <ul>
        {userImages.map((filePath, index) => (
          <li key={index}>
            <img src={`/uploads/${filePath}`} alt={`Image ${index + 1}`} onClick={() => onClickHandler(filePath)} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RemoveImage;
