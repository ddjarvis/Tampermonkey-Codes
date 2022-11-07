// ==UserScript==
// @name         [XV] Add To Playlist
// @namespace    http://tampermonkey.net/
// @version      0.0
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
// @require      https://cdn.jsdelivr.net/gh/ddjarvis/JS-Snippets@getElement-1.1.0/js-functions/getElement.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
var targetid = '88582411';
var videoid = '3453155';

function amOpen(vidid) {
	var vSel = '[data-id="'+vidid+'"]';
	var vElem = document.querySelector(vSel);
	var vAmBtn = vElem.querySelector('button.action-menu');
	var vActionMenu = vElem.querySelector('button.action-menu');
	var vAmOpen = amCheck(vActionMenu);

	if (!vAmOpen) { vAmBtn.click(); }
}

function amCheck(elem) {
	var disp = getDisplay(elem);
	return (disp == 'none' ? false : true);
}

//document.querySelectorAll('div.tb-menu')

//xv.thumbs.prepareVideo(7415383);
//amOpen(videoid);
//plAdd(targetid);

//document.querySelectorAll('#favlist_88582411 div.pl-add-remove')[0].click();

function plAdd(listid) {
	var tSel = '#favlist_'+listid;
	var tBtn = document.querySelector(tSel+' div.pl-add-remove');
	var tChk = plCheck(listid);
	if (!tChk) { tBtn.click(); }
}

function plRem(listid) {
	var tSel = '#favlist_'+listid;
	var tBtn = document.querySelector(tSel+' div.pl-add-remove');
	var tChk = plCheck(listid);
	if (tChk) { tBtn.click(); }
}

function plCheck(listid) {
	var tCheckParent = document.querySelector('#favlist_'+listid)
	var tCheckElem = tCheckParent.querySelector('.in-fav-indic');
	var tCheckStyle = window.getComputedStyle(tCheckElem);
	var tCheckVal = getDisplay(tCheckElem);
	var tCheck = tCheckVal == 'none' ? false : true;
	return tCheck;
}

function getDisplay(elem) {
	return window.getComputedStyle(elem).getPropertyValue('display');
}



/* =-=-=-=-=-=-=-= OPENER =-=-=-=-=-=-=-= */
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

function vidOpen(vidArr, voTimeout=1200) {
    if(vidArr.length == 0){ return; }
    var vid = vidArr.pop();
    console.log('Opening video...     (Remaining: ' + vidArr.length + ')');
    vid.target = '_blank';
    vid.click();
    setTimeout(()=>vidOpen(vidArr),voTimeout+100);
}

function vidCount() {
	var parent = document.querySelectorAll('#content div.mozaique, div.mozaique')[0];
	var videos = parent.querySelectorAll('div.thumb-block:not(.thumb-block-profile):not(.hidden)');
	var video_arr = Array.from(videos).map(x=>vidInfo(x,'','a'));
    console.log(`Vid Count: ${video_arr.length}`);
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
openVids();



})();
