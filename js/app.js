/*===============================
VARIABLES
===============================*/
// Selecting current elements
const studentListItems = $('.student-item');
const pageDiv = $('.page');

// Creating elements to be added dynamically
const $div = $('<div class="pagination"></div>'),
  $ul = $('<ul></ul>');



/*===============================
FUNCTIONS
===============================*/

/*===================================
Determine how many pages are needed
===================================*/

const howManyPages = (list) => {
  // get length of list
  let listLength = list.length;
  // initialize page count
  let pages = 0;
  // determine page value
  for (let i = listLength; i > 0; i--) {
    if (i >= 10) {
      pages++;
    }
  }

  pages = Math.ceil(pages / 10);

  return pages;
}

console.log(howManyPages(studentListItems) + " pages");

/*========================
Create page links
========================*/

const createPageLink = () => {
  // set pages needed
  let pages = howManyPages(studentListItems);
  console.log(pages + " in create function");


  // create pagination div and ul
  $(pageDiv).append($div);
  $($div).append($ul);
  let myLis = "";
  let count = 0;

  // create links for each page needed
  for (let i = 0; i < pages; i++) {
    count++;
    myLis += `<li><a href="#">${count}</a></li>`;
  }

  $($ul).append(myLis);

}

createPageLink();