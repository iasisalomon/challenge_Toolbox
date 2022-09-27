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
	describe('/files/data', () =
		let fileDownload;
		it('should display more than one valid downloads', async () => {
			const res = await chai.request(app).get('/files/data');
			res.status.should.be.equal(200);
			res.body.should.be.a('array');
		});
		it('each element should have fields with content', async () => {
			const res = await chai.request(app).get('/files/data');
			fileDownload = res.body;
			fileDownload.forEach((dataDownload) => {
				dataDownload.forEach((data) => {
					data.should.have.property('file');
					data.should.have.property('text');
					data.should.have.property('number');
					data.should.have.property('hex');
					data.file.should.be.a('string');
					data.text.should.be.a('string');
					data.number.should.be.a('string');
					data.hex.should.be.a('string');
				});
			});
			res.status.should.be.equal(200);
		});
		it('each element should be a valid file download', async () => {
			const res = await chai.request(app).get('/files/data');
			fileDownload = res.body;
			fileDownload.forEach((dataDownload) => {
				dataDownload.forEach((data) => {
					data.file.should.be.oneOf(['test2.csv', 'test3.csv', 'test6.csv', 'test9.csv']);
				});
			});
			res.status.should.be.equal(200);
		});
	});
});
