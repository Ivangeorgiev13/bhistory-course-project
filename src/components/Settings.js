import React from 'react';
import requests from '../requests';
import SettingsForm from './SettingsForm';

const Settings = (props) => {

    const onClickLogout = () => {
        props.onClickLogout(null);
    }

    if (props.currentUser) {
        return (
            <div className="settings-page">
                <div className="container page">
                    <div className="row">
                        <div className="col-md-6 offset-md-3 col-xs-12">

                            <h1 className="text-xs-center">
                                {"Вашия профил"}
                            </h1>

                            <SettingsForm currentUser={props.currentUser} />

                            <hr />

                            <button
                                className="btn btn-outline-danger"
                                onClick={onClickLogout}>
                                {"Изход"}
                            </button>

                        </div>
                    </div>
                </div>
            </div>
        )
    } else {
        return null;
    }
}

export default Settings;
