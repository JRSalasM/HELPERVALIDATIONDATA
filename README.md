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
| Parametro | Descripción | type |
| ------ | ------ | ------ | 
| Cantidad | Indica el numeró de caracteres minimos | integer |
```sh
{
    field: 'min:5'
}
```

### Carácter maximo
| Parametro | Descripción | type |
| ------ | ------ | ------ | 
| Cantidad | Indica el numeró de caracteres máximos | integer |
```sh
{
    field: 'max:5'
}
```

### Cantidad de caracteres
| Parametro | Descripción | type |
| ------ | ------ | ------ | 
| Cantidad | Indica el numeró de caracteres | integer |
```sh
{
    field: 'length:5'
}
```

### Tipo numérico
```sh
{
    field: 'integer'
}
```

### Tipo texto
Todo el campo debe ser solo letras
```sh
{
    field: 'string'
}
```

### Minúscula
Todo el campo debe ser minúscula
```sh
{
    field: 'lowercase'
}
```

### Mayúscula
Todo el campo debe ser mayúscula
```sh
{
    field: 'uppercase'
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
| Parametro | Descripción | type |
| ------ | ------ | ------ | 
| lista | Indica el valor que puede tener el campo, van separados por < , > | string |
```sh
{
    field: 'containt:valor1,valor2,valor3'
}
```

### Valor diferente
| Parametro | Descripción | type |
| ------ | ------ | ------ | 
| lista | Indica el valor que NO puede tener el campo, van separados por < , > | string |
```sh
{
    field: 'different:valor1,valor2,valor3'
}
```