(async function () {
  //Array de objectStore para onupgradeneeded
  let objectStores = [
    ['Estudantes', { keyPath: 'codigo' }],
    ['Carros', { keyPath: 'codigo' }]
  ];

  vinidex.schema(objectStores);

  //iniciando o banco [versão opcional (default = 1)]
  await vinidex.init('vinidex', 6);

  vinidex.delete('Estudantes', 0);
  vinidex.delete('Estudantes', 1);

  await vinidex.add('Estudantes', { codigo: 0, nome: 'Vinicius' });
  await vinidex.add('Estudantes', { codigo: 1, nome: 'Flex' });

  estudante = await vinidex.select('Estudantes', 0);
  console.log('Estudantes[0]:', estudante.nome);

  estudante = await vinidex.select('Estudantes', 1);
  console.log('Estudantes[1]:', estudante.nome);

  vinidex.alter('Estudantes', 1, {
    nome: 'Julia'
  });

  estudante = await vinidex.select('Estudantes', 0);
  console.log('Estudantes[0]:', estudante.nome);

  estudante = await vinidex.select('Estudantes', 1);
  console.log('Estudantes[1]:', estudante.nome);

  vinidex.delete('Carros', 0);

  await vinidex.add('Carros', { codigo: 0, nome: 'F-Pace' });
})();