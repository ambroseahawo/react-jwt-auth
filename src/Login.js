import React, { useRef, useState, useEffect, useContext,  } from "react";
import AuthContext from "./context/AuthProvider"
import axios from "./api/axios";

const LOGIN_URL = "/auth"

const Login = () => {
  const {setAuth} = useContext(AuthContext)
  const userRef = useRef()
  const errRef = useRef()

  const [user, setUser] = useState('')
  const [pwd, setPwd] = useState('')
  const [errMsg,setErrMsg] = useState('')
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    userRef.current.focus()
  },[])

  useEffect(() => {
    setErrMsg('')
  },[user, pwd])


  return (
    <React.Fragment>
      {success ? (
        <section>
          <h1>You are logged in!</h1>
          <br />
          <p>
            <a href="#">Go to Home</a>
          </p>
        </section>
      ) : (
        <section>
          <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
          <h1>Sign In</h1>
          <form>
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" value={user} required ref={userRef} autoComplete="off" onChange={(e) => setUser(e.target.value)} />

            <label htmlFor="password">Password:</label>
            <input type="password" id="password" value={pwd} required onChange={(e) => setPwd(e.target.value)} />

            <button>Sign In</button>
          </form>
          <p>Need an Account? <br/>
            <span className="line">
              <a href="#">Sign Up</a>
            </span>
          </p>
        </section>
      )}
    </React.Fragment>
  )
}