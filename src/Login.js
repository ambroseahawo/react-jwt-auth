import React, { useContext, useEffect, useRef, useState, } from "react";
import axios from "./api/axios";
import AuthContext from "./context/AuthProvider";

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


  const handleSubmit =async (e) =>{
    e.preventDefault()

    try {
      const response = await axios.post(LOGIN_URL, JSON.stringify({ user, pwd }),
        {
          headers: {'Content-Type': 'application/json'},
          withCredentials: true
        }
      )
      // console.log(JSON.stringify(response))
      const accessToken = response?.data.accessToken
      const roles = response?.data?.roles

      setAuth({ user, pwd, roles, accessToken })
      setUser('')
      setPwd('')
      setSuccess(true)
    } catch (err) {
      if (!err?.response) {
          setErrMsg('No Server Response');
      } else if (err.response?.status === 400) {
          setErrMsg('Missing Username or Password');
      } else if (err.response?.status === 401) {
          setErrMsg('Unauthorized');
      } else {
          setErrMsg('Login Failed');
      }
      errRef.current.focus();
    }
  }


  return (
    <React.Fragment>
      { success ? (
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
          <form onSubmit={handleSubmit}>
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

export default Login