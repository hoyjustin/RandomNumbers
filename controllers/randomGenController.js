'use strict';

  /**
   * Creates a list of consecutive numbers for an interval (inclusive).
   * @param {Number} min
   * @param {Number} max
   * @return {Number[]} consecutiveList
   */
  var consecutiveList = function(min, max) {
    var list = [];
    for (var i = min; i <= max; i++)
    {
      list.push(i);
    }
    return list;
  }

  /**
   * Generates a random integer between min and max (inclusive)
   * @param {Number} min
   * @param {Number} max
   * @return {Number} randomNumber
   */
  var randomNumber = function(min, max) {
    // Math.random() function returns a floating-point, pseudo-random number
    // from 0 (inclusive) up to but not including 1 (exclusive),
    // which we can then scale to the desired range
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  /**
   * Creates a shuffled version of the list using Fisher-Yates algorithm.
   * @param {Number[]} unshuffledList
   * @return {Number[]} shuffledList
   */
  var shuffle = function(unshuffledList) {
    var temp = 0;
    var randomIndex = 0;
    var shuffledList = unshuffledList.slice();
    // Take random elements to create a shuffled list in place
    for (var j = shuffledList.length-1; j >= 0; j--)
    {
      randomIndex = randomNumber(0, j-1);
      temp = shuffledList[j];
      shuffledList[j] = shuffledList[randomIndex];
      shuffledList[randomIndex] = temp;
    }
    return shuffledList;
  }

  /**
   * Check if a value is a possible integer
   * @param {Number} v
   * @return {Bool} isInteger
   */
  var isInt = function(v) {
    return (!isNaN(parseInt(v, 10)));
  }

  /**
   * Generates an list of n unique random integers between min and max (inclusive)
   * by taking n elements from a shuffled list with elements between min and max
   * @param {Number} n
   * @param {Number} min
   * @param {Number} max
   * @return {Number[]} randomNumbers
   */
  var randomList = function(req, res) {
    var count = parseInt(req.body['count'], 10);
    var min = parseInt(req.body['min'], 10);
    var max = parseInt(req.body['max'], 10);

    if (!isInt(count) || !isInt(min) || !isInt(max))
    {
      res.status(400).send('Input must be an integer');
    }
    else if (max < min) {
      console.log(typeof max);
      console.log(typeof min);
      res.status(400).send('Min must be less than or equal to max');
    }
    else if (count > (max - min + 1))
    {
      res.status(400).send('Amount of random numbers requested must be less ' +
         'or equal to the amount between min and max');
    }
    else {
      res.json(shuffle(consecutiveList(min, max)).slice(0, count));
    }
  }

module.exports = {
  consecutiveList: consecutiveList,
  randomNumber: randomNumber,
  shuffle: shuffle,
  isInt: isInt,
  randomList:randomList
}