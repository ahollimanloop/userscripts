// ==UserScript==
// @name         Dealership Amenities
// @namespace    localhost
// @version      1.1
// @description  Adds a link button to master amenities
// @author       Austin Holliman (aholliman@autoloop.com)
// @match        https://autoloop.us/DMS/App/DealershipSettings/DealershipAmenities.aspx
// @grant        none
// ==/UserScript==

$('#MainContent > div.container_24.clearfix > h1').append(
    '<a class="float_right" href="https://autoloop.us/DMS/App/GlobalSettings/MasterAmenities.aspx" target="_blank"><button type="button">View Master Amenities</button></a>');
