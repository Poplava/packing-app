import Dispatcher from '../dispatchers/AppDispatcher';
import RectConstants from '../constants/RectConstants';
import { EventEmitter } from 'events';
import Immutable from 'immutable';

const CHANGE_EVENT = 'change';

let Rect = Immutable.Record({
    id: null,
    width: null,
    height: null,
    hover: false
  }),
  _cache = JSON.parse(localStorage.getItem('rects')) || [],
  _rects = Immutable.Map(),

  store;

_cache.forEach(function(rect) {
  rect = new Rect(rect);
  _rects = _rects.set(rect.id, new Rect(rect));
});

class RectStore extends EventEmitter {
  addChangeListener(callback) {
    this.addListener(CHANGE_EVENT, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

  emitChange() {
    this.emit(CHANGE_EVENT);
  }

  getRects() {
    return _rects.toArray();
  }
}

store = new RectStore();

store.dispatchToken = Dispatcher.register((payload) => {
  var _rect, id;
  switch (payload.action) {
    case RectConstants.RECT_ADD:
      id = (new Date()).valueOf();

      _rect = new Rect({
        id,
        width: payload.width,
        height: payload.height
      });

      _rects = _rects.set(id, _rect);

      localStorage.setItem('rects', JSON.stringify(_rects.toArray()));
      store.emitChange();
      break;
    case RectConstants.RECT_REMOVE:
      _rects = _rects.delete(payload.id);

      localStorage.setItem('rects', JSON.stringify(_rects.toArray()));
      store.emitChange();
      break;
    case RectConstants.RECT_HOVER:
      _rect = _rects.get(payload.id);

      _rect = _rect.set('hover', state);
      _rects = _rects.set(payload.id, _rect);

      localStorage.setItem('rects', JSON.stringify(_rects.toArray()));
      store.emitChange();
      break;
  }
});

export default store;