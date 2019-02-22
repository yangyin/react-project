import React from 'react';
import { Provider } from 'react-redux';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Loadable from 'react-loadable';

import { SpinComp } from '@/components/loaders/loaders';

import configureStore from './core/store';

const Home = Loadable({
    loader: () => import('./container/home'),
    loading() {
        return (
            <div><SpinComp /></div>
        )
    }
})
const Login = Loadable({
    loader: () => import('./container/login/login'),
    loading() {
        return (
            <div><SpinComp /></div>
        )
    }
})
const ForgetValid = Loadable({
    loader: () => import('./container/forget'),
    loading() {
        return (
            <div><SpinComp /></div>
        )
    }
})
const Reset = Loadable({
    loader: () => import('./container/forget/views/reset'),
    loading() {
        return (
            <div><SpinComp /></div>
        )
    }
})

const store = configureStore();

const App = () => (
    <Provider store={store}>
        <HashRouter>
            <Switch>
                <Route path='/login' component={Login} />
                <Route path='/forgetValid' component={ForgetValid} />
                <Route path='/reset/:id' component={Reset} />
                <Route component={Home}></Route>
            </Switch>
        </HashRouter>
    </Provider>
)

export default App;
