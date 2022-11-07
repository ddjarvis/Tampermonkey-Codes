// ==UserScript==
// @name         [XVDL] [XV] Relocate DL Box
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        http://www.xvideos-downloader.net/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=xvideos-downloader.net
// @grant        none
// @require      https://cdn.jsdelivr.net/gh/ddjarvis/JS-Snippets@getElement-1.1.0/js-functions/getElement.js
// ==/UserScript==

// @github	https://github.com/ddjarvis/Tampermonkey-Codes/blob/main/XV/%5BXVDL%5D%20%5BXV%5D%20Relocate%20DL%20Box.user.js

(function() {
    'use strict';

    // Your code here...

async function styleBox() {
	var sel_box = '.alert.alert-success';
	var sel_btn = '.alert.alert-success a.btn';

	await getElement(sel_box,'0');
	await getElement(sel_btn,'0');

	var dlBox = document.querySelector(sel_box);
	dlBox.style.position = 'fixed';
	dlBox.style.top = '40px';

	var dlBtn = document.querySelector(sel_btn);
	dlBtn.style.position = 'fixed';
	dlBtn.style.top = '55px';
	dlBtn.style.left = '60%';
}
styleBox();

})();
