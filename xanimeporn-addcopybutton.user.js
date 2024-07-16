// ==UserScript==
// @name         XAnime Copy Button
// @namespace    http://tampermonkey.net/
// @version      2024-07-16
// @description  try to take over the world!
// @author       You
// @match        https://www.xanimeporn.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=xanimeporn.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    function getTitle() {
      const title = document.querySelectorAll('h1[itemprop="name"] span')[0].innerText;
      return title.replace(/(.+ Episode \d+) .*/,"$1");
    }
    
    function copyText(inputString) {
    	var elem = document.createElement("textarea");
    	elem.value = inputString;
    	document.body.appendChild(elem);
    	elem.select();
    	document.execCommand("copy");
    	document.body.removeChild(elem);
    }
    
    function copyTitle() {
      const title = getTitle();
      copyText(title);
    }
    
    function addCopyButton() {
        // Create a new button element
        const button = document.createElement('button');
        
        // Set the button's id
        button.id = 'copytitle';
        
        // Set the button's text
        button.textContent = 'copy';
        
        // Set the button's style
        button.style.position = 'fixed';
        button.style.right = '20px';
        button.style.top = '30px';
        button.style.padding = '5px';
        
        // Set the button's onclick action
        button.onclick = function() {
            copyTitle();
        };
        
        // Append the button to the body (or any other desired parent element)
        document.body.appendChild(button);
    }
    
    // Call the function to add the button to the DOM
    addCopyButton();

})();