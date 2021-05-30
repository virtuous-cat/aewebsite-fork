const mongoose = require("mongoose");
const {
  squareFaces,
  pantoFaces,
  rectangleFaces,
  baseFrames,
  colours,
} = require("./seedHelpers");
const Product = require("../models/product");

mongoose.connect("mongodb://localhost:27017/articulate-eyewear", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
  console.log("Database Connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Product.deleteMany({});
  for (const base of baseFrames) {
    const frame = new Product({
      name: base,
      colour: "steel",
      cost: 100,
      wholesalePrice: 200,
      retailPrice: 300,
      frameSet: base,
      qty: Math.floor(Math.random() * 10),
      isBase: true,
    });
    await frame.save();
  }
  for (let i = 0; i < 40; i++) {
    const q = Math.random();
    let unique = false;
    if (q < 0.2) {
      unique = true;
    }
    const chooseSet = sample(baseFrames);
    const aCost = Math.floor(Math.random() * 30 + 20);
    if (chooseSet === "Square") {
      const face = new Product({
        name: `${sample(squareFaces)}`,
        colour: `${sample(colours)}`,
        cost: aCost,
        wholesalePrice: aCost * 2,
        retailPrice: aCost * 3,
        frameSet: chooseSet,
        qty: Math.floor(Math.random() * 10),
        isUnique: unique,
      });
      await face.save();
    }
    if (chooseSet === "Rectangle") {
      const face = new Product({
        name: `${sample(rectangleFaces)}`,
        colour: `${sample(colours)}`,
        cost: aCost,
        wholesalePrice: aCost * 2,
        retailPrice: aCost * 3,
        frameSet: chooseSet,
        qty: Math.floor(Math.random() * 10),
        isUnique: unique,
      });
      await face.save();
    }
    if (chooseSet === "Panto") {
      const face = new Product({
        name: `${sample(pantoFaces)}`,
        colour: `${sample(colours)}`,
        cost: aCost,
        wholesalePrice: aCost * 2,
        retailPrice: aCost * 3,
        frameSet: chooseSet,
        qty: Math.floor(Math.random() * 10),
        isUnique: unique,
      });
      await face.save();
    }
  }
};

seedDB().then(() => {
  mongoose.connection.close();
  console.log("Database Closed");
});
