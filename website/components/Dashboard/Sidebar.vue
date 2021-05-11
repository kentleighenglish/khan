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
