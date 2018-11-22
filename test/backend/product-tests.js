'use strict';

const mongoose = require('mongoose');
const Product = require("../../models/Product");

const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../testapp');
const should = chai.should();


chai.use(chaiHttp);
describe('Products', () => {
     //Before each test we empty the database
    Product.remove({}, (err) => {
    });
    /*
      * Test the /GET route
      */
    describe('Empty /GET Products', () => {
        it('it should an empty list of products', (done) => {
            chai.request(app)
                .get('/api/produkter')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(0);
                    done();
                });
        });
    });

    /*
     * Test the /POST route
     */
    describe('/POST Products', () =>{
        it('Should post a product and add it to the database', (done)=>{
            chai.request(app)
                .post('/api/produkter')
                .set('content-type', 'application/json')
                .send({name:'unittest name', desc:'unittest description',amount:10, categories:['unittest category 1', 'unittest category 2'], price:100})
                .end((err, res)=>{
                    res.should.have.status(200);
                    res.body.should.be.an('object');
                    res.body.success.should.eql(true);
                    done();
                })});
        it('Should get a filled list of products (1 product)', (done)=>{
            chai.request(app)
                .get('/api/produkter')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(1);
                    done();
                });
        });
    });

    //TODO Picture unit tests
});

