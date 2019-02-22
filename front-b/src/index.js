import React from 'react';
import ReactDOM from 'react-dom';
import 'babel-polyfill';

import registerServiceWorker from './registerServiceWorker';

import App from './app';
import './utils/httpInterceptors';

import { LocaleProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn';

import './index.less';



ReactDOM.render(<LocaleProvider locale={zh_CN}><App /></LocaleProvider>, document.getElementById('root'));
registerServiceWorker();
