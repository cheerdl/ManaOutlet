import logo from './flame-1267.png';
import './login.css';
import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
//import history from './../history';
import { Link } from 'react-router-dom';
import axios from 'axios';
import useRouter from '../hooks/useRouter';
import Spinner from 'react-bootstrap/Spinner'


export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { goTo } = useRouter();

  function validateForm() {
    return username.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
  }

  function toRequestToken(){
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
      console.log(token);
      goTo('/secondPage')();

    }).catch((error) => {
      console.log(error)
      alert("ชื่อผู้ใช้หรือรหัสผ่านผิด กรุณากรอกใหม่")
    })
  }

  return (
  <div className="back">

    <div class="one">
      <p className="Mname">Mana Outlet</p>
      <p className="SaleText">Sales report dashboard</p>
    </div>

    <div class="box">

      <div class="one">
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

                  <Button className="Button1" block size="lg" type="submit" onClick={toRequestToken}>
                    LOGIN
                  </Button>

                </Form>
          </div>
        </div>
        <div class="two">
          <img src={logo} alt="Logo" />
        </div>
    </div>
  </div>


  );
}
