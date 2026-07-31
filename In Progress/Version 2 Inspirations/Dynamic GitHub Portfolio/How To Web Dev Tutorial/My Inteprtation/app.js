/*
-----------------------------------------------------
Project:
Dynamic GitHub Portfolio

Purpose:
Retrieve my public GitHub repositories and
display them dynamically within my portfolio.

Tutorial:
https://www.youtube.com/watch?v=GnFH9Eg-OuM&list=PL4FL-XepWXttYviyLh0yEiNOhAj_qCYs4&index=2

Personal Modifications:
- Corrected GitHub API endpoint.
- Improved comments.
- Added error handling explanation.
- Documented DOM interaction.
-----------------------------------------------------
*/

/*Drop down menu */
const menu = document.querySelector('#menu');
const nav = document.querySelector('.links');
menu.onclick = () => {
  menu.classList.toggle('bx-x');
  nav.classList.toggle('active');
} 

/*Drop down menu */