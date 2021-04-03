import React, { useEffect, useState } from 'react';
import requests from '../requests';


const SettingsForm = (props) => {

    const [image, setImage] = useState();
    const [username, setUsername] = useState();
    const [bio, setBio] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState('');

    useEffect(() => {
        if (props.currentUser) {
            setImage(props.currentUser.image)
            setUsername(props.currentUser.username)
            setBio(props.currentUser.bio)
            setEmail(props.currentUser.email)
        }
    }, [])

    const submitForm = (ev) => {
        ev.preventDefault();

        const user = {
            image: image,
            username: username,
            bio: bio,
            email: email,
            password: password
        }

        if (!user.password) {
            delete user.password;
        }

        requests.Auth.save(user);
    }

    return (
        <form onSubmit={submitForm}>
            <fieldset>

                <fieldset className="form-group">
                    <input
                        className="form-control"
                        type="text"
                        placeholder="URL на профилна снимка"
                        value={image}
                        onChange={(ev) => setImage(ev.target.value)} />
                </fieldset>

                <fieldset className="form-group">
                    <input
                        className="form-control form-control-lg"
                        type="text"
                        placeholder="Потребител"
                        value={username}
                        onChange={(ev) => setUsername(ev.target.value)} />
                </fieldset>

                <fieldset className="form-group">
                    <textarea
                        className="form-control form-control-lg"
                        rows="8"
                        placeholder="Кратка информация за потребител"
                        value={bio}
                        onChange={(ev) => setBio(ev.target.value)}>
                    </textarea>
                </fieldset>

                <fieldset className="form-group">
                    <input
                        className="form-control form-control-lg"
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(ev) => setEmail(ev.target.value)} />
                </fieldset>

                <fieldset className="form-group">
                    <input
                        className="form-control form-control-lg"
                        type="password"
                        placeholder="Нова парола"
                        value={password}
                        onChange={(ev) => setPassword(ev.target.value)} />
                </fieldset>

                <button
                    className="btn btn-lg btn-primary pull-xs-right"
                    type="submit"
                >
                    {"Обнови"}
                </button>

            </fieldset>
        </form>
    )
}

export default SettingsForm;
