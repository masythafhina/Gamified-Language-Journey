
let soundBtn = document.getElementById("sounding-btn");
let bubbleText = document.querySelector("#speach-bubble-p");

// ------- FIX BUTTONS
let elemEst = document.querySelector("#est-btn");
let elemRe = document.querySelector("#re-btn");
let elemFul = document.querySelector("#ful-btn");
let elemEr = document.querySelector("#er-btn");
let elemDis = document.querySelector("#dis-btn");
let elemUn = document.querySelector("#un-btn");

// ------- INPUT FIELDS
let inputUnhappy = document.getElementById("unhappy");
let inputDislike = document.getElementById("dislike");
let inputBigger = document.getElementById("bigger");
let inputBiggest = document.getElementById("biggest");
let inputReplay = document.getElementById("replay");
let inputWonderful = document.getElementById("wonderful");

// ------- FIX BUTTONS ARRAY
let fixArr = [elemEst, elemRe, elemFul, elemEr, elemDis, elemUn];

// ------- FIX BUTTONS ID ARRAY
let fixIdArr = ["estID", "reID", "fulID", "erID", "disID", "unID"]

// ------- FIX NAMES ARRAY
let fixNameArr = ["est", "re", "ful", "er", "dis", "un"]

// SCORE RESULT
let score = document.querySelector(".score");
let scoreIconWrapper = document.querySelector(".score-icon-wrapper");
let scoreIcon = document.querySelector(".icon");
let scoreP = document.querySelector(".feedback-p");

// --- TIMER

let sec = 00;
let min = 00;
let hr = 00;
window.onload = function() {
    let timer;
    timer = setInterval (function(){
        if (sec < 60) {
            document.getElementById("timer").innerHTML = min.toLocaleString(undefined,{minimumIntegerDigits: 2}) + ' : ' + sec.toLocaleString(undefined,{minimumIntegerDigits: 2});
            sec++;
        } else if (sec >= 60) {
            sec = 00;
            min++;
            document.getElementById("timer").innerHTML = min.toLocaleString(undefined,{minimumIntegerDigits: 2}) + ' : ' + sec.toLocaleString(undefined,{minimumIntegerDigits: 2});
            sec++
         } else if (min == 60) {
            gameOver();
        }
    }, 1000);
}

// ------- SOUND IT OUT BUTTONS TRANSITION
soundBtn.addEventListener("click", function() {
    let fixes = document.querySelectorAll(".fix");
    console.log(fixes);
    if (soundBtn.innerHTML === "YES") {
        bubbleText.innerHTML = "Go to each prefix and suffix to sound it out.";
        soundBtn.innerHTML = "EXIT";
        fixes.forEach((fix) => {
            var iElem = document.createElement('i');
            iElem.className = "fa-solid fa-volume-high icon-style";
            fix.appendChild(iElem);
            fix.setAttribute("onClick", "togglePlay()")
            fix.classList.add("audio");
        })
        for (let i=0; i<fixes.length; i++) {
            var audioElem = document.createElement('audio')
            fixes[i].appendChild(audioElem);
            const audioSounds = ["/static/est.m4a", "/static/re.m4a", "/static/ful.m4a", "/static/er.m4a", "/static/dis.m4a", "/static/un.m4a"];
            audioElem.setAttribute("src", audioSounds[i]);
            const audioId = ["estID", "reID", "fulID", "erID", "disID", "unID"];
            audioElem.setAttribute("id", audioId[i]);
        }
    } else if (soundBtn.innerHTML === "EXIT") {
        bubbleText.innerHTML = "Do you need help sounding it out?";
        soundBtn.innerHTML = "YES";
        fixes.forEach((fix) => {
            var iElem = document.querySelector('i');
            fix.removeChild(iElem);
        })
    }
})

/* for (let i = 0; i<fixArr; i++) {
    fixArr[i].togglePlay = function() {
        if (fixArr[i].classList.contains("audio")) {
            document.getElementById("fixIdArr[i]").play();
        }
    }
} */

// ------- TOGGLE BUTTONS
elemEst.togglePlay = function() {
    if (elemEst.classList.contains("audio")) {
        document.getElementById("estID").play();
    } else {
        elemEst.classList.remove("audio");
        document.getElementById("estID").pause();
    }
}

elemRe.togglePlay = function() {
    if (elemRe.classList.contains("audio")) {
        document.getElementById("reID").play();
    } else {
        elemRe.classList.remove("audio");
        document.getElementById("reID").pause();
    }
}

