// ==UserScript==
// @name         [XV] Downloader
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.xvideos.com/video*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=xvideos.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    function addElement(e="",t="",d="",n="",o=""){t=t||"my"+e.charAt(0).toUpperCase()+e.substr(1).toLowerCase(),"-"==(d=d||"&nbsp;")&&(d=""),n=n||document.body;e=document.createElement(e);return e.id=t,e.appendChild(document.createTextNode(d)),o?n.insertBefore(e,o):n.appendChild(e),document.getElementById(t)}
    function copyText(e){var o=document.createElement("textarea");o.value=e,document.body.appendChild(o),o.select(),document.execCommand("copy"),document.body.removeChild(o)}

    // Your code here...

function getLink() {
	var video_url = document.URL;
	var dllink_base = 'http://www.xvideos-downloader.net/?url=';
	var dllink_query = encodeURIComponent(video_url);
	var dllink = dllink_base + dllink_query;
	return dllink;
}

function getLinkAlt() {
	var video_url = document.URL;
	var dllink_base = 'https://dirpy.com/studio?url=';
	var dllink_query = encodeURIComponent(video_url);
	var dllink = dllink_base + dllink_query;
	return dllink;
}

function toggleLink() {
    if(event.shiftKey || event.altKey) {
        var oldLink = document.getElementById('dload-btn').href;
        var videoLink = getLinkAlt();
        document.getElementById('dload-btn').href = videoLink;
        document.getElementById('dload-btn').click();
        setTimeout(()=>document.getElementById('dload-btn').href = oldLink, 1000);
    }
}

function createButton() {
    var before = document.querySelector('.header-icons');
    var parent = before.parentElement;
    var btn_a = addElement('a','dload-btn','-',parent,before);
    var btn = addElement('button','dload-btn-elem','Download',btn_a);
    var link = getLink();
	btn.style.position = 'relative';
	btn.style.left = '70px';
//	btn.style.top = '0px';
	btn.style.cursor = 'pointer';
    btn.style.backgroundColor = '#67140C';
    btn.style.borderRadius = '7px';
    btn.style.transition = 'all 0.5s';
    btn.style.zIndex = '99999';
    btn_a.target = '_blank';

/* DL TYPE 1 */
//    btn_a.href = link;

/* DL TYPE 2 */
    btn_a.href = link;
    btn.addEventListener('click', toggleLink);
}

function main() {
	setTimeout(createButton, 1000);
}

main();
})();
