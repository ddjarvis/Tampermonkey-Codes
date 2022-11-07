// ==UserScript==
// @name         [XV] Hide Watched
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.xvideos.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=xvideos.com
// @require      https://cdn.jsdelivr.net/gh/ddjarvis/JS-Snippets@addCode-1.0.2/js-functions/addCode.min.js
// @require      https://cdn.jsdelivr.net/gh/ddjarvis/JS-Snippets@addElement-1.3.0/js-functions/addElement.js
// @require      https://cdn.jsdelivr.net/gh/ddjarvis/JS-Snippets/js-functions/copyText.js
// @require      https://cdn.jsdelivr.net/gh/ddjarvis/JS-Snippets@master/js-functions/addCss.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
//    function addElement(e="",t="",d="",n="",o=""){t=t||"my"+e.charAt(0).toUpperCase()+e.substr(1).toLowerCase(),"-"==(d=d||"&nbsp;")&&(d=""),n=n||document.body;e=document.createElement(e);return e.id=t,e.appendChild(document.createTextNode(d)),o?n.insertBefore(e,o):n.appendChild(e),document.getElementById(t)}
//    function copyText(e){var o=document.createElement("textarea");o.value=e,document.body.appendChild(o),o.select(),document.execCommand("copy"),document.body.removeChild(o)}
//    function addCss(e=""){if(e){var d=document.createElement("style"),t="\n"+e+"\n";console.log(t);try{d.appendChild(document.createTextNode(t)),document.head.appendChild(d)}catch(e){d.text=t,document.head.appendChild(d)}}}

    // Your code here...
function tagWatched() {
	var watched_sel_arr = ['div.thumb-block:not(.hidden)','div.thumb-inside','span.video-viewed'];
	var watched_sel = watched_sel_arr.join(' > ');
	var watched_icon = document.querySelectorAll(watched_sel);
	watched_icon.forEach(x=>x.parentElement.parentElement.classList.add('hidden','xv-watched'));
}
function tagProfiles() {
	var target_sel = 'div.thumb-block-profile:not(.hidden)';
	var target_vids = document.querySelectorAll(target_sel);
	target_vids.forEach(x=>x.classList.add('hidden','xv-profile'));
}
function tagShorts() {
	var target_sel = 'div[data-duration="short"]:not(.hidden)';
	var target_vids = document.querySelectorAll(target_sel);
	target_vids.forEach(x=>x.classList.add('hidden','xv-shorts'));
}
function tagPremium() {
	var target_sel = 'div.thumb-block[class*="premium"]';
	var target_vids = document.querySelectorAll(target_sel);
	target_vids.forEach(x=>x.classList.add('hidden','xv-premium'));
}
function tagFresh() {
	var target_sel = 'div.thumb-block:not(.hidden)';
	var target_vids = document.querySelectorAll(target_sel);
	target_vids.forEach(x=>x.classList.add('xv-fresh'));
}
function tagElems() {
	tagWatched();
	tagProfiles();
	tagShorts();
	tagPremium();
	tagFresh();
}
function untagWatched() {
	var watched_sel = 'div.thumb-block.hidden.xv-watched';
	var watched_vids = document.querySelectorAll(watched_sel);
	watched_vids.forEach(x=>x.classList.remove('hidden'));
}
function hideFresh() {
	var target_sel = 'div.thumb-block.xv-fresh:not(.hidden)';
	var target_vids = document.querySelectorAll(target_sel);
	target_vids.forEach(x=>x.classList.add('hidden'));
}
function unhideFresh() {
	var target_sel = 'div.thumb-block.xv-fresh.hidden';
	var target_vids = document.querySelectorAll(target_sel);
	target_vids.forEach(x=>x.classList.remove('hidden'));
}

function actionButton() {
    var btnText;
    unhideFresh();
    tagElems();
    if      (event.shiftKey) { hideFresh(); untagWatched(); btnText = 'RevClear'; }
    else if (event.altKey)   { untagWatched(); btnText = 'MixClear'; }
    //else                     { btnText = 'Clear'; }
    event.target.innerText = btnText;
}

function injectFn() {
	codeInjector(tagWatched);
	codeInjector(tagProfiles);
	codeInjector(tagShorts);
	codeInjector(tagPremium);
	codeInjector(tagFresh);
	codeInjector(tagElems);
	codeInjector(untagWatched);
	codeInjector(hideFresh);
	codeInjector(unhideFresh);
}

function createButton() {
	// Unfinished
	var add_elem, add_id, add_txt, add_parent, add_bef;

	add_elem = 'div';
	add_id = 'clear_wrapper';
	add_txt = '-';
	add_parent = document.body;
	var add_wrapper = addElement(add_elem, add_id, add_txt, add_parent);

	add_elem = 'button';
	add_id = 'clear_btn';
	add_txt = 'Clear';
	add_parent = add_wrapper;
	var add_btn = addElement(add_elem, add_id, add_txt, add_parent);

	styleButton();

//	add_btn.style.position = 'fixed';
//	add_btn.style.top = '10px';
//	add_btn.style.right = '10px';
//	add_btn.style.backgroundColor = '#de2600';

	add_btn.addEventListener('click',actionButton);
}

function styleButton() {
	var css = `
	div#clear_wrapper {
		position: fixed;
		top: 10px;
		right: 15px;
		width: 40px;
        z-index: 9999;
	}

	div#clear_wrapper button {
		background-color: #de2600;
		margin-bottom: 5px;
	}
	`;
	addCss(css);
}

injectFn();
setTimeout(createButton,200);
})();
