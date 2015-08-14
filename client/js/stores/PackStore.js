import Dispatcher from '../dispatchers/AppDispatcher';
import PackConstants from '../constants/PackConstants';
import { EventEmitter } from 'events';
import Immutable from 'immutable';

const CHANGE_EVENT = 'change';

let _packs = Immutable.List(),

  store;

class PackStore extends EventEmitter {
  addChangeListener(callback) {
    this.addListener(CHANGE_EVENT, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

  emitChange() {
    this.emit(CHANGE_EVENT);
  }

  getPacks() {
    return _packs.toJS();
  }
}

store = new PackStore();

store.dispatchToken = Dispatcher.register((payload) => {
  switch (payload.action) {
    case PackConstants.PACK_PENDING:
      _packs = _packs.clear();

      store.emitChange();
      break;
    case PackConstants.PACK_SUCCESS:
      _packs = Immutable.List(payload.packs);

      store.emitChange();
      break;
  }
});

export default store;
