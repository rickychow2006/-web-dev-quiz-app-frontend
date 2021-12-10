let currentQues = {};
let acceptAnswer = false;
let userScore = 0;
let questionCount = 0;
let availableQuestions = [];

let getQuestions = (id) => fetch(`http://localhost:3000/api/v1/categories/${id}/questions`).then(resp => resp.json())
