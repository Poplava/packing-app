import request from 'superagent';

export default {
  pack(data) {
    return request
      .post('/pack')
      .send(data);
  }
};