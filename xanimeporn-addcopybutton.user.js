// ==UserScript==
// @name         XAnime Copy Button
// @namespace    http://tampermonkey.net/
// @version      1.2.0
// @description  try to take over the world!
// @author       ddjrvs
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
    
    function clickDownload() {
      document.querySelector('div.su-tabs-nav span:nth-child(3)').click();
    }
    
    function scrollDown() {
      window.scrollBy({
        top: 500,
        behavior: 'smooth'
      });
    }
    
    function fn_copyButton() {
      clickDownload();
      setTimeout(scrollDown, 1000);
      setTimeout(copyTitle, 1500);
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
            fn_copyButton();
        };
        
        // Append the button to the body (or any other desired parent element)
        document.body.appendChild(button);
    }
    
    // Call the function to add the button to the DOM
    addCopyButton();

})();