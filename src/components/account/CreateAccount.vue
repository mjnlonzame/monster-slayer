<template>
  <div class="main-content">
    <form novalidate>
      <h1 class="text-center">Account Form</h1>
      <div class="form-group row">
        <label for="fullName" class="col-sm-2 col-form-label">Full name</label>
        <div class="col-sm-10">
          <input
            type="text"
            class="form-control"
            id="fullName"
            v-model="account.fullName"
            :class="{ hasErrors: $v.account.fullName.$error }"
            @blur="$v.account.fullName.$touch()"
          />
          <ErrorValidation
            :hasError="$v.account.fullName.$error &&
          !$v.account.fullName.required"
            errorMessage="Full name is required"
          />
          <!-- <p
            class="error-message"
            v-if="$v.account.fullName.$error &&
          !$v.account.fullName.required"
          >Full name is required</p>-->
        </div>
      </div>
      <div class="form-group row">
        <label for="email" class="col-sm-2 col-form-label">Email</label>
        <div class="col-sm-10">
          <input
            type="text"
            class="form-control"
            id="email"
            v-model="account.email"
            :class="{ hasErrors: $v.account.email.$error }"
            @blur="$v.account.email.$touch()"
          />
          <ErrorValidation
            :hasError="$v.account.email.$error &&
          !$v.account.email.required"
            errorMessage="Email is required"
          />
          <ErrorValidation
            :hasError="$v.account.email.$error &&
          !$v.account.email.email"
            errorMessage="Must be a valid email"
          />
        </div>
      </div>
      <div class="form-group row">
        <label for="username" class="col-sm-2 col-form-label">Username</label>
        <div class="col-sm-10">
          <input
            type="text"
            class="form-control"
            id="username"
            v-model="account.username"
            :class="{ hasErrors: $v.account.username.$error }"
            @blur="$v.account.username.$touch()"
          />
          <ErrorValidation
            :hasError="$v.account.username.$error &&
          !$v.account.username.required"
            errorMessage="Username is required"
          />
          <ErrorValidation
            :hasError="$v.account.username.$error &&
          !$v.account.username.minLength"
            errorMessage="Enter a username that is at least 6 letters long"
          />
        </div>
      </div>
      <div class="form-group row">
        <label for="password" class="col-sm-2 col-form-label">Password</label>
        <div class="col-sm-10">
          <input
            type="password"
            class="form-control"
            id="password"
            v-model="account.password"
            :class="{ hasErrors: $v.account.password.$error }"
            @blur="$v.account.password.$touch()"
          />

          <ErrorValidation
            :hasError="$v.account.password.$error &&
          !$v.account.password.required"
            errorMessage="Password is required"
          />
          <ErrorValidation
            :hasError="$v.account.password.$error &&
          !$v.account.password.minLength"
            errorMessage="Enter a password that is at least 6 letters long"
          />
        </div>
      </div>
      <div class="form-group row">
        <label for="characterName" class="col-sm-2 col-form-label">Character name</label>
        <div class="col-sm-10">
          <input
            type="text"
            class="form-control"
            id="characterName"
            v-model="account.characterName"
            :class="{ hasErrors: $v.account.characterName.$error }"
            @blur="$v.account.characterName.$touch()"
          />
          <ErrorValidation
            :hasError="$v.account.characterName.$error &&
          !$v.account.characterName.required"
            errorMessage="Character name is required"
          />
          <ErrorValidation
            :hasError="$v.account.characterName.$error &&
          !$v.account.characterName.minLength"
            errorMessage="Enter a character name that is at least 6 letters long"
          />
          <ErrorValidation
            :hasError="$v.account.characterName.$error &&
          !$v.account.characterName.maxLength"
            errorMessage="Enter a character name that is at most 20 letters long"
          />
        </div>
      </div>
      <div class="form-group row">
        <label for="characterSelect" class="col-sm-2 col-form-label">Character select</label>
        <div class="col-sm-10">
          <select
            v-model="account.classType"
            class="form-control"
            id="characterSelect"
            :class="{ hasErrors: $v.account.classType.$error }"
            @blur="$v.account.classType.$touch()"
          >
            <option
              v-for="(character, index) in characters"
              :key="index"
              :value="character.id"
            >{{character.name}}</option>
          </select>
          <ErrorValidation
            :hasError="$v.account.classType.$error &&
          !$v.account.classType.maxLength"
            errorMessage="Character is required"
          />
        </div>
      </div>
      <div class="form-group row">
        <div class="col text-center">
          <button class="btn btn-primary" @click.prevent="onCreateClick">Create</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import {
  required,
  minLength,
  maxLength,
  email,
} from 'vuelidate/lib/validators';
import characters from '../../data/characters';
import ErrorValidation from '../shared/ErrorValidation.vue';
import AccountMixin from '../shared/mixins/AccountMixin.vue';

export default {
  name: 'CreateAccount',
  components: {
    ErrorValidation,
  },
  mixins: [AccountMixin],
  data() {
    return {
      account: {
        fullName: '',
        email: '',
        username: '',
        password: '',
        characterName: '',
        classType: null,
      },

      characters,
    };
  },
  created() {
    this.classType = characters.length > 0 ? characters[0].id : null;
  },
  methods: {
    onCreateClick() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.createAccount(this.account).then(() => this.$router.push('/login'));
      }
    },
  },
  validations: {
    account: {
      fullName: { required },
      email: { required, email },
      username: { required, minLength: minLength(6) },
      password: { required, minLength: minLength(6) },
      characterName: {
        required,
        minLength: minLength(6),
        maxLength: maxLength(20),
      },
      classType: { required },
    },
  },
};
</script>

<style  scoped>
.main-content {
  padding: 15px;
  border: 1px solid #cecece;
}
</style>
