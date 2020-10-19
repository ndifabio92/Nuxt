import firebase from '@/plugins/firebase';
import 'firebase/firestore';

export const state = () => ({
    tasks: [],
    editTask: '',
});

//mutation
export const mutations = {
    set( state, tasks) {
        state.tasks = tasks
    },

    add (state, task) {
        state.tasks.push(task)
    },

    delete (state,task) {
        state.tasks.filter((item) => {
            return item !== task
        })
    },

    edit(state,task) {
        const updateTask = state.tasks.filter( item => item === task);
        updateTask.start = new Date(updateTask.start).toISOString().substr(0,10);
        updateTask.end = new Date(updateTask.end).toISOString().substr(0,10);
        state.editTask = updateTask;
    }
}

export const actions = {
    async loadTasks ( {commit} ) {
        const tasks = [];
        const db = firebase.firestore();
        const query = await db.collection('tasks').get();

        query.forEach((doc) => {
            let start = doc.data().start.toDate();
            start = new Date(start).toDateString();

            let end = doc.data().end.toDate();
            end = new Date(end).toDateString();

            const task = {
                id: doc.id,
                name: doc.data().name,
                description: doc.data().description,
                status: doc.data().status,
                start: start,
                end: end
            }
            tasks.push(task);
        });

        commit('set',tasks);
    },
    async saveTasks ({commit},task) {
        const db = firebase.firestore();
        const start = await firebase.firestore.Timestamp.fromDate(new Date(task.start));
        const end = await firebase.firestore.Timestamp.fromDate(new Date(task.end));

        await db.collection('tasks').add({
            name: task.name,
            description: task.description,
            status: task.status,
            start,
            end
        });
    },
    async updateTasks ({commit},task) {
        const db = firebase.firestore();
        const start = await firebase.firestore.Timestamp.fromDate(new Date(task.start));
        const end = await firebase.firestore.Timestamp.fromDate(new Date(task.end));

        await db.collection('tasks').doc(`${this.editItem.id}`).set({
            name: task.name,
            description:  task.description,
            status:  task.status,
            start,
            end
        });
    },
    async removeTasks ({commit},task) {

    },
}

export const getters = {
    getTasks (state) {
        return state.tasks;
    }
}