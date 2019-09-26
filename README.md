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
```sh
{
    field: 'min:5'
}
```

### Carácter maximo
```sh
{
    field: 'max:5'
}
```

### Cantidad de caracteres
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
```sh
{
    field: 'string'
}
```

### Minúscula
```sh
{
    field: 'lowercase'
}
```

### Letras y números
```sh
{
    field: 'alphanumeric'
}
```

### Valor entre 
```sh
{
    field: 'containt:valor1,valor2,valor3'
}
```

### Valor diferente
```sh
{
    field: 'different:valor1,valor2,valor3'
}
```