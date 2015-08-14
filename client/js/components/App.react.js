import React from 'react';

import RectForm from './RectForm.react';
import RectList from './RectList.react';
import PackList from './PackList.react';

export default React.createClass({
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-10">
            <PackList />
          </div>
          <div className="col-md-2">
            <RectForm />
            <RectList />
          </div>
        </div>
      </div>
    );
  }
});
