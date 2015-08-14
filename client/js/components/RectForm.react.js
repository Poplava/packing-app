import React from 'react';
import RectActions from '../actions/RectActions';
import PackActions from '../actions/PackActions';
import RectStore from '../stores/RectStore';

export default React.createClass({
  getInitialState() {
    return {
      width: '',
      height: ''
    };
  },

  handleClickAdd() {
    if (this.state.width && this.state.height) {
      RectActions.add(this.state.width, this.state.height);
      this.setState({
        width: '',
        height: ''
      });
    }
  },

  handleClickPack() {
    PackActions.pack(RectStore.getRects());
  },

  handleWidthChange(event) {
    this.setState({
      width: parseInt(event.target.value) || ''
    });
  },

  handleHeightChange(event) {
    this.setState({
      height: parseInt(event.target.value) || ''
    });
  },

  render() {
    return (
      <div>
        <div className="form-group">
          <label>Width</label>
          <input type="text" value={this.state.width} onChange={this.handleWidthChange} className="form-control" />
        </div>
        <div className="form-group">
          <label>Height</label>
          <input type="text" value={this.state.height} onChange={this.handleHeightChange} className="form-control" />
        </div>
        <button className="btn btn-default" onClick={this.handleClickAdd}>Add</button>
        <button className="btn btn-default" onClick={this.handleClickPack}>Pack</button>
      </div>
    );
  }
});