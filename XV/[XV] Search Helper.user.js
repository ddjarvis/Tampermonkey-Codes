// ==UserScript==
// @name         [XV] Search Helper
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.xvideos.com/?k=*
// @include      https://www.xvideos.com/c/*
// @include      https://www.xvideos.com/amateur-channels/*
// @include      https://www.xvideos.com/pornstar-channels/*
// @include      https://www.xvideos.com/channels/*
// @include      https://www.xvideos.com/pornstars/*
// @include      https://www.xvideos.com/profiles/*
// @include      https://www.xvideos.com/favorite/*/*
// @include      /http.+www.xvideos.com\/tags\/(\d{2}|\w).+/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=xvideos.com
// @require      https://cdn.jsdelivr.net/gh/ddjarvis/JS-Snippets/js-functions/addCss.min.js
// @require      https://cdn.jsdelivr.net/gh/ddjarvis/JS-Snippets@addElement-1.3.0/js-functions/addElement.js
// @require      https://cdn.jsdelivr.net/gh/ddjarvis/JS-Snippets/js-functions/copyText.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
function domStringify(element) {
	var obj = {};
	obj.name = element.localName;
	obj.attributes = [];
	obj.children = [];

	Array.from(element.attributes).forEach(a => {
		obj.attributes.push({ name: a.name, value: a.value });
	});
	Array.from(element.children).forEach(c => {
		obj.children.push(domStringify(c));
	});

	return obj;
}

function pageWrite(content) {
	var pages = Object.keys(localStorage).filter(x => x.match(/^page-\d+/));
	var count = pages.length;
	var page = 'page-' + (count + 1);
	localStorage.setItem(page, content);
	console.log(page, ':', content);
}

function pageRead() {
	var pages = Object.keys(localStorage).filter(x => x.match(/^page-\d+/));
	var count = pages.length;
	var page, content = '';
	for (var i = 0; i < count; i++) {
		page = 'page-' + (i + 1);
		content += localStorage.getItem(page) + '\n\n';
	}
	return content;
}

function pageClear() {
	var pages = Object.keys(localStorage).filter(x => x.match(/^page-\d+/));
	var count = pages.length;
	var page;
	for (var i = 0; i < count; i++) {
		page = 'page-' + (i + 1);
		localStorage.removeItem(page);
	}
}

function getDuration(video) {
	var parent = document.querySelectorAll('#content div.mozaique, div.mozaique')[0];
	var videos = parent.querySelectorAll('div.thumb-block:not(.hidden)');

	var dur = video.querySelectorAll('span.duration');
	if(dur.length < 1) { return -1; }

	var length;
	var dur_txt = dur[0].innerText;

	var reg_h = /\d+(?= h\w*)/;
	var reg_m = /\d+(?= m\w*)/;
	var reg_s = /\d+(?= s\w*)/;

	var dur_h = dur_txt.match(reg_h) * 60 * 60;
	var dur_m = dur_txt.match(reg_m) * 60;
	var dur_s = dur_txt.match(reg_s) * 1;

	length = dur_h + dur_m + dur_s;
	return length;
}

function getName(video) {
	//if(video.querySelectorAll('a.n').length==0){return '0';}
	var name = video?.querySelector('.title')?.innerText?.trim();
    //name = name.replace(/^.*?([A-Za-z].+)/,'$1').trim();
	return name;
}

function next() {
  var action;
  if(event) { if(event.altKey) { action = 'prev-page'; } else { action = 'next-page'; } }
  else { action = 'next-page'; }
  var sel = 'div.pagination li > a.' + action;
  var next = document.querySelectorAll(sel);
	if (next.length>0) {
		next[0].click();
	}
}

function get() {
	var parent = document.querySelectorAll('#content div.mozaique, div.mozaique')[0];
	var videos = parent.querySelectorAll('div.thumb-block:not(.thumb-block-profile)');
//	var content = parent.innerHTML.replaceAll(/([ ][ ]+)/g, ' ').replaceAll(/([ \t][ \t]+)|(\n\n+)/g, '');
	var video, content, arr = [];
	for (video of videos) {
		arr.push(video.outerHTML);
	}
	content = arr.join('\n');
	pageWrite(content);
	if (!(event.shiftKey || event.altKey)){setTimeout(next, 500);}
}

