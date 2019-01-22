# vinidex

Lib to use easily indexedDB

> IndexedDB is a low-level API for client-side storage of significant amounts of structured data, including files/blobs.

## Nomenclatures of IndexedDB

### Object store

The mechanism by which data is stored in the database.

## Examples

- 1 example: [code JS](example/1-estudantes.js) / [page HTML](https://viniceosm.github.io/vinidex/example/1-estudantes.html)

## Lib Methods

## schema(objectStores)

This method creates object stores when database is upgraded, you need create object store before put value in.

Call this method before opens database.

```javascript
// Array de objectStore para onupgradeneeded
let objectStores = [
  ['Students', { keyPath: 'id' }],
  ['Car', { keyPath: 'id' }]
];

vinidex.schema(objectStores);

// after this you can open db
await vinidex.init('myNameIndexedDB');
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

#### Equal

```javascript
let izadora = await Students.find({ name: 'Izadora' });
```

#### Find all

```javascript
let allStudents = await Students.find(); // all students
// or
allStudents = await Students.find({}); // all students
```

#### $gt

Greater than `>`

```javascript
let greaterThan20 = await Students.find({ age: { $gt: 20} });
```

#### $gte

Greater than or equal to `>=`

```javascript
let gte21 = await Students.find({ age: { $gte: 21} });
```

#### $lt

Less than `<`

```javascript
let lessThan24 = await Students.find({ age: { $lt: 24} });
```

#### $lte

Less than or equal to `<=`

```javascript
let lte30 = await Students.find({ age: { $lte: 30} });
```

#### $ne

Not equal `!==`

```javascript
let ne30 = await Students.find({ name: { $ne: 'Will'} });
```

#### Many condition

`name == 'Izadora' && age >= 20 && age < 100`

```javascript
let izadora = await Students.find({
  name: 'Izadora',
  age: { $gte: 20, $lt: 100 },
});
```

### updateById(id, atributos)

```javascript
Students.updateById(0, {
  name: 'Roberts'
});
```

### update(query, atributos)

```javascript
Students.update({ name: 'Julia' }, {
  name: 'Roberts'
});
```

### delete(id)

```javascript
Students.delete(0);
```

### add(valueAdd)

```javascript
await Students.add({ id: 0, name: 'Vinicius' });
```

## Methods that needs to pass objectStore name

The alternative of this is use an object [model](#modelnameobjectstore)

### add(nameObjectStore, valueAdd)

```javascript
await vinidex.add('Car', { id: 0, name: 'Lancer' });
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

### updateById(nameObjectStore, id, atributos)

```javascript
vinidex.updateById('Car', 0, {
  name: 'F-Pace'
});
```

#### update(nameObjectStore, query, atributos)

```javascript
vinidex.update('car', { name: 'Lancer' }, {
  name: 'F-Pace'
});
```