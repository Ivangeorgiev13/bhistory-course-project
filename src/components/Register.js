import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ListErrors from './ListErrors';



const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUserName] = useState('');
  const [errors, setErrors] = useState([]);
  const [rePassword, setRePassword] = useState('');


  const submitForm = () => {
    if (password.length > 6 && password === rePassword) {
      console.log('submit')
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

            <form onSubmit={() => submitForm(username, email, password)}>
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
                // disabled={this.props.inProgress}
                >
                  Регистрация
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
