<template>
  <nav class="dashboard-nav">
    <ul>
      <li key="home"><Link to="/">Home</Link></li>
      <li key="logout"><a @click="logout()">Logout</a></li>
    </ul>
    <div
      v-if="hasSocket"
      :class="`dashboard-socketState dashboard-socketState--${socketState}`"
      @click="onStateClick()"
    >
      <span class="dashboard-socketState__text">{{ socketState }}</span>
      <span class="dashboard-socketState__icon">
        <span class="dashboard-socketState__iconInner"></span>
        <span class="dashboard-socketState__iconMiddle"></span>
        <span class="dashboard-socketState__iconOuter"></span>
      </span>
    </div>
  </nav>
</template>
<script>
import Vue from "vue";
import { mapState, mapActions } from "vuex";

export default Vue.extend({
  computed: {
    ...mapState({
      socketState({ socket: { connected, connecting } }) {
        if (connected) {
          return "connected";
        }
        if (connecting) {
          return "connecting";
        }

        return "disconnected";
      },
      hasSocket({ socket: { socket } }) {
        return !!socket;
      },
    }),
  },
  methods: {
    ...mapActions({
      reconnect: "socket/reconnect",
      logout: "user/logout",
    }),
    onStateClick() {
      const { reconnect, hasSocket, socketState } = this;

      if (hasSocket && socketState === "disconnected") {
        reconnect();
      }
    },
  },
});
</script>
