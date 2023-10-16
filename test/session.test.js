import chai from 'chai';
import supertest from 'supertest';
import { faker } from '@faker-js/faker';

const expect = chai.expect;

const requester = supertest('http://localhost:8080');

 describe('Registro, Login and Current', () => {
    let cookieName;
    let cookieValue;
    const mockUser = {
      firstName: 'rob1' /*faker.person.firstName*/,
      lastName: 'ert1'/*faker.person.lastName*/,
      age: 29,
      email: faker.internet.email(),
      password: '123',
    };

    it('Debe registrar un usuario', async () => {
      const { _body } = await requester.post('/api/user/register').send(mockUser);
      expect({_body}).to.be.ok;
    });

    it('Debe loggear un user y DEVOLVER UNA COOKIE', async () => {
      const result = await requester.post('/api/user/login').send({
        email: mockUser.email,
        password: mockUser.password,
      });

      const cookie = result.headers['set-cookie'][0];
      expect(cookie).to.be.ok;
    //tengo que splitear la cookie para que se pueda fijar si existe la parte de string y la parte de nuemro despues del igual
    // nombredecookie=12345
      cookieName = cookie.split('=')[0];
      cookieValue = cookie.split('=')[1];

      expect(cookieName).to.be.ok.and.eql('connect.sid');
      expect(cookieValue).to.be.ok;
    });

    it('Enviar cookie para ver el contenido del user', async () => {
      const resultado = await requester.get('/api/session/current').set('Cookie', [`${cookieName}=${cookieValue}`]);
      expect(resultado.body.user).to.have.property('email').be.eql(mockUser.email);
    });
  }); 