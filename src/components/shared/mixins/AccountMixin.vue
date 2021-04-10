<script>
import axios from 'axios';

export default {
  methods: {
    createAccount(account) {
      return axios.post('/api/accounts', account);
    },
  },
};
</script>
