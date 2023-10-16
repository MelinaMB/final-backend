import mongoose from "mongoose";
import { it } from "mocha";
import chai from "chai";
import { CartModels} from "../src/DAO/classes/cart.dao.js";
import { CartsModel } from "../src/DAO/models/carts.model.js";
const cartDao = new CartModels();
const expect = chai.expect;

await mongoose.connect(
    "mongodb+srv://melinambustos:jq7wYzhXfWRZtGpe@backend-coder.rpukb6t.mongodb.net/ecommerce?retryWrites=true&w=majority"
);

describe("Test del modelo y dao de cart", () => {
    let carritoCreado
    it("Test para obtener todos los carritos de mi BD", async function () {
       const carts = await CartsModel.find();
       
        expect(Array.isArray(carts)).to.be.ok; 
        
    });

    it("Test para crear un carrito", async function () {
        const newCarrito = {
            products: {
                product: "648233f16b02b49b937da491",
                quantity: 2
            }
        }
        carritoCreado = await CartsModel.create(newCarrito);
        expect(carritoCreado).to.have.property("_id");
        expect(carritoCreado._id).to.be.ok;
    });

    
    it("Test de update del cart.dao", async function () {
        const productoUpdate = await cartDao.updateCart(carritoCreado._id, {
            products:[ {
                product: "648233f16b02b49b937da491", 
                quantity: 4
            },
            {
                product: "648233f16b02b49b937da494", 
                quantity: 3
            }
        ]
        });
        expect(productoUpdate).to.be.an('object').to.be.ok
    });

})