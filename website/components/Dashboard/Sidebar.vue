<template>
  <div className="dashboard-sidebar">
    <RouterLink
      v-for="item in navItems"
      :key="item.path"
      :to="item.path"
      class="dashboard-sidebar__button"
    >
      <span>{{ item.label }}</span>
    </RouterLink>
  </div>
</template>
<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  data: () => ({
    navItems: [
      { path: "/dashboard/", label: "Dashboard" },
      { path: "/dashboard/account", label: "Account" },
      { path: "/dashboard/scenes", label: "Scenes" },
      { path: "/dashboard/devices", label: "Devices" },
      { path: "/dashboard/controllers", label: "Controllers" },
    ],
  }),
});
</script>
<style lang="scss">
.dashboard-sidebar {
  display: block;
  width: 400px;
  height: 100%;
  padding-top: $gap / 2;

  &__button {
    display: block;
    padding: ($gap / 2) $gap;
    margin: ($gap / 2) 0 0 ($gap / 2) * -1;
    text-align: right;
    width: 80%;
    color: white;

    transform: skewX(-25deg);
    @include gradient($secondary, $secondary);

    transition: background $anim-speed, width $anim-speed;

    &:visited,
    &:hover {
      color: white;
      text-decoration: none;
    }

    span {
      display: block;
      transform: skewX(25deg);
      text-align: center;
      padding-left: ($gap / 2);
    }

    &:hover {
      width: 85%;

      @include gradient($secondary, saturate(lighten($secondary, 10%), 100%));
    }
  }
}
</style>
