<template>
  <App>
    <GlobalNav type="dashboard" />
    <div class="dashboard-content">
      <DashboardSidebar />
      <div class="dashboard-viewport">
        <Nuxt />
      </div>
    </div>
  </App>
</template>
<script lang="ts">
import Vue from "vue";
import { mapActions, mapState } from "vuex";

export default Vue.extend({
  computed: {
    ...mapState({
      socketConnected({ socket: { connected } }) {
        return connected;
      },
      socketConnecting({ socket: { connecting } }) {
        return connecting;
      },
    }),
  },
  mounted() {
    const socket = this.$socket;

    this.addSocket({ socket });

    if (!this.socketConnected && !this.socketConnecting) {
      this.$socket().connect();
    }
  },
  methods: {
    ...mapActions({
      addSocket: "socket/addSocket",
    }),
  },
});
</script>
<style lang="scss">
.dashboard-content {
  display: flex;
  width: 100%;
  height: 100%;

  background: $grey-lightest;
  color: $grey-dark;
}

.dashboard-viewport {
  padding: $gap ($gap * 2);
}
</style>
