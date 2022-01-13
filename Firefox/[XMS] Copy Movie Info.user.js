// ==UserScript==
// @name         [XMS] Copy Movie Info
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://xxxmoviestream.xyz/movies/*
// @icon         https://www.google.com/s2/favicons?domain=xxxmoviestream.xyz
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
function copyText(inputString) {
	var jscbta = document.createElement("textarea");
	jscbta.value = inputString;
	document.body.appendChild(jscbta);
	jscbta.select();
	document.execCommand("copy");
	document.body.removeChild(jscbta);
}

function addCode(inputVar = "") {
	if (!inputVar) {
		return;
	}
	var s = document.createElement("script");
	s.type = "text/javascript";
	var c = "\n" + inputVar + "\n";
	console.log(c);
	try {
		s.appendChild(document.createTextNode(c));
		document.body.appendChild(s);
	} catch (e) {
		s.text = c;
		document.body.appendChild(s);
	}
}

function lister(selector) {
	var tmp = [], arr = document.querySelectorAll(selector);
    if(arr.length==0){return '';}
	var x, out;
	for (x of arr) {
        x = listParser(x);
        if(x===-1){continue;}
		tmp.push(x);
	}
	out = tmp.join('; ');
	return out;
}

function listParser(listItem) {
    var x = listItem.innerText.trim();
    if(listFilter(x)){ return -1; }
    return listAlt(x);
}

