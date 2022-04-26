const db = require('./connection');
const { User } = require('../models');

db.once('open', async () => {
  await User.deleteMany();

  await User.create({
    email: 'matt@pandolfo.com',
    password: 'password',
  });

  await User.create({
    email: 'tina@pandolfo.com',
    password: 'password'
  });

  console.log('users seeded');

  process.exit();
});
