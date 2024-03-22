let queAns = [
    {
        num: 1,
        question: "What does HTML stand for?",
        answer: "Hyper Text Markup Language",
        options: [
            "Hyper Text Multiple Language",
            "Hyper Text Preprocessor",
            "Hyper Tool Multi Language",
            "Hyper Text Markup Language"
        ]
    },
    {
        num: 2,
        question: "What does CSS stand for?",
        answer: "Cascading Style Sheet",
        options: [
            "Computer Style Sheet",
            "Cascading Style Sheet",
            "Colorful Style Sheet",
            "Common Style Sheet"
        ]
    },
    {
        num: 3,
        question: "What does XML stand for?",
        answer: "eXtensible Markup Language",
        options: [
            "eXTra Multi-Program Language",
            "eXecutable Multiple Language",
            "eXtensible Markup Language",
            "eXamine Multiple Language"
        ]
    },
    {
        num: 4,
        question: "What does PHP stand for?",
        answer: "Hypertext Preprocessor",
        options: [
            "Hypertext Preprocessor",
            "Hypertext Programming",
            "Hometext Preprocessor",
            "Hypertext Preprogramming"
        ]
    },
    {
        num: 5,
        question: "What does SQL stand for?",
        answer: "Structured Query Language",
        options: [
            "Stantement Question Language",
            "Stylesheet Query Language",
            "Stylish Question Language",
            "Structured Query Language"
        ]
    }
]

const start_btn = document.querySelector(".start-quiz");
const quiz_box = document.querySelector(".quiz-box");
const result_box = document.querySelector(".result-box");
let question_text = quiz_box.querySelector(".question-text");
let option_box = quiz_box.querySelector(".options");
let nextBtn = document.querySelector(".next-btn");
let currQ = document.querySelector(".quiz-footer .curr-que");
let totalQ = document.querySelector(".quiz-footer .total-que");
let againQuizBtn = document.querySelector(".again-quiz");
let exitBtn = document.querySelector(".exit");

let totalQR = document.querySelector(".result .total-que span");
let rightAnsR = document.querySelector(".result .right-ans span");
let wrongAnsR = document.querySelector(".result .wrong-ans span");
let percentageR = document.querySelector(".result .percentage span");

const mark_right = '<ion-icon name="checkmark-outline" class="icon"></ion-icon>';
const mark_wrong = '<ion-icon name="close-outline" class="icon"></ion-icon></i>';

start_btn.addEventListener('click', () => {
    quiz_box.classList.remove('inactive');
    start_btn.classList.add('inactive');
})

let queNo = 0;
let allOptions = "";
let rightAns = 0;
let wrongAns = 0;
totalQ.innerText = queAns.length

showQuestion(queNo);

function showQuestion(queIndex) {
    currQ.innerText = queNo + 1;
    let allContainer = "";
    question_text.innerHTML = queAns[queIndex].num + ". " + queAns[queIndex].question;
    for (let i = 0; i < queAns[queIndex].options.length; i++) {
        allContainer += `<div class="option">${queAns[queIndex].options[i]}</div>`;
    }
    option_box.innerHTML = allContainer;

    allOptions = option_box.querySelectorAll(".option");
    for (let j = 0; j < allOptions.length; j++) {
        allOptions[j].setAttribute("onclick", "userAnsfun(this)");
    }
    nextBtn.classList.add("inactive");
}

nextBtn.onclick = () => {
    queNo++;
    if (queNo < queAns.length) {
        showQuestion(queNo);
    } else {
        quiz_box.classList.add("inactive");
        result_box.classList.remove("inactive");
        rightAnsR.innerText = rightAns;
        wrongAnsR.innerText = wrongAns;
        totalQR.innerText = queAns.length;
        percentageR.innerHTML = ((rightAns / queAns.length) * 100).toFixed(2) + "%";
    }

    if (queNo == queAns.length - 1) {
        nextBtn.innerText = "Finish";
    }
}

function userAnsfun(userE) {
    let userAns = userE.innerText;
    let currectAns = queAns[queNo].answer;
    nextBtn.classList.remove("inactive");

    if (userAns == currectAns) {
        userE.classList.add("currect");
        userE.insertAdjacentHTML("beforeend", mark_right);
        rightAns++;

    } else {
        userE.classList.add("incurrect");
        userE.insertAdjacentHTML("beforeend", mark_wrong);
        wrongAns++;

        for (let i = 0; i < allOptions.length; i++) {
            if (allOptions[i].innerText == currectAns) {
                allOptions[i].classList.add("currect");
                allOptions[i].insertAdjacentHTML("beforeend", mark_right);
            }
        }
    }
    // let allOptions = option_box.querySelectorAll(".option");
    for (let j = 0; j < allOptions.length; j++) {
        allOptions[j].classList.add("disabled");
    }
}

againQuizBtn.addEventListener('click', () => {
    result_box.classList.add("inactive");
    quiz_box.classList.remove("inactive");

    queNo = 0;
    rightAns = 0;
    wrongAns = 0;
    nextBtn.innerText = "Next Question";
    showQuestion(queNo);
})

exitBtn.addEventListener('click', () => {
    location.reload();
})
