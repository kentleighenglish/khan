<template>
  <nav v-modifiers:nav="navType">
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
      socketState({ socket: { connected, connecting } }: RootState): string {
        if (connected) {
          return "connected";
        }
        if (connecting) {
          return "connecting";
        }

        return "disconnected";
      },
      hasSocket({ socket: { socket } }: RootState) {
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
    navType(): string[] {
      return this.type ? [this.type] : [];
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

  &.nav--dashboard {
    justify-content: initial;
    background: $grey-lightest;

    align-items: center;

    ul {
      width: 100%;

      li {
        a {
          font-size: $font-sm;
          color: $grey-darker;
          font-weight: 600;

          &:hover {
            color: lighten($secondary, 10%);
            background: darken($grey-lightest, 3%);
          }
        }
      }
    }
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

@keyframes iconSpin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.dashboard-socketState {
  display: flex;
  padding: 0 ($gap / 2);
  white-space: nowrap;
  align-items: center;
  cursor: pointer;

  transition: color $anim-speed, border-color $anim-speed;

  &__text {
    margin-right: $gap / 2;
  }

  &__icon {
    display: inline-flex;
    position: relative;
    width: 20px;
    height: 20px;
    justify-content: center;
    align-items: center;

    &Inner {
      position: absolute;
      width: 4px;
      height: 4px;
      border-radius: 50%;

      border: 2px solid black;
      border-color: inherit;
    }

    &Middle,
    &Outer {
      position: absolute;
      border: 2px solid black;
      border-color: inherit;
      border-radius: 50%;

      border-top-color: transparent;
      border-bottom-color: transparent;
      transform: rotate(0deg);

      animation: iconSpin infinite linear;
      animation-play-state: paused;
    }
    &Middle {
      height: 16px;
      width: 16px;

      animation-duration: 2s;
      animation-direction: reverse;
    }
    &Outer {
      height: 28px;
      width: 28px;

      animation-duration: 1s;
    }
  }

  &--connected {
    color: $success;
    border-color: $success;

    .dashboard-socketState__icon {
      span {
        animation: initial;
      }
    }
  }
  &--connecting {
    color: $warning;
    border-color: $warning;

    .dashboard-socketState__icon {
      span {
        animation-play-state: running;
      }
    }
  }
  &--disconnected {
    color: $danger;
    border-color: $danger;

    .dashboard-socketState__icon {
      span {
        animation-play-state: running;
        animation-duration: 0.3s;
        animation-iteration-count: 1;
      }
    }
  }
}
</style>
