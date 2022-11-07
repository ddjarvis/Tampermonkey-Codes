// ==UserScript==
// @name         [XV] Tab Opener
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.xvideos.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=xvideos.com
// @grant        none
// @require      https://cdn.jsdelivr.net/gh/ddjarvis/JS-Snippets@addElement-1.3.0/js-functions/addElement.js
// @require      https://cdn.jsdelivr.net/gh/ddjarvis/JS-Snippets@addCss-1.0.1/js-functions/addCss.js
// @require      https://cdn.jsdelivr.net/gh/ddjarvis/JS-Snippets@copyText-1.0.0/js-functions/copyText.js
// @require      https://cdn.jsdelivr.net/gh/ddjarvis/JS-Snippets@addCode-1.0.2/js-functions/addCode.js
// ==/UserScript==

// @github	https://github.com/ddjarvis/Tampermonkey-Codes/blob/main/XV/%5BXV%5D%20Tab%20Opener.user.js

(function() {
    'use strict';

    // Your code here...
function tmBtnAdd() {
	const dBody = document.body;
	const tmBox = addElement('div','tm-box','-',dBody,'',['container']);
	const tmBtn = addElement('button','tm-button','-',tmBox);
	const tmIco = addElement('img','tm-ico','-',tmBtn);

	tmBtn.addEventListener('click',copy_openerCode);
	//tmBtn.href = 'moz-extension://d8c0fe1d-277f-44b0-b287-2b084817f7d3/options.html#nav=d88a3b36-9a32-45c5-b2d7-352ec17a8cf3+editor';

	//tmIco.src = "https://www.google.com/s2/favicons?sz=64&domain=tampermonkey.net";
}

function tmBtnStyle() {
	const css = tmBtnCss();
	addCss(css);
}

function tmBtnCss() {
return `
#tm-box {
background-color: #cccccca0;
min-width: 1px;
min-height: 1px;
display: inline-block;
position: absolute;
top: 10px;
left: 10px;
aspect-ratio: 1/1;
height: 32px;
width: 32px;
padding: 0px;
border-radius: 7px;
transition: background 0.4s, box-shadow 0.3s;
}

#tm-box:hover {
background-color: #ccccccff;
box-shadow: 0 0 5px 0 white;
}

#tm-ico {
aspect-ratio: 1/1;
height: 32px;
width: 32px;
}

#tm-button {
cursor: pointer;
background-color: #353535;
border-radius: 5px;
box-shadow: 0 0 5px 2px black;
}
`;
}

tmBtnStyle();
tmBtnAdd();

function vidInfo(elem, attrib, sel, i=0) {
    var target;
    if (sel) {
        target = elem.querySelectorAll(sel)[i];
    }
    else {
        target = elem;
    }
    return (attrib) ? (target.getAttribute(attrib)) : (target);
}

function vidOpen(vidArr, voTimeout=1500) {
    if(vidArr.length == 0){ return; }
    var vid = vidArr.pop();
    console.log('Opening video...     (Remaining: ' + vidArr.length + ')');
    vid.target = '_blank';
    vid.click();
    setTimeout(()=>vidOpen(vidArr),voTimeout+300);
}

function vidCount() {
	var parent = document.querySelectorAll('#content div.mozaique, div.mozaique')[0];
	var videos = parent.querySelectorAll('div.thumb-block:not(.thumb-block-profile):not(.hidden)');
	var video_arr = Array.from(videos).map(x=>vidInfo(x,'','a'));
    console.log('Vid Count: ' + video_arr.length);
}

function openVids(limit=0, offset=0) {
	var parent = document.querySelectorAll('#content div.mozaique, div.mozaique')[0];
	var videos = parent.querySelectorAll('div.thumb-block:not(.thumb-block-profile):not(.hidden)');
	var video_arr = Array.from(videos).map(x=>vidInfo(x,'','a'));

	if(limit==0){limit = video_arr.length - offset;}

	var p_id, v_id, v_len;
	//var vids = video_arr.reverse().filter((x,y)=>y>=offset&&y<(offset+limit)).reverse().map(x=>x);
	var vids = video_arr.filter((x,y)=>y>=offset&&y<(offset+limit)).reverse().map(x=>x);
	var textTime = vids.length * 750;
    var textOffset = `\nLimit: ${limit}\tOffset: ${offset}\nNext Offset: ${limit+offset}\n`;

	setTimeout(()=>vidOpen(vids),500);
    setTimeout(()=>console.log(textOffset),textTime);
    console.log('Total Video Count: ',video_arr.length);
}

function get_openerCode() {
    var codes = '';
    codes += vidInfo+'\n';
    codes += vidOpen+'\n';
    codes += vidCount+'\n';
    codes += openVids+'\n';
    return codes;
}

function inject_openerCode() {
    var openerCode = get_openerCode();
    addCode(openerCode);
}

function copy_openerCode() {
    copyText('openVids();');
}

inject_openerCode();

})();
