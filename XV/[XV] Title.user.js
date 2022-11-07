// ==UserScript==
// @name         [XV] Title
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.xvideos.com/video*
// @icon         https://www.google.com/s2/favicons?domain=xvideos.com
// @grant        none
// @require      https://cdn.jsdelivr.net/gh/ddjarvis/JS-Snippets@addElement-1.3.0/js-functions/addElement.js
// @require      https://cdn.jsdelivr.net/gh/ddjarvis/JS-Snippets/js-functions/copyText.js
// @require      https://cdn.jsdelivr.net/gh/ddjarvis/JS-Snippets@getElement-1.1.0/js-functions/getElement.js

// ==/UserScript==

// @github	https://github.com/ddjarvis/Tampermonkey-Codes/blob/main/XV/%5BXV%5D%20Title.user.js

(function() {
    'use strict';
    // Your code here...
    main();

function main() {
//	formatTitle();
    prepTitle();
	setTimeout(formatTitle, 550);
	setTimeout(createButton, 750);
//	setTimeout(formatTitle, 700);
//	setTimeout(formatTitle, 1500);
}

function prepTitle() {
	var check = document.querySelectorAll('h2.page-title');
	if(check.length == 0) {
		setTimeout(prepTitle,100);
		return;
	}

	var title_parent = document.querySelector('h2.page-title');
	var title_bef = document.querySelectorAll('h2.page-title span')[0];
	var title_span = addElement('span','page-title-span','-',title_parent,title_bef);

	var title_textnode = document.querySelector('h2.page-title').childNodes[0];
	title_span.appendChild(title_textnode);
}

function changeTitle(new_title) {
	var check = document.querySelectorAll('#page-title-span');
	if(check.length == 0) {
		setTimeout(()=>changeTitle(new_title),100);
		return;
	}

	document.getElementById('page-title-span').innerText = new_title;
	document.getElementById('page-title-span').contentEditable = 'true';
}

function formatTitle(mode="1") {
//	var title_old = (document.body.dataset.oldTitle) ? (document.body.dataset.oldTitle) : (document.title);
//    document.body.dataset.oldTitle = title_old;

	var prefix = '[XV]';
	var title = getTitle(mode);



	var title_new = title;
    title_new = '[XV] ' + title_new;

    var title_addon = '';

/*	-=[ Video Poster ]=-	*/
    var ta_poster = '';
    var ta_poster_sel = 'a.main.uploader-tag span.name';
    var ta_poster_text = (document.querySelectorAll(ta_poster_sel).length > 0) ? document.querySelector(ta_poster_sel).innerText : '';
    ta_poster = ta_poster_text ? (` «${ta_poster_text}»`) : ('');
    title_addon += ta_poster;

	var title_id = document.URL.replace(/.+video(\d+).+/,' {$1}');
    title_addon += title_id;

    var ta_star = '';
    var ta_star_sel = 'a.profile span.name';
    var ta_star_text = (document.querySelectorAll(ta_star_sel).length > 0) ? (Array.from(document.querySelectorAll(ta_star_sel)).map(x=>x.innerText.trim()).join('; ')) : '';
    ta_star = ta_star_text ? (` ((${ta_star_text}))`) : ('');
    title_addon += ta_star;

    var ta_cat = '';
    var ta_cat_sel = 'div.video-tags-list li:not(.view-more-li) > a:not(.uploader-tag)[href^="/tags/"]';
    var ta_cat_arr = [], ta_cat_arr1 = [], ta_cat_arr2 = [];
    var ta_cat_arr1_len, ta_cat_arr2_len;

    var ta_cat_in = '';
    var ta_cat_in_arr = [];
    var ta_cat_bypass = 2;


/* Ethnicity */
//	ta_cat_in_arr.push('asian');
//	ta_cat_in_arr.push('indian');
//	ta_cat_in_arr.push('jav');
//	ta_cat_in_arr.push('pinay');
//	ta_cat_in_arr.push('thai');
//	ta_cat_in_arr.push('w-asian');

//	ta_cat_in_arr.push('ebony');
//	ta_cat_in_arr.push('latina');

//	ta_cat_in_arr.push('euro');
//	ta_cat_in_arr.push('british');
//	ta_cat_in_arr.push('czech');
//	ta_cat_in_arr.push('french');
//	ta_cat_in_arr.push('german');
/* =-=-=-=-= */



/* Group Size */
//	ta_cat_in_arr.push('group');
//	ta_cat_in_arr.push('blowbang');
//	ta_cat_in_arr.push('gangbang');
//	ta_cat_in_arr.push('reverse gangbang');
//	ta_cat_in_arr.push('orgy');
//	ta_cat_in_arr.push('crowd');
//	ta_cat_in_arr.push('4p-mmff');
//	ta_cat_in_arr.push('3p-mmf');
//	ta_cat_in_arr.push('3p-ffm');
//	ta_cat_in_arr.push('3p-lez');
//	ta_cat_in_arr.push('solo');
//	ta_cat_in_arr.push('party');
/* =-=-=-=-=-= */



/* Group Type */
//	ta_cat_in_arr.push('cuckold');
//	ta_cat_in_arr.push('ntr');
//	ta_cat_in_arr.push('fakecest');
/* =-=-=-=-=-= */



/* POV */
//	ta_cat_in_arr.push('exhibitionism');
//	ta_cat_in_arr.push('nude');
//	ta_cat_in_arr.push('nude interview');
//	ta_cat_in_arr.push('nude model');
//	ta_cat_in_arr.push('public');
//	ta_cat_in_arr.push('stage');
//	ta_cat_in_arr.push('webcam');
/* =-=-=-=-=-= */



/* Rough */
//	ta_cat_in_arr.push('bdsm');
//	ta_cat_in_arr.push('bondage');
//	ta_cat_in_arr.push('brutal');
//	ta_cat_in_arr.push('extreme');
//	ta_cat_in_arr.push('hardcore');
//	ta_cat_in_arr.push('rough');
//	ta_cat_in_arr.push('maledom');
//	ta_cat_in_arr.push('slave');
/* =-= */



/* MultiCock */
//	ta_cat_in_arr.push('dp');
//	ta_cat_in_arr.push('dap');
//	ta_cat_in_arr.push('dvp');
//	ta_cat_in_arr.push('tp');
//	ta_cat_in_arr.push('tap');
//	ta_cat_in_arr.push('tvp');
/* =-=-=-=-=-= */



/* Activity */
//	ta_cat_in_arr.push('xbj');
//	ta_cat_in_arr.push('fyff');
//	ta_cat_in_arr.push('bukkake');
//	ta_cat_in_arr.push('free use');
//	ta_cat_in_arr.push('gokkun');
//	ta_cat_in_arr.push('dancing');
//	ta_cat_in_arr.push('wrestling');
//	ta_cat_in_arr.push('mujra');
/* =-=-=-=-=-= */



/* Misc */
//	ta_cat_in_arr.push('compilation');
//	ta_cat_in_arr.push('armpits');
//	ta_cat_in_arr.push('engsub');
//	ta_cat_in_arr.push('hentai');
//	ta_cat_in_arr.push('ktv');
//	ta_cat_in_arr.push('piss');
//	ta_cat_in_arr.push('fetish');
//	ta_cat_in_arr.push('sleeping');
//	ta_cat_in_arr.push('uncensored');
//	ta_cat_in_arr.push('EngSub');
//	ta_cat_in_arr.push('vintage');
//	ta_cat_in_arr.push('pmv');
//	ta_cat_in_arr.push('webcam');
//	ta_cat_in_arr.push('full-movie');
/* =-=-=-=-=-= */


/* Adjective */
//	ta_cat_in_arr.push('bbw');
//	ta_cat_in_arr.push('chubby');
//	ta_cat_in_arr.push('hairy');
//	ta_cat_in_arr.push('lesbian');
//	ta_cat_in_arr.push('pregnant');
/* =-=-=-=-= */

	if(ta_cat_in_arr.length) { ta_cat_in = ta_cat_in_arr.join('; '); }




/*
    ta_cat_in = 'armpits; hairy';
    ta_cat_in = 'asian; jav; uncensored; hairy';
    ta_cat_in = 'asian; thai';
    ta_cat_in = 'bdsm; rough; bondage';
    ta_cat_in = 'bdsm; rough; bondage; hairy';
    ta_cat_in = 'blowbang';
    ta_cat_in = 'bukkake; gokkun';
    ta_cat_in = 'cuckold; ntr';
    ta_cat_in = 'dvp; tp';
    ta_cat_in = 'extreme; hairy; teen';
    ta_cat_in = 'fakecest; group; orgy';
    ta_cat_in = 'full-movie';
    ta_cat_in = 'gangbang';
    ta_cat_in = 'gangbang; blowbang';
    ta_cat_in = 'group; gangbang';
    ta_cat_in = 'hairy';
    ta_cat_in = 'hairy; bondage';
    ta_cat_in = 'hairy; group';
    ta_cat_in = 'hairy; group; 3p-ffm';
    ta_cat_in = 'hairy; group; 3p-mmf';
    ta_cat_in = 'hairy; group; gangbang';
    ta_cat_in = 'hairy; group; orgy';
    ta_cat_in = 'hairy; lesbian';
    ta_cat_in = 'hairy; lesbian; group; 3p-lez';
    ta_cat_in = 'hairy; lesbian; group; orgy';
    ta_cat_in = 'hairy; solo';
    ta_cat_in = 'hardcore; gangbang';
    ta_cat_in = 'hardcore; gangbang; tap';
    ta_cat_in = 'hentai';
    ta_cat_in = 'indian; nude; dancing';
    ta_cat_in = 'jav';
    ta_cat_in = 'jav; engsub';
    ta_cat_in = 'jav; uncensored';
    ta_cat_in = 'latina; blowbang; webcam';
    ta_cat_in = 'latina; hairy';
    ta_cat_in = 'latina; webcam; group';
    ta_cat_in = 'latina; webcam; group; gangbang; 3p-mmf';
    ta_cat_in = 'lesbian; orgy';
    ta_cat_in = 'nude model';
    ta_cat_in = 'pinay; chubby';
    ta_cat_in = 'pinay; hairy';
    ta_cat_in = 'piss; bukkake';
    ta_cat_in = 'public nudity; crowd';
    ta_cat_in = 'public nudity; nude interview';
    ta_cat_in = 'public; stage';
    ta_cat_in = 'vintage; hairy';
    ta_cat_in = 'vintage; hairy; full-movie';
    ta_cat_in = 'vintage; nude; hairy; dancing';
    ta_cat_in = 'vintage; orgy';
    ta_cat_in = 'w-asian; hairy';
    ta_cat_in = '';
*/


    ta_cat_arr1 = strSplit(ta_cat_in);
    ta_cat_arr1_len = ta_cat_arr1.length;

    if(ta_cat_arr1_len < 3) {
        ta_cat_arr = catMerge(ta_cat_in).slice(0,3);
    }
    else if ((ta_cat_arr1_len >= 3) && (ta_cat_bypass > 0)) {
        ta_cat_arr = catMerge(ta_cat_in).slice(0,ta_cat_arr1_len + ta_cat_bypass);
    }
    else if ((ta_cat_arr1_len >= 3) && !ta_cat_bypass) {
        ta_cat_arr = [...ta_cat_arr1];
    }

    var ta_cat_text = ta_cat_arr?.filter(x=>x!='').join('; ');
    if(ta_cat_text) { ta_cat = ` [[${ta_cat_text}]]`; }
//    var ta_cat_text = (ta_cat_arr.length > 0) ? ta_cat_arr.map(x=>x?.innerText?.trim())?.join('; ') : '';
//    var ta_cat_text = (ta_cat_arr.length > 0) ? ta_cat_arr.filter((x,y)=>y<3).map(x=>x.innerText.trim()).join('; ') : '';
//    ta_cat_text = 'big-tits; hairy; ' + ta_cat_text;

//    ta_cat = ta_cat_text ? (` [[${ta_cat_text}]]`) : ('');
//    ta_cat = ta_cat.replace(/(?<=\[\[)\s/,'[[');
    title_addon += ta_cat;

    title_new = title_new.replaceAll(/[\/]/g,'-');
    title_new = title_new.replaceAll(/(?<=[\w\d])(( +: *)|(: *))(?=[\w\d])/g,' - ');
    title_new = title_new.replaceAll(/[^\w\d](( +: *)|(: *))[^\w\d]/g,'');

    title_new += title_addon;

	document.title = title_new;
    changeTitle(title_new);

    var title_length = title_new.length;
    updateCount();

//    title_elem.dataset.ogTitle = title_elem.innerText;
//    title_elem.innerText = title_new;
}

function updateCount() {
    var count = document.getElementById("page-title-span").innerText.trim().length;
    var count_box = document.querySelectorAll('h2.page-title span.duration');
    if(count_box.length > 0){count_box[0].innerText = count;}
    if(count_box.length > 210) { alert('Title too long!'); }
}



function getTitleOld(mode) {
	var title_old;
	switch(mode) {
		case "1":
			title_old = document.title;
			break;
		case "2":
			title_old = document.getElementById("page-title-span").innerText.trim();
			break;
		case "3":
			title_old = document.getElementById("page-title-span").dataset.oldTitle;
			break;
	}
	return title_old;
}

function getTitle(mode) {
	var title_old = getTitleOld(mode);
	document.getElementById("page-title-span").dataset.oldTitle = title_old;
	return title_old.replace(/(.+) - XVIDEOS\.COM/,'$1').replaceAll(/[\/]/g,'-');
}



function copyTitle() {
//    var title = document.title + '.ts';
    var ext, title, name;
    if((event.ctrlKey) && (event.altKey)) {
        console.log('Reset Title'); return;
    } else if((event.shiftKey) && (event.altKey)) {
        ext = 'mp4';
    } else if(event.altKey) {
        ext = 'ts';
    } else {
        ext = 'flv';
    }
    name = document.getElementById('page-title-span').innerText;
    name = name.replace(/((?<=\[\[)\s)|(\s(?=;))|(\s(?=\]\]))/g,'');
    name = name.replace(/[ ]{2,}/,' ');
    copyText(`${name}.${ext}`);
    document.title = name;
    return ext;
//    copyText(document.getElementById('page-title-span').innerText + '.mp4');
}

function btnSetCopy() {
    updateCount();
    if((event.ctrlKey) && (event.altKey)) {
        this.innerText = `Title Set / Copy`;
        var formatMode = (document.getElementById("page-title-span").dataset.oldTitle) ? "3" : "2";
        formatTitle(formatMode);
        copyTitle();
    }
    else {
        var ext = copyTitle();
        this.innerText = `Title Set / Copied (${ext.toUpperCase()})`;
    }
}

function createButton() {
    var before = (document.querySelectorAll('#dload-btn').length > 0) ? document.querySelector('#dload-btn') : document.querySelector('.header-icons');
    var parent = before.parentElement;
    var btn = addElement('button','title-btn','Title Set / Copy',parent,before);
	btn.style.position = 'relative';
	btn.style.left = '60px';
//	btn.style.top = '0px';
	btn.style.cursor = 'pointer';
    btn.style.backgroundColor = '#67140C';
    btn.style.borderRadius = '7px';
    btn.style.transition = 'all 0.5s';
    btn.style.zIndex = '99999';
    btn.addEventListener('click', btnSetCopy);
}




/* =-=-=-=-=-= TAG MERGING =-=-=-=-=-= */


function catMerge(input) {
	const selArr = [
		'div.video-tags-list li:not(.view-more-li)',
		'a:not(.uploader-tag)[href^="/tags/"]'
	];
	const sel = selArr.join(' > ');

	const tags_old = Array.from(document.querySelectorAll(sel)).map(x=>x.innerText);
	const tags_new = strSplit(input);
	const tags_filt = arrayFilter(arrayFilter(tags_old, getFilterList()), arrayExpand(tags_new));
	const tags_mrgd = [...tags_new, ...tags_filt].filter(x=> x ?? false);
	return tags_mrgd;
}

function strSplit(string) {
	var str = string;
	str = str?.trim()
	str = str.replaceAll(/(^ *; *| *; *$)/g,'');
	str = str.replaceAll(/( *; *| *; *)+/g,';');

	var arr = str?.split(';');
	// console.log(str, );
	return arr;
}

function arrayExpand(arr) {
	const sep = [' ','-','_',''];
	var arrs = arr.map(x => !x.includes(' ') ? x : sep.map(s => x.replace(' ',s)));
	return arrs.flat();
}

function arrayFilter(arr, filter) {
	var filtered = arr.filter(x => ! filter.includes(x) );
	return filtered.map(x => x.replaceAll('-',' '));
}


/* =-=-=-=-=-= TAG FILTER =-=-=-=-=-= */

function getFilterList () {
	var filterList = [];
//	filterList.push([]);
	filterList.push(['Female Friendly', 'College', 'Instructional', 'Romantic', 'BTS']);
	filterList.push(['Casting', 'Gonzo', 'Reality', 'Fantasy', 'JOI']);
	filterList.push(['Young/Old', 'Anal', 'Blowjob', 'Fingering', 'Fisting']);
	filterList.push(['Footjob', 'Foreplay', 'Handjob', 'Kissing', 'Masturbation']);
	filterList.push(['Penetration', 'Pussy Licking', 'Rimming', 'Creampie', 'Female Orgasm']);
	filterList.push(['Squirting', 'Swallow', 'Ebony', 'Teen (18+)', 'Twenties']);
	filterList.push(['Big Butt', 'Big Dick', 'Muscle', 'Small Tits', 'Beards']);
	filterList.push(['Blonde', 'Brunette', 'Panties', 'Pantyhose', 'Uncut']);
	filterList.push(['Gay', 'Straight Sex', 'Solo girl', 'Solo Male', 'Couples']);
	filterList.push(['Amateur', 'Homemade', 'POV', 'SFW', 'Verified Amateurs']);
	filterList.push(['ASMR', 'Virtual Reality', 'brunette']);
	filterList.push(['boobies', 'ass', 'wet', 'fuck', 'nasty', 'oriental', 'reality', 'hd']);
	filterList.push(['moaning', 'sweet', 'japanese', 'subtitles', 'avidol', 'big-cock', 'japan']);
	filterList.push(['big', 'tits', 'blowjob', 'riding', 'doggystyle', 'pornstar', 'fingering', 'ASMR']);
//	filterList.push(['ASMR', 'ASMR', 'ASMR', 'ASMR', 'ASMR', 'ASMR', 'ASMR', 'ASMR']);
	filterList.push(['hot', 'hardcore', 'anal', 'teen', 'blonde', 'creampie', 'doggystyle', 'squirt']);
	filterList.push(['cum', 'cumshot', 'cumshots', 'babe', 'amateur', 'porn', 'porno', 'sex', 'pussy']);
	filterList.push(['butt', 'dick', 'penetration', 'handjob', 'boobs', 'slut', 'gagging', 'fucking', 'jerking']);
	filterList.push(['bbc', 'bigcocks', 'double', 'gagging', 'girl', 'monstercock', 'skinny', 'small', 'squirt', 'video']);
    filterList.push(['fucked', 'sexy', 'sucking', 'gay', 'stroking', 'bitch', 'com', 'ASMR']);
	return filterList.flat();
}

})();
