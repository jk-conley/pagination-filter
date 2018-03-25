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

  // total number of links or pages needed for list
  pages = Math.ceil(listLength / 10);

  return pages;
}

/*===================================
Create page link section
===================================*/

const createPaginationSection = () => {
  // link up div and ul to prep for lis
  $(pageDiv).append($div);
  $($div).append($ul);

}

/*========================
Create page links
========================*/

const createPageLinks = () => {
  // set pages needed
  let pages = howManyPages(studentListItems);

  // set vars to create page links needed
  let myLis = "";
  let count = 0;

  // create links for each page needed
  for (let i = 0; i < pages; i++) {
    count++;
    myLis += `<li><a href="#${count}">${count}</a></li>`;
  }

  return myLis;
}

/*========================
Remove page links
========================*/

const removePageLinks = () => {
  $('.pagination li').remove();
}

/*========================
Show page
========================*/

const showPage = (link, studentList) => {

  // hide all students on page
  $(studentList).hide();

  // Variables used to check page and students appearing on page
  const page = parseInt(link);
  let totalItems = studentList.length;
  let end;
  let start;
  let temp;

  // loop thru student list to give 10 per page
  for (let i = 0; i < totalItems; i++) {
    if (page === 1) {
      start = 0;
      end = 10;
      temp = $(studentList).slice(start, end);
      $(temp).eq(i).show();
    } else if (page !== 1) {
      end = page * 10;
      start = end - 10;
      temp = $(studentList).slice(start, end);
      $(temp).eq(i).show();
    }
  }

}

/*========================
Append page links
========================*/

const appendPageLinks = (studentList) => {

  // determine how many pages
  const pages = howManyPages(studentListItems);

  // create page link section
  createPaginationSection();

  // create page links
  const links = createPageLinks();

  // remove old page links
  removePageLinks();

  // append new page links
  $($ul).append(links);

  // Initialize page
  showPage(1, studentListItems);
  $('.pagination a[href="#1"]').addClass('active');

  // define what happens when user clicks link
  $('.pagination').on('click', 'a', function (event) {
    // use showPage function to display the page for link clicked
    showPage($(event.target).text(), studentList);

    // mark link as "active"
    $('a').not(event.target).removeClass('active');
    $(event.target).addClass('active');
  });


}

appendPageLinks(studentListItems);