"use client";
import { useRouter } from 'next/navigation';
import styles from "./signin.module.css";
import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
// import { options } from '../../api/auth/[...nextauth]/options';

export const Signin = () => {
  const router = useRouter();
  // const session =  getServerSession(options);
  const {data: session}=useSession();
  const [user, setuser] = useState("");
  const [pwd, setpwd] = useState("");
  console.log(session,"here");
  if(session){
   console.log(session);
   router.push('/image');
  }
  const handleLoginClick = () => {
    // Redirect to the login page
    router.push('/api/auth/signin');
  };

  const handleSignUpSubmit = async(e) => {
    e.preventDefault();
    // Handle signup logic
    // ...
  
    const res = await fetch("/api/Users", {
      method: "POST",
      body: JSON.stringify({username:user,
      password:pwd}),
      "content-type": "application/json",
    });
    if(res.ok){
      router.push('/api/auth/signin');
    }
    else{
      const response = await res.json();
      console.log(response.message);
    }
   
    // After successful signup, redirect to the login page
   
  };

 

  return (
    <div className={styles.container}>
      <h1>SignUp</h1>
      <form onSubmit={handleSignUpSubmit} className={styles.form}>
        <label>UserName</label>
        <input
          placeholder="Enter Username"
          value={user}
          onChange={(e) => setuser(e.target.value)}
          className={styles.input}
        />
        <label>Password</label>
        <input
          type="password"  // Specify type as "password"
          placeholder="Enter Password"
          value={pwd}
          onChange={(e) => setpwd(e.target.value)}
          className={styles.input}
        />
        <button type="submit">SignIn</button>
        <h2>OR</h2>
        <button onClick={handleLoginClick}>Login</button>
      </form>
    </div>
  );
};
