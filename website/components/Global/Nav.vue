<template>
  <nav class="nav">
    <ul>
      <li v-for="item in items" :key="item.path || item.action">
        <a
          v-if="item.path.indexOf('@') !== -1"
          href="#"
          @click="triggerAction($event, item.path)"
        >
          {{ item.label }}
        </a>
        <RouterLink v-else :to="item.path">
          {{ item.label }}
        </RouterLink>
      </li>
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
<script lang="ts">
import Vue from "vue";
import { mapState, mapActions } from "vuex";
import { RootState } from "@/types/store";

interface NavItem {
  path: string;
  label: string;
}

export default Vue.extend({
  props: {
    type: {
      type: String,
      default: "default",
    },
  },
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
      loggedIn({ user }: RootState): boolean {
        return !!(user.loaded && user.user);
      },
    }),
    navItems(): NavItem[] {
      const items = [
        { path: "/", label: "Home" },
        { path: "/about", label: "About" },
      ];

      if (this.loggedIn === true) {
        items.push({ path: "/dashboard", label: "Dashboard" });
        items.push({ path: "@logout", label: "Logout" });
      } else {
        items.push({ path: "/login", label: "Login" });
      }

      return items;
    },
    dashboardNavItems(): NavItem[] {
      return [
        { path: "/", label: "Home" },
        { path: "@logout", label: "Logout" },
      ];
    },
    items(): NavItem[] {
      if (this.type === "dashboard") {
        return this.dashboardNavItems;
      }

      return this.navItems;
    },
  },
  methods: {
    ...mapActions({
      reconnect: "socket/reconnect",
      logout: "user/logout",
    }),
    triggerAction(e: MouseEvent, action: string) {
      e.preventDefault();

      switch (action) {
        case "logout":
          this.logout();
          break;
        default:
          break;
      }
    },
    onStateClick() {
      const { reconnect, hasSocket, socketState } = this;

      if (hasSocket && socketState === "disconnected") {
        reconnect();
      }
    },
  },
});
</script>
<style lang="scss">
nav.nav {
  background-color: $grey-darkest;
  display: flex;
  justify-content: space-between;

  &--dashboard {
    justify-content: initial;
    background: $grey-darker;
    border-bottom: 1px solid $grey-darkest;
  }

  ul {
    display: inline-block;
    padding: 0;
    margin: 0;

    li {
      display: inline-block;
      margin: 0;

      a {
        display: block;
        font-size: $font-lg;
        color: $base-font-colour;
        cursor: pointer;
        text-decoration: none;

        padding: ($gap / 2) $gap;

        &:hover {
          background-color: $primary;
          color: $grey-darkest;
          text-decoration: none;
        }
      }
    }
  }
}
</style>
