const Project = require('../models').Project;
const db = require('../models/index');

const chai = require('chai');
const app = require('../app');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);
chai.should();



beforeEach(async function() {
    console.log('initializing a test data point');
    await db.sequelize.sync({ force: true});
    try {
        await Project.bulkCreate([{
            id: '1',
            project_name: 'test',
            technology: 'testy test',
            purchase_type: 'test',
            start_date: '3/23/2021',
            end_date: '3/24/2021',
            usage: 500,
            additionality: 'y'
        }]);
    } catch (error) {
        console.error('Error Connecting to the db: ', error);
    }
});

describe('GET /projects', () => {
    it('it should return 200', (done) => {
      chai.request(app)
        .get('/projects')
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });

describe('GET /projects/new', () => {
    it('it should return 200', (done) => {
      chai.request(app)
        .get('/projects/new')
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });

  describe('GET /projects/1/edit', () => {
    it('it should return 200', (done) => {
        chai.request(app)
            .get('/projects/1/edit')
            .end((err, res) => {
            res.should.have.status(200);
            done();
        });
    });
  });





// //Code Lou 3/29 demo code
// describe('Routes: projects', () => {
//     before(() => {
//         return app.init()
//             .then((out) => {
//                 console.log(out)
//             });
//     });
//     describe('GET /projects', () => {
//         it('should display add project page', () => {
//             return request(app).get('/projects/new')
//                 .then((res) => {
//                     response.statusCode.should.equal(200);
//                 });
//         });
//     });
// });
// //Code Lou 3/29 demo code






