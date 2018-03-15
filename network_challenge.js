function get_result (callback) {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			callback(JSON.parse(xhttp.responseText));
		}
	};
	xhttp.open('GET', '/result.json', true);
	xhttp.send();
}

function build_ui (callback) {
	get_result(function (res){
		for (var team in res) {
			//COLUMN
			var col = document.createElement('div');
			col.className = 'col-sm-4';
			col.id = team + '-col';
			document.getElementById('team-grid').appendChild(col);

			//HEADER
			var header = document.createElement('h4');
			header.innerHTML = res[team].name;
			col.appendChild(header);

			//PROGRESS
			var progress = document.createElement('div');
			progress.className = 'progress';
			progress.style.marginBottom = '5px';
			col.appendChild(progress);

			var progressBar = document.createElement('div');
			progressBar.id = team + '-progress';
			progressBar.className = 'progress-bar progress-bar-striped progress-bar-animated';
			progress.appendChild(progressBar);

			//PARTICIPANTS
			res[team].participants.forEach(function(participant){
				var p = document.createElement('p');
				p.innerHTML = participant;
				col.appendChild(p);
			});

			//RESULT
			var table = document.createElement('table');
			table.className = 'table';
			col.appendChild(table);

			var thead = document.createElement('thead');
			thead.innerHTML = '<tr><th scope="col">Moment</th><th scope="col">Poäng</th></tr>';
			table.appendChild(thead);

			var tbody = document.createElement('tbody');
			table.appendChild(tbody);

			for (var obj in res[team].result) {
				var row = document.createElement('tr');
				tbody.appendChild(row);

				var key = document.createElement('td');
				key.innerHTML = obj;
				row.appendChild(key);

				var value = document.createElement('td');
				value.id = team + '-' + obj;
				row.appendChild(value);
			}
		}
		callback();
	});
}
