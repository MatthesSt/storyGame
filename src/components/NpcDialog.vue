<script lang="ts" setup>
import { Entity } from "../types";
import { player } from "../player";

defineProps<{
  npc: Entity;
}>();

function execute(
  npc: Entity,
  answer: { action?: () => void; text: string; next?: number }
) {
  if (answer.next) {
    npc.currentDialog = answer.next;
  } else {
    npc.currentDialog = 0;
    npc.talking = false;
    player.value.talking = false;
  }
  if (answer.action) answer.action();
}
</script>

<template>
  <div class="communicationWrapper" v-if="npc.currentDialog">
    <div class="dialog">
      {{ npc.dialog?.[npc.currentDialog] }}
    </div>
    <div class="answers">
      <div v-for="(answer, index) in npc.dialog?.[npc.currentDialog].answers">
        <button class="answer" @click.stop="execute(npc, answer)">
          {{ index + 1 }}: {{ answer.text }}
        </button>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
$boxWidth: 30%;
.communicationWrapper {
  position: absolute;
  top: 80%;
  left: 50%;
  width: 100%;
  height: 10%;
  transform: translateX(-50%);
}
.dialog {
  width: calc(100% - $boxWidth);
  height: 100%;
  background-color: #ecb371aa;
  padding: 5px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}
.answers {
  position: absolute;
  padding: 5px;
  top: 0;
  right: calc($boxWidth / 2);
  width: max-content;
  height: max-content;
  background-color: #ecb371aa;
  transform: translateY(calc(-100% - 10px));
}
.answer {
  cursor: pointer;
  border: none;
  width: 100%;
  text-align: start;
  background-color: transparent;
  border-block: 1px solid #666;
}
</style>
