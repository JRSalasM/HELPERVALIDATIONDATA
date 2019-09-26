const validation = require('./validation');

let rules = {
    username:'required',
    password:'required',
    fullname: 'required|lowercase:5,10|uppercase:5,10'
}

let data = {
    username: 'Jose',
    password: 'd',
    fullname: 'Josead Salas MoFF'
}

let a = validation(data, rules);
console.log(a);