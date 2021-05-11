<template>
  <div>
    <p>Controllers Page</p>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { mapActions } from "vuex";

export default Vue.extend({
  mounted() {
    this.fetchAllControllers();
  },
  methods: {
    ...mapActions({
      fetchAllControllers: "controllers/fetchAll",
    }),
  },
});
</script>
