<script setup lang="ts">
import { computed, ref } from "vue";
import { Entity, MapObject, Tile } from "../ts/types";
import { mapObjects } from "../ts/mapObjects";

const width = ref(10);
const height = ref(10);

const map = ref<{
  entities: Entity[];
  objects: MapObject[];
  tiles: Tile[];
}>({
  entities: [],
  objects: [],
  tiles: [],
});
const jsonMap = computed(() => JSON.stringify(map.value));

function copyToClipboard() {
  navigator.clipboard.writeText(jsonMap.value);
}
</script>
<template>
  <div style="width: 100%; height: 100%">
    <div class="mapControls" style="color: white">
      <button @click="copyToClipboard">copy jsonMap</button>
      <label for="mapWidth">width:</label>
      <input id="mapWidth" type="number" v-model="width" />
      <label for="mapHeight">height:</label>
      <input id="mapHeight" type="number" v-model="height" />
    </div>
    <div class="main-wrapper">
      <aside class="toolbar">
        <div v-for="object in mapObjects" class="toolbarItem">
          <img :src="object.image || 'empty_bg.png'" />
        </div>
      </aside>
      <div class="mapWrapper">
        <div v-for="x in width">
          <div v-for="y in height" class="tile"></div>
        </div>
      </div>
      <aside class="objectInfos"></aside>
    </div>
  </div>
</template>
<style scoped lang="scss">
@import "../style.scss";

.mapControls {
  display: flex;
  align-items: center;
  padding-inline: 0.5rem;
  height: 10%;
}
.tile {
  width: $tileSize;
  height: $tileSize;
  border: 1px solid black;
  background-color: white;
}
label {
  margin-inline: 0.5rem;
}
input {
  margin-inline-end: 0.5rem;
  width: 3rem;
}
.main-wrapper {
  height: 90%;
  position: relative;
  display: flex;
  align-items: center;
}

$toolbarWidth: 10rem;
$toolsPerRow: 3;
.toolbar {
  width: $toolbarWidth;
  height: 100%;
  background-color: #aaa;
  position: absolute;
  inset: 0;
  display: grid;
  grid-template-columns: repeat($toolsPerRow, 1fr);
}
.objectInfos {
  width: $toolbarWidth;
  height: 100%;
  background-color: #aaa;
  position: absolute;
  right: 0;
}
.mapWrapper {
  display: flex;
  align-items: center;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  max-height: 100%;
  max-width: calc(100% - $toolbarWidth * 2 - 2rem);
  overflow: auto;
}
.toolbarItem {
  display: flex;
  justify-content: center;
  align-items: center;
  $size: calc($toolbarWidth / $toolsPerRow);
  width: $size;
  height: $size;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>
