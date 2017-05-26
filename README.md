Overview
=========================
RandomNumbers generates a list of unique random numbers in configurable intervals (inclusive).
Author: Justin Hoy

Prerequisites
=========================
In order to use RandomNumbers, you should have the following installed:

- [Node.js](https://nodejs.org/) v6.9.4
- [NPM](https://nodejs.org/) v4.2.0


Installation & Startup
=========================
1. Install prerequisite packages by running 'npm install' at the RandomNumbers root directory
2. To start the application, run: 'node server'
3. Point a browser to 'localhost:3000' and you're up and running!

* Mocha tests can be done through running 'npm test'
* A live version can also be found at 'https://randnumbers.herokuapp.com'


Documentation
=========================
This application allows the user to request a certain amount of unique random numbers from a given interval.
The input is routed to the randomGenController which contains the generating logic.
The random numbers are picked from a shuffled list of the possible choices.
To create a shuffled list, an unshuffled list of all the possible numbers to pick from is created.
We can extract the numbers randomly until none are left by choosing a random index using Math.random().
This can be done in place by appending the shuffled list to the back of the unshuffled list.

This improves upon more naive approaches of generating the random numbers directly using Math.random()
and keeping a record, as duplicates cause unneccessary computations.


Tests are done upon the router to ensure that data is returned only with valid input.

Tests are also done upon the controller and its helper functions to validate that
the result is the right amount, to be within the interval, and seemingly random.


Packages Used
=========================
- Jquery
- Knockout
- Express
- BodyParser
- Mocha
- Chai