function set() {
	var parent = document.querySelectorAll('#content div.mozaique, div.mozaique')[0];
	var pagination = parent.querySelectorAll('div.pagination')[0];
	var videos = parent.querySelectorAll('div.thumb-block:not(.thumb-block-profile)');
//	var content = parent.innerHTML.replaceAll(/([ ][ ]+)/g, ' ').replaceAll(/([ \t][ \t]+)|(\n\n+)/g, '');
	var video, content, arr = [];
	for (video of videos) {
		arr.push(video.outerHTML);
	}
	content = arr.join('\n');
	if(!(event.shiftKey || event.altKey)){pageWrite(content);}
	parent.innerHTML = pageRead();

	if(pagination){
		var pFragment = new DocumentFragment();
		pFragment.appendChild(pagination);
		parent.insertBefore(pFragment, parent.children[0]);
	}
    setTimeout(clean,250);
	pageClear();
}

function clear() {
    pageClear();
}

function clean() {
    sortByTime();
    unhideFresh();
    tagElems();
}

function sort() {
	if(event.ctrlKey) {sortByName();}
	else {sortByTime();}
}

function labelDuration() {
	var parent = document.querySelectorAll('#content div.mozaique, div.mozaique')[0];
	var videos = parent.querySelectorAll('div.thumb-block:not(.thumb-block-profile):not(.hidden)');
	var sorted = new DocumentFragment();
	var discard = new DocumentFragment();
	var rank = [];

	videos.forEach((x, index) => {
		var length = getDuration(x);
		x.dataset.length = length;
        if(length < 240) {
            x.dataset.duration = 'short';
            x.classList.add('hidden','xv-shorts');
        }
		rank.push({
			index,
			length
		})
	});
}

function sortByTime() {
	var parent = document.querySelectorAll('#content div.mozaique, div.mozaique')[0];
	var videos = parent.querySelectorAll('div.thumb-block:not(.thumb-block-profile):not(.hidden)');
	var sorted = new DocumentFragment();
	var discard = new DocumentFragment();
	var rank = [];

	videos.forEach((x, index) => {
		var length = getDuration(x);
		x.dataset.length = length;
        if(length <= 300) {
            x.dataset.duration = 'short';
            x.classList.add('hidden','xv-shorts');
        }
		rank.push({
			index,
			length
		})
	});

	if(event.shiftKey){rank = rank.sort((a, b) => (a.length < b.length) ? -1 : 1);}
	else {rank = rank.sort((a, b) => (a.length < b.length) ? 1 : -1);}
	//rank = rank.sort((a, b) => (a.length < b.length) ? 1 : -1);
	rank.forEach(x => sorted.appendChild(videos[x.index]));
	parent.appendChild(sorted);
}

function sortByName() {
	var parent = document.querySelectorAll('#content div.mozaique, div.mozaique')[0];
	var videos = parent.querySelectorAll('div.thumb-block:not(.thumb-block-profile):not(.hidden)');
	var sorted = new DocumentFragment();
	var discard = new DocumentFragment();
	var rank = [];

	videos.forEach((x, index) => {
		var name = getName(x).toLowerCase();
		x.dataset.name = length;
		rank.push({
			index,
			name
		})
	});
	if(event.shiftKey){rank = rank.sort((a, b) => (a.name < b.name) ? 1 : -1);}
	else {rank = rank.sort((a, b) => (a.name < b.name) ? -1 : 1);}
	//rank = rank.sort((a, b) => (a.name > b.name) ? 1 : -1);
	rank.forEach(x => sorted.appendChild(videos[x.index]));
	parent.appendChild(sorted);
}

function addHiderButton() {
	var parent = document.querySelectorAll('#content div.mozaique, div.mozaique')[0];
	var videos = parent.querySelectorAll('div.thumb-block:not(.thumb-block-profile):not(.hidden)');

}

function countVids() {
	var parent = document.querySelectorAll('#content div.mozaique, div.mozaique')[0];
	var videos = parent.querySelectorAll('div.thumb-block:not(.thumb-block-profile):not(.hidden)');
	var watched = parent.querySelectorAll('div.thumb-block:not(.hidden) span.video-viewed');
	var hidden = parent.querySelectorAll('div.thumb-block:not(.thumb-block-profile):is(.hidden)');
	var count = videos.length;
	var text = `Currently showing ${videos.length} video(s).\n\nThere are ${watched.length} watched video(s) displayed and ${hidden.length} video(s) hidden.`;
	alert(text);
}

