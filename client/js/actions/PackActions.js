import Dispatcher from '../dispatchers/AppDispatcher';
import PackConstants from '../constants/PackConstants';
import PackWebUtils from '../utils/PackWebUtils';

export default {
  pack(rects) {
    Dispatcher.dispatch({
      action: PackConstants.PACK_PENDING
    });

    PackWebUtils.pack(rects)
      .end(function(err, res) {
        if (err) {
          Dispatcher.dispatch({
            action: PackConstants.PACK_ERROR,
            error: err
          });
        } else {
          Dispatcher.dispatch({
            action: PackConstants.PACK_SUCCESS,
            packs: res.body
          });
        }
      });

  }
};