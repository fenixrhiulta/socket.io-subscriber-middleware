const socketIOSubscriberMiddleware = socket => ({ dispatch }) => next => action => {
  if (action.socket) {
    const {
      socket: { subscribe, unsubscribe  },
    } = action;
    if (subscribe) {
      const { event, responseType, handle } = subscribe;
      if (event && handle) {
        socket.on(event, handle);
      } else if (event && responseType) {
        socket.on(event, socketResponse => {
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

export default socketIOSubscriberMiddleware;

