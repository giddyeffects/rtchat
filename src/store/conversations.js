import Vue from "vue"
import uuidv4 from "uuid/v4"
import { async } from "@firebase/util";

const state = {
    all: {},
    allIds: [],
    allMsgIds: []
}

const actions = {
    seed({ rootState }) {
        let converRef = rootState.db.collection('conversations')
        converRef.add({
            created: Date.now(),
            users: ['mr_a', 'mr_b'],
            messages: [
                { id: uuidv4(), text:'Hi internet', sender: 'mr_a', created: Date.now() },
                { id: uuidv4(), text: 'Hi back at you', sender: 'mr_b', created: Date.now() }
            ]
        })

        converRef.add({
            created: Date.now(),
            users: ['mr_a', 'mr_c'],
            messages: []
        })
    },

    async get ({ commit, rootState }) {
        try {
            let converRef = rootState.db.collection('conversations')
            let convers = await converRef.get()
        
            convers.forEach(conversation => commit('SET_CONVERSATION', { conversation }))
        }
        catch (err) {
            console.log("Oopsies! +"+err)
        }
    },

    sendMessage ( { commit, rootState }, { text, created, sender, conversationId}) {
        const converRef = rootState.db.collection('conversations').doc(conversationId)
        converRef.update({
            messages: [...state.all[conversationId].messages, { id: uuidv4(), created, sender, text }]
        })
        .then(res => console.log('Message sent'))
        .catch(err => console.log('Error', err))
    }
}

const mutations = {
    SET_CONVERSATION ( state, { conversation } ) {
        const data = conversation.data()
        state.all = {
            ...state.all,
            [conversation.id] : { users: data.users, created: data.created, messages: [] }
        }
        state.allIds.push(conversation.id)
    },

    ADD_MESSAGE (state, { conversationId, message }) {
        if (!state.allMsgIds.includes(message.id)) {
            state.all[conversationId].messages.push(message)
            state.allMsgIds.push(message.id)
        }
    }
}

export default { namespaced: true, state, actions, mutations }