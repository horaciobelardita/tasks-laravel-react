import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Login } from './components/auth/Login';
import { NewAccount } from './components/auth/NewAccount';
import { Projects } from './components/Projects';
import { AlertProvider } from './context/alerts/alertContext';
import { ProjectProvider } from './context/projects/projectContext';
import { TaskProvider } from './context/task/taskContext';
import { AuthProvider } from './context/auth/authContext';

function App() {
    return (
        <AuthProvider>
        <ProjectProvider>
            <TaskProvider>
                <AlertProvider>
                <Router>
                    <Switch>
                        <Route component={Login} path="/" exact />
                        <Route component={Projects} path="/proyectos" exact />
                        <Route component={NewAccount} path="/crear-cuenta" />
                    </Switch>
                </Router>
                </AlertProvider>
            </TaskProvider>
        </ProjectProvider>
        </AuthProvider>
    );
}

export default App;

if (document.getElementById('root')) {
    ReactDOM.render(<App />, document.getElementById('root'));
}