function listFilter(listItem) {
    //newarr.filter(x => !genreFilter.includes(x)).join('\n');
    var genreFilter = [], starFilter = [], sfemFilter = [], filter = [];

    //genreFilter.push();
    genreFilter.push('All Sex', 'International', 'Interracial', 'Oiled');
    genreFilter.push('Gonzo', 'Featured');
    genreFilter.push('Anal', 'Big Butts', 'Big Cocks');
    genreFilter.push('18+ Teens', 'Amateur', 'Big Dicks', 'Brunettes', 'Cumshots', 'Lingerie', 'Pigtails', 'Rimming', 'Small Tits', 'Tattoos', 'Tit Fucking');
    genreFilter.push('Blondes', 'Naturally Busty', 'Big Butt', 'Deep Throat', 'Fingering', 'Gaping', 'Handjobs', 'Masturbation', 'Pantyhose', 'Stockings');
    genreFilter.push('Footjob', 'Auditions', 'Point Of View', 'Redheads');
    genreFilter.push('Alt Girls', 'Ass to Mouth', 'BBC', 'Blue Hair', 'Directed by Women', 'Facials', 'First Double Penetration', 'French Language', 'Gamer', 'Halloween', 'High Heels', 'Holidays', 'Sex Toy Play', 'Squirting');
    genreFilter.push('18+ Teens', 'Anal', 'Big Cocks', 'Bikini Babes', 'Black Women', 'Blondes', 'Blowjobs', 'Brunettes', 'Candle Wax', 'Cumshots','Deep Throat');
    genreFilter.push('Domination', 'Dungeons', 'Erotic Vignette', 'Facials', 'Fantasy', 'Female Domination', 'Fetish', 'Fingering', 'Fishnets', 'Flogging', 'Foot Fetish', 'Native American');
    genreFilter.push('Gags', 'Gonzo', 'Goth Girls', 'High Heels', 'Holidays', 'Hoods', 'International', 'Interracial', 'Interview', 'Latex & Leather Items', 'Collars & Leashes', 'Toy');
    genreFilter.push('Old & Young Females (18+)', 'Pantyhose', 'Petite', 'Photoshoot', 'Redheads', 'Rimming', 'Sex Toy Play', 'Spanking', 'Stockings', 'Strap-Ons', 'Tattoos', 'Witches');
    genreFilter.push('Caning', 'Tan Lines', 'Creampie', 'Piercing');
    genreFilter.push('Blindfolds','Shaved', 'Latin America', 'Popular with Women', 'South America');
    genreFilter.push('German Language', 'Masks', 'Older Men', 'Swallowing');
    genreFilter.push('Couples', 'Feature', 'Glasses', 'Star Showcase');
    genreFilter.push('Affairs', 'Love Triangles', 'Porn Movies', 'Fetish Wear');

    //starFilter - FEM

    sfemFilter.push('Abella Danger', 'Adriana Chechik', 'Alaina Kristar', 'Alanah Rae', 'Anna De Ville', 'April Brookes', 'Bianca Breeze', 'Bree Daniels', 'Cassandra Nix', 'Chloe Amour');
    sfemFilter.push('Christiana Cinn', 'Cinthia Santos', 'Destiny Dixon', 'Isabella De Santos', 'Jenna Sativa', 'Jennifer White', 'Jessy Jones', 'Joseline Kelly', 'Judy Jolie', 'Karlie Montana');
    sfemFilter.push('Katalina Mills', 'Keisha Grey', 'Kelly Madison', 'Krissy Lynn', 'Lacey Leveah', 'Lyra Lockhart', 'Marica Hase', 'Megan Rain', 'Melissa Moore', 'Mia Lelani');
    sfemFilter.push('Capri Cavanni', 'Penny Pax', 'Raylene', 'Raylin Ann', 'Riley Reid', 'Rilynn Rae', 'Sara Luvv', 'Selena Santoro', 'Suzana Scott', 'Veruca James');
    sfemFilter.push('Carter Cruise', 'Gensen Giavonni', 'Kagney Linn Karter', 'Kasey Miller', 'Nickey Huntsman', 'Scarlet Red', 'Shyla Stylez', 'Tanner Mayes', 'Tiffany Fox', 'Winter Marie');
    sfemFilter.push('Asa Akira', 'Cindy Starfall', 'Jayden Lee', 'Kalina Ryu', 'Lee Stone', 'Mia Li', 'Miko Dai', 'Mila Jade', 'Nari Park', 'Saya Song');
    sfemFilter.push('Alexia Anders', 'Alexx Zen', 'Anastasia Pierce', 'Andrea Moranty', 'Angela Sommers', 'Anna Lee', 'Annie Lee', 'Asia Zo', 'Avena Lee');
    sfemFilter.push('Bella Ling', 'Beti Hana', 'Bliss Lei', 'Charmane Star', 'Ember Snow', 'Evelyn Lin', 'Fey Knight', 'Gia DiBella', 'Jessica Bangkok', 'Lana Croft', 'Lana Violet');
    starFilter.push('Lily Thai', 'Lucy Lee', 'Michelle Maylene', 'Mya Luanna', 'Naomi Lee', 'Nautica Thorn', 'Nipsy Doll', 'Nyomi Zen', 'Tia Ling', 'Tia Tanaka', 'Yuki Mori');
    sfemFilter.push('Ariel Rose', 'Ka Lee', 'Kaylani Lei', 'Kayme Kai', 'Kimmy Thai', 'Kimora Quin', 'Kina Kai', 'Kyanna Lee', 'London Keyes', 'Tera Patrick');
//    starFilter.push(...sfemFilter);

    //starFilter.push();
    starFilter.push('Kurt Lockwood', 'Logan Pierce', 'Lucas Frost', 'Marcus London', 'Ramon Nomar');
    starFilter.push('Romeo Price', 'Ryan McLane', 'Seth Gamble', 'Steven St. Croix', 'Tommy Pistol');
    starFilter.push('Tony Martinez', 'Tyler Nixon', 'Will Powers');
    starFilter.push('Markus Dupree', 'Reagan (Ukrainian)', 'Yuriy Sergeev');
    starFilter.push('Chad Rockwell', 'Rocco Siffredi');
    starFilter.push('Alan Gwada', 'Angelo Godshack', 'Charlie Dean', 'Cheffie Shot', 'Christian Clay', 'Ian Scott', 'Joachim Kessef', 'Lutro', 'Mike Angelo', 'Steven Hard', 'Thomas Lee', 'Zorro');
    starFilter.push('The Pope John Paul (Kink)', 'The Pope John Paul', 'The Pope', 'Tony Orlando', 'Derrick Pierce');
    starFilter.push('The Pope', 'Max Cortes', 'Steve Holmes', 'Barry Scott');
    starFilter.push('Gage Sin', 'John Strong', 'Mark Wood', 'Owen Gray', 'John Johnson');
    starFilter.push('Cal Jammer', 'Guy DiSilva', 'Jay Ashley', 'John West', 'Mike South', 'Pat Myne', 'Roscoe Bowltree', 'Tyler Wood');
    starFilter.push('Donny Sins','John Johnson','Juan Lucho','Mark Zane','Mr. Pete','Adrian Hush');
    starFilter.push('Alberto Blanco', 'Ben English', 'Chris Charming', 'Cole Conners', 'Gonzalo Misoggia', 'Lic. Tomas Umpierrez', 'Manuel Ferrara');
    starFilter.push('Mark Ashley', 'Mike Adriano', 'Mr. Pete', 'Ryan Madison', 'Sr. Larraborde', 'Sr. Ricardo', 'Tony Rubino', 'Trent Tesoro', 'Zenza Raggi', 'Mr Pete');
    starFilter.push('Brad Sterling', 'Chad', 'Claudio', 'Eric John', 'Jay', 'Jay Romero', 'Johnny', 'Martin Stein', 'Nick Ross', 'Phil Hollyday', 'Ricky Rascal', 'Ricky Spanish', 'Robby Echo');
    starFilter.push('Blake Eden', 'Bruce Venture', 'Bruno Dickems', 'Darwin Slimpoke', 'Eric Masterson', 'Eric Swiss', 'Erik Everhard', 'Isiah Maxwell', 'Jack Vegas', 'Joey Brass', 'Jon Jon');
	starFilter.push('Dane Cross', 'Filthy Rich', 'Jovan Jordan', 'Juan Largo', 'Michael Vegas', 'Mick Blue', 'Moe The Monster Johnson', 'Nat Turnher', 'Nick Manning', 'Tommy Gunn', 'Tony D.');
    starFilter.push('Aiden Riley', 'Alec Knight', 'Jonni Darkko', 'Lexington Steele', 'Rick Davis', 'Ryan Driller', 'Scott Lyons');
    starFilter.push('Anthony Rosano', 'J. Mac', 'Julius Ceazher', 'Kaution Kidd', 'Lloyd Platinum', 'Michael Stefano', 'Mike Butders', 'Ralph Long');
    starFilter.push('Ramon', 'Ramon Monstercock', 'Sabrine Maui', 'Sledge Hammer', 'Tony DeSergio');
    starFilter.push('Alex Gonz', 'Jordan Ash');

    genreFilter = Array.from(new Set([...genreFilter].sort()));
    starFilter = Array.from(new Set([...starFilter].sort()));

    filter = [...genreFilter, ...starFilter];

    return filter.includes(listItem);
}

