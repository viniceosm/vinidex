(async function () {
  //Array de objectStore para onupgradeneeded
  let objectStores = [
    ['Estudantes', { keyPath: 'id' }],
    ['Carros', { keyPath: 'id' }]
  ];

  vinidex.schema(objectStores);

  //iniciando o banco [versão opcional (default = 1)]
  await vinidex.init('vinidex', 7);

  let Estudantes = vinidex.model('Estudantes');
  let Carros = vinidex.model('Carros');

  Estudantes.delete(0);
  Estudantes.delete(1);

  await Estudantes.add({ id: 0, nome: 'Vinicius' });
  await Estudantes.add({ id: 1, nome: 'Flex' });

  estudante = await Estudantes.findById(0);
  console.log('Estudantes[0]:', estudante.nome);

  estudante = await Estudantes.findById(1);
  console.log('Estudantes[1]:', estudante.nome);

  Estudantes.alter(1, {
    nome: 'Julia'
  });

  estudante = await Estudantes.findById(0);
  console.log('Estudantes[0]:', estudante.nome);

  estudante = await Estudantes.findById(1);
  console.log('Estudantes[1]:', estudante.nome);

  Carros.delete(0);

  await Carros.add({ id: 0, nome: 'F-Pace' });
})();