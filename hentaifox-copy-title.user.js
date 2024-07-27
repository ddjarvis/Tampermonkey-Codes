// ==UserScript==
// @name         [HentaiFox] Copy Video Title
// @namespace    http://tampermonkey.net/
// @version      0.0.3
// @description  try to take over the world!
// @author       ddjarvis
// @match        https://hentaifox.tv/video/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=hentaifox.tv
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    function copyText(inputString) {
    	var elem = document.createElement("textarea");
    	elem.value = inputString;
    	document.body.appendChild(elem);
    	elem.select();
    	document.execCommand("copy");
    	document.body.removeChild(elem);
    }
    function fileSafe(input) {
    	var proc = input, output;
    	proc = proc.replace(/[^\p{L}\p{N}\p{P}\p{Z}]/gu, '');
    	proc = proc.replace(/( +<+ +(?!.*>))|((?<!<.*) +>+ +)|(( *:+ +)|( +:+ *)|( *:+ *))/g," - ");
    	proc = proc.replace(/([?*"]+)/g,"");
    	proc = proc.replace(/(<+(?!.*>))|((?<!<.*)>+)|((?<!<.*)(?<=>.*)>)|([\/\\|]+)|(:+)/g," ");
    	proc = proc.replace(/</g,"(").replace(/>/g,")");
    	proc = proc.replace(/( {2,})/g," ").replaceAll('`',"'");
    	output = proc.trim();
    	return output;
    }
    function getTitle() {
      const titleElem = document.querySelector('h1.video_title')
      return titleElem.innerText.trim();
    }
    function parseTitle(input) {
      let title = input.replace(/^(.+?)(?:(?: --)? E[Pp].*)? (\d+)$/,'$1 -- Episode $2');
      return title;
    }
    function copyTitle() {
      let title = getTitle();
      title = fileSafe(title);
      title = parseTitle(title);
      copyText(title);
    }
    function buttonText() {
      const btn = document.querySelector('#btn_copy');
      btn.innerText = 'Copied';
      setTimeout(() => btn.innerText = 'Copy', 1200);
    }
    function addButton() {
      const parent = document.querySelector('div.buttons');
      const button = document.createElement('button');
      button.id = "btn_copy";
      // button.className = 'button_item nl_button tt';
      button.className = 'button_item';
      button.textContent = 'Copy';
      button.onclick = function() {
        copyTitle();
        buttonText();
      }
      parent.appendChild(button);
    }
    addButton();
})();