function listAlt(x) {
    if(x=='Gang Bangers'){return 'Gangbang';}
    return x;
}

function getQuery(selector='') {
    if(!selector){ return ''; }
    var query = document.querySelectorAll(selector);
    console.log(query);
    if(!query || !query[0]){ return ''; }
    if((query.length==0) && (!query[0].innerText)) { return ''; }
    else { return query[0].innerText.trim(); }
}

function get_par() {

    var reg = new RegExp(/: +| +: */,'g');

	var t_sel = 'div.sheader > div.data > h1';
	var s_sel = 'div.sheader > div.data a[href^="https://xxxmoviestream.xyz/studios/"]';
	var y_sel = 'div.sheader > div.data a[href^="https://xxxmoviestream.xyz/release/"]';
	var p_sel = '.mylist-star';
	var g_sel = 'div.persons > span.valors > a[href^="https://xxxmoviestream.xyz/genre/"]';
	var g_sel_alt = 'div.sheader > div.data > div.sgeneros > a[href^="https://xxxmoviestream.xyz/genre"]';

	var title = getQuery(t_sel);
	var studio = getQuery(s_sel);
	var link = document.URL;
	var year = getQuery(y_sel);
	var genre = lister(g_sel) || lister(g_sel_alt) | '';
	var star = lister(p_sel) || '';

    title = title.replaceAll(reg,' - ').replaceAll(':','-');
    year = (year) ? (' (' + year + ')') : ('');
    genre = genre || 'X';
    studio = studio || 'N/A';

	var fname = '';
    fname += '<span id="fn_titleyear">';
    fname += '<span id="fn_title">' + title + '</span>';
    fname += '<span id="fn_year">' + year + '</span>';
    fname += '</span>';
    fname += ' [[<span id="fn_genre">' + genre + '</span>]]';
    fname += (star) ? (' ((<span id="fn_star">' + star + '</span>))') : ('');
    fname += '<span id="fn_studio"> {' + studio + '}</span>';

	var p = title + year + '\n' + link + '\n\n[Filename]\n';
	var fncode = '<span id="movie_fname">' + fname + '</span><br><br><hr>';

	document.getElementById('movie_desc').innerText = p;
	document.getElementById('movie_desc').innerHTML += fncode;

	if(document.getElementById('fn_genre')){document.getElementById('fn_genre').contentEditable = 'true';}
	if(document.getElementById('fn_star')){document.getElementById('fn_star').contentEditable = 'true';}
}


