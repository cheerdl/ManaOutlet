import logo from './flame-1267.png';
import './login.css';
import React, { useState } from "react";

import {
  Button,
  Form,
  Spinner,
} from 'react-bootstrap'

import axios from 'axios';
import useRouter from '../hooks/useRouter';

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false)

  const { goTo } = useRouter();

  function validateForm() {
    return username.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
  }

  function toRequestToken(){
    setIsLoading(true)

    var uname = document.getElementById("username").value
    var pass = document.getElementById("password").value
    console.log(uname)
    console.log(pass)

    axios.post('https://billbillbot.herokuapp.com/api/v1/admin/login', {
      username: uname,
      password: pass
    }).then((result) => {
      const token = result.data.token;
      localStorage.setItem('token', token);

      goTo('/pages')();
    }).catch((error) => {
      console.log(error)

      setIsLoading(false)
      alert("ชื่อผู้ใช้หรือรหัสผ่านผิด กรุณากรอกใหม่")
    })
  }

  return (
  <div className="back">

    <div className="one">
      <p className="Mname">Mana Outlet</p>
      <p className="SaleText">Sales report dashboard</p>
    </div>

    <div className="box">

      <div className="one">
          <div className="Login">

              <p>Login</p>
              <Form onSubmit={handleSubmit}>
                <Form.Group size="lg" controlId="username">
                  <Form.Label>Username</Form.Label>
                  <br></br>
                  <Form.Control
                    autoFocus
                    type="username"
                    value={username}

                    onChange={(e) => setUsername(e.target.value)}
                  />
                </Form.Group>

                <Form.Group size="lg" controlId="password">
                  <Form.Label>Password</Form.Label>
                  <br></br>
                  <Form.Control
                  //autoFocus
                    type="password"
                    value={password}

                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <p></p>
                </Form.Group>

                  <Button
                    className="Button1"
                    block size="lg"
                    type="submit"
                    onClick={toRequestToken}
                    disabled={isLoading}
                  >
                    {
                      isLoading ? (
                        <Spinner
                          as="span"
                          animation="border"
                          size="sm"
                          role="status"
                          aria-hidden="true"
                        />
                      ) : ('Login')
                    }
                  </Button>

                </Form>
          </div>
        </div>
        <div className="two">
          <img src={logo} alt="Logo" />
        </div>
    </div>
  </div>


  );
}
