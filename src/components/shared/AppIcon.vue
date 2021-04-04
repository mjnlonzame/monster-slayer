<template>
  <svgicon :name="iconName"></svgicon>
  <!-- <svgicon
    :class="{
      [$options.name]: true,
      [`${$options.name}--${size}`]: size,
    }"
    :name="iconName"
  ></svgicon>-->
</template>

<script>
// const icons = require.context('@/assets/svg-icons/');
import '@/icons';

export default {
  name: 'AppIcon',
  props: {
    iconName: String,
  },
  created() {
    console.log('expensive!!');
    // The `[request]` placeholder is replaced
    // by the filename of the file which is
    // loaded (e.g. `AppIcon-music.js`).
    // import(/* webpackChunkName: "AppIcon-[request]" */ `@/icons/${this.iconName}`);
  },
  computed: {
    path() {
      // console.log(`${this.iconName.toUpperCase()}.svg`);
      // console.log(icons(`./${this.iconName.toUpperCase()}.svg`));
      //  return icons(`./${this.iconName.toUpperCase()}.svg`);
      // return icons(`${this.className.toUpperCase()}-${this.itemType.toUpperCase()}.svg`);
      return '';
    },
    source() {
      // console.log('@/assets/svg-icons/${this.iconName}.svg');
      // return `@/assets/svgicons/${this.iconName.toUpperCase()}.svg`;
      // return "@/assets/svgicons/CASTER-WPN.svg";
      return '';
    },
  },
};
</script>

<style>
.svg-icon {
    display: inline-block;
    width: 16px;
    height: 16px;
    color: inherit;
    vertical-align: middle;
    fill: none;
    stroke: currentColor;
}

.svg-fill {
    fill: currentColor;
    stroke: none;
}

.svg-up {
    /* default */
    transform: rotate(0deg);
}

.svg-right {
    transform: rotate(90deg);
}

.svg-down {
    transform: rotate(180deg);
}

.svg-left {
    transform: rotate(-90deg);
}
</style>
