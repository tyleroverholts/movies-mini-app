/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('movies').del()
  await knex('movies').insert([
    {id: 1, title: 'Mean Girls', userAdded: false},
    {id: 2, title: 'Hackers', userAdded: false},
    {id: 3, title: 'The Grey', userAdded: false},
    {id: 4, title: 'Sunshine', userAdded: false},
    {id: 5, title: 'Ex Machina', userAdded: false},
  ]);
};
