function searchUserByClick(){
	var p = document.getElementById('searchField');
	p.innerHTML = "";
	var lookingFor = document.getElementById('searchBox').value;
	if (lookingFor != "") {
		var url = "jsonFile/users.json";
		function readTextFile(file, callback) {
		    var rawFile = new XMLHttpRequest();
		    rawFile.overrideMimeType("application/json");
		    rawFile.open("GET", file, true);
		    rawFile.onreadystatechange = function() {
		        if (rawFile.readyState === 4 && rawFile.status == "200") {
		            callback(rawFile.responseText);
		        }
		    }
		    rawFile.send(null);
		}
		readTextFile("jsonFile/users.json", function(text){
		    var allUsers = JSON.parse(text);
		    var notFound = true;
			for (var i = 0; i < allUsers.length; i++) {
		    	if (lookingFor === allUsers[i]['username']){
		    		createTableOneRow(allUsers[i]['id'], allUsers[i]['first_name'], allUsers[i]['last_name'], allUsers[i]['username'], allUsers[i]['email'], allUsers[i]['city'], allUsers[i]['country'], allUsers[i]['fav_color'], allUsers[i]['blog'], allUsers[i]['title']);
		    		notFound = false;
		    	}
		    }
		    if(notFound !== false){
		    	var table = document.getElementById('table');
		    	table.innerHTML = '';
		    	document.getElementById('table').style.display = "none";
		    	alert("I'm sorry, the username you're looking for does not exist!");
		    }		    
		});
	} else {
		alert("type the username first, please!");
	}
}

function createTableOneRow(t_id, t_first_name, t_last_name, t_username, t_email, t_city, t_country, t_fav_color, t_blog, t_title){
	var body = document.getElementById('table');
	body.innerHTML = '';
	var table   = document.createElement("table");
	table.setAttribute('class', 'table');
	var tblBody = document.createElement("tbody");
	var headers = ['ID','First name','Last name','Username','Email','City','Country','Fav. color','Blog','Title'];
	var tr = document.createElement('tr');
	tr.setAttribute('class', 'first-row');
	for(var i=0; i<headers.length; i++){
		var td = document.createElement('td');
		if ((headers[i] === 'Email') || (headers[i] === 'City') || (headers[i] === 'Country') || (headers[i] === 'Fav. color') || (headers[i] === 'Blog') || (headers[i] === 'Title')){
			td.setAttribute('class', 'not-mobile');
		}
		var textTd = document.createTextNode(headers[i]);
		td.appendChild(textTd);
		tr.appendChild(td);
	}
	tblBody.appendChild(tr);
	var tr = document.createElement('tr');
	tr.setAttribute('class', 'second-row');
	var id = document.createElement('td');
	var textId = document.createTextNode(t_id);
	id.appendChild(textId);
	tr.appendChild(id);

	var first_name = document.createElement('td');
	var textFirst_name = document.createTextNode(t_first_name);
	first_name.appendChild(textFirst_name);
	tr.appendChild(first_name);

	var last_name = document.createElement('td');
	var textlast_name = document.createTextNode(t_last_name);
	last_name.appendChild(textlast_name);
	tr.appendChild(last_name);

	var username = document.createElement('td');
	var textUsername = document.createTextNode(t_username);
	username.appendChild(textUsername);
	tr.appendChild(username);

	var email = document.createElement('td');
	email.setAttribute('class', 'not-mobile');
	var textEmail = document.createTextNode(t_email);
	email.appendChild(textEmail);
	tr.appendChild(email);

	var city = document.createElement('td');
	city.setAttribute('class', 'not-mobile');
	var textCity = document.createTextNode(t_city);
	city.appendChild(textCity);
	tr.appendChild(city);

	var country = document.createElement('td');
	country.setAttribute('class', 'not-mobile');
	var textCountry = document.createTextNode(t_country);
	country.appendChild(textCountry);
	tr.appendChild(country);

	var favColor = document.createElement('td');
	favColor.setAttribute('class', 'not-mobile');
	if (t_fav_color === null){
		t_fav_color = "n/a";
		var textFavColor = document.createTextNode(t_fav_color);
		favColor.appendChild(textFavColor);
		tr.appendChild(favColor);
	} else {
		var li = document.createElement('li');
		li.setAttribute('class', 'fav-color');
		li.style.background = t_fav_color;
		var textFavColor = document.createTextNode(t_fav_color);
		favColor.appendChild(textFavColor);
		tr.appendChild(li);
	}
	var blog = document.createElement('td');
	blog.setAttribute('class', 'not-mobile');
	var a = document.createElement('a');
	var linkText = document.createTextNode('Visit Blog');
	a.appendChild(linkText);
	a.href = t_blog;
	blog.appendChild(a);
	tr.appendChild(blog);

	var title = document.createElement('td');
	title.setAttribute('class', 'not-mobile');
	if (t_title === null) {t_title = "n/a"};
	var textTitle = document.createTextNode(t_title);
	title.appendChild(textTitle);
	tr.appendChild(title);
	tblBody.appendChild(tr);
	table.appendChild(tblBody);
	body.appendChild(table);
	document.getElementById('table').style.display = "block";
}

