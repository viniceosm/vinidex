(async function () {
  await initDb();

  await delay(500);

  let Estudantes = vinidex.model('Estudantes');

  // DELETE
  for (id of [0, 1, 2, 5, 6])
    Estudantes.delete(id);

  // ADD
  await Estudantes.add({ id: 0, nome: 'Vinicius', idade: 20, instuticao: 'PUC' });
  await Estudantes.add({ id: 1, nome: 'Flex', idade: 21, instuticao: 'PUC' });
  await Estudantes.add({ id: 2, nome: 'Sidoka', idade: 1001, instuticao: 'PUC' });

  // FIND
  estudante = await Estudantes.findById(0);
  print.history(`Estudantes[0]: ${estudante.nome}`);

  estudante = await Estudantes.findById(1);
  print.history(`Estudantes[1]: ${estudante.nome}`);

  await delay(500);

  // UPDATE
  Estudantes.update({ nome: 'Flex' }, {
    nome: 'Julia',
    endereco: 'Vila Lenzi'
  });

  await delay(500);

  // FIND AGAIN
  estudante = await Estudantes.findById(0);
  print.history(`Estudantes[0]: ${estudante.nome}`);

  estudante = await Estudantes.findById(1);
  print.history(`Estudantes[1]: ${estudante.nome}`);

  print.history('<br>');

  await delay(500);

  // FIND WITH QUERY
  let estudantes = await Estudantes.find({
    instuticao: 'PUC',
    idade: { $gte: 20, $lt: 100 },
  });
  print.history(`Estudantes da PUC entre 20 e 99: ${JSON.stringify(estudantes)}`);
  print.history('<br>');

  await delay(500);

  estudantes = await Estudantes.find({ idade: 21 });
  print.history(`Estudantes com 21: ${JSON.stringify(estudantes)}`);
})();