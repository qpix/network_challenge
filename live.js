function update_ui () {
	get_result (function(res){
		var total_result = {};

		for (var team in res) {
			var result = res[team].result;
			document.getElementById(team + '-Praktik').innerHTML = res[team].result['Praktik'];
			document.getElementById(team + '-Teori').innerHTML = res[team].result['Teori'] * 20;

			total_result[res[team].name] = res[team].result['Praktik'] + res[team].result['Teori'] * 20;

			//UPDATE PROGRESS
			$('#' + team + '-progress').animate({
				width : total_result[res[team].name] / 4 + '%'
			});
		}

		document.getElementById('team-table').innerHTML = '';

		var position = 1;
		while (Object.keys(total_result).length > 0) {
			var top_score = -1;
			var top_team = null;
			for (var team in total_result) {
				if (top_score < total_result[team]) {
					top_score = total_result[team];
					top_team = team;
				}
			}

			var row = document.createElement('tr');
			document.getElementById('team-table').appendChild(row);

			var col_pos = document.createElement('th');
			col_pos.scope = 'row';
			col_pos.innerHTML = position;
			position += 1;
			row.appendChild(col_pos);

			var col_name = document.createElement('td');
			col_name.innerHTML = top_team;
			row.appendChild(col_name);

			var col_score = document.createElement('td');
			col_score.innerHTML = top_score;
			row.appendChild(col_score);

			delete total_result[top_team];
		}
	});
}

function refresh() {
	$('#nextUpdateProgress').animate({width:'100%'}, 10000, function(){
		update_ui();
		document.getElementById('nextUpdateProgress').style.width = '0%';
		refresh();
	});
}

build_ui(update_ui);
refresh();
