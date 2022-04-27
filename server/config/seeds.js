const db = require('./connection');
const { User } = require('../models');

db.once('open', async () => {
  await User.deleteMany();

  await User.create({
    firstName: 'Matt',
    lastName: 'Pandolfo',
    email: 'matt@pandolfo.com',
    password: 'password',
  });

  await User.create({
    firstName: 'Tina',
    lastName: 'Pandolfo',
    email: 'tina@pandolfo.com',
    password: 'password'
  });

  console.log('users seeded');

  process.exit();
});
