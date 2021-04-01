import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ListErrors from './ListErrors';


const Login = (props) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);

    const changeEmail = (ev) => {
        setEmail(ev.target.value)
    }

    const changePassword = (ev) => {
        setPassword(ev.target.value)
    }

    const submitForm = () => {
        console.log(email)
    }

    return (
        <div className="auth-page">
            <div className="container page">
                <div className="row">

                    <div className="col-md-6 offset-md-3 col-xs-12">
                        <h1 className="text-xs-center">Вход в bHistory</h1>
                        <p className="text-xs-center">
                            <Link to="/register">
                                "{"Регистрация"}"
                            </Link>
                        </p>

                        <ListErrors errors={errors} />

                        <form onSubmit={submitForm}>
                            <fieldset>

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

                                <button
                                    className="btn btn-lg btn-primary pull-xs-right"
                                    type="submit"
                                >
                                    {"Вход"}
                                </button>

                            </fieldset>
                        </form>
                    </div>

                </div>
            </div>
        </div>

    );
}

export default Login;
