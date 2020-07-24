"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const socketIOSubscriberMiddleware = function (socket) {
  return function ({ dispatch }) {
    return function (next) {
      return function (action) {

        if (action.socket) {
          const {
            socket: { subscribe, unsubscribe }
          } = action;

          if (subscribe) {
            console.log(subscribe);

            const { event, responseType, handle } = subscribe;
            if (event && handle) {
              socket.on(event, handle);
            } else if (event && responseType) {
              socket.on(event, function (socketResponse) {
                dispatch({ type: responseType, payload: socketResponse });
              });
            }
          }
          if (unsubscribe) {
            const { event } = unsubscribe;

            socket.removeListener(event);
          }
        }

        return next(action);
      };
    };
  };
};

exports.default = socketIOSubscriberMiddleware;