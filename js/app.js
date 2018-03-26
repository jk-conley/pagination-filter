/*===============================
VARIABLES
===============================*/
// Selecting current elements
const studentListItems = $('.student-item');
const pageDiv = $('.page');
const pageHeaderDiv = $('.page-header');

// Creating elements to be added dynamically
const $div = $('<div class="pagination"></div>'),
  $ul = $('<ul></ul>'),
  $searchDiv = $('<div class="student-search"></div>'),
  $searchInput = $('<input placeholder="Search for students...">'),
  $searchBtn = $('<button>Search</button>');



/*===============================
***** PAGINATION FUNCTIONS *****
===============================*/

/*===================================
Determine how many pages are needed
===================================*/

const howManyPages = (list) => {

  // get length of list
  const listLength = list.length;

  // total number of links or pages needed for list
  const pages = Math.ceil(listLength / 10);

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

const createPageLinks = (list) => {
  // set pages needed
  const pages = howManyPages(list);

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

const showPage = (link, list) => {

  // hide all students on page
  $(list).hide();

  // Variables used to check page and students appearing on page
  const page = parseInt(link);
  const totalItems = list.length;
  let end;
  let start;
  let temp;

  // loop thru student list to give 10 per page
  for (let i = 0; i < totalItems; i++) {
    if (page !== undefined && page !== null) {
      end = page * 10;
      start = end - 10;
      temp = $(list).slice(start, end);
      $(temp).eq(i).show();
    }
  }

}

/*========================
Append page links
========================*/

const appendPageLinks = (list) => {

  console.log(list.length + " initial list");


  // create page link section
  createPaginationSection();

  // create page links
  const links = createPageLinks(list);

  // remove old page links
  removePageLinks();

  // append new page links
  $($ul).append(links);

  // Initialize page
  showPage(1, list);
  $('.pagination a[href="#1"]').addClass('active');

  // define what happens when user clicks link
  $('.pagination').on('click', 'a', function (event) {

    console.log(list.length + " clicking a link");

    // use showPage function to display the page for link clicked
    showPage($(event.target).text(), list);

    // mark link as "active"
    $('a').not(event.target).removeClass('active');
    $(event.target).addClass('active');
  });


}

/*===============================
***** SEARCH FUNCTIONS *****
===============================*/

/*===============================
Create search section
===============================*/

const createSearchSection = () => {

  // Builds the search section
  $(pageHeaderDiv).append($searchDiv);
  $($searchDiv).append($searchInput);
  $($searchDiv).append($searchBtn);

}

/*===============================
Does student match name or email
===============================*/

const doesStudentMatch = (search, list) => {

  let temp;

  for (let i = 0; i < list.length; i++) {

    // get name and email
    let name = $('.student-item h3').eq(i).text();
    let email = $('.student-item span.email').eq(i).text();

    // compare search to name and email, if either match create list
    if (name.includes(search) || email.includes(search)) {
      temp = $(temp).add($(list).eq(i));
    }

  }

  return temp;
}


/*===============================
Search list main function
===============================*/

const searchList = (list) => {

  // obtain search value
  let search = $($searchInput).val();

  // remove old links and elements
  removePageLinks();
  $('.no-match').remove();
  $(studentListItems).hide();

  if (search === "") {
    appendPageLinks(list);
  } else {
    // search student list to see if match is found
    const newList = doesStudentMatch(search, list);

    // Check list value
    if (newList === undefined) {
      $(pageDiv).append('<h3 class="no-match">No students found</h3>');
    } else if (newList.length > 10) {
      appendPageLinks(newList);
    } else if (newList.length <= 10) {
      showPage(1, newList);
    }
  }
}

/*===============================
Call functions
===============================*/

$(document).ready(function () {

  createSearchSection();

  appendPageLinks(studentListItems);

  $($searchDiv).on('click', 'button', function (event) {
    event.preventDefault();
    searchList(studentListItems);
  });

});