function prep_page() {
	document.querySelectorAll('div#info > div.wp-content > p')[0].id = 'movie_desc';
	document.querySelectorAll('div#info > h2')[0].id = 'movie_title';
	pSwap();
	if(!document.querySelectorAll('#button_field').length){
		var btnfield, btn_list = '';
			btn_list += '<button id="btn_copyDesc">Copy Description</button>';
			btn_list += '<button id="btn_copyFname">Copy Filename []</button>';
			btn_list += '<button id="btn_editFname">Edit Filename</button>';
			btnfield = '<div id="button_field">' + btn_list + '</div><br>';
		document.getElementById('movie_title').outerHTML += btnfield;
	}
}

function pSwap () {
	var sel = 'div.persons > span.valors > a[href^="https://xxxmoviestream.xyz/pornstar/"]';
	var p, plist = document.querySelectorAll(sel);
	var x, l, t = 'https://www.iafd.com/results.asp?searchtype=comprehensive&searchstring=';
	var c = 'mylist-star';

	for (p of plist) {
		x = p.innerText.replaceAll(' ','+');
		l = t + x;
		if(!p.classList.contains(c)) {
			p.classList.add(c);
            p.setAttribute('target', '_blank');
			p.dataset.href = p.href;
			p.dataset.altHref = l;
            p.href = l;
            /*
            p.onclick = function(e) {
                var link = e.target.dataset.altHref;
                if(event.altKey) {
                }
                else {
                 //   e.preventDefault();
                    return true;
                }
            }
            */
		}
	}
}

function pSwapAlt() {
var l1='https://xxxmoviestream.xyz/pornstar/tiffany-rousso/';
var l2 = 'https://www.iafd.com/results.asp?searchtype=comprehensive&searchstring=Tiffany+Rousso';
var p = document.querySelectorAll('#cast div.persons a[href^="https://xxxmoviestream.xyz/pornstar/"]')[0];
p.target='_blank';
p.dataset.altHref = l2;


function altlinker(e) {
	if(event.altKey) {
		console.log('test');
		return false;
	}
	else {
		console.log(e.target.dataset.altHref);
		return false;
	}
}

p.onclick = altlinker();
}

function fncount () {
	var out = document.getElementById('movie_fname').innerText.length;
	return out;
}

