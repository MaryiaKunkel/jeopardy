// categories is the main data structure for the app; it looks like this:

//  [
//    { title: "Math",
//      clues: [
//        {question: "2+2", answer: 4, showing: null},
//        {question: "1+1", answer: 2, showing: null}
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
let ids = [];

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function getSingleCategoryQuesions(categoryId) {
    // this gets a random category questions?
    let res = await axios.get(`http://jservice.io/api/category?id=${categoryId}`);
    // console.log(res.data)
    return res.data; // {id: 5, title: 'nature', clues_count: 203, clues: Array(203)}
}


/** Get NUM_CATEGORIES random category from API.
 *
 * Returns array of category ids
 */
// get 
async function getRandomCategoryQuestions() {
    for (let i = 1; i <= 6; i++){
        let randomCategory = getRandomNumber(1, 28163);
        let categoryData = await getSingleCategoryQuesions(randomCategory);
        ids.push(categoryData.id);
    }
    // console.log(ids);
    return ids; // [8, 58, 93, 75, 63, 13]
}

getCategoryIds()
// console.log(ids)



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
// todo: rename
async function getCategory(catId) {

    let randomCategory = getRandomNumber(1, 28163);
    let categoryData = await getSingleCategoryQuesions(randomCategory);

    // console.log( {
    //     'title': categoryData.title,
    //     'clues': categoryData.clues
    // })
    return {
        'title': categoryData.title,
        'clues': categoryData.clues
    }
}

// for (let i = 0; i < ids.length; i++){
//     getCategory(ids[i])
// }

/** Fill the HTML table#jeopardy with the categories & cells for questions.
 *
 * - The <thead> should be filled w/a <tr>, and a <td> for each category
 * - The <tbody> should be filled w/NUM_QUESTIONS_PER_CAT <tr>s,
 *   each with a question for each category in a <td>
 *   (initally, just show a "?" where the question/answer would go.)
 */

async function fillTable() {
    // $('<table>');
}

/** Handle clicking on a clue: show the question or answer.
 *
 * Uses .showing property on clue to determine what to show:
 * - if currently null, show question & set .showing to "question"
 * - if currently "question", show answer & set .showing to "answer"
 * - if currently "answer", ignore click
 * */

function handleClick(evt) {
}

/** Wipe the current Jeopardy board, show the loading spinner,
 * and update the button used to fetch data.
 */

function showLoadingView() {

}

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