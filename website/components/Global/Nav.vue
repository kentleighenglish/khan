<template>
  <nav class="nav">
    <ul>
      <li v-for="item in navItems" :key="item.path || item.action">
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
  computed: {
    ...mapState({
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
  },
  methods: {
    ...mapActions({
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
  },
});
</script>
<style lang="scss">
nav.nav,
nav.dashboard-nav {
  background-color: $grey-darkest;

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

nav.nav {
  display: flex;
  justify-content: space-between;
}

nav.dashboard-nav {
  background: $grey-darker;

  border-bottom: 1px solid $grey-darkest;
}
</style>
