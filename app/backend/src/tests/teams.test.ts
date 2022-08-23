import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Teams from '../database/models/Teams';
import { teamsMock } from './mock/mocks';


chai.use(chaiHttp);

const { expect } = chai;

  describe('Testa a rota /teams', () => {
      afterEach(() => {
        sinon.restore();
      }) 
  
      it('deve retornar status 200', async () => {
        sinon.stub(Teams, 'findAll').resolves([teamsMock as Teams]);
        const response = await chai.request(app)
          .get('/teams')
  
        expect(response.status).to.equal(200);
      })

      it('deve retornar um array de objetos', async () => {
        sinon.stub(Teams, 'findAll').resolves([teamsMock as Teams]);
        const response = await chai.request(app)
          .get('/teams')
  
        expect(response.body).to.be.an('array');
        expect(response.body[0]).to.have.property('teamName');
        
    })
  });
