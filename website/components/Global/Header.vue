<template>
  <header>
    <div className="container">
      <GlobalNav />
    </div>
    <Masthead v-if="isHome" />
  </header>
</template>
<script lang="ts">
import Vue from "vue";
import { mapState } from "vuex";

export default Vue.extend({
  computed: {
    ...mapState({
      isHome(): boolean {
        // eslint-disable-next-line no-console
        console.log(this.$route);
        return true;
      },
    }),
  },
});
</script>
