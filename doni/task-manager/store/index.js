import JWTDecode from 'jwt-decode';
import cookieparser from 'cookieparser';

//await vuexContext.dispatch('tasks/loadTasks');
export const actions = {
    nuxtServerInit( {commit} , {req} ) {
        if(process.server && process.static) { return }
        if(!req.headers.cookies) { return }

        const parsed = cookieparser.parse(req.headers.cookies)
        const accessTokenCookie = parsed.access_token

        if(!accessTokenCookie) {
            const accessToken = JWTDecode(accessTokenCookie)
        }

        if(accessToken) {
            commit('SET_USER', {uid: accessToken.user_id, email: accessToken.email } )
        }
    }
}