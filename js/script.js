//selecting all required elements
const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const result_box = document.querySelector(".result_box");
const option_list = document.querySelector(".option_list");
const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit");

/*technology: Use a global variable*/
var questions = [];
/*technology: Use a local variable
*/
let que_count = 0;
let que_numb = 1;
let userScore = 0;
/* */
/*technology: Use a 3rd party API*/
// using OpenTrivia API to fetch the questions
  fetch("https://opentdb.com/api.php?amount=10&category=21&difficulty=medium&type=multiple")
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
    });
    })
    .catch(err => {
    console.log(err);
    });

const next_btn = document.querySelector("footer .next_btn");
const bottom_ques_counter = document.querySelector("footer .total_que");



// getting questions and options from array
function showQuetions(index){
    const que_text = document.querySelector(".que_text");

    //Inserting the tags in the HTML
    let que_tag = '<span>'+ que_numb + ". " + questions[index].question +'</span>';
    let option_tag = '<div class="option"><span>'+ questions[index].options[0] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[1] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[2] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[3] +'</span></div>';

    // Shows Question
    que_text.innerHTML = que_tag; 
    // Shows options for the questions
    option_list.innerHTML = option_tag; 
    
    const option = option_list.querySelectorAll(".option");

    // set onclick attribute to all available options
    for(i=0; i < option.length; i++){
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}
// Adding fontAwesome tags
let tickIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIconTag = '<div class="icon cross"><i class="fas fa-times"></i></div>';

//when user selects an option, this functions shows whether the selected option is correct or not
function optionSelected(answer){

    let userAns = answer.textContent; //getting string value from the selected option
    let correcAns = questions[que_count].answer; //getting correct answer from array
    const allOptions = option_list.children.length; //getting all option items
    
    if(userAns == correcAns){ //if user selected option is equal to array's correct answer
        userScore += 1; //upgrading score value with 1
        answer.classList.add("correct"); //adding green color to correct selected option
        answer.insertAdjacentHTML("beforeend", tickIconTag); //adding tick icon to correct selected option
        console.log("Correct Answer");
        console.log("Your correct answers = " + userScore);
    }else{
        answer.classList.add("incorrect"); //adding red color to correct selected option
        answer.insertAdjacentHTML("beforeend", crossIconTag); //adding cross icon to correct selected option
        console.log("Wrong Answer");

        i = 0;
        while(i <allOptions)
        // for(i=0; i < allOptions; i++)
        {
            //if there is an option which is matched to an array answer
            if(option_list.children[i].textContent == correcAns){  
                option_list.children[i].setAttribute("class", "option correct"); //adding green color to matched option
                option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); //adding tick icon to matched option
                console.log("Auto selected correct answer.");
            }
            i++;
        }
    }
    for(i=0; i < allOptions; i++){
        option_list.children[i].classList.add("disabled"); //once user select an option then disabled all options
    }
    next_btn.classList.add("show"); //show the next button if user selected any option
}

function showResult(){
    info_box.classList.remove("activeInfo"); //hide info box
    quiz_box.classList.remove("activeQuiz"); //hide quiz box
    result_box.classList.add("activeResult"); //show result box
    const scoreText = result_box.querySelector(".score_text");

    if (userScore > 3){ 
        // if user scored more than 3, creating a new span tag and passing the user score number and total question number
        let scoreTag = '<span>and congrats! 🎉, You got <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;  //adding new span tag inside score_Text
    }
    else if(userScore > 1){ // if user scored more than 1
        let scoreTag = '<span>and nice 😎, You got <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }
    else{ // if user scored less than 1
        let scoreTag = '<span>and sorry 😐, You got only <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }
}



function queCounter(index){
    //creating a new span tag and passing the question number and total question
    let totalQueCounTag = '<span><p>'+ index +'</p> of <p>'+ questions.length +'</p> Questions</span>';
    bottom_ques_counter.innerHTML = totalQueCounTag;  //adding new span tag inside bottom_ques_counter
}
// if Start button clicked
$(start_btn).click(()=>{
    info_box.classList.add("activeInfo"); //show info box
});
// if Continue button clicked
$(continue_btn).click(()=>{
    info_box.classList.remove("activeInfo"); //hide info box
    quiz_box.classList.add("activeQuiz"); //show quiz box

    showQuetions(0); //calling showQestions function
    queCounter(1); //passing 1 parameter to queCounter
});
$(exit_btn).click(()=>{
    info_box.classList.remove("activeInfo"); //hide info box
});

// if Next button clicked
$(next_btn).click(()=>{
    if(que_count < questions.length - 1){ 
        //if question count is less than total question length
        que_count++; //increment the que_count value
        que_numb++; //increment the que_numb value
        showQuetions(que_count); 
        queCounter(que_numb); 

    }else{
    //Store score in local Storage
    localStorage.setItem('mostRecentScore', userScore);
        //calling showResult function for showing result
        // git commit 2
        showResult(); 

    }
});
// if restartQuiz button clicked
$(restart_quiz).click(()=>{
    quiz_box.classList.add("activeQuiz"); //show quiz box
    result_box.classList.remove("activeResult"); //hide result box
    que_count = 0;
    que_numb = 1;
    userScore = 0;
    showQuetions(que_count); //calling showQestions function
    queCounter(que_numb); //passing que_numb value to queCounter

});
// if quitQuiz button clicked
$(quit_quiz).click(()=>{
    window.location.reload(); //reload the current window

});