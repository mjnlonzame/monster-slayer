<script>
export default {
  computed: {
    // className() {
    //   let className = "";
    //   const { classType } = this.character;
    //   if (classType === 1) {
    //     className = "saber";
    //   } else if (classType === 2) {
    //     className = "archer";
    //   } else if (classType === 3) {
    //     className = "lancer";
    //   } else if (classType === 4) {
    //     className = "berserker";
    //   } else if (classType === 5) {
    //     className = "caster";
    //   }
    //   return className;
    // }
  },
  methods: {
    getSkillIconName(skillType) {
      const fullSkillTypeName = skillType === 'M' ? 'MAGICAL' : 'PHYSICAL';
      console.log(fullSkillTypeName);
      return fullSkillTypeName;
    },
    getItemIconName(classType, weaponType) {
      return `${this.getClassName(classType)}-${weaponType}`.toUpperCase();
    },
    getClassName(classType) {
      let className = '';
      // const { classType } = this.character;
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
