import Dispatcher from '../dispatchers/AppDispatcher';
import RectConstants from '../constants/RectConstants';

export default {
  add(width, height) {
    Dispatcher.dispatch({
      action: RectConstants.RECT_ADD,
      width,
      height
    });
  },

  remove(id) {
    Dispatcher.dispatch({
      action: RectConstants.RECT_REMOVE,
      id
    });
  },

  hover(id, state) {
    Dispatcher.dispatch({
      action: RectConstants.RECT_HOVER,
      id,
      state
    });
  }
};