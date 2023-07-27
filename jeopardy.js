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

async function getCategoryIds() {
  const NUM_CATEGORIES = 6; // You can adjust this value to get more or fewer categories
  // const res = await axios.get(`https://jservice.io/api/categories?count=${NUM_CATEGORIES}`);
  let categoryIds2 = [];
  for (let i = 0; i < NUM_CATEGORIES; i++){
    const res = await axios.get('http://jservice.io/api/random');
    categoryIds2.push(res.data[0].category_id);
  };
  console.log(categoryIds2);
  return categoryIds2;
//   const categoryIds = res.data.map((category) => category.id);
//   console.log(categoryIds)
//   return categoryIds; // [68, 76, 94, 23, 24, 56]
// }

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

async function getCategory(catId) {
  const res = await axios.get(`http://jservice.io/api/category?id=${catId}`);
  const fiveCluesArr = res.data.clues.slice(0, 5);

  // console.log({
  //   'title': res.data.title,
  //   'clues': fiveCluesArr.map((clue) => ({
  //     'question': clue.question,
  //     'answer': clue.answer,
  //     'showing': 'null',
  //   }))
  // })
  return {
    'title': res.data.title,
    'clues': fiveCluesArr.map((clue) => ({
      'question': clue.question,
      'answer': clue.answer,
      'showing': null,
    }))
  };
}

/** Fill the HTML table#jeopardy with the categories & cells for questions.
 *
 * - The <thead> should be filled w/a <tr>, and a <td> for each category
 * - The <tbody> should be filled w/NUM_QUESTIONS_PER_CAT <tr>s,
 *   each with a question for each category in a <td>
 *   (initally, just show a "?" where the question/answer would go.)
 */

async function fillTable() {
  const $table = $('<table>');
  const $thead = $('<thead>');
  const $tbody = $('<tbody>');

  const categoryIds = await getCategoryIds();
  // console.log(categoryIds);
  
  for (let i = 0; i < 6; i++) {
    const category = await getCategory(categoryIds[i]);
    columns[i] = category;
    const $th = $('<th>').text(category.title);
    $thead.append($th); 
  }

  for (let i = 0; i < 5; i++){
    const $tr = $('<tr>');
    for (let i = 0; i < 6; i++){
      const $td = $('<td>').text('?');
      $td.on("click", handleClick);
      $tr.append($td);
    }
    $tbody.append($tr);
  }

  $('body').append($table);
  $table.append($thead).append($tbody);
}
fillTable();

/** Handle clicking on a clue: show the question or answer.
 *
 * Uses .showing property on clue to determine what to show:
 * - if currently null, show question & set .showing to "question"
 * - if currently "question", show answer & set .showing to "answer"
 * - if currently "answer", ignore click
 * */

function handleClick(evt) {
  console.log($(evt.target).parent().index()); 
  console.log($(evt.target).index());
  console.log(columns);
  let columnIndex = $(evt.target).index(); 
  let rowIndex = $(evt.target).parent().index();
  let clue = columns[columnIndex].clues[rowIndex];
  // console.log(clue);
  if (clue.showing === 'null') {
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

async function showLoadingView() {
  let $button = $('<input type="submit" value="Restart"></input>');
  $('body').append($button);
  $button.on('click', async function(e){
    $('table').remove();
    await fillTable();
  });
};
showLoadingView()
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