export const URLS = {
  HOME: '/',
  AUTH: {
    LOGIN: 'auth/login_user',
    SIGNUP: 'auth/signup_user',

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
    }
  }
}
