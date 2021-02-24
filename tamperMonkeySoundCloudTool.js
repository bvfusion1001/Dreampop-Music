// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://soundcloud.com/kavekid
// @grant        none
// ==/UserScript==

(function() {
  'use strict';

  function addStylesToPage() {
      var css = `
table.dreampop-helper { width: 100%; }
table.dreampop-helper td {
  padding: 20px 0px 5px 0px;
}
table.dreampop-helper input,
table.dreampop-helper textarea {
  width: 95%;
  border: 1px solid black;
  border-radius: 5px;
  padding: 5px;
}
table.dreampop-helper button {
  padding: 4px 7px;
  background: #00000052;
  border: 1px solid black;
  border-radius: 5px;
}
`,
          head = document.head || document.getElementsByTagName('head')[0],
          style = document.createElement('style');

      head.appendChild(style);

      style.type = 'text/css';
      if (style.styleSheet){
          // This is required for IE8 and below.
          style.styleSheet.cssText = css;
      } else {
          style.appendChild(document.createTextNode(css));
      }
  }

  function addCardToPage(element) {
      document.body.prepend(element);
  }

  function copyToClipboard(inputId) {
      /* Get the text field */
      var copyText = document.getElementById(inputId);
      /* Select the text field */
      copyText.select();
      copyText.setSelectionRange(0, 99999); /* For mobile devices */
      /* Copy the text inside the text field */
      document.execCommand("copy");
      alert("Copied the text: " + copyText.value);
  }

  function createElements(data) {
      // Container
      var div = document.createElement("div");
      div.style.zIndex = "100"
      div.style.position = "fixed";
      div.style.padding = "10px";
      div.style.right = "12px";
      div.style.bottom = "60px";

      div.style.width = "350px";
      div.style.background = "#1d1d1d8f";
      div.style.borderRadius = "5px";
      div.style.border = "1px solid black";
      div.style.color = "white";
      div.innerHTML = `<table class="dreampop-helper">
<tr>
<td colspan="2" style="font-size: 12pt;font-weight: bold;text-align: center;padding: 0;">Dreampop Music</td>
</tr><tr>
<td><button onClick="copyToClipboard('songLink');">📋</button></td>
<td><div style="position: relative"><label style="position: absolute;top: -20px;" for="songLink">Song Link</label><input id="songLink" value="${data.songLink}"/></div></td>
</tr><tr>
<td><button onClick="copyToClipboard('artistLink');">📋</button></td>
<td><div style="position: relative"><label style="position: absolute;top: -20px;" for="artistLink">Artist Link</label><input id="artistLink" value="${data.artistLink}"/></div></td>
</tr><tr>
<td><button onClick="copyToClipboard('tags');">📋</button></td>
<td><div style="position: relative"><label style="position: absolute;top: -20px;" for="tags">Tags</label><input id="tags" value="${data.tags}"/></div></td>
</tr><tr>
<td><button onClick="copyToClipboard('description');">📋</button></td>
<td><div style="position: relative"><label style="position: absolute;top: -20px;" for="description">Description</label><textarea id="description">${data.description}</textarea></div></td>
</tr></table>`;

      return div;
  }

  function scrapeData() {
      console.log('tamper');

      // Get Song Link
      let songLink = window.location.origin + window.location.pathname;

      // Get Artist Link
      let artistLink = songLink.substring(0, songLink.lastIndexOf('/'))

      // Get Tags
      let tagStrings = [];
      let tagsNodes = document.querySelector('div.soundTags div.sc-tag-group').children;
      for (let i = 0; i < tagsNodes.length; i++) {
          tagStrings.push(tagsNodes[i].firstChild.textContent);
      }
      let tags = tagStrings.join(',');

      // Get Description
      let artist = document.querySelector('a.soundTitle__username').textContent.trim();
      let song = document.querySelector('span.soundTitle__title').textContent.split('|')[0].trim();
      let description = `${artist} - ${song}
${songLink}

Dream Pop, Lo-fi Indie, and Bedroom Pop for when you're ready to drift away.

Thanks for vibing! If you enjoyed, make sure to Subscribe and check out the original creator.

Use these links in your description:
• ${artistLink}
• UNIQUE_YOUTUBE_VIDEO_LINK_HERE

©We don't posses any copyright rights. To use these tracks on your video, ask the rightful artists listed above.

#dreampop #lofi #bedroompop`

      return {songLink, artistLink, tags, description};
  }

  function run() {
      addStylesToPage();

      let data = scrapeData();
      let element = createElements(data);
      addCardToPage(element);

      document.copyToClipboard = copyToClipboard;
  }

  // Run after page loads
  setTimeout(run, 1000);

})();