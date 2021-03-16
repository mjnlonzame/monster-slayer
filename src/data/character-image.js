const images = require.context('../assets/images/');

const characterImages = [
  {
    image: images('./saber.png'),
    id: 1,
  },
  {
    image: images('./archer.png'),
    id: 2,
  },
  {
    image: images('./lancer.png'),
    id: 3,
  },
  {
    image: images('./berserker.png'),
    id: 4,
  },
  {
    image: images('./caster.png'),
    id: 5,
  },
];

export default characterImages;
