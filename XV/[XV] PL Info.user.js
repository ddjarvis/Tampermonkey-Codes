// ==UserScript==
// @name         [XV] PL Info
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.xvideos.com/favorite/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=xvideos.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    function addElement(e="",t="",d="",n="",o=""){t=t||"my"+e.charAt(0).toUpperCase()+e.substr(1).toLowerCase(),"-"==(d=d||"&nbsp;")&&(d=""),n=n||document.body;e=document.createElement(e);return e.id=t,e.appendChild(document.createTextNode(d)),o?n.insertBefore(e,o):n.appendChild(e),document.getElementById(t)}
    function copyText(e){var o=document.createElement("textarea");o.value=e,document.body.appendChild(o),o.select(),document.execCommand("copy"),document.body.removeChild(o)}

    // Your code here...
    main();

function main() {
    createButton()
}

function createButton() {
    var cont = document.querySelectorAll('div#clear_wrapper');
    if(cont.length < 1){ setTimeout(createButton,250); return; }

    var btn_elem, btn_id, btn_txt, btn_parent, btn_bef;

	btn_elem = 'button';
	btn_id = 'btn_plinfo';
	btn_txt = 'PL Info';
	btn_parent = cont[0];
	var btn_plinfo = addElement(btn_elem, btn_id, btn_txt, btn_parent);
    btn_plinfo.addEventListener('click',getInfo);
}

function getInfo() {
	var pl_name = document.querySelector('span.text-danger').innerText;
	var pl_uploader = document.querySelector('small a.uploader-tag span.name').innerText;
	var pl_id = document.URL.match(/(?<=favorite\/)\d+/)[0];
	var pl_info = `PL-${pl_id} -- ${pl_name} by ${pl_uploader}`;
	copyText(pl_info);
}
})();
