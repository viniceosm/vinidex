async function initDb() {
  //Array de objectStore para onupgradeneeded
  let objectStores = [
    ['Estudantes', { keyPath: 'id' }],
    ['Carros', { keyPath: 'id' }]
  ];

  vinidex.schema(objectStores);

  //iniciando o banco [versão opcional (default = 1)]
  await vinidex.init('vinidex', 7);
  print.history(`Banco iniciado!`);
}