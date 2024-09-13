export const URLS = {
  ROOT:'',
  HOME: 'home/',
  AUTH: {
    LOGIN: 'auth/user_login',
    SIGNUP: 'auth/user_signup',
  },
  API: {
    V1: {
      USER: {
        CREATE: 'v1/user/create_user',
        UPDATE: 'v1/user/update_user',
        DELETE: 'v1/user/delete_user'
      },
      AUTH: {
        LOGIN: 'v1/auth/login',
        LOGOUT: 'v1/auth/logout',
        AUTH_DETAILS: 'v1/auth/auth_details'
      },
      CATEGORY: {
        GET_ALL: 'v1/category/get_all',
      }
    }
  }
}
