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
