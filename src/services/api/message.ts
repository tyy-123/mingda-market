const apiMessage = {
  getUserMessage_get: {
    url: '/getUserMessage',
    options: {
      method: 'GET',
    },
    headers: {
      'Content-Type': 'application/json',
    },
  },
  saveUserMessage_post: {
    url: '/saveUserMessage',
    options: {
      method: 'POST',
    },
    headers: {
      'Content-Type': 'application/json',
    },
  },
};
export { apiMessage };
