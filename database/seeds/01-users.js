
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').truncate() // resets id so it can be used again upon removal
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
      {id: 1, username: 'wunderTesty', password: '123'} // do not ever do, just doing for testing purposes.
      ]);
    });
};
