export default function ( {store, route, redirect}) {
    const user = store.state.users.user;

    if (!user && route.name === 'tasks') {
        redirect('/login');
    }

    if (user && route.name === 'login') {
        redirect('/');
    }
}