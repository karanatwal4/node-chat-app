var moment = require('moment');

var createdAt = 1000000;
var date1 = moment(createdAt);
var date = moment();
console.log(date.format('LT'));
console.log(date1.format('LT'));
