<template>
  <div class="masthead">
    <div class="container">
      <div class="masthead__blocks">
        <div
          v-for="(block, i) in blocks"
          :key="`block_${i}`"
          v-modifiers:masthead__block="block"
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
<style lang="scss">
$positions: (50px, 150px, 25px, 125px, 75px, 150px, 20px);

.masthead {
  width: 100%;
  height: 500px;

  // border: 0px solid $secondary;
  // border-top-width: 2px;
  // border-bottom-width: 2px;

  &__blocks {
    position: relative;
    margin: 0 $gap * -1 0 $gap;
  }

  &__block {
    position: relative;
    display: inline-block;
    top: 0;
    margin: 0 ($gap / 4);

    @for $i from 1 through length($positions) {
      $pos: nth($positions, $i);

      &:nth-child(#{$i}) {
        transform: skew(-20deg) translate(0, $pos);
        // top: $pos;
      }
    }

    // transform: skewX(-20deg);

    background-color: $primary;

    &--left {
      transform-origin: bottom left;
      // float: left;
    }

    &--right {
      transform-origin: top left;
      float: right;
    }

    // Widths
    &--thick {
      width: 80px;
    }

    &--thin {
      width: 60px;
    }

    &--very-thin {
      width: 30px;
    }

    // Heights
    &--very-tall {
      height: 350px;
    }

    &--tall {
      height: 300px;
    }

    &--short {
      height: 250px;
    }

    &--very-short {
      height: 200px;
    }
  }
}
</style>
