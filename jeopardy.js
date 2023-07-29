// categories is the main data structure for the app; it looks like this:

//  [
//    { title: "Math",
//      clues: [
//        {question: "2+2", answer: 4, showing: null},
//        {question: "1+1", answer: 2, showing: null}
//        ...
//      ],
//    },
//    { title: "Literature",
//      clues: [
//        {question: "Hamlet Author", answer: "Shakespeare", showing: null},
//        {question: "Bell Jar Author", answer: "Plath", showing: null},
//        ...
//      ],
//    },
//    ...
//  ]

let categories = [];
let columns = {};
// let title = columns.category.title;

/** Get NUM_CATEGORIES random category from API.
 *
 * Returns array of category ids
 */
let categoryData = {};

async function getCategoryIds() {
  const res = await axios.get('http://jservice.io/api/categories', { params: { count: 100 } });
  let arrayOfIds = [];
  for (let i = 0; i < 6; i++){
    let randomIndex = Math.floor(Math.random() * 101);
    arrayOfIds.push(res.data[randomIndex].id);
  }
  return arrayOfIds;
}
getCategoryIds()

function randomApi() {
  return [
    {
      title: "Math",
      clues: [
        { question: "2+2", answer: 4, showing: null },
        { question: "1+1", answer: 2, showing: null },
        { question: "3+3", answer: 6, showing: null },
        { question: "4+4", answer: 8, showing: null },
        { question: "5+5", answer: 10, showing: null }
      ],
    },
    {
      title: "Literature",
      clues: [
        { question: "Hamlet Author", answer: "Shakespeare", showing: null },
        { question: "Bell Jar Author", answer: "Plath", showing: null },
        { question: "Pride and Prejudice Author", answer: "Austen", showing: null },
        { question: "1984 Author", answer: "Orwell", showing: null },
        { question: "To Kill a Mockingbird Author", answer: "Lee", showing: null }
      ],
    },
    {
      title: "History",
      clues: [
        { question: "Year of American Independence", answer: 1776, showing: null },
        { question: "Capital of France", answer: "Paris", showing: null },
        { question: "First President of the United States", answer: "Washington", showing: null },
        { question: "World War II End Year", answer: 1945, showing: null },
        { question: "Ancient Egyptian Pharaoh", answer: "Cleopatra", showing: null }
      ],
    },
    {
      title: "Science",
      clues: [
        { question: "Chemical Symbol for Water", answer: "H2O", showing: null },
        { question: "Newton's First Law of Motion", answer: "Inertia", showing: null },
        { question: "Earth's Largest Satellite", answer: "Moon", showing: null },
        { question: "Lightest Element", answer: "Hydrogen", showing: null },
        { question: "Study of Fossils", answer: "Paleontology", showing: null }
      ],
    },
    {
      title: "Geography",
      clues: [
        { question: "Largest Ocean", answer: "Pacific Ocean", showing: null },
        { question: "Longest River", answer: "Nile", showing: null },
        { question: "Country with the Largest Population", answer: "China", showing: null },
        { question: "Capital of Japan", answer: "Tokyo", showing: null },
        { question: "Mount Everest Location", answer: "Nepal", showing: null }
      ],
    },
    {
      title: "Art",
      clues: [
        { question: "Mona Lisa Painter", answer: "Da Vinci", showing: null },
        { question: "Sistine Chapel Ceiling Painter", answer: "Michelangelo", showing: null },
        { question: "Famous Spanish Surrealist Painter", answer: "Dali", showing: null },
        { question: "Starry Night Painter", answer: "Van Gogh", showing: null },
        { question: "Birth of Venus Painter", answer: "Botticelli", showing: null }
      ],
    }
  ];
}


// getCategoryIds()
/** Return object with data about a category:
 *
 *  Returns { title: "Math", clues: clue-array }
 *
 * Where clue-array is:
 *   [
 *      {question: "Hamlet Author", answer: "Shakespeare", showing: null},
 *      {question: "Bell Jar Author", answer: "Plath", showing: null},
 *      ...
 *   ]
 */

async function populateCategoryData(idArray) {
  // if (categoryData[catId]) {
  //   return categoryData[catId];
  // } else {
  
  for (let i = 0; i < 6; i++){
    console.log(i)
    const res = await axios.get(`http://jservice.io/api/category?id=${idArray[i]}`);
      const fiveCluesArr = res.data.clues.slice(0, 5);
      const category = {
        'title': res.data.title,
        'clues': fiveCluesArr.map((clue) => ({
          'question': clue.question,
          'answer': clue.answer,
          'showing': null,
        })),
      };
    categoryData[i] = category;
  }  
  console.log(categoryData);
  // }
}

/** Fill the HTML table#jeopardy with the categories & cells for questions.
 *
 * - The <thead> should be filled w/a <tr>, and a <td> for each category
 * - The <tbody> should be filled w/NUM_QUESTIONS_PER_CAT <tr>s,
 *   each with a question for each category in a <td>
 *   (initally, just show a "?" where the question/answer would go.)
 */
// console.log(categoryData)
let categoryIds = [];

async function fillTable() {
  const $table = $('<table>');
  const $thead = $('<thead>');
  const $tbody = $('<tbody>');

  let categoryIds = await getCategoryIds();
  await populateCategoryData(categoryIds);
  // categoryData = randomApi();
  // const categoryIds = await getCategoryIds();
  // const categoryIds = randomApi;

  for (let i = 0; i < 6; i++) {
    // const categoryId = categoryIds[i];
    // const category = categoryData[categoryId];
    const $th = $('<th>').text(categoryData[i].title);
    $thead.append($th);
  }
  for (let i = 0; i < 5; i++) {
    const $tr = $('<tr>');
    for (let j =0 ; j < 6; j++) {
      const $td = $('<td>').text('?');
      $td.on('click', handleClick);
      $tr.append($td);
    }
    $tbody.append($tr);
  }

  $('body').append($table);
  $table.append($thead).append($tbody);
}
fillTable()

/** Handle clicking on a clue: show the question or answer.
 *
 * Uses .showing property on clue to determine what to show:
 * - if currently null, show question & set .showing to "question"
 * - if currently "question", show answer & set .showing to "answer"
 * - if currently "answer", ignore click
 * */

function handleClick(evt) {
  let columnIndex = $(evt.target).index(); 
  let rowIndex = $(evt.target).parent().index();
  let clue = categoryData[columnIndex].clues[rowIndex];
  if (clue.showing === null || clue.showing === undefined) {
    evt.target.innerText = clue.question;
    clue.showing = 'question';
  } else if (clue.showing === 'question'){
    evt.target.innerText = clue.answer;
    clue.showing = 'answer';
  }
}

/** Wipe the current Jeopardy board, show the loading spinner,
 * and update the button used to fetch data.
 */
let $spinner = $('<div class="lds-dual-ring"></div>');
let $button = $('<input type="submit" value="Restart"></input>');
$('body').append($('<div class="container">'));
$('.container').append($button);

function showSpinner() {
  $('body').append($spinner);
}

function hideSpinner() {
  $spinner.remove();
}

$button.on('click', async function (e) {
  $('table').remove();
  showSpinner();
  setTimeout(hideSpinner, 2000);
  setTimeout(fillTable, 2000);
});
  



// async function showLoadingView() {

// };
/** Remove the loading spinner and update the button used to fetch data. */

function hideLoadingView() {
}

/** Start game:
 *
 * - get random category Ids
 * - get data for each category
 * - create HTML table
 * */

async function setupAndStart() {
}

/** On click of start / restart button, set up game. */

// TODO

/** On page load, add event handler for clicking clues */

// TODO
