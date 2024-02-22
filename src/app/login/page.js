"use client"
import styles from "./login.module.css";
import React, { useState } from 'react'
import { signIn } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";
 const Login = () => {
  const router=useRouter();
  const [user,setuser]=new useState("");
  const [pwd,setpwd]=new useState("");
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/image";
    const onHandleClick=async(e)=>{
        e.preventDefault();
        const res = await signIn("credentials", {
          redirect: false,
          username: user,
          password: pwd,
          callbackUrl,
        });
        console.log(res);
        if(!res?.error){
          router.push(callbackUrl);

        }

    }
   
  return (
    <div className={styles.container}>
      <h2>Login</h2>
        <form onSubmit={onHandleClick} className={styles.form}>
            <label>UserName</label>
            <input placeholder="Enter Username"  value={user}
                onChange={(e) => setuser( e.target.value)}
                className={styles.input}
                ></input>
                <label>Password</label>
                <input placeholder="Enter Password" value={pwd} onChange={(e)=>setpwd(e.target.value)} type="password">

                </input>
                <button type="submit">login</button>

        </form>


    </div>
  )
}
export default Login;