elemFul.togglePlay = function() {
    if (elemFul.classList.contains("audio")) {
        document.getElementById("fulID").play();
    } else {
        elemFul.classList.remove("audio");
        document.getElementById("fulID").pause();
    }
}

elemEr.togglePlay = function() {
    if (elemEr.classList.contains("audio")) {
        document.getElementById("erID").play();
    } else {
        elemEr.classList.remove("audio");
        document.getElementById("erID").pause();
    }
}

elemDis.togglePlay = function() {
    if (elemDis.classList.contains("audio")) {
        document.getElementById("disID").play();
    } else {
        elemDis.classList.remove("audio");
        document.getElementById("disID").pause();
    }
}

elemUn.togglePlay = function() {
    if (elemUn.classList.contains("audio")) {
        document.getElementById("unID").play();
    }
}

// HELPER FUNCTION
function incorrect() {
    score.style.visibility = "visible";
    score.style.color = "red";
    scoreIconWrapper.style.border = "2px solid red";
    scoreIcon.classList.remove("check");
    scoreIcon.classList.add("close");
    let incorrectArr = ["Not quite", "Almoust", "Very close"]
    let incorrectFeed = incorrectArr[Math.floor(Math.random() * incorrectArr.length)];
    scoreP.innerHTML = incorrectFeed;
}

function correct() {
    score.style.visibility = "visible";
    score.style.color = "green";
    scoreIconWrapper.style.border = "2px solid green";
    scoreIcon.classList.remove("close");
    scoreIcon.classList.add("check");
    let correctArr = ["Excellent!", "Great work!", "Awesome"]
    let correctFeed = correctArr[Math.floor(Math.random() * correctArr.length)];
    scoreP.innerHTML = correctFeed;
}

function gameOver() {
    soundBtn.focus();
    soundBtn.remove();
    bubbleText.innerHTML = "FANTASTIC JOB! Practice makes the master.";
}

let unhappyValue;
function unhappyFunc() {
    unhappyValue = inputUnhappy.value.toLowerCase();
    if (unhappyValue == "un") {
        correct()
        inputUnhappy.style.border = "3px solid green";
        elemUn.style.background = "grey";
    } else {
        incorrect()
        console.log("we not talking")
    }
}

inputUnhappy.addEventListener("focusout", function () {
    unhappyFunc()
})

let dislikeValue;
function dislikeFunc() {
    dislikeValue = inputDislike.value.toLowerCase();
    if (dislikeValue == "dis") {
        correct()
        inputDislike.style.border = "3px solid green";
        elemDis.style.background = "grey";
    } else {
        incorrect()
        console.log("we not talking")
    }
}

inputDislike.addEventListener("focusout", function () {
    dislikeFunc()
})

let biggerValue;
function biggerFunc() {
    biggerValue = inputBigger.value.toLowerCase();
    if (biggerValue == "er") {
        correct()
        inputBigger.style.border = "3px solid green";
        elemEr.style.background = "grey";
    } else {
        incorrect()
        console.log("we not talking")
    }
}

inputBigger.addEventListener("focusout", function () {
    biggerFunc()
})

let biggestValue;
function biggestFunc() {
    biggestValue = inputBiggest.value.toLowerCase();
    if (biggestValue == "est") {
        correct()
        inputBiggest.style.border = "3px solid green";
        elemEst.style.background = "grey";
    } else {
        incorrect()
        console.log("we not talking")
    }
}

inputBiggest.addEventListener("focusout", function () {
    biggestFunc()
})

let replayValue;
function replayFunc() {
    replayValue = inputReplay.value.toLowerCase();
    if (replayValue == "re") {
        correct()
        inputReplay.style.border = "3px solid green";
        elemRe.style.background = "grey";
    } else {
        incorrect()
        console.log("we not talking")
    }
}

inputReplay.addEventListener("focusout", function () {
    replayFunc()
})

let wonderfulValue;
function wonderfulFunc() {
    wonderfulValue = inputWonderful.value.toLowerCase();
    if (wonderfulValue == "ful") {
        correct()
        inputWonderful.style.border = "3px solid green";
        elemFul.style.background = "grey";
    } else {
        incorrect()
        console.log("we not talking")
    }
}

inputWonderful.addEventListener("focusout", function () {
    wonderfulFunc()
})



