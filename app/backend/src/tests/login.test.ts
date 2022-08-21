import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import User from '../database/models/User';
import { incorrectLoginMock, loginMock, userMock } from './mock/mocks';

// import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

  describe('Testa a rota /login', () => {
      afterEach(() => {
        sinon.restore();
      }) 
  
      it('ao inserir dados válidos deve retornar status 200', async () => {
        sinon.stub(User, 'findOne').resolves(userMock as User);
        const response = await chai.request(app)
          .post('/login')
          .send(loginMock)
  
        expect(response.status).to.equal(200);
      })

      it('quando logado com sucesso deve retornar um {token}', async () => {
        sinon.stub(User, 'findOne').resolves(userMock as User);
        const response = await chai.request(app)
          .post('/login')
          .send(loginMock)
  
        expect(response.body).to.have.property('token');
      })

      it('quando o campo email não for preenchido deve retornar uma mensagem de erro', async () => {
        sinon.stub(User, 'findOne').resolves(null);
        const response = await chai.request(app)
          .post('/login')
          .send(incorrectLoginMock)
  
        expect(response.body).to.have.property('message');
      }) 
    })

