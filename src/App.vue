<script setup lang="ts">
import Area from "./components/Area.vue";
import Player from "./components/Player.vue";
import NpcDialog from "./components/NpcDialog.vue";
import { areas, currentArea } from "./area";
import { player, closeNpc } from "./player";
import { getDistance } from "./math";
</script>

<template>
  <main>
    <Area :area="areas[currentArea]">
      <template #player>
        <Player :player="player"></Player>
        <Player v-for="npc in areas[currentArea].npcs" :player="npc"></Player>
      </template>
      <template #dialog>
        <NpcDialog v-if="closeNpc">{{ closeNpc.dialog }}</NpcDialog>
      </template>
    </Area>
  </main>
</template>

<style scoped lang="scss">
main {
  width: 100%;
  height: 100vh;
  background-color: #000;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
