let questions = [];
try{
  fetch("https://opentdb.com/api.php?amount=10&category=21&difficulty=medium&type=multiple")
  .then(function(res) {
  if (!res.ok) {
      throw Error(res.statusText);
  }
  return res;
  })
  .then(function(res) {
  return res.json();
  // console.log("ok");
  })
  .then(loadedQuestions =>{
      //Formatting the questions data from the API in the below formatt
  /*  questions = [
          {
          question: "",
          answer: "",
          options: []
      }
  */
  questions = loadedQuestions.results.map( loadedQuestions =>{
      /*technology: Use an object*/
      const formattedQuestions = {
          
      question: loadedQuestions.question
      //   ,options : []
      };
      
      
      const answerChoices = [...loadedQuestions.incorrect_answers];
      // to put the correct answer at random position
      let randIndex = Math.floor(Math.random() * 3) + 1;
      answerChoices.splice(randIndex -1 , 0, loadedQuestions.correct_answer);
      // console.log(answerChoices);
      /*technology: Access an objects property using dot notation */
      formattedQuestions.answer = loadedQuestions.correct_answer;
      /*technology: Use an object with an array for a property value */
      formattedQuestions.options = answerChoices;
      return formattedQuestions;
  })
});
}
catch(error) {
  console.log(error);
};