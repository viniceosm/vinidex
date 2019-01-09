class Vinidex {
	init(nameDb) {
		let self = this;

		return new Promise(function (resolve, reject) {
			if (!window.indexedDB) {
				console.log("Seu navegador não suporta o recurso IndexedDB");
				return;
			}

			let request = window.indexedDB.open(nameDb, 2);

			request.onerror = function (event) {
				console.log("Erro ao abrir o banco de dados", event);
			}

			request.onupgradeneeded = function (event) {
				console.log("Atualizando...");
				self.db = event.target.result;
				let objectStore = self.db.createObjectStore("Estudantes", { keyPath: "codigo" });
			};

			request.onsuccess = function (event) {
				console.log("Banco de dados aberto com sucesso.");
				self.db = event.target.result;
				resolve();
			}
		});
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
				console.log("Adicionado com Sucesso");
				resolve();
			};

			transaction.onerror = function (event) {
				console.log("Erro ao adicionar", event);
				reject();
			};

			let objectStore = transaction.objectStore(nameObjectStore);
			objectStore.add(valueAdd);
		});
	}

	delete(nameObjectStore, codigo) {
		let self = this;
		return new Promise(function (resolve, reject) {
			self.trans([nameObjectStore]).objectStore(nameObjectStore).delete(codigo);
			resolve();
		});
	}

	select(nameObjectStore, codigo) {
		let self = this;
		return new Promise(function (resolve, reject) {
			let request = self.trans([nameObjectStore]).objectStore(nameObjectStore).get(codigo);
			request.onsuccess = function (event) {
				resolve(request.result);
			};
		});
	}

	alter(nameObjectStore, codigo, atributos) {
		let self = this;

		let transaction = self.trans([nameObjectStore]);
		let objectStore = transaction.objectStore(nameObjectStore);
		let request = objectStore.get(codigo);

		return new Promise(function (resolve, reject) {
			request.onsuccess = function(event) {
				let atributosKey = Object.keys(atributos);

				for (let key of atributosKey) {
					console.log("Atualizado : " + request.result[key] + " para " + atributos[key]);
					request.result[key] = atributos[key];
				}

				objectStore.put(request.result);

				resolve();
			};
		});
	}
}

let vinidex = new Vinidex();
