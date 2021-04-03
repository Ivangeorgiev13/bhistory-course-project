import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import requests from '../requests';
import ListErrors from './ListErrors';



const Register = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUserName] = useState('');
  const [errors, setErrors] = useState([]);
  const [rePassword, setRePassword] = useState('');


  const submitForm = (e) => {
    e.preventDefault()
    if (password.length > 6 && password === rePassword) {
      requests.Auth.register(username, email, password).then(r => {
        const user = r.user;
        const token = user.token;
        const registerdEmail = user.email;
        const registeredUsername = user.username;
        props.setUser({
          username: registeredUsername,
          email: registerdEmail,
          token: token
        });
        props.history.push('/');
      }).catch(err => {
        console.error(err);
      })
    }
  }

  const changeUsername = (ev) => {
    setUserName(ev.target.value)
  }

  const changeEmail = (ev) => {
    setEmail(ev.target.value)

  }

  const changePassword = (ev) => {
    setPassword(ev.target.value)
  }

  const changeRePassword = (ev) => {
    setRePassword(ev.target.value)
  }

  return (
    <div className="auth-page">
      <div className="container page">
        <div className="row">

          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Регистрация</h1>
            <p className="text-xs-center">
              <Link to="/login">
                Влез в bHistory
              </Link>
            </p>

            <ListErrors errors={errors} />

            <form onSubmit={submitForm}>
              <fieldset>

                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={changeUsername} />
                </fieldset>

                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="email"
                    placeholder="Имейл"
                    value={email}
                    onChange={changeEmail} />
                </fieldset>

                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="password"
                    placeholder="Парола"
                    value={password}
                    onChange={changePassword} />
                </fieldset>

                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="password"
                    placeholder="Повтори паролата"
                    value={rePassword}
                    onChange={changeRePassword} />
                </fieldset>

                <button
                  className="btn btn-lg btn-primary pull-xs-right"
                  type="submit"
                >
                  {"Регистрация"}
                </button>

              </fieldset>
            </form>
          </div>

        </div>
      </div>
    </div>

  );
}

export default Register;
