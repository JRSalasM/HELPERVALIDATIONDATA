const validation = require('./validation');

let f = ['jose','eduardo'];
let rules = {
    username:'required',
    password:'required',
    type: 'required|containt:'+f
}
console.log(rules);
let data = {
    username: 'Jose',
    password: 'd',
    type: 'jose',
}

let a = validation(data, rules);
console.log(a);