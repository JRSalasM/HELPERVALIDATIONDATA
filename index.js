const validation = require('./validation');

let rules = {
    username:'required',
    password:'required',
    age: 'required|lowercase:0,2'
}

let data = {
    username: 'Jose',
    password: 'd',
    age: 'dasdqe'
}

let a = validation(data, rules);
console.log(a);