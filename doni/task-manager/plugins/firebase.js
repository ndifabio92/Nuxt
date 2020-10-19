import firebase from 'firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyCvnRNUC3GUKyD-_Mi7Yrccp_3lOLTZKyE",
    authDomain: "taskmanager-3131d.firebaseapp.com",
    databaseURL: "https://taskmanager-3131d.firebaseio.com",
    projectId: "taskmanager-3131d",
    storageBucket: "taskmanager-3131d.appspot.com",
    messagingSenderId: "419591748247",
    appId: "1:419591748247:web:6f487d0fa04e201e8947d2"
};

if(!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export default firebase;