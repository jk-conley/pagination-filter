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

//console.log(howManyPages(studentListItems) + " pages");

const createPaginationSection = () => {

  $(pageDiv).append($div);
  $($div).append($ul);

}

createPaginationSection();

/*========================
Create page links
========================*/

const createPageLinks = () => {
  // set pages needed
  let pages = howManyPages(studentListItems);
  console.log(pages + " in create function");

  // set vars to create page links needed
  let myLis = "";
  let count = 0;

  // create links for each page needed
  for (let i = 0; i < pages; i++) {
    count++;
    myLis += `<li><a href="#">${count}</a></li>`;
  }

  return myLis;
}

$($ul).append(createPageLinks());

/*========================
Remove page links
========================*/

const removePageLinks = () => {
  $('.pagination li').remove();
}

removePageLinks();