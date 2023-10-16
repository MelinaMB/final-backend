import { it } from "mocha";
import chai from "chai";

import supertest from 'supertest';

const expect = chai.expect;
const requester = supertest('http://localhost:8080');

let cookieNameAdmin;
let cookieValueAdmin;

before(async () => {
    const result = await requester.post("api/user/login").send({
        email: "test@gmail.com",
        password: "123",
    });

    const cookie = result.headers["set-cookie"][0];
    expect(cookie).to.be.ok;

    cookieNameAdmin = cookie.split("=")[0];
    cookieValueAdmin = cookie.split("=")[1];

    expect(cookieNameAdmin).to.be.ok.and.eql("connect.sid");
    expect(cookieValueAdmin).to.be.ok;
    
});

describe('Test de endpoint productos', () => {
    
    it('En endpoint POST /api/products crear un producto', async () => {
        const prodMock = {
            title: "algodonn",
            description: "algodon organico",
            price: 300,
            code: "abc234113886",
            status: true,
            stock: 20,
            category: "almacen",
            thumbnails: "http://imagendealgodon.com"
        }

        const response = await requester.post('/api/products').send(prodMock).set("Cookie", [`${cookieNameAdmin}=${cookieValueAdmin}`]);
        const { status, ok, _body } = response;
        expect(status).to.equal(200);
        expect(_body.payload).to.have.property("_id");

    });
})