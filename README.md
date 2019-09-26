# Validaciones
Ayudará a validar data

```sh
const validation = require('./validation');

let rules = {
    username:'required|email',
    password:'required|min:5'
}

let data = {
    username: 'Jose',
    password: 'd'
}

let a = validation(data, rules);
console.log(a);
```


### Requerido
```sh
{
    field: 'required'
}
```

### Correo
```sh
{
    field: 'email'
}
```

### Carácter minimo
| Opcional | Descripción | type |
| ------ | ------ | ------ | 
| Cantidad | Indica el numeró de caracteres minimos | integer |
```sh
{
    field: 'min:5'
}
```

### Carácter maximo
| Opcional | Descripción | type |
| ------ | ------ | ------ | 
| Cantidad | Indica el numeró de caracteres máximos | integer |
```sh
{
    field: 'max:5'
}
```

### Cantidad de caracteres
| Opcional | Descripción | type |
| ------ | ------ | ------ | 
| Cantidad | Indica el numeró de caracteres | integer |
```sh
{
    field: 'length:5'
}
```

### Tipo numérico
| Opcional | Descripción | type |
| ------ | ------ | ------ | 
| Cantidad | Indica el numeró de caracteres | integer |
| Rango | Indica el numeró menor y menor de caracteres separados por < , > | integer |
```sh
{
    fieldA: 'integer',
    fieldB: 'integer:5',
    fieldC: 'integer:2,5',
}
```

### Tipo texto
Todo el campo debe ser solo letras
| Opcional | Descripción | type |
| ------ | ------ | ------ | 
| Cantidad | Indica el numeró de caracteres | integer |
| Rango | Indica el numeró menor y menor de caracteres separados por < , > | integer |
```sh
{
    fieldA: 'string',
    fieldB: 'string:5',
    fieldC: 'string:2,5',
}
```

### Minúscula
Todo el campo debe ser minúscula
| Opcional | Descripción | type |
| ------ | ------ | ------ | 
| Cantidad | Indica el numeró de caracteres | integer |
| Rango | Indica el numeró menor y menor de caracteres separados por < , > | integer |
```sh
{
    fieldA: 'lowercase',
    fieldB: 'lowercase:5',
    fieldC: 'lowercase:2,5',
}
```

### Mayúscula
Todo el campo debe ser mayúscula
| Opcional | Descripción | type |
| ------ | ------ | ------ | 
| Cantidad | Indica el numeró de caracteres | integer |
| Rango | Indica el numeró menor y menor de caracteres separados por < , > | integer |
```sh
{
    fieldA: 'uppercase',
    fieldB: 'uppercase:5',
    fieldC: 'uppercase:2,5',
}
```

### Letras y números
El campo debe ser alfanumerico
```sh
{
    field: 'alphanumeric'
}
```

### Valor entre
| Opcional | Descripción | type |
| ------ | ------ | ------ | 
| lista | Indica el valor que puede tener el campo, van separados por < , > | string |
```sh
{
    field: 'containt:valor1,valor2,valor3'
}
```

### Valor diferente
| Opcional | Descripción | type |
| ------ | ------ | ------ | 
| lista | Indica el valor que NO puede tener el campo, van separados por < , > | string |
```sh
let rules = ["valor1","valor2","valor3"];
{
    fieldA: 'different:valor1,valor2,valor3',
    fieldB: 'different:'+rules
}
```