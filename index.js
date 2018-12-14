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
		let transaction = this.trans([nameObjectStore]);

		transaction.oncomplete = function (event) {
			console.log("Adicionado com Sucesso");
		};

		transaction.onerror = function (event) {
			console.log("Erro ao adicionar", event);
		};

		let objectStore = transaction.objectStore(nameObjectStore);
		objectStore.add(valueAdd);
	}

	delete(nameObjectStore, codigo) {
		this.trans([nameObjectStore]).objectStore(nameObjectStore).delete(codigo);
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
}

let vinidex = new Vinidex();

(async function () {
	//iniciando o banco
	await vinidex.init('TonyMontana');

	vinidex.delete('Estudantes', 2);
	vinidex.delete('Estudantes', 3);

	vinidex.add('Estudantes', { codigo: 1, nome: 'Vinicius' });
	vinidex.add('Estudantes', { codigo: 2, nome: 'Flex' });

	estudante = await vinidex.select('Estudantes', 1);
	console.log(estudante.nome);

	estudante = await vinidex.select('Estudantes', 2);
	console.log(estudante.nome);

	vinidex.delete('Estudantes', 2);
	vinidex.delete('Estudantes', 3);
})();
