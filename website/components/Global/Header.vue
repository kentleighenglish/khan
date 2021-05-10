<template>
  <header>
    <div className="container">
      <GlobalNav />
    </div>
    <GlobalMasthead v-if="isHome" />
  </header>
</template>
<script lang="ts">
import Vue from "vue";
import { mapState } from "vuex";

export default Vue.extend({
  computed: {
    ...mapState({
      isHome(): boolean {
        return this.$route.fullPath === "/";
      },
    }),
  },
});
</script>
