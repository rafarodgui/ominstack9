import React from 'react'
import { BrowserRouter, Switch, Route} from 'react-router-dom';

import Login from './pages/login'
import Dashboard from './pages/dashboard'
import New from './pages/new'

const routes = ()=>{
    
    return(
    
        <div className="routes">
            <BrowserRouter>
                <Switch>
                    <Route exact path='/' component={Login} />
                    <Route path='/dashboard' component={Dashboard} />
                    <Route path ='/new' component={New} />
                </Switch>
            </BrowserRouter>
        </div>
    );
}

export default routes;