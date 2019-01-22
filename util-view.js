let print = {
	_inner: function (id, content) {
		document.querySelector(id).innerHTML += `<div>${content}<div>`;
	},
	history: function (content, color = 'green') {
		this._inner('#history', content);

		document.getElementById('box-history').style.border = '1px solid ' + color;
		setTimeout(() => {
			document.getElementById('box-history').style.border = '';
		}, 1000);
	}
}

var delay = (ms) => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve();
		}, ms);
	});
};