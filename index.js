const validation = require('./validation');

let rules = {
    username:'required',
    password:'required',
    age: 'required|length:3|integer'
}

let data = {
    username: 'Jose',
    password: 'd',
    age: '123'
}

let a = validation(data, rules);
console.log(a);