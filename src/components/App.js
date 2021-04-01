import Header from './Header';
import React, { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './Login';
import Register from './Register';


const App = (props) => {
    const [appName] = useState('bHistory');

    return (
        <React.Fragment>
            <div>
                <Header
                    appName={appName}
                    currentUser={null}
                />
                <Switch>
                    <Route path="/login" component={Login} />
                    <Route path="/register" component={Register} />
                </Switch>

            </div>
        </React.Fragment>
    )
}

export default App;
