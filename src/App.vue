<script setup lang="ts">
import Area from "./components/Area.vue";
import Entity from "./components/Entity.vue";
import Enemy from "./components/Enemy.vue";
import NpcDialog from "./components/NpcDialog.vue";
import Inventory from "./components/Inventory.vue";
import { areas, currentArea } from "./area";
import { player, closeNpc } from "./player";
import { npcs } from "./npcs";
import { getTileIndices } from "./math";
import { enemies } from "./enemy";
</script>

<template>
  <main>
    <div id="debugArea" style="position: absolute; inset: 0; color: white">
      <span>
        {{ player.x }}, {{ player.y }},{{
          getTileIndices([player.x, player.y])
        }}
        </span>
      <span>portal: {{ areas[currentArea].portals[0].position }}</span>
    </div>
    <Area :area="areas[currentArea]">
      <template #player>
        <Entity :entity="player"></Entity>
        <Entity
          v-for="npc in npcs.filter((e) =>
            areas[currentArea].npcs.find((n) => n == e.id)
          )"
          :entity="npc"
          :canTalk="npc.id == closeNpc?.id"
        ></Entity>
        <Entity
          v-for="enemy in enemies.filter((e) =>
            areas[currentArea].enemies?.find((n) => n == e.id)
          )"
          :entity="enemy"
          :style="`width: ${enemy.width}px; height: ${enemy.height}px`"
        ></Entity>
      </template>
      <template #dialog>
        <NpcDialog v-if="closeNpc" :npc="closeNpc" />
      </template>
      <template #inventory>
        <Inventory :player="player" />
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
