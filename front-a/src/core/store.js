import { applyMiddleware, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducers from './combineReducer';
import sagas from './sagas';


export default function configureStore() {
    const sagaMiddleware = createSagaMiddleware();
    let middleware = applyMiddleware(sagaMiddleware);

    const composeEnhancers = typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ 
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

    // if (process.env.NODE_ENV !== 'production') {
    //     const devToolsExtension = window.devToolsExtension;
    //     if (typeof devToolsExtension === 'function') {
    //         middleware = compose(middleware, devToolsExtension());
    //     }
    // }
    const enhancer = composeEnhancers( middleware );
    // const enhancer = composeEnhancers( applyMiddleware(middleware) );

    const store = createStore(reducers, enhancer);
    sagaMiddleware.run(sagas);

    // if (module.hot) {
    //     module.hot.accept('./reducers', () => {
    //         store.replaceReducer(require('./reducers').default);
    //     });
    // }

    return store;
}
