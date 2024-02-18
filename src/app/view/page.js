"use client"
import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

const UserImagesPage = () => {
  const { data: session } = useSession();
  const [userImages, setUserImages] = useState([]);

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

  return (
    <div>
      <h1>User Images for {session?.user?.name}</h1>
      <ul>
        {userImages.map((filePath, index) => (
          <li key={index}>
            <img src={`/uploads/${filePath}`}  alt={`Image ${index + 1}`} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserImagesPage;
