import Sinon, * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import User from '../database/models/User';
import { loginMock, userMock } from './mock/mocks';

//import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa a rota /login', () => {
    afterEach(() => {
      Sinon.restore();
    })

    it('ao inserir dados válidos deve retornar status 200', async () => {
      sinon.stub(User, 'findOne').resolves(userMock as User)
      
      const response = await chai.request(app)
      .post('/login')
      .send(loginMock)
    
      expect(response.status).to.equal(200);
    })
  })