function prepButtons() {
	var pCheck = document.querySelectorAll('div#clear_wrapper');
	if(pCheck.length == 0) { setTimeout(prepButtons,100); return; }

	var e,i,t;
	var p = pCheck[0];

	e='button'; i=e+'_';
	var a_get = addElement(e,i+'get','Get',p);
	var a_set = addElement(e,i+'set','Set',p);
	var a_sort_time = addElement(e,i+'sort_time','Sort',p);
//	var a_sort_name = addElement(e,i+'sort_name','Sort (Name)',p);
	var a_count = addElement(e,i+'count','Count',p);
	var a_tags = addElement(e,i+'tags','Tags',p);
	var a_clean = addElement(e,i+'clean','Clean',p);
	var a_clear = addElement(e,i+'clear','MC',p);
	var a_hider = addElement(e,i+'hider','Hider',p);

	a_get.classList.add('sbh_a'); a_get.classList.add('sbh_get');
	a_set.classList.add('sbh_a'); a_set.classList.add('sbh_set');
	a_sort_time.classList.add('sbh_a'); a_sort_time.classList.add('sbh_sort_time');
//	a_sort_name.classList.add('sbh_a'); a_sort_name.classList.add('sbh_sort_name');
	a_count.classList.add('sbh_a'); a_count.classList.add('sbh_count');
	a_tags.classList.add('sbh_a'); a_tags.classList.add('sbh_tags'); a_tags.classList.add('hidden');
	a_clean.classList.add('sbh_a'); a_clear.classList.add('sbh_clean');
	a_clear.classList.add('sbh_a'); a_clear.classList.add('sbh_clear');
	a_hider.classList.add('sbh_a'); a_count.classList.add('sbh_hider');

	a_get.addEventListener('click',get);
	a_set.addEventListener('click',set);
	a_sort_time.addEventListener('click',sort);
//	a_sort_name.addEventListener('click',sortByName);
	a_count.addEventListener('click',countVids);
//	a_tags.addEventListener('click',countVids);
	a_clean.addEventListener('click',clean);
	a_clear.addEventListener('click',clear);
	a_hider.addEventListener('click',addHider);
}
prepButtons();


// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
//                                         HIDER VID BUTTON
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

function addHider() {
	var parent = document.querySelectorAll('#content div.mozaique, div.mozaique')[0];
	var videos = parent.querySelectorAll('div.thumb-block:not(.thumb-block-profile):not(.hidden)');
	var hbtnCss = '';
	hbtnCss += ' .hider-btn{position:absolute; right:20px; top:4px; box-sizing:border-box; background-color:#000009b0; font-size:20px; padding:0px 9px 0px 9px;';
    hbtnCss += ' border:1px solid #eeeeee50; border-radius:6px; opacity:0.0; transition:opacity 0.2s 0.2s ease-in-out, transform 0.2s 0.3s ease-in;}';
	hbtnCss += ' :is(.thumb-inside):hover .hider-btn:not(:hover){opacity: 0.6;}';
	hbtnCss += ' :is(.hider-btn):hover {opacity: 1.0;}';
	hbtnCss += ' :is(.thumb-inside):hover .hider-btn {transform:translate(-18px,0);}';
	hbtnCss = ' .hider-btn{position:absolute; right:50px; top:4px; box-sizing:border-box; background-color:#000009b0; font-size:20px; padding:0px 9px 0px 9px;';
    hbtnCss += ' border:1px solid #eeeeee50; border-radius:6px; opacity:0.6; transition:opacity 0.2s 0.2s ease-in-out, transform 0.2s 0.3s ease-in;}';
	hbtnCss += ' :is(.hider-btn):hover {opacity: 1.0;}';
	addCss(hbtnCss);
	videos.forEach((elem, index) => addHbtn(elem, index));
	var btnList = document.querySelectorAll('button.hider-btn');
	btnList.forEach(x => x.addEventListener('click',hideMe));
}

function addHbtn(vid,i) {
	var vidIn = vid.querySelector('.thumb-inside');
	var btnId = 'hider-btn-'+vid.id.replace(/\D/g,'');
	var hiderBtn = addElement('button',btnId,'×',vidIn,'',['hider-btn']);
}

function hideMe() {
	var btn = event.target;
	var thumb = btn.parentElement.parentElement;
	thumb.classList.add('hidden');
}

