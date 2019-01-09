# vinidex

classe para usar indexedDB

## init(nameDb)

```javascript
await vinidex.init('myNameIndexedDB');
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
