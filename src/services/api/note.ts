const apiNote = {
  getNoteList_get: {
    url: '/getNoteList',
    options: {
      method: 'GET',
    },
  },
  getNoteListPage_get: {
    url: '/getNoteListByPage',
    options: {
      method: 'GET',
    },
  },
  uploadImage_post: {
    url: '/uploadImage',
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  },
  postNote_post: {
    url: '/postNote',
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  },
  getNoteMsgById_get: {
    url: '/getNoteMsgById',
    options: {
      method: 'GET',
    },
  },
  getQueryNote_get: {
    url: '/queryNote',
    options: {
      method: 'GET',
    },
  },
  updateCommentCount_get: {
    url: '/updateCommentCount',
    options: {
      method: 'GET',
    },
  },
};
export { apiNote };
