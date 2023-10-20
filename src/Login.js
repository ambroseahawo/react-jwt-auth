import { useRef, useState, useEffect, useContext,  } from "react";
import AuthContext from "./context/AuthProvider"
import axios from "./api/axios";

const LOGIN_URL = "/auth"

const Login = () => {
  const {setAuth} = useContext(AuthContext)
  const userRef = useRef()
  const errref = useRef()

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
}