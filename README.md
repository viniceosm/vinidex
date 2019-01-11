# vinidex

Class to use easily indexedDB

[1 example code](test-async.js)

## schema(objectStores)

```javascript
// Array de objectStore para onupgradeneeded
let objectStores = [
  ['Students', { keyPath: 'id' }],
  ['Car', { keyPath: 'id' }]
];

vinidex.schema(objectStores);
```

## init(nameDb, versionDb = 1)

```javascript
await vinidex.init('myNameIndexedDB'); // version will be 1
```

```javascript
await vinidex.init('myNameIndexedDB', 7);
```

## model(nameObjectStore)

Method **model** return an object with methods CRUD for the objectStore, this is helps in writing, because you don't need use every time `vinidex`

```javascript
let Students = vinidex.model('Students');
```

### findById(id)

```javascript
let firstStudent = await Students.findById(0);
```

### find(query = {})

`query` is condition for search

```javascript
let izadora = await Students.find({ name: 'Izadora' });
```

Find all

```javascript
let allStudents = await Students.find(); // all students
// or
allStudents = await Students.find({}); // all students
```

### alter(id, atributos)

```javascript
Students.alter(0, {
  nome: 'Roberts'
});
```

### delete(id)

```javascript
Students.delete(0);
```

### add(valueAdd)

```javascript
await Students.add({ id: 0, nome: 'Vinicius' });
```

## Methods that needs to pass objectStore name

The alternative of this is use an object [model](#modelnameobjectstore)

### add(nameObjectStore, valueAdd)

```javascript
await vinidex.add('Car', { id: 0, nome: 'Lancer' });
```

### delete(nameObjectStore, id)

```javascript
vinidex.delete('Car', 0);
```

### select(nameObjectStore, id)

```javascript
let lancer = await vinidex.select('Car', 0);
```

### find(nameObjectStore, query = {})

`query` is condition for search

```javascript
let lancer = await vinidex.find('Car', { name: 'Lancer' });
```

### alter(nameObjectStore, id, atributos)

```javascript
vinidex.alter('Car', 0, {
  nome: 'F-Pace'
});
```
