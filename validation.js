let data = {
    name:{
        value:'JoseS',
        validator:'required|length:5'
    },
    lastname:{
        value:'sadaad',
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
                        if(result.hasOwnProperty('err'))
                            valid.errors.push(`${value} ${result.err}`);
                        if(result.hasOwnProperty('log'))
                            valid.log.push(`${value} ${result.log}`);
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
            result = Vrequired(value);
            break;
        case 'isemail':
            result = Visemail(value);
            break;
        case 'min':
            result = Vmin(value,key.rule);
            break;
        case 'max':
            result = Vmax(value,key.rule);
            break;
        case 'length':
            result = Vlength(value,key.rule);
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

const Vmin = (value, condicional) => {
    if(isNaN(condicional)){
        return { valid: false, log: "min validation requiered a type numeric as parameter" }
    }
    if(value.toString().length < parseInt(condicional)){
        return { valid: false, err: `must be min ${condicional} characteres` }
    }
    return { valid: true};    
}

const Vmax = (value, condicional) => {
    if(isNaN(condicional)){
        return { valid: false, log: "max validation requiered a type numeric as parameter" }
    }
    if(value.toString().length > parseInt(condicional)){
        return { valid: false, err: `must be max ${condicional} characteres` }
    }
    return { valid: true};    
}

const Vlength = (value, condicional) => {
    if(isNaN(condicional)){
        return { valid: false, log: "length validation requiered a type numeric as parameter" }
    }
    if(value.toString().length !== parseInt(condicional)){
        return { valid: false, err: `must be ${condicional} characteres` }
    }
    return { valid: true};    
}

let v = validation(data);
console.log(v);