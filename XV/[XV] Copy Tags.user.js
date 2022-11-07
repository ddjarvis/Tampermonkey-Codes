// ==UserScript==
// @name         [XV] Copy Tags
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.xvideos.com/tags
// @include      /^https?:\/\/(\w+\.)?xvideos\.com\/tags\/(\d{2}|\w)$/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=xvideos.com
// @require      https://cdn.jsdelivr.net/gh/ddjarvis/JS-Snippets/js-functions/addCss.min.js
// @require      https://cdn.jsdelivr.net/gh/ddjarvis/JS-Snippets@addElement-1.3.0/js-functions/addElement.min.js
// @require      https://cdn.jsdelivr.net/gh/ddjarvis/JS-Snippets/js-functions/copyText.min.js
// @grant        none
// ==/UserScript==

// @github	https://github.com/ddjarvis/Tampermonkey-Codes/blob/main/XV/%5BXV%5D%20Copy%20Tags.user.js

(function() {
    'use strict';

/*
var tag_pages = document.querySelectorAll('.stripe.black-stripe:last-of-type :is(strong:last-of-type, a)');
console.log(tag_pages);
*/

function zpad(x) { return '00'.concat(x).slice(-2); }
function getTimestamp() {
	const x = new Date();
	const y = x.getFullYear();
	const m = zpad(x.getMonth()+1);
	const d = zpad(x.getDate());
	const hh = zpad(x.getHours());
	const mm = zpad(x.getMinutes());
	const ss = zpad(x.getSeconds());
	return `${y}-${m}-${d} ${hh}:${mm}:${ss}`;
}

//getTimestamp();



//document.querySelectorAll('div.stripe.black-stripe :is(strong:last-of-type + a)')[0]
    // Your code here...
function getList() {
	var x, tags = [], tagList = Array.from(document.querySelectorAll('ul#tags > li'));
	var name, count, link, list;
	tagList.forEach(x => {
		name = x?.querySelector('b')?.innerText;
		count = x?.querySelector('span')?.innerText;
		link = x?.querySelector('a')?.href;
		tags.push({name, count, link});
	});
	list = tags.map((x,y)=>[y+1,x.name, x.name.replaceAll('-',' '), x.count.replaceAll(',',''), x.link].join('\t'));
	return {
		obj: JSON.stringify(tags),
		items: list.join('\n'),
		count: list.length
	};
}
function copyList() {
	var list = getList();
	console.log(list.items);
	if(event.altKey) { copyText(list.obj); }
	else if(!event.altKey) { copyText(list.items); }
	//copyText(list.items);
	alert(`Copied ${list.count} tags!\n\n(Click okay to close tab)`);
	window.close();
}
function createButton() {
	var cw = document.querySelectorAll('#clear_wrapper');
	if(cw.length == 0) { setTimeout(createButton, 150); return; }

	var add_btn = addElement('button', 'btn_copyTags', 'Copy Tags', cw[0]);
	add_btn.addEventListener('click', copyList);
}
createButton();

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

var borderCss = `.tags-list li {
	padding: 10px 0px 10px 0px;
	border-bottom: 1px solid #ffffff63;
}`;
addCss(borderCss);


})();