function searchUserByInput() {
	var searchBox2Val = document.getElementById("searchBox2").value;
	if (searchBox2Val.length > 2) {
		var url = "jsonFile/users.json";
		function readTextFile(file, callback) {
		    var rawFile = new XMLHttpRequest();
		    rawFile.overrideMimeType("application/json");
		    rawFile.open("GET", file, true);
		    rawFile.onreadystatechange = function() {
		        if (rawFile.readyState === 4 && rawFile.status == "200") {
		            callback(rawFile.responseText);
		        }
		    }
		    rawFile.send(null);
		}
		readTextFile("jsonFile/users.json", function(text) {
			var p = document.getElementById("searchField");
			p.innerHTML = "";
		    var allUsers = JSON.parse(text);
		    for (var i = 0; i < allUsers.length; i++) {
		    	if (allUsers[i]['username'].trim() === searchBox2Val.trim()) {
		    		createTableOneRow(allUsers[i]['id'], allUsers[i]['first_name'], allUsers[i]['last_name'], allUsers[i]['username'], allUsers[i]['email'], allUsers[i]['city'], allUsers[i]['country'], allUsers[i]['fav_color'], allUsers[i]['blog'], allUsers[i]['title']);
		    	} else {
		    		var n = allUsers[i]['username'].indexOf(searchBox2Val);
			    	if (n !== -1){
			    		var newElement = document.createElement('li');
			    		newElement.setAttribute('id', 'li-element' + allUsers[i]['id']);
			    		newElement.setAttribute('onclick', "add('" + allUsers[i]['username'] + "');")
		    			newElement.innerHTML = allUsers[i]['username'];
		    			p.appendChild(newElement);
		    		}
		    	}
		    }
		});
	} else {
		var p = document.getElementById('searchField');
		p.innerHTML = "";
	}
}

function add(username) {
	document.getElementById('searchBox2').value = username;
	var lookingFor = username;
	var url = "jsonFile/users.json";
	function readTextFile(file, callback) {
	    var rawFile = new XMLHttpRequest();
	    rawFile.overrideMimeType("application/json");
	    rawFile.open("GET", file, true);
	    rawFile.onreadystatechange = function() {
	        if (rawFile.readyState === 4 && rawFile.status == "200") {
	            callback(rawFile.responseText);
	        }
	    }
	    rawFile.send(null);
	}
	readTextFile("jsonFile/users.json", function(text){
	    var allUsers = JSON.parse(text);
	    var notFound = true;
		for (var i = 0; i < allUsers.length; i++) {
	    	if (lookingFor === allUsers[i]['username']){
	    		createTableOneRow(allUsers[i]['id'], allUsers[i]['first_name'], allUsers[i]['last_name'], allUsers[i]['username'], allUsers[i]['email'], allUsers[i]['city'], allUsers[i]['country'], allUsers[i]['fav_color'], allUsers[i]['blog'], allUsers[i]['title']);
	    		notFound = false;
	    		var p = document.getElementById('searchField');
				p.innerHTML = "";
	    	}
	    }
	    if(notFound !== false){
	    	var table = document.getElementById('table');
	    	table.innerHTML = '';
	    	document.getElementById('table').style.display = "none";
	    	alert("I'm sorry, the username you're looking for does not exist!");
	    }		    
	});
}

