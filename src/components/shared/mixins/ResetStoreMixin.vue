<script>
import { mapMutations } from 'vuex';

export default {
  beforeRouteLeave(to, from, next) {
    this.resetState();
    next();
  },
  computed: {},
  methods: {
    ...mapMutations(['resetState']),
  },
};
</script>
