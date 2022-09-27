//require app
const app = require('../app');

const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const should = chai.should();

//chai uses
chai.use(chaiHttp);

describe('Files', () => {
	describe('/files', () => {
		it('it should GET all the files', async () => {
			const res = await chai.request(app).get('/files');
			res.status.should.be.equal(200);
			res.body.should.be.a('array');
			res.body.length.should.be.eql(7);
		});
	});
	describe('/files/data', () => {
		it('it should GET all the files', async () => {
			const res = await chai.request(app).get('/files');
			res.status.should.be.equal(200);
			res.body.should.be.a('array');
			res.body.length.should.be.eql(7);
		});
	});
});
