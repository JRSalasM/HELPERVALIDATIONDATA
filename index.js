const validation = require('./validation');

let rules = {
    username:'required',
    password:'required',
    fullname: 'required|string: 5,12'
}

let data = {
    username: 'Jose',
    password: 'd',
    fullname: ''
}

let a = validation(data, rules);
console.log(a);