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
    it('should POST to the controller with correct input', (done) => {
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
      it("should return an Integer", function() {
        assert.isTrue(rgc.isInt(rgc.randomNumber(0, 3)));
      });
      it("should be between min and max (inclusive)", function() {
        var min = -1;
        var max = 2;
        assert.isAtLeast(rgc.randomNumber(min, max), min);
        assert.isAtMost(rgc.randomNumber(min, max), max);
      });

    });

    describe("shuffle(list)", function() {

      var unshuffledList = rgc.consecutiveList(1, 2);
      var shuffledList = rgc.shuffle(unshuffledList);
      it("should have the same elements as the ordered list", function() {
        var list1 = unshuffledList.slice().sort();
        var list2 = shuffledList.slice().sort()
        assert.deepEqual(list1, list2);
      });

      it("should not be the same as the given list", function() {
        assert.notDeepEqual(shuffledList, unshuffledList);
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