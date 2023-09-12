<template>
  <div class="dialog"><slot></slot></div>
</template>
<style scoped lang="scss">
.dialog {
  width: 70%;
  height: 10%;
  background-color: #ecb371aa;
  padding: 5px;
  position: absolute;
  top: 80%;
  left: 50%;
  transform: translateX(-50%);
}
</style>