/* // UNHAPPY
inputUnhappy.addEventListener("focus", function (){
    if (inputUnhappy.value) {
}
    elemUn.addEventListener("click", function () {
        correct();
        inputUnhappy.style.border = "3px solid green";
        inputUnhappy.setAttribute("placeholder", "un");
        console.log(focusedElement);
        inputDislike.focus();
    });

    elemEst.addEventListener("click", function () {
        incorrect();
        inputUnhappy.style.border = "3px solid red";
        inputUnhappy.setAttribute("placeholder", "est");
        console.log(focusedElement);
        inputDislike.focus();
    });

    elemRe.addEventListener("click", function () {
        incorrect();
        inputUnhappy.style.border = "3px solid red";
        inputUnhappy.setAttribute("placeholder", "re");
        console.log(focusedElement);
        inputDislike.focus();
    });

    elemFul.addEventListener("click", function () {
        inputDislike.focus();
        incorrect();
        inputUnhappy.style.border = "3px solid red";
        inputUnhappy.setAttribute("placeholder", "ful");
    });

    elemEr.addEventListener("click", function () {
        inputDislike.focus();
        incorrect();
        inputUnhappy.style.border = "3px solid red";
        inputUnhappy.setAttribute("placeholder", "er");
    });

    elemDis.addEventListener("click", function () {
        inputDislike.focus();
        incorrect();
        inputUnhappy.style.border = "3px solid red";
        inputUnhappy.setAttribute("placeholder", "dis");
    });
    const focusedElement = document.activeElement;
    console.log(focusedElement)
})

// DISLIKE
inputDislike.addEventListener("focus", function (){
    elemDis.addEventListener("click", function () {
        correct();
        inputDislike.style.border = "3px solid green";
        inputDislike.setAttribute("placeholder", "dis");
        console.log(focusedElement)
        inputBigger.focus();
    })
    elemEst.addEventListener("click", function () {
        incorrect();
        inputDislike.setAttribute("placeholder", "est");
        inputDislike.style.border = "3px solid red";
        console.log(focusedElement)
        inputBigger.focus();
    })
    elemRe.addEventListener("click", function () {
        inputBigger.focus();
        inputDislike.setAttribute("placeholder", "re");
        incorrect();
        inputDislike.style.border = "3px solid red";
    })
    elemFul.addEventListener("click", function () {
        inputBigger.focus();
        inputDislike.setAttribute("placeholder", "ful");
        incorrect();
        inputDislike.style.border = "3px solid red";
    })
    elemEr.addEventListener("click", function () {
        inputBigger.focus();
        inputDislike.setAttribute("placeholder", "er");
        incorrect();
        inputDislike.style.border = "3px solid red";
    })
    elemUn.addEventListener("click", function () {
        inputBigger.focus();
        inputDislike.setAttribute("placeholder", "un");
        incorrect();
        inputDislike.style.border = "3px solid red";
    })
    const focusedElement = document.activeElement;
    console.log(focusedElement)
})

// BIGGER
inputBigger.addEventListener("focus", function (){
    elemEr.addEventListener("click", function () {
        inputBiggest.focus();
        inputBigger.setAttribute("value", "er");
        correct();
        inputBigger.style.border = "3px solid green";
    })
    elemEst.addEventListener("click", function () {
        inputBiggest.focus();
        inputBigger.setAttribute("placeholder", "est");
        incorrect();
        inputBigger.style.border = "3px solid red";
    })
    elemRe.addEventListener("click", function () {
        inputBiggest.focus();
        inputBigger.setAttribute("placeholder", "re");
        incorrect();
        inputBigger.style.border = "3px solid red";
    })
    elemFul.addEventListener("click", function () {
        inputBiggest.focus();
        inputBigger.setAttribute("placeholder", "ful");
        incorrect();
        inputBigger.style.border = "3px solid red";
    })
    elemDis.addEventListener("click", function () {
        inputBiggest.focus();
        inputBigger.setAttribute("placeholder", "dis");
        incorrect();
        inputBigger.style.border = "3px solid red";
    })
    elemUn.addEventListener("click", function () {
        inputBiggest.focus();
        inputBigger.setAttribute("placeholder", "un");
        incorrect();
        inputBigger.style.border = "3px solid red";
    })
    const focusedElement = document.activeElement;
    console.log(focusedElement)
})

// BIGGEST
inputBiggest.addEventListener("focus", function (){
    elemEst.addEventListener("click", function () {
        inputReplay.focus();
        inputBiggest.setAttribute("placeholder", "est");
        correct();
        inputBiggest.style.border = "3px solid green";
    })
    elemEr.addEventListener("click", function () {
        inputReplay.focus();
        inputBiggest.setAttribute("placeholder", "er");
        incorrect();
        inputBiggest.style.border = "3px solid red";
    })
    elemRe.addEventListener("click", function () {
        inputReplay.focus();
        inputBiggest.setAttribute("placeholder", "re");
        incorrect();
        inputBiggest.style.border = "3px solid red";
    })
    elemFul.addEventListener("click", function () {
        inputReplay.focus();
        inputBiggest.setAttribute("placeholder", "ful");
        incorrect();
        inputBiggest.style.border = "3px solid red";
    })
    elemDis.addEventListener("click", function () {
        inputReplay.focus();
        inputBiggest.setAttribute("placeholder", "dis");
        incorrect();
        inputBiggest.style.border = "3px solid red";
    })
    elemUn.addEventListener("click", function () {
        inputReplay.focus();
        inputBiggest.setAttribute("placeholder", "un");
        incorrect();
        inputBiggest.style.border = "3px solid red";
    })
    const focusedElement = document.activeElement;
    console.log(focusedElement)
})

// REPLAY
inputReplay.addEventListener("focus", function (){
    elemRe.addEventListener("click", function () {
        inputWonderful.focus();
        inputReplay.setAttribute("placeholder", "re");
        correct();
        inputReplay.style.border = "3px solid green";
    })
    elemEr.addEventListener("click", function () {
        inputWonderful.focus();
        inputReplay.setAttribute("placeholder", "er");
        incorrect();
        inputReplay.style.border = "3px solid red";
    })
    elemEst.addEventListener("click", function () {
        inputWonderful.focus();
        inputReplay.setAttribute("placeholder", "est");
        incorrect();
        inputReplay.style.border = "3px solid red";
    })
    elemFul.addEventListener("click", function () {
        inputWonderful.focus();
        inputReplay.setAttribute("placeholder", "ful");
        incorrect();
        inputReplay.style.border = "3px solid red";
    })
    elemDis.addEventListener("click", function () {
        inputWonderful.focus();
        inputReplay.setAttribute("placeholder", "dis");
        incorrect();
        inputReplay.style.border = "3px solid red";
    })
    elemUn.addEventListener("click", function () {
        inputWonderful.focus();
        inputReplay.setAttribute("placeholder", "un");
        incorrect();
        inputReplay.style.border = "3px solid red";
    })
    const focusedElement = document.activeElement;
    console.log(focusedElement)
})

// WONDERFUL
inputWonderful.addEventListener("focus", function (){
    elemFul.addEventListener("click", function () {
        inputWonderful.setAttribute("placeholder", "ful");
        correct();
        inputWonderful.style.border = "3px solid green";
        gameOver();
        clearInterval(timer);
    })
    elemEr.addEventListener("click", function () {
        inputWonderful.setAttribute("placeholder", "er");
        incorrect();
        inputWonderful.style.border = "3px solid red";
        gameOver();
        clearInterval(timer);
    })
    elemRe.addEventListener("click", function () {
        inputWonderful.setAttribute("placeholder", "re");
        incorrect();
        inputWonderful.style.border = "3px solid red";
        gameOver();
        clearInterval(timer);
    })
    elemEst.addEventListener("click", function () {
        inputWonderful.setAttribute("placeholder", "est");
        incorrect();
        inputWonderful.style.border = "3px solid red";
        gameOver();
        clearInterval(timer);
    })
    elemDis.addEventListener("click", function () {
        inputWonderful.setAttribute("placeholder", "dis");
        incorrect();
        inputWonderful.style.border = "3px solid red";
        gameOver();
        clearInterval(timer);
    })
    elemUn.addEventListener("click", function () {
        inputWonderful.setAttribute("placeholder", "un");
        incorrect();
        inputWonderful.style.border = "3px solid red";
        gameOver();
        clearInterval(timer);
    })
    const focusedElement = document.activeElement;
    console.log(focusedElement)
}) */

/* inputUnhappy.addEventListener("focus", function (){
    for (let i=0; i<fixArr; i++) {
        let elem = fixArr[i]
        console.log(elem[i])
        elem.addEventListener("click", function () {
            if(elemUn){
                console.log("correct")
                inputDislike.focus();
            } else {
                console.log("incorrect")
                inputDislike.focus();
            }
        })
    }

}) */



