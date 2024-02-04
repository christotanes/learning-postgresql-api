import dotenv from "dotenv";
dotenv.config();
import chaiHttp from 'chai-http';
import * as chaiModule from 'chai';
import { expect } from 'chai'; 

// chai became ESM only, couldn't do chai.use, this was a suggested work around to attach chaiHttp to chai
const chai = chaiModule.use(chaiHttp);

const app = `${process.env.TEST_HOST}`;
console.log(app);
describe ('postgresql_user_test_suite', () => {
    it('test_user_get_all_is_running', (done) => {
        chai.request(app).get('/users')
        .end((err, res) => {
            expect(res).to.not.equal(undefined);
            done();
        })
    });

    it('test_user_get_all_returns_200', (done) => {
        chai.request(app).get('/users')
        .end((err, res) => {
            expect(res.status).to.equal(200);
            done();
        })
    });
});