(async function () {
  //Array de objectStore para onupgradeneeded
  let objectStores = [
    ['Estudantes', { keyPath: 'id' }],
    ['Carros', { keyPath: 'id' }]
  ];

  vinidex.schema(objectStores);

  //iniciando o banco [versão opcional (default = 1)]
  await vinidex.init('vinidex', 7);
  print(`Banco iniciado!`);

  let Estudantes = vinidex.model('Estudantes');
  let Carros = vinidex.model('Carros');

  Estudantes.delete(0);
  Estudantes.delete(1);

  await Estudantes.add({ id: 0, nome: 'Vinicius', instuticao: 'PUC' });
  await Estudantes.add({ id: 1, nome: 'Flex', idade: 21, instuticao: 'PUC' });

  estudante = await Estudantes.findById(0);
  print(`Estudantes[0]: ${estudante.nome}`);

  estudante = await Estudantes.findById(1);
  print(`Estudantes[1]: ${estudante.nome}`);

  Estudantes.alter(1, {
    nome: 'Julia'
  });

  estudante = await Estudantes.findById(0);
  print(`Estudantes[0]: ${estudante.nome}`);

  estudante = await Estudantes.findById(1);
  print(`Estudantes[1]: ${estudante.nome}`);

  Carros.delete(0);

  await Carros.add({ id: 0, nome: 'F-Pace' });

  let estudantes = await Estudantes.find({
    instuticao: 'PUC',
    idade: { $gte: 20, $lt: 100 },
  });
  console.log('estudantes da PUC entre 20 e 99: ', estudantes);

  estudantes = await Estudantes.find({ idade: 21 });
  console.log('estudantes com 21: ', estudantes);

  function print(content) {
    document.querySelector('#res').innerHTML += `<div>${content}<div>`;
  }
})();