<template>
  <div>
      Converation ID: {{ id }}
      <hr>
      <Message
        v-for="message in conversation.messages"
        :message="message"
        :key="message.created"
      />
      <br>
      <input type="text" v-model="newMessageText" @keyup.enter="send" placeholder="Type something...">
  </div>
</template>

<script>
import Message from './Message.vue'
import { mapState } from 'vuex'

export default {
    name: 'ConversationContainer',

    data() {
        return {
            newMessageText: ''
        }
    },

    props: {
        conversation: {
            type: Object,
            required: true
        },
        id: {
            type: String,
            required: true
        }
    },

    created() {
        //Load messages
        this.$store.state.db.collection('conversations').doc(this.id).onSnapshot(conver => {
            let source = conver.metadata.hasPendingWrites ? 'Local' : 'Server'
            console.log(`Source ${source}`)
            //add messages to store
            if (conver && conver.data()) {
                conver.data().messages.forEach(message => this.$store.commit('conversations/ADD_MESSAGE', { conversationId: this.id, message }))
            }
        })
    },

    methods: {
        send() {
            this.$store.dispatch('conversations/sendMessage',{
                text: this.newMessageText,
                created: Date.now(),
                conversationId: this.id,
                sender: this.$store.state.users.currentUser
            })
        }
    },

    components: {
        Message
    }
}
</script>

<style scoped>
    
</style>
