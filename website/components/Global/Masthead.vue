import { applyModifiers } from "@src/utilities/utility";

<template>
  <div class="masthead">
    <div class="container">
      <div class="masthead__blocks">
        <div
          v-for="(block, i) in blocks"
          :key="`block_${i}`"
          apply-modifiers="masthead__block"
        />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  data: () => ({
    blocks: [
      ["left", "thick", "very-tall"],
      ["left", "thick", "tall"],
      ["left", "very-thin", "short"],
      ["right", "thin", "very-tall"],
      ["right", "thick", "tall"],
      ["right", "very-thin", "short"],
      ["right", "thick", "very-short"],
    ],
  }),
});
</script>

export default Masthead;
