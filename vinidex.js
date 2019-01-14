class Vinidex {
  init(nameDb, versionDb = 1) {
    let self = this;

    return new Promise(function (resolve, reject) {
      if (!window.indexedDB) {
        console.warn("Seu navegador não suporta o recurso IndexedDB");
        return;
      }

      let request = window.indexedDB.open(nameDb, versionDb);

      request.onerror = function (event) {
        console.error("Erro ao abrir o banco de dados", event);
        reject();
      }

      request.onupgradeneeded = function (event) {
        self.db = event.target.result;

        for (let arrObjectStore of self.objectStores) {
          try {
            self.db.deleteObjectStore(arrObjectStore[0]);
          } catch (e) {
          }

          let objectStore = self.db.createObjectStore(...arrObjectStore);
        }

        resolve();
      };

      request.onsuccess = function (event) {
        self.db = event.target.result;
        resolve();
      }
    });
  }

  schema(objectStores) {
    this.objectStores = objectStores;
  }

  trans(arrObjectStore, mode = 'readwrite') {
    let transaction = this.db.transaction(arrObjectStore, mode);

    return transaction;
  }

  add(nameObjectStore, valueAdd) {
    let self = this;
    return new Promise(function (resolve, reject) {
      let transaction = self.trans([nameObjectStore]);

      transaction.oncomplete = function (event) {
        resolve();
      };

      transaction.onerror = function (event) {
        reject(event);
      };

      let objectStore = transaction.objectStore(nameObjectStore);
      objectStore.add(valueAdd);
    });
  }

  delete(nameObjectStore, id) {
    let self = this;
    return new Promise(function (resolve, reject) {
      self.trans([nameObjectStore]).objectStore(nameObjectStore).delete(id);
      resolve();
    });
  }

  select(nameObjectStore, id) {
    let self = this;
    return new Promise(function (resolve, reject) {
      let request = self.trans([nameObjectStore]).objectStore(nameObjectStore).get(id);
      request.onsuccess = function (event) {
        resolve(request.result);
      };
    });
  }

  alter(nameObjectStore, id, atributos) {
    let self = this;

    let transaction = self.trans([nameObjectStore]);
    let objectStore = transaction.objectStore(nameObjectStore);
    let request = objectStore.get(id);

    return new Promise(function (resolve, reject) {
      request.onsuccess = function (event) {
        let atributosKey = Object.keys(atributos);

        for (let key of atributosKey) {
          request.result[key] = atributos[key];
        }

        objectStore.put(request.result);

        resolve();
      };
    });
  }

  model(nameObjectStore) {
    let self = this;

    return {
      findById: function (id) {
        return self.select(nameObjectStore, id);
      },
      find: function (query) {
        return self.find(nameObjectStore, query);
      },
      add: function (valueAdd) {
        return self.add(nameObjectStore, valueAdd);
      },
      delete: function (id) {
        return self.delete(nameObjectStore, id);
      },
      alter: function (id, atributos) {
        return self.alter(nameObjectStore, id, atributos);
      }
    }
  }

  find(nameObjectStore, query = {}) {
    let self = this;

    if (JSON.stringify(query) == '{}') {
      return self.findAll(nameObjectStore);
    }

    let transaction = self.trans([nameObjectStore], 'readonly');
    let objectStore = transaction.objectStore(nameObjectStore);
    let values = [];

    return new Promise(function (resolve, reject) {
      objectStore.openCursor().onsuccess = function (event) {
        let cursor = event.target.result;

        if (cursor) {
          let canAddValue = true;

          Object.keys(query).forEach(key => {
            if (Object.keys(query[key]).length > 0 && typeof query[key] === 'object') {
              Object.keys(query[key]).forEach(operatorToUse => {
                let operators = {
                  $gt: '>',
                  $gte: '>=',
                  $lt: '<',
                  $lte: '<=',
                  $ne: '!=='
                }

                canAddValue = eval((cursor.value[key] + operators[operatorToUse] + query[key][operatorToUse]));
              });
            } else {
              canAddValue = cursor.value[key] === query[key];
            }
          })

          if (canAddValue === true) {
            values.push(cursor.value);
          }
          cursor.continue();
        } else {
          resolve(values);
        }
      }
    });
  }
}

let vinidex = new Vinidex();
