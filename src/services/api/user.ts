const apiUser={
  getCode_get:{
    url: '/getCode',
    options: {
      method: 'GET',
    },
  },
  register_post:{
    url: '/register',
    options: {
      method: 'POST',
    },
  },
  login_get:{
    url: '/login',
    options: {
      method: 'GET',
    },
  },
  getUserInfo_id_get:{
    url:'/getUserInfo',
    options: {
      method: 'GET',
    },
  },
  getLoginUser_get:{
    url:'/getLoginUser',
    options: {
      method: 'GET',
    },
  },

}
export { apiUser };
