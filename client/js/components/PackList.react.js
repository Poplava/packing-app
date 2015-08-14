import React from 'react';
import PackStore from '../stores/PackStore';
import './less/pack.less';

export default React.createClass({
  getInitialState() {
    return {
      packs: PackStore.getPacks()
    };
  },

  componentWillMount() {
    PackStore.addChangeListener(this._onChange);
  },

  componentWillUnount() {
    PackStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    this.setState({
      packs: PackStore.getPacks()
    });
  },

  render() {
    return (
      <div className="pack-list">
        {
          this.state.packs.map((pack) => {
            return (
              <div key={pack.id} className="pack-item" style={{
                top: pack.y,
                left: pack.x,
                width: pack.w,
                height: pack.h
              }}></div>
            );
          })
        }
      </div>
    );
  }
});