let data = {
    name:{
        value:'jose Salas',
        validator: 'required|string'
    },
    lastname:{
        value: 'Salas',
        validator: 'required'
    },
    email:{
        value: 'jsalas@gmail.com',
        validator: ''
    },
    phone:{
        value: '922172541',
        validator: 'required|number|length:9'
    },
    role:{
        value: 'users',
        validator: 'required|different:admin,user'
    }
};
const validation = (data) => {
    valid = {
        valid: false,
        errors: new Object(),
        log:new Object(),
    }
    try{
        Object.keys(data).map((value,index)=>{
            if(data[value].hasOwnProperty('validator')){
                let { validator } = data[value]
                if(validator !== ''){
                    let validations = validator.split('|');
                    let err = new Object(),
                        log = new Object();
                    validations.map((v,i)=>{
                        if(v.includes(':')){
                            let temp = v.split(':');                        
                            if(temp.length !== 2){
                                log[temp] = (`${temp} unrecognized`)
                            }else{
                                validations[i] = { type : temp[0], rule: temp[1] }
                            }                        
                        }else{
                            validations[i] = { type: v }
                        }
                    });
                    if(data[value].value === '' &&  validations.filter(r => r.type === 'required' ).length === 0){
                        console.log(`${value} no es requerido`);
                    }else{
                        validations.map((val)=>{           
                            let result = typeValidate(val,data[value].value);
                            if(!result.valid){
                                if(result.hasOwnProperty('err'))
                                    err[val.type] = (`${value} is ${data[value].value || null}, ${result.err}`);
                                if(result.hasOwnProperty('log'))
                                    log[val.type] = (`${value} ${result.log}`);
                            }
                        });   
                    }                
                    if( Object.keys(err).length > 0)
                        valid.errors[value] = {...err};
                    if( Object.keys(log).length > 0)
                        valid.log[value] = {...log};
                }
            }
        });    
        Object.keys(valid).map((value)=>{
            if(Object.keys(valid[value]).length === 0 && value !== 'valid')            
                delete valid[value]; 
        })
        if(!valid.hasOwnProperty('errors') && !valid.hasOwnProperty('errors'))
            valid.valid = true;
    }
    catch(e){
        valid.errors.catch = e.toString();
    }    
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
        case 'number':
            result = Vnumber(value);
            break;
        case 'string':
            result = Vstring(value);
            break;
        case 'uppecase':
            result = Vuppecase(value);
            break;
        case 'lowercase':
            result = Vlowercase(value);
            break;
        case 'alphanumeric':
            result = Valphanumeric(value);
            break;
        case 'containt':
            result = Vcontaint(value,key.rule);
            break;
        case 'different':
                result = Vdifferent(value,key.rule);
                break;
        case 'regex':
            result = Vregex(value,key.rule);
            break;            
        default:
            result = { valid: false, log: `not validated, ${key.type} unrecognized ` }
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

const Vregex = (value, condicional) => {
    let regex_customize = new RegExp(condicional);
    if(!regex_customize.test(value)){
        return { valid: false, err: `must be ${condicional} format` }
    }
    return { valid: true};    
}

const Vnumber = (value) => {
    let regex_number = new RegExp('^[1-9]+$');
    if(!regex_number.test(value)){
        return { valid: false, err: `must be type numeric` }
    }
    return { valid: true};    
}

const Vstring = (value) => {
    let regex_number = new RegExp('^[a-zA-Z ]+$');
    if(!regex_number.test(value)){
        return { valid: false, err: `must be type string` }
    }
    return { valid: true};    
}

const Vuppecase = (value) => {
    let regex_number = new RegExp('^[A-Z ]+$');
    if(!regex_number.test(value)){
        return { valid: false, err: `must be upper case` }
    }
    return { valid: true};
}

const Vlowercase = (value) => {
    let regex_number = new RegExp('^[a-z ]+$');
    if(!regex_number.test(value)){
        return { valid: false, err: `must be lower case` }
    }
    return { valid: true};    
}

const Valphanumeric = (value) => {
    let regex_number = new RegExp('^[a-zA-Z1-9 ]+$');
    if(!regex_number.test(value)){
        return { valid: false, err: `must be lower case` }
    }
    return { valid: true};    
}

const Vcontaint = (value, condicional) => {
    let params = condicional.split(',');
    let temp = params.filter( v => v === value);
    if(temp.length === 0){
        return { valid: false, err: `must be equal to ${condicional} value` }
    }
    return { valid: true};    
}

const Vdifferent = (value, condicional) => {
    let params = condicional.split(',');
    let temp = params.filter( v => v === value);
    if(temp.length !== 0){
        return { valid: false, err: `must be different to ${condicional} value` }
    }
    return { valid: true};    
}

let v = validation(data);
console.log(v);