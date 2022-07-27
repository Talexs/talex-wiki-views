interface IToken {

    isLogin: Boolean
    tokenName: String
    tokenValue: String
    tokenPrefix: String

}

interface ITokenFace {

    isLogin: Boolean
    loginDevice: String
    loginId: String
    loginType: String
    sessionTimeout: Number
    tokenActivityTimeout: Number
    tokenSessionTimeout: Number
    tokenTimeout: Number

    token: IToken

}

export const $userToken: ITokenFace = (() => {

    const stashStr = localStorage.getItem('user-stash')
    const stash = stashStr ? JSON.parse(stashStr) : {}

    return Object.assign(
        {
            info: {},
            token: null,
            roles: null
        }, stash)

})()

window.onbeforeunload = () => {

    localStorage.setItem('user-stash', JSON.stringify($userToken))

}
