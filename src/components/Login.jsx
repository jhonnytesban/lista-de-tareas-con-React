import React, { Fragment, useState } from "react";
import { auth } from "../firebaseconfig";
import { useHistory } from 'react-router-dom'
import '../styles/Login.css'

const Login = () => {
  const [login, setLogin] = useState({ email: "", password: "" });
  const history = useHistory()

  const handleChange = (e) => {
    setLogin({
      ...login,
      [e.target.name]: e.target.value
    })
  };

  const registerUser = () => {
    if (!login.email.trim() || !login.password.trim()) {
      alert('Los campos están vacios')
    } else {
      auth.createUserWithEmailAndPassword(login.email, login.password)
        .then(res => {
          setLogin({email: '', password: ''})
          alert('Usuario registrado')
          history.push('/inicio')
        })
        .catch(err => {
          alert('El email o la contraseña está mal escrita')
          setLogin({email: '', password: ''})
        })
    }
  }

  const logIn = () => {
    auth.signInWithEmailAndPassword(login.email, login.password)
    .then(res => {
      alert('Iniciaste sesión')
      history.push('/inicio')
    })
    .catch( err => {
      alert('El usuario no está registrado')
    })
  }

  return (
    <Fragment>
      <header className='header'>
        <h1 className="header__title">Login</h1>
      </header>
      <form className="form">
        <input
          className="form__input"
          type="email"
          name="email"
          value={login.email}
          placeholder="Escribe el email"
          onChange={handleChange}
        />
        <input
          className="form__input"
          type="password"
          name="password"
          value={login.password}
          placeholder="Escribe la contraseña"
          onChange={handleChange}
        />
      </form>
      <input className="form__btn" type="button" value="Iniciar" onClick={logIn}/>
      <input className="form__btn" type="button" value="Registrarse" onClick={registerUser}/>
    </Fragment>
  );
};

export default Login;
