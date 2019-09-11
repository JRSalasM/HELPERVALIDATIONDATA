let data = {
    name:{
        value:'Jose',
        validator:'required|min:10'
    },
    lastname:{
        value:'asd',
        validator:'required'
    },
    email:{
        value:'jose@gmail.com',
        validator:'required|isemail'
    }
};
let valid = {
    valid: false,
    errors:[],
    log:[],
}
const validation = (data) => {
    valid = {
        valid: false,
        errors:[],
        log:[],
    }
    Object.keys(data).map((value,index)=>{
        if(data[value].hasOwnProperty('validator')){
            let { validator } = data[value]
            if(validator !== ''){
                let validations = validator.split('|');
                validations.map((v,i)=>{
                    if(v.includes(':')){
                        let temp = v.split(':');                        
                        if(temp.length !== 2){
                            valid.log.push(`${temp} unrecognized`)
                        }else{
                            validations[i] = { type : temp[0], rule: temp[1] }
                        }                        
                    }else{
                        validations[i] = { type: v }
                    }
                });
                validations.map((val)=>{
                    let result = typeValidate(val,data[value].value);
                    if(!result.valid){
                        if(valid.hasOwnProperty('err'))
                            valid.errors.push(`${value} ${result.err}`);
                        if(valid.hasOwnProperty('log'))
                            valid.errors.push(`${value} ${result.err}`);
                    }
                })
            }
        }        
    });    
    Object.keys(valid).map((value)=>{
        if(Array.isArray(valid[value]) && valid[value].length === 0)            
                delete valid[value]; 
    })
    if(!valid.hasOwnProperty('errors') && !valid.hasOwnProperty('errors'))
        valid.valid = true;

    return valid;
}

const typeValidate = (key,value) => {
    let result = new Object();
    switch (key.type) {
        case 'required':
            result =Vrequired(value);
            break;
        case 'isemail':
            result =Visemail(value);
            break;  
        default:
            break;
    }
    return result;
}

const Vrequired = (value) => {
    if(!value)
        return { valid: false, err: 'is required' }
    return { valid: true};    
}

const Visemail = (value) => {
    let regex_email = new RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
    if(!regex_email.test(value))
        return { valid: false, err: "isn't email" }
    return { valid: true};    
}

const Vmin = (value, condicional,property) => {
    if(isNaN(condicional)){
        valid.log(`, min validation requiered a type numeric as parameter`);
        return { valid: false, log: "no validated" }
    }
    if(value.toString().length < condicional){
        return { valid: false, err: `must be min ${condicional} characteres` }
    }
    return { valid: true};    
}

let v = validation(data);
console.log(v);