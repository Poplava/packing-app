import React from 'react';
import RectStore from '../stores/RectStore';

export default React.createClass({
  getInitialState: function() {
    return {
      rects: RectStore.getRects()
    };
  },

  componentWillMount: function() {
    RectStore.addChangeListener(this._onChange)
  },

  componentWillUnount: function() {
    RectStore.removeChangeListener(this._onChange)
  },

  _onChange: function() {
    this.setState({
      rects: RectStore.getRects()
    });
  },

  handleClickRemove(id) {
    console.log('handleClickRemove', id);
  },

  handleHover: function(id, state) {
    console.log('handleHover', id, state);
  },

  render() {
    return (
      <div>
        <h3>List:</h3>
        <ul className="list-group">
          {
            this.state.rects.map((rect) => {
              return (
                <li key={rect.id} className="list-group-item" onMouseEnter={this.handleHover.bind(this, rect.id, true)} onMouseLeave={this.handleHover.bind(this, rect.id, false)}>
                  <button className="close pull-right" onClick={this.handleClickRemove.bind(this, rect.id)} ><span>&times;</span></button>
                  w: {rect.width}<br />
                  h: {rect.height}
                </li>
              );
            })
          }
        </ul>
      </div>
    );
  }
});