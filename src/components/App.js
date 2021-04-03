import Header from './Header';
import React, { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Home from './Home';
import Settings from './Settings';
import Editor from './Editor';


const App = (props) => {
    const [appName] = useState('bHistory');
    const [user, setUser] = useState(null);

    return (
        <React.Fragment>
            <div>
                <Header
                    appName={appName}
                    currentUser={user}
                />
                <Switch>
                    <Route exact path="/" render={props => <Home {...props} currentUser={user} />} />
                    <Route path="/login" render={props => <Login {...props} setUser={setUser} />} />
                    <Route path="/register" render={props => <Register {...props} setUser={setUser} />} />
                    <Route path="/settings" render={props => <Settings {...props} currentUser={user} onClickLogout={setUser} />} />
                    <Route path="/editor" render={props => <Editor {...props} currentUser={user} />} />
                </Switch>
            </div>
        </React.Fragment>
    )
}

export default App;
