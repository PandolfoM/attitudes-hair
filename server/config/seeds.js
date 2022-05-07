const db = require("./connection");
const { User, Price } = require("../models");

db.once("open", async () => {
  await User.deleteMany();

  await User.create({
    firstName: "Matt",
    lastName: "Pandolfo",
    email: "matt@pandolfo.com",
    password: "password",
    color: "#5001A6",
    pfp: "https://66.media.tumblr.com/42fa95d36ef8aa553cd16121967e3197/ff45e51704859831-c8/s540x810/018d80299762e45793adcf497b5c5f1c6c631bc5.gifv",
  });

  await User.create({
    firstName: "Tina",
    lastName: "Pandolfo",
    email: "tina@pandolfo.com",
    password: "password",
    color: "",
    pfp: "",
  });

  console.log("users seeded");

  await Price.deleteMany();

  await Price.create({
    name: "Blow dry",
    price: 35,
    additional: true,
  });

  await Price.create({
    name: "Style (Flat iron/curls)",
    price: 15,
    additional: true,
  });
  
  await Price.create({
    name: "Bang trim",
    price: 15,
    additional: false,
  });
  
  await Price.create({
    name: "Cut",
    price: 46,
    additional: true,
  });
   
  await Price.create({
    name: "Cut + Blow dry",
    price: 60,
    additional: true,
  });

  await Price.create({
    name: "Color",
    price: 65,
    additional: true,
  });
 
  await Price.create({
    name: "Color + Blow dry",
    price: 80,
    additional: true,
  });
   
  await Price.create({
    name: "Color + Cut",
    price: 90,
    additional: true,
  });
   
  await Price.create({
    name: "Color. Cut + Blow dry",
    price: 95,
    additional: true,
  });

  await Price.create({
    name: "Full Foil Highlight",
    price: 120,
    additional: true,
  });
   
  await Price.create({
    name: "Retouch Full Foil Highlight",
    price: 110,
    additional: true,
  });
   
  await Price.create({
    name: "Partial Highlight",
    price: 95,
    additional: true,
  });
 
  await Price.create({
    name: "Retouch Partial Highlight",
    price: 85,
    additional: true,
  });
   
  await Price.create({
    name: "Perm",
    price: 95,
    additional: true,
  });

  await Price.create({
    name: "Men's Cut",
    price: 40,
    additional: false,
  });

  await Price.create({
    name: "Men's Color + Cut",
    price: 85,
    additional: true,
  });

  await Price.create({
    name: "Conditioning Treatments",
    price: 35,
    additional: true,
  });

  await Price.create({
    name: "Eyebrows waxing",
    price: 12,
    additional: false,
  });

  await Price.create({
    name: "Lip waxing",
    price: 10,
    additional: false,
  });

  await Price.create({
    name: "Chin waxing",
    price: 8,
    additional: false,
  });

  await Price.create({
    name: "Sideburns waxing",
    price: 12,
    additional: false,
  });
  console.log("prices seeded");

  process.exit();
});
