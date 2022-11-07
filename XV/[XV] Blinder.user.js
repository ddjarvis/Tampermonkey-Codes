// ==UserScript==
// @name         [XV] Blinder
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.xvideos.com/video*
// @icon         https://www.google.com/s2/favicons?domain=xvideos.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
//document.querySelectorAll('#related-videos div.thumb')

setTimeout(initialPass,1000);
setTimeout(initialize,3000);



function initialize () {
    initialPass();
//    createButton();
    setTimeout(createButton,300);

}


function initialPass() {
    var thumb, thumbs = document.querySelectorAll('#related-videos div.thumb-block');
    for (thumb of thumbs) {
        thumb.style.display = 'none';
        thumb.classList.add('thumb-blinder');
    }
}

function createButton () {

    // Create DOM Structure
//	var navBar = document.querySelector('nav.main_nav_2 > ul');
    var before = (document.querySelectorAll('#title-btn').length > 0) ? document.querySelector('#title-btn')
    : (document.querySelectorAll('#dload-btn').length > 0) ? document.querySelector('#dload-btn')
    : document.querySelector('.header-icons');
    var parent = before.parentElement;
    var btn = addElem('button','blinder-btn','Blinder: On',parent,before);

//	var blinderLi = addElem('li','blinder-li','-',navBar);
//	blinderLi.classList.add('bl');

//	var blinderA = addElem('a','blinder-a','-',blinderLi);

//	var blinderLabel = addElem('span','blinder-label','Blinder:',blinderA);
//	var blinderStatus = addElem('span','blinder-status','On',blinderA);


    // Style Button
	btn.style.position = 'relative';
	btn.style.left = '50px';
//	btn.style.top = '0px';
	btn.style.cursor = 'pointer';
    btn.style.backgroundColor = '#67140C';
    btn.style.borderRadius = '7px';
    btn.style.transition = 'all 0.5s';
//	btn.style.display = 'none';
//    blinderLi.style.
//    blinderLabel.style.marginRight = '10px';
//    setTimeout(function(){btn.style.display = '';},1500)


    // Add Code
//    blinderA.addEventListener('click',toggleBlinder);
    btn.addEventListener('click',toggleBlinder);
}

function showMore() {
	var state = document.getElementById('blinder-btn').innerText;
//	if(state == "Blinder: On") {console.log('x1');}
	if(state == "Blinder: On") {return -1;}

	var btn_showMore = document.querySelectorAll('a.btn.show-more');
//	if (!btn_showMore.length > 0) {console.log('x2');}
	if(btn_showMore.length <= 0) {return -1;}
	console.log('btn_showMore.length!');

	var btn_showMore_style = window.getComputedStyle(btn_showMore[0]);
	var btn_showMore_display = btn_showMore_style.getPropertyValue('display');
//	if (btn_showMore_display == "none") {console.log('x3');}
	if (btn_showMore_display == "none") {return -1;}

	btn_showMore[0].click();
	console.log('Show more!');
	setTimeout(showMore, 200);
}

function toggleBlinder () {
	var state = document.getElementById('blinder-btn').innerText;
	var tClass = 'thumb-blinder', thumbs = document.getElementsByClassName(tClass), thumb;
	var display;

	switch (state) {
		case 'Blinder: On':
			document.getElementById('blinder-btn').innerText = 'Blinder: Off';
			display = '';
			break;
		case 'Blinder: Off':
			document.getElementById('blinder-btn').innerText = 'Blinder: On';
			display = 'none';
			break;
	}

	for (thumb of thumbs) {
		thumb.style.display = display;
	}
	showMore();
}



function addElem(elemType='', elemId='', elemText='', parentElem='', beforeElem='') {
	if (!elemId){elemId = 'my' + elemType.charAt(0).toUpperCase() + elemType.substr(1).toLowerCase();}
	if (!elemText){elemText = '&nbsp;';}
	if (elemText=="-"){elemText = '';}

	if (!parentElem) {parent.Elem = 'document.body'}

	var elem = document.createElement(elemType);
	elem.id = elemId;

	var txt = elemText;

	elem.appendChild(document.createTextNode(txt));
	if (!beforeElem) {
		parentElem.appendChild(elem);
	} else {
		parentElem.insertBefore(elem, beforeElem)
	}
    return document.getElementById(elemId);
}

})();