function fnBtnUpdate () {
	var fname_btn_temp = 'Copy Filename [xxxxx]';
	var fname_count = fncount();
	var fname_btn_name = fname_btn_temp.replace('xxxxx',fname_count);
	document.getElementById('btn_copyFname').innerText = fname_btn_name;
}

function fnbtn_copyPar () {
	var text = document.getElementById('movie_desc').innerText;
	copyText(text);
}

function fnbtn_copyFname () {
	var text = document.getElementById('movie_fname').innerText.trim();
	var alt = document.getElementById('fn_titleyear').innerText.trim();
    if(event.altKey) { text += '\n' + alt + '\n\n'; }
    text = text.replace('(())','');
    text = text.replace('((N/A))','');
    text = text.replace('[[]]','');
    text = text.replace(/ {2,}/,' ');
    text = text.trim();
    if(event.shiftKey) { text += '.ts'; }
    else { text += '.mp4'; }
	copyText(text);
}

function fnbtn_editFname () {
	document.getElementById('movie_fname').contentEditable = 'true';
}

function add_codes() {
	var codes = '';
	codes += addCode.toString() + '\n\n';
	codes += copyText.toString() + '\n\n';
	codes += fncount.toString() + '\n\n';
	codes += fnBtnUpdate.toString() + '\n\n';
	codes += fnbtn_copyPar.toString() + '\n\n';
	codes += fnbtn_copyFname.toString() + '\n\n';
	codes += fnbtn_editFname.toString() + '\n\n';

	addCode(codes);
}

function arm_page() {
	document.getElementById('movie_fname').addEventListener('input',fnBtnUpdate);
	document.getElementById('btn_copyDesc').addEventListener('click',fnbtn_copyPar);
	document.getElementById('btn_copyFname').addEventListener('click',fnbtn_copyFname);
	document.getElementById('btn_editFname').addEventListener('click',fnbtn_editFname);
	fnBtnUpdate();
}

function main () {
	prep_page();
	get_par();
	add_codes();
	arm_page();
}

setTimeout(main, 100);

// =-=-=-=-=-=-= TEMP AREA =-=-=-=-=-=-=
function pushSplitter(arr, lim, chars) {
	var arrName = Object.keys(arr)[0];
	var arrData = Object.values(arr)[0];
	console.log(arrData);
}
// =-=-=-=-=-=-= TEMP AREA =-=-=-=-=-=-=

function getStars() {
	var shift = (event.shiftKey) || (false),
		alt = shift ? true : false,
		id = alt ? 'fn_genre' : 'fn_star',
		elem = document.getElementById(id),
		src = elem ? (elem.innerText.trim() || '') : '',
		arr = src.split('; ') || [], li = [],
		url = 'https://www.iafd.com/results.asp?searchtype=comprehensive&searchstring=',
		br = '\n\n', hr = `${br}${'-='.repeat(20).slice(1)}${br}`, out = '';

	if (!src){return '';}

	arr = arr.map(x => x.trim());
	li = arr.map(x => `${x}\t${url}${x.replaceAll(' ','+')}`);
//	li = arr.map(x => `${x}\n${url}${x.replaceAll(' ','+')}`);
	out = alt ? `${arr.join('\n')}` : `${li.join(br)}`;
//	out = alt ? `${arr.join('\n')}` : `${li.join(br)}\n${br}${arr.join('\n')}`;
	out += `\n${hr}\n`;
    copyText(out);
    console.log(`Copied: [${out}]`);
	return out;
}

function gsLoad() {
    addCode(getStars.toString());
	var e = document.createElement("button"),
			i = 'btn-getStars',
			t = document.createTextNode('S'),
			p = document.body,
			c = 'scroll-btn',
			l = '20px',
			b = '100px';
	e.id = i;
	e.classList.add(c);
	e.style.bottom = b;
	e.style.left = l;
	e.appendChild(t);
	p.appendChild(e);

    document.getElementById(i).addEventListener('click',getStars);
}
setTimeout(gsLoad, 150);

})();
