import React from 'react';
import App from './components/App.react';
import 'babel-core/external-helpers';

import '../../node_modules/bootstrap/less/bootstrap.less';

React.render(
  <App />,
  document.getElementById('root')
);