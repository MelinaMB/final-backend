import multer from 'multer';
import { connect } from 'mongoose';

// ----------------multer-------------------
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __dirname + '/public');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

export const uploader = multer({ storage });

// ------------_dirname-------------

// https://flaviocopes.com/fix-dirname-not-defined-es-module-scope/
import path from 'path';
import { fileURLToPath } from 'url';
export const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);
// import 'dotenv/config';

export async function connectMongo() {
  try {
    await connect('mongodb+srv://melinambustos:jq7wYzhXfWRZtGpe@backend-coder.rpukb6t.mongodb.net/ecommerce?retryWrites=true&w=majority');
    console.log('plug to mongo!');
  } catch (e) {
    console.log(e);
    throw 'can not connect to the db';
  }
}

// -------------------------bcrypt---------------------------------
import bcrypt from 'bcrypt';
export const createHash = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(10));
export const isValidPassword = (password, hashPassword) => bcrypt.compareSync(password, hashPassword);

// -------------------------------------faker-----------------
import { faker } from "@faker-js/faker/locale/es";

export const generateProduct = () => {
  return {
    title: faker.commerce.productName(),
    price: faker.commerce.price(),
    description: faker.commerce.productDescription(),
    id: faker.database.mongodbObjectId(),
    thumbnails: faker.image.url(),
    code: faker.database.mongodbObjectId(),
    category: faker.commerce.department(),
  
  };
};