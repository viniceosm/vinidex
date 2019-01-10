# vinidex

Class to use easily indexedDB

[1 example code](test-async.js)

## schema(objectStores)

```javascript
// Array de objectStore para onupgradeneeded
let objectStores = [
  ['Students', { keyPath: 'codigo' }],
  ['Car', { keyPath: 'codigo' }]
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

## add(nameObjectStore, valueAdd)

```javascript
await vinidex.add('Car', { codigo: 0, nome: 'Lancer' });
```

## delete(nameObjectStore, codigo)

```javascript
vinidex.delete('Car', 0);
```

## select(nameObjectStore, codigo)

```javascript
let lancer = await vinidex.select('Car', 0);
```

## alter(nameObjectStore, codigo, atributos)

```javascript
vinidex.alter('Car', 0, {
  nome: 'F-Pace'
});
```
