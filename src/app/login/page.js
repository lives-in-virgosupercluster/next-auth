"use client"
import styles from "./login.module.css";
import React, { useState } from 'react'

 const Login = () => {
    const onHandleClick=(e)=>{
        e.preventDefault();

    }
    const [user,setuser]=new useState("");
    const [pwd,setpwd]=new useState("");
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
                <input placeholder="Enter Password" value={pwd} onChange={(e)=>setpwd(e.target.value)}>

                </input>
                <button type="submit">login</button>

        </form>


    </div>
  )
}
export default Login;
