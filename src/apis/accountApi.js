// const apiUrl = 'https://vue-monster-slayer-api.herokuapp.com/accounts';

// export default {

//   getCharacter(accountId) {
//     console.log(`${apiUrl}/${accountId}/character`);
//     return this.$http
//       .get(`${apiUrl}/${accountId}/character`)
//       .then((response) => response.json());
//   },
//   login(username, password) {
//     return this.$http
//       .post(`${apiUrl}/login`, {
//         username,
//         password,
//       })
//       .then((response) => response.json());
//   },
//   createAccount(account) {
//     return this.$http
//       .post(apiUrl, account);
//   },

//   // updateUser(user) {
//   //   return this.$http
//   //     .put(`${apiUrl}/${user.id}`, user);
//   // },
//   // deleteUser(id) {
//   //   return this.$http
//   //     .delete(`${apiUrl}/${id}`);
//   // },
// };