const ensureElem = (selector, limit) =>
	new Promise((resolve, reject) => {
	let count = 0;
	(function waitForFoo() {
		const element = document.querySelector(selector);
		if (element) return resolve(element);
		if (limit && count > limit) return false;
		count += 1;
		setTimeout(waitForFoo, 50);
	})();
});

async function launchAddHider() {
	var sel1 = '#content div.mozaique, div.mozaique';
    var sel2 = 'div.thumb-block:not(.thumb-block-profile):not(.hidden)';
	await ensureElem(sel1);
	await ensureElem(sel2);
	addHider();
//	setTimeout(addHider(),700);
};

launchAddHider();


// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
//                                         UNWATCH VID BUTTON
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

function addUnwatch() {
	var parent = document.querySelectorAll('#content div.mozaique, div.mozaique')[0];
	var videos = parent.querySelectorAll('div.thumb-block.viewed:not(.thumb-block-profile):not(.hidden)');
	var ubtnCss = '';
	ubtnCss += ' .unwatch-btn{position:absolute; top:20px; right:4px; box-sizing:border-box; background-color:#000009b0; font-size:20px; padding:0px 9px 0px 9px;';
    ubtnCss += ' border:1px solid #eeeeee50; border-radius:6px; opacity:0.0; transition:opacity 0.2s 0.2s ease-in-out, transform 0.2s 0.3s ease-in;}';
	ubtnCss += ' :is(.thumb-inside):hover .unwatch-btn:not(:hover){opacity: 0.6;}';
	ubtnCss += ' :is(.unwatch-btn):hover {opacity: 1.0;}';
	ubtnCss += ' :is(.thumb-inside):hover .unwatch-btn {transform:translate(0,18px);}';
	addCss(ubtnCss);
	videos.forEach((elem, index) => addUbtn(elem, index));
	var btnList = document.querySelectorAll('button.unwatch-btn');
	btnList.forEach(x => x.addEventListener('click',unwatchMe));
}

function addUbtn(vid,i) {
	var vidIn = vid.querySelector('.thumb-inside');
	var btnId = 'unwatch-btn-'+vid.id.replace(/\D/g,'');
	var unwatchBtn = addElement('button',btnId,'×',vidIn,'',['unwatch-btn']);
}

function unwatchMe() {
	var btn = event.target;
	var thumb = btn.parentElement.parentElement;
	var eye = thumb.querySelector('span.video-viewed');
	eye.remove();
	thumb.classList.remove('viewed');
	btn.remove();
}

async function launchUnwatcher() {
	var sel1 = '#content div.mozaique, div.mozaique';
    var sel2 = 'div.thumb-block.viewed:not(.thumb-block-profile):not(.hidden)';
	await ensureElem(sel1);
	await ensureElem(sel2);
	addUnwatch();
//	setTimeout(addUnwatch(),700);
};

launchUnwatcher();

// Arguments: selector / Limit until it stops
// Limit is optional, if empty it will check forever if element never pops up
// Limit 20 = 1 second checking

// Add query of element to detect
// We are using document.querySelector
// waitForFoo('.my-custom-selector');


/*

async function opener(i = 0) {
	var parent = document.querySelectorAll('#content div.mozaique, div.mozaique')[0];
	var videos = parent.querySelectorAll('div.thumb-block:not(.thumb-block-profile):not(.hidden)');
	var revlist = Array.from(videos).reverse();

	var limit = videos.length - 1;
	var vid = revlist[i];
	console.log(i+1,'/',limit+1);
	await linkClicker(vid);
	if(i < limit) { setTimeout(() => opener(i+1),1000) }
}

async function linkClicker(vid) {
	const dlSite = 'http://www.xvideos-downloader.net/?url='
	var links = vid.querySelectorAll(':is(.thumb,p) > a');
	links[1].href = `${dlSite}${encodeURIComponent(links[0].href)}`;
	links[0].target = '_blank'; links[1].target = '_blank';
	//links[1].click(); links[0].click();
	await openLink(links[1]);
	await openLink(links[0]);
	return new Promise (resolve => setTimeout(resolve,500));
}

function openLink(link){
	link.target = '_blank'; link.click();
//	console.log('Link:',link.href)
	return new Promise (resolve => setTimeout(resolve,800));
}

opener();

*/

})();
