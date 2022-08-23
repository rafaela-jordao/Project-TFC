import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Matches from '../database/models/Matches';
import { matchesMock } from './mock/mocks';

chai.use(chaiHttp);

const { expect } = chai;

  describe('Testa a rota /matches', () => {
      afterEach(() => {
        sinon.restore();
      }) 
  
      it('deve retornar status 200', async () => {
        sinon.stub(Matches, 'findAll').resolves([matchesMock as unknown as Matches]);
        const response = await chai.request(app)
          .get('/matches')
  
        expect(response.status).to.equal(200);
      })

    it('deve retornar um array de objetos', async () => {
        sinon.stub(Matches, 'findAll').resolves([matchesMock as unknown as Matches]);
        const response = await chai.request(app)
          .get('/matches')
  
        expect(response.body).to.be.an('array');
        expect(response.body).to.be.deep.equal([matchesMock]);

    })
  });

