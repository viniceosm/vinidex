(async function () {
  await initDb();

  let Estudantes = vinidex.model('Estudantes');

  for (id of [0, 1, 2])
    Estudantes.delete(id);

  await Estudantes.add({ id: 0, nome: 'Vinicius', idade: 20, instuticao: 'PUC' });
  await Estudantes.add({ id: 1, nome: 'Flex', idade: 21, instuticao: 'PUC' });
  await Estudantes.add({ id: 2, nome: 'Sidoka', idade: 1001, instuticao: 'PUC' });

  estudante = await Estudantes.findById(0);
  print(`Estudantes[0]: ${estudante.nome}`);

  estudante = await Estudantes.findById(1);
  print(`Estudantes[1]: ${estudante.nome}`);

  Estudantes.updateById(1, {
    nome: 'Julia',
    endereco: 'Vila Lenzi'
  });

  estudante = await Estudantes.findById(0);
  print(`Estudantes[0]: ${estudante.nome}`);

  estudante = await Estudantes.findById(1);
  print(`Estudantes[1]: ${estudante.nome}`);

  print('<br>');

  let estudantes = await Estudantes.find({
    instuticao: 'PUC',
    idade: { $gte: 20, $lt: 100 },
  });
  print(`Estudantes da PUC entre 20 e 99: ${JSON.stringify(estudantes)}`);
  print('<br>');

  estudantes = await Estudantes.find({ idade: 21 });
  print(`Estudantes com 21: ${JSON.stringify(estudantes)}`);
})();