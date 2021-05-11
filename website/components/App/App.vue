<template>
  <div class="app-container">
    <slot />
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { mapState, mapActions } from "vuex";

export default Vue.extend({
  computed: {
    ...mapState({
      user({ user: { user } }) {
        return user;
      },
      socketConnected({ socket: { connected } }) {
        return connected;
      },
      socketConnecting({ socket: { connecting } }) {
        return connecting;
      },
    }),
  },
  mounted() {
    this.socketConnect();
  },
  methods: {
    ...mapActions({
      socketConnect: "socket/socketConnect",
    }),
    socketConnect() {
      const { user, socketConnected, socketConnecting } = this;

      if (user && !socketConnected && !socketConnecting) {
        this.socketConnect(user);
      }
    },
  },
});
</script>
