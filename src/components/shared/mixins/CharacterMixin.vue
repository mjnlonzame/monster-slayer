<script>
export default {
  computed: {},
  methods: {
    getSkillIconName(skillType) {
      const fullSkillTypeName = skillType === 'M' ? 'MAGICAL' : 'PHYSICAL';
      return fullSkillTypeName;
    },
    getItemIconName(classType, weaponType) {
      return `${this.getClassName(classType)}-${weaponType}`.toUpperCase();
    },
    getClassName(classType) {
      let className = '';
      if (classType === 1) {
        className = 'saber';
      } else if (classType === 2) {
        className = 'archer';
      } else if (classType === 3) {
        className = 'lancer';
      } else if (classType === 4) {
        className = 'berserker';
      } else if (classType === 5) {
        className = 'caster';
      }
      return className;
    },
  },
};
</script>
