# vinidex

Lib para usar indexedDB facilmente

> O IndexedDB é uma API de baixo nível para armazenamento no cliente de quantidades significativas de dados estruturados, incluindo arquivos/blobs.

## Nomenclaturas do IndexedDB

### Object store

O mecanismo pelo qual os dados são armazenados no banco de dados.

## Exemplos

[1 código exemplo](test-async.js)

## Metodos da lib

## schema(objectStores)

Esse método cria object stores quando o BD é atualizado, você precisa criar o object store antes de colocar valor nele.

Chame este método antes de abrir o BD.

```javascript
// Array de objectStore para onupgradeneeded
let objectStores = [
  ['Estudantes', { keyPath: 'id' }],
  ['Carros', { keyPath: 'id' }]
];

vinidex.schema(objectStores);

// depois disso você pode abrir o bd
await vinidex.init('nomeIndexedDB');
```

## init(nameDb, versionDb = 1)

```javascript
await vinidex.init('nomeIndexedDB'); // versão será 1
```

```javascript
await vinidex.init('nomeIndexedDB', 7);
```

## model(nameObjectStore)

Método **model** retorna um objeto com métodos CRUD para o objectStore, isso ajuda na escrita, porque não precisará usar todo tempo `vinidex`

```javascript
let Estudantes = vinidex.model('Estudantes');
```

### findById(id)

```javascript
let primeiroEstudante = await Estudantes.findById(0);
```

### find(query = {})

`query` é a condição para pesquisa

#### Equal

```javascript
let izadora = await Estudantes.find({ nome: 'Izadora' });
```

#### Find all

```javascript
let todosEstudantes = await Estudantes.find(); // todos estudantes
// or
todosEstudantes = await Estudantes.find({}); // todos estudantes
```

#### $gt

Greater than `>`

```javascript
let greaterThan20 = await Estudantes.find({ idade: { $gt: 20} });
```

#### $gte

Greater than or equal to `>=`

```javascript
let gte21 = await Estudantes.find({ idade: { $gte: 21} });
```

#### $lt

Less than `<`

```javascript
let lessThan24 = await Estudantes.find({ idade: { $lt: 24} });
```

#### $lte

Less than or equal to `<=`

```javascript
let lte30 = await Estudantes.find({ idade: { $lte: 30} });
```

#### $ne

Not equal `!==`

```javascript
let ne30 = await Estudantes.find({ nome: { $ne: 'Will'} });
```

#### Várias condições

`nome == 'Izadora' && idade >= 20 && idade < 100`

```javascript
let izadora = await Estudantes.find({
  nome: 'Izadora',
  idade: { $gte: 20, $lt: 100 },
});
```

### alter(id, atributos)

```javascript
Estudantes.alter(0, {
  nome: 'Roberts'
});
```

### delete(id)

```javascript
Estudantes.delete(0);
```

### add(valueAdd)

```javascript
await Estudantes.add({ id: 0, nome: 'Vinicius' });
```

## Métodos que precisam passar o nome do object store

A alternativa disso é usar objeto [model](#modelnameobjectstore)

### add(nameObjectStore, valueAdd)

```javascript
await vinidex.add('Carros', { id: 0, nome: 'Lancer' });
```

### delete(nameObjectStore, id)

```javascript
vinidex.delete('Carros', 0);
```

### select(nameObjectStore, id)

```javascript
let lancer = await vinidex.select('Carros', 0);
```

### find(nameObjectStore, query = {})

`query` é a condição para pesquisa

```javascript
let lancer = await vinidex.find('Carros', { nome: 'Lancer' });
```

### alter(nameObjectStore, id, atributos)

```javascript
vinidex.alter('Carros', 0, {
  nome: 'F-Pace'
});
```
