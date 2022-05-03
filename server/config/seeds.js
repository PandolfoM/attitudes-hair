const db = require('./connection');
const { User, Price } = require('../models');

db.once('open', async () => {
  await User.deleteMany();

  await User.create({
    firstName: 'Matt',
    lastName: 'Pandolfo',
    email: 'matt@pandolfo.com',
    password: 'password',
    color: "#5001A6"
  });

  await User.create({
    firstName: 'Tina',
    lastName: 'Pandolfo',
    email: 'tina@pandolfo.com',
    password: 'password',
    color: ''
  });

  console.log('users seeded');

  await Price.deleteMany();

  await Price.create({
    name: "Men's Cut",
    price: 40,
    additional: false
  })

  await Price.create({
    name: "Blow Dry",
    price: 35,
    additional: true
  })

  console.log('prices seeded');

  process.exit();
});
