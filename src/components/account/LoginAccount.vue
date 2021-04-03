<template>
  <div>
    <h2>Login</h2>
    <form novalidate @submit.prevent="onLoginClick">
      <div class="form-group">
        <label for="username">Username</label>
        <input
          type="text"
          v-model="username"
          name="username"
          class="form-control"
          :class="{ hasErrors: $v.username.$error }"
          @blur="$v.username.$touch()"
          Î
        />
        <ErrorValidation
          :hasError="$v.username.$error &&
          !$v.username.required"
          errorMessage="Username is required"
        />
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input
          type="password"
          v-model="password"
          name="password"
          class="form-control"
          :class="{ hasErrors: $v.password.$error }"
          @blur="$v.password.$touch()"
        />
        <ErrorValidation
          :hasError="$v.password.$error &&
          !$v.password.required"
          errorMessage="Password is required"
        />
      </div>
      <div class="form-group">
        <ErrorValidation
          :hasError="invalidCredentials"
          errorMessage="Username or Password is incorrect."
        />
        <button class="btn btn-primary">Login</button>
        <router-link to="/account/create" class="btn btn-link">Sign up</router-link>
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { required } from 'vuelidate/lib/validators';
import ErrorValidation from '../shared/ErrorValidation.vue';
// import AccountMixin from '../shared/mixins/AccountMixin.vue';

export default {
  name: 'LoginAccount',
  components: {
    ErrorValidation,
  },
  // mixins: [AccountMixin],
  data() {
    return {
      username: '',
      password: '',
      invalidCredentials: false,
    };
  },
  methods: {
    ...mapActions(['login']),
    onLoginClick() {
      // this.$v.$touch();
      console.log(this.password);
      this.login({ username: this.username, password: this.password })
        .then((response) => {
          console.log(response.accountId);
          this.$session.start();
          this.$session.set('accountId', response.accountId);
          this.$router.push({
            name: 'CharacterProfile',
          });
        })
        .catch(() => {
          this.invalidCredentials = true;
        });
    },
  },
  validations: {
    username: {
      required,
    },
    password: {
      required,
    },
  },
};
</script>

<style  scoped>
</style>
