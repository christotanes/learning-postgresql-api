import dotenv from "dotenv";
dotenv.config();
import chaiHttp from 'chai-http';
import * as chaiModule from 'chai';
import { expect } from 'chai'; 

// chai became ESM only, couldn't do chai.use, this was a suggested work around to attach chaiHttp to chai
const chai = chaiModule.use(chaiHttp);
const userDetails = {
    "username": "mochatest",
    "password": "mochatest",
    "email": "mochatest@mail.com",
    "full_name": "Mocha Test",
    "contact_number": "99999999999"
}

const app = `${process.env.TEST_HOST}`;
describe ('postgresql_user_test_suite', () => {
    it('GET users/ run', (done) => {
        chai.request(app).get('/users')
        .end((err, res) => {
            expect(res).to.not.equal(undefined);
            done();
        })
    });

    it('GET users/ returns 200', (done) => {
        chai.request(app).get('/users')
        .end((err, res) => {
            expect(res.status).to.equal(200);
            done();
        })
    });

    it('GET users/:id runs', (done) => {
        chai.request(app).get('/users/3')
        .end((err, res) => {
            expect(res).to.not.equal(undefined);
            expect(res.status).to.equal(200);
            done();
        })
    })

    it('GET users/:id id isNaN', (done) => {
        chai.request(app).get('/users/test')
        .end((err, res) => {
            expect(res.status).to.equal(400);
            done();
        })
    });
});