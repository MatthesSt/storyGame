import { ref } from 'vue'
import { Entity, InvetorySlot } from './types'
import { createInventoryWithItems, entityFactory } from './utils'
import { Tuple } from './typehelpers'

export const npcInventory = ref<Tuple<InvetorySlot, 16>>(createInventoryWithItems())

export const npcs = ref<Entity[]>([
  entityFactory({
    id: 1,
    name: 'NPC',
    type: 'npc',
    x: 160,
    y: 160,
    money: 10,
    image: 'npc/NPC_1.png',
    dialog: {
      init: {
        text: 'Greetings, traveler. Can you help me ?',
        answers: [
          {
            text: 'Yes!',
            next: 'help',
          },
          {
            text: 'No, not right now.',
          },
        ],
      },
      help: {
        text: 'Can you bring me a red Flower? You should find some west of here.',
        answers: [
          {
            text: 'On it!',
            next: 'agree',
          },
          {
            text: 'I changed my mind.',
            next: 'disagree',
          },
        ],
      },
      agree: {
        text: 'Thank you so much!',
        answers: [
          {
            text: 'See You Later.',
          },
        ],
      },
      disagree: {
        text: 'Oh... okay.',
        answers: [
          {
            text: 'Bye',
          },
        ],
      },
    },
    currentDialog: 'init',
  }),
  entityFactory({
    id: 2,
    name: 'Merchant',
    type: 'npc',
    x: 260,
    y: 260,
    image: 'npc/Merchant.png',
    money: 10,
    currentDialog: 'init',
    inventory: {
      size: 16,
      items: createInventoryWithItems([
        {
          amount: 3,
          id: 1,
        },
      ]),
      openend: false,
    },
    dialog: {
      init: {
        text: 'Hi',
        answers: [
          {
            text: 'open shop',
            next: 'exit',
            action: () => {
              const inventory = npcs.value.find((n) => n.id == 2)!.inventory
              npcInventory.value = inventory.items
              inventory.openend = true
            },
          },
          {
            text: 'bye',
          },
        ],
      },
      exit: {
        text: 'choose what you want',
        answers: [
          {
            text: 'bye',
          },
        ],
      },
    },
  }),
])
