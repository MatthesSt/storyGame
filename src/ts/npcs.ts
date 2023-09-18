import { ref } from 'vue'
import { Entity, InvetorySlot } from './types'
import { createInventoryWithItems, entityFactory } from './factory'
import { Tuple } from './types'

export const npcInventory = ref<Tuple<InvetorySlot, 16>>(createInventoryWithItems().items)

export const npcs = ref<Record<string, Entity>>({
  NPC: entityFactory({
    name: 'NPC',
    type: 'npc',
    x: 160,
    y: 160,
    money: 10,
    image: 'npc/NPC_1.png',
    dialog: {
      initial: {
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
    currentDialog: 'initial',
  }),
  Merchant: entityFactory({
    name: 'Merchant',
    type: 'npc',
    x: 260,
    y: 260,
    image: 'npc/Merchant.png',
    money: 10,
    currentDialog: 'initial',
    inventory: createInventoryWithItems([
      {
        amount: 3,
        id: 1,
      },
      {
        amount: 5,
        id: 5,
      },
    ]),

    dialog: {
      initial: {
        text: 'Hi',
        answers: [
          {
            text: 'open shop',
            next: 'exit',
            action: () => {
              const inventory = npcs.value['Merchant'].inventory
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
})
