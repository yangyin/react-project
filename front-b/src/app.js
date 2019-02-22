import React,{ Component } from 'react';
import { HashRouter,Route, Switch } from 'react-router-dom';
import Loadable from 'react-loadable';
import {
    createStore,
    applyMiddleware,
    compose
}                       from 'redux';
import thunk            from 'redux-thunk';
import { Provider }     from 'react-redux';

import yyRequest from './applyMiddleWare/request';

import reducers from './combineReducer';

import Login from './container/login/login';
import GetValidCode from './container/forget-pwd/get-valid-code';
import Register from './container/register/register';
import RegisterSuccess from './container/register/register-success';
import ResetPwd from './container/forget-pwd/reset-pwd';

import { SpinComp } from '@/components/loaders/loaders';


const composeEnhancers = typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ 
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

const enhancer = composeEnhancers( applyMiddleware(thunk,yyRequest) );
const store = createStore(reducers, enhancer);

// const store = createStore(reducers,compose(
//     applyMiddleware(thunk),
//     window.devToolsExtension ? window.devToolsExtension() : f=>f 
// ))


const HomeComponent = Loadable({
    loader: () => import('./container/home/home'),
    loading() {
        return (
            <div><SpinComp /></div>
        )
    }
})
const VideoComponent = Loadable({
    loader: () => import('./container/content/camera/camera-view/video/video'),
    loading() {
        return (
            <div><SpinComp /></div>
        )
    }
})
const VideoListComponent = Loadable({
    loader: () => import('./container/content/camera/camera-view/video-list/video-list'),
    loading() {
        return (
            <div><SpinComp /></div>
        )
    }
})


class App extends Component {

    componentDidCatch(err,info) {
        console.log('app error: ',err);
        console.log('app info: ',info);
    }
    render() {
        return (
            <Provider store={store}>
                <HashRouter>
                    <Switch>
                        <Route path='/login' component={Login}></Route>
                        <Route path='/get-valid-code' component={GetValidCode}></Route>
                        <Route path='/register' component={Register}></Route>
                        <Route path='/register-success' component={RegisterSuccess}></Route>
                        <Route path='/reset' component={ResetPwd}></Route>
                        <Route path='/video' component={VideoComponent}></Route>
                        <Route path='/video-list' component={VideoListComponent}></Route>
                        <Route component={HomeComponent}></Route>
                        {/* <Redirect to='/login' /> */}
                    </Switch>
                </HashRouter>
            </Provider>
        )
    }





}

export default App;