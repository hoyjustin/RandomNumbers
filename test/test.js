var express = require("express");
var chai = require('chai');
var assert = require('chai').assert;
var chaiHttp = require('chai-http');
var app = express();

var randomGen = require("../server");
var rgc = require('../controllers/randomGenController');

chai.use(chaiHttp);

describe("randomGen", function() {

  describe('/POST', () => {
    it('controller should respond with a correct count, min, and max', (done) => {
      var input = {
        count: 10000,
        min: 1,
        max: 10000
      }
      chai.request(randomGen)
        .post('/randomGen')
        .send(input)
        .end((err, res) => {
            assert.equal(res.status, 200);
            assert.typeOf(res.body, 'array');
            assert.lengthOf(res.body, 10000);
            assert.isNull(err);
            done();
        });
    });
    it('controller should not respond when no input', (done) => {
      chai.request(randomGen)
        .post('/randomGen')
        .end((err, res) => {
            assert.equal(res.status, 400);
            assert.isNotNull(err);
            assert.equal(res.text, 'Input must be an integer');
            done();
        });
    });
    it('controller should not respond with invalid input', (done) => {
      var input = {
        count: 'abc',
        min: 123,
        max: 232
      }
      chai.request(randomGen)
        .post('/randomGen')
        .send(input)
        .end((err, res) => {
            assert.equal(res.status, 400);
            assert.isNotNull(err);
            assert.equal(res.text, 'Input must be an integer');
            done();
        });
    });
    it('controller should not respond when max < min', (done) => {
      var input = {
        count: 10000,
        min: 10001,
        max: 10000
      }
      chai.request(randomGen)
        .post('/randomGen')
        .send(input)
        .end((err, res) => {
            assert.equal(res.status, 400);
            assert.isNotNull(err);
            assert.equal(res.text, 'Min must be less than or equal to max');
            done();
        });
    });
    it('controller should not respond when count is > (max - min)', (done) => {
      var input = {
        count: 10001,
        min: 1,
        max: 10000
      }
      chai.request(randomGen)
        .post('/randomGen')
        .send(input)
        .end((err, res) => {
            assert.equal(res.status, 400);
            assert.isNotNull(err);
            assert.equal(res.text, 'Amount of random numbers requested must be less ' +
         'or equal to the amount between min and max');
            done();
        });
    });
  });

  describe("randomGenController", function() {
    describe("consecutiveList(min, max)", function() {
      it("should start with min and ends with max", function() {
        var list = rgc.consecutiveList(0, 10000);
        assert.equal(list[0], 0);
        assert.equal(list[list.length - 1], 10000);
      });
      it("should have the proper number count", function() {
        var singleList = rgc.consecutiveList(1, 1);
        var defaultList = rgc.consecutiveList(1, 10000);
        var negativeList = rgc.consecutiveList(-10000, 10000);
        assert.lengthOf(singleList, 1);
        assert.lengthOf(defaultList, 10000);
        assert.lengthOf(negativeList, 20001);
      });
    });

    describe("randomNumber(min, max)", function() {
      it("should return an integer", function() {
        assert.isTrue(rgc.isInt(rgc.randomNumber(0, 2)));
      });
      it("should be between min and max (inclusive)", function() {
        for(var i = 0; i < 5; i++) {
          assert.isAtLeast(rgc.randomNumber(0, 2), 0);
          assert.isAtMost(rgc.randomNumber(0, 2), 2);
        }
      });

    });

    describe("shuffle(list)", function() {
      it("should not be the exact same as the given list", function() {
        for(var i = 0; i < 5; i++) {
          var unshuffledList = rgc.consecutiveList(0, 2);
          var shuffledList = rgc.shuffle(unshuffledList);
          assert.notDeepEqual(shuffledList, unshuffledList);
        }
      });
      it("but have the same elements as the ordered list", function() {
        for(var i = 0; i < 5; i++) {
          var unshuffledList = rgc.consecutiveList(0, 2);
          var shuffledList = rgc.shuffle(unshuffledList);
          var list1 = unshuffledList.slice().sort();
          var list2 = shuffledList.slice().sort()
          assert.deepEqual(list1, list2);
        }
      });
      it("should return an empty list when given an empty list", function() {
        var emptyList = [];
        assert.deepEqual(rgc.shuffle(emptyList), emptyList);
      });
      it("should return the same list when given a list with 1 number", function() {
        var singleList = [0];
        assert.deepEqual(rgc.shuffle(singleList), singleList);
      });
    });

  });
});