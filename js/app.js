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

const createPageLinks = (studentList) => {
  // set pages needed
  let pages = howManyPages(studentList);

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
  $(studentListItems).hide();
}

/*========================
Show page
========================*/

const showPage = (link, studentList) => {

  // hide all students on page
  $(studentList).hide();

  // Variables used to check page and students appearing on page
  const page = parseInt(link);
  const totalItems = studentList.length;
  let end;
  let start;
  let temp;

  // loop thru student list to give 10 per page
  for (let i = 0; i < totalItems; i++) {
    if (page !== undefined && page !== null) {
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

  // create page link section
  createPaginationSection();

  // create page links
  const links = createPageLinks(studentList);

  // remove old page links
  removePageLinks();

  // append new page links
  $($ul).append(links);

  // Initialize page
  showPage(1, studentList);
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

createSearchSection();

/*===============================
Does student match name or email
===============================*/

const doesStudentMatch = (search, studentList) => {

  let temp = "";

  for (let i = 0; i < studentList.length; i++) {

    // get name and email
    let name = $('.student-item h3').eq(i).text();
    let email = $('.student-item span.email').eq(i).text();

    // compare search to name and email, if either match create list
    if (name.includes(search) || email.includes(search)) {
      temp = $(temp).add($(studentList).eq(i));
    }

  }

  return temp;
}


/*===============================
Search list main function
===============================*/

const searchList = () => {

  // obtain search value
  let search = $($searchInput).val();
  console.log(search);

  // remove old links
  removePageLinks();
  $('.no-match').remove();

  // search student list to see if match is found
  const list = doesStudentMatch(search, studentListItems);
  console.log(list.length);

  // Check list value
  if (list === undefined) {
    $(pageDiv).append('<h3 class="no-match">No students found</h3>');
  } else if (list.length > 10) {
    appendPageLinks(list);
  } else if (list.length <= 10) {
    showPage(1, list);
  }


}

appendPageLinks(studentListItems);

$($searchBtn).on('click', function () {
  searchList();
});