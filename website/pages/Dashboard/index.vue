<template>
  <div>
    <p>Dashboard Index</p>
    <label for="checkboxValue">
      <input v-model="checkboxValue" name="checkboxValue" type="checkbox" />
      <span>Toggle Switch</span>
    </label>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { mapState } from "vuex";

export default Vue.extend({
  layout: "dashboard",
  data: () => ({
    checkboxValue: false,
  }),
  computed: {
    ...mapState({
      socket({ socket: { socket } }) {
        return socket;
      },
    }),
  },
  watch: {
    checkboxValue() {
      this.updateValue();
    },
  },
  methods: {
    updateValue() {
      this.socket().emit("updateRelay", { value: this.checkboxValue });
    },
  },
});
</script>
