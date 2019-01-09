(async function () {
	//iniciando o banco
	await vinidex.init('TonyMontana');

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

	vinidex.delete('Estudantes', 1);
	vinidex.delete('Estudantes', 2);
})();