const images = require.context('./images/');
// true, /\.jpg$/
const characters = [{
  name: 'Mirana',
  health: 100,
  maxHealth: 100,
  mana: 50,
  maxMana: 50,
  image: images('./mirana-left.jpg'),
  skills: [
    {
      name: 'Attack',
      type: 'BASIC',
      damage: 5,
      manaCost: 0,
    },
    {
      name: 'Focus',
      type: 'BASIC',
      damage: null,
      manaRegen: 20,
      manaCost: 0,
    },
    {
      name: "Elune's Arrow",
      type: 'SUPER',
      damage: 10,
      manaCost: 10,
    }, {
      name: 'Bow Attack',
      type: 'SUPER',
      damage: 10,
      manaCost: 10,
    }, {
      name: 'Starfall',
      type: 'ULTIMATE',
      damage: 20,
      manaCost: 30,
    }],
}, {
  name: 'Morphling',
  health: 100,
  maxHealth: 100,
  mana: 50,
  maxMana: 50,
  image: images('./morphling-left.jpg'),
  skills: [
    {
      name: 'Attack',
      type: 'BASIC',
      damage: 5,
      manaCost: 0,
    },
    {
      name: 'Focus',
      type: 'BASIC',
      damage: null,
      manaRegen: 20,
      manaCost: 0,
    },
    {
      name: 'Wave Form',
      type: 'SUPER',
      damage: 10,
      manaCost: 10,
    }, {
      name: 'Adaptive Strike',
      type: 'SUPER',
      damage: 10,
      manaCost: 10,
    }, {
      name: 'Shotgun',
      type: 'ULTIMATE',
      damage: 20,
      manaCost: 30,
    }],
}];

export default characters;
