import { ref, watch } from 'vue'

const pressedKeys = ref({
  ArrowUp: false,
  ArrowDown: false,
  ArrowLeft: false,
  ArrowRight: false,
  e: false,
  i: false,
  f: false,
})

window.onkeydown = (event: any) => {
  pressedKeys.value[event.key as keyof typeof pressedKeys.value] = true
}

window.onkeyup = (event: any) => {
  pressedKeys.value[event.key as keyof typeof pressedKeys.value] = false
}

export function isPressed(key: keyof typeof pressedKeys.value) {
  return pressedKeys.value[key]
}
