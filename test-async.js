(async function () {
  await initDb();

  for (obj of [...vinidex.db.objectStoreNames]) {
    print._inner('#box-object-stores', obj);
  }
})();

window.addEventListener('load', function() {
  document.getElementById('btnCriarObjectStore').addEventListener('click', async function() {
    let nameObjS = document.getElementById('nome-object-store').value;
    let Model = vinidex.model(nameObjS);
    let valueAdd = JSON.parse(document.getElementById('value-object-store').innerHTML);

    try {
      await Model.add(valueAdd);
      print.history(`Adicionado valor em ${nameObjS}`);
    } catch (e) {
      print.history(`Erro ao adicionar valor em ${nameObjS} (verificar id)`, 'red');
    }
  });
});