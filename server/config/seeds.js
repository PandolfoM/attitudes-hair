const db = require('./connection');
const { User, Price } = require('../models');

db.once('open', async () => {
  await User.deleteMany();

  await User.create({
    firstName: 'Matt',
    lastName: 'Pandolfo',
    email: 'matt@pandolfo.com',
    password: 'password',
    color: "#5001A6",
    pfp: "https://66.media.tumblr.com/42fa95d36ef8aa553cd16121967e3197/ff45e51704859831-c8/s540x810/018d80299762e45793adcf497b5c5f1c6c631bc5.gifv"
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
