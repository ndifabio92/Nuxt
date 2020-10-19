import firebase from '@/plugins/firebase';
import 'firebase/auth'
import Cookies from 'js-cookies';

export const state = () => ({
    user: null,
    token: '',
})

export const mutations = {
    SET_USER: (state, user) => {
        state.user = user
    },
    SET_TOKEN: (state, token) => {
        state.token = token
    }
}

export const actions = {
    async login( {commit}, user ) {
        try {
            await firebase.auth().signInWithEmailAndPassword(user.email,user.password);

            const token = firebase.auth().currentUser.getIdToken();
            const { uid, email } = firebase.auth().currentUser;
            Cookies.setItem('access_token', token);
            commit('SET_USER', {uid,email});
            commit('SET_TOKEN', token);
            
        } catch (error) {
            console.log(error);
        }
        
    }
}