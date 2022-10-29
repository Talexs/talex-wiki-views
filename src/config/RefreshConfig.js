const config = {
  refreshUrl: 'cms/user/refresh',
  storage: {
    bearer: 'Bearer',
    refreshToken: 'refresh_token',
    accessToken: 'access_token'
  },
  exceptions: {
    refresh: [403]
  }
}

export default config
