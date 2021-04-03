const data = document.getElementById("computerText");
const text = document.getElementById("textarea");
const startgame = document.getElementById("start");
const date = document.getElementById("time");

text.hidden = true;
// Start Button
startgame.addEventListener("click", () => {
  text.hidden = false;
  startgame.style.visibility = "hidden";
  text.focus();
  setTimeout(() => {
    start();
  }, 1000);
});

// Computer Text converting into Array
const datatext = data.textContent
  .split(" ")
  .filter((words) => words.trim() !== "");

// Making Array of user Text with Span with forEach Loop
let a = [];
data.innerText = "";
datatext.forEach((word) => {
  const span = document.createElement("span");
  span.innerText = word;
  a.push(span);
  data.appendChild(span);
});

// Taking Textarea Data and converting into array

text.addEventListener("input", (e) => {
  let userText = e.target.value
    .split(" ")
    .filter((words) => words.trim() !== "");
    check(userText);

});

//  Matching User array with computer data array by looping

function check(userText) {
  a.forEach((span) => {
    span.className = `white`;
  });
  userText.forEach((user, idx) => {
    if (a[idx].textContent.slice(0, user.length) === user) {
      if (a[idx].textContent.length === user.length) {
        a[idx].className = 'green'
       
      } else {
        if(userText[idx + 1]){
          a[idx].className = 'red'
        }else{
          a[idx].className = 'gray'
        }
      }
    } else {
      a[idx].className = 'red'
    }
  });
}

// Making Time functionality by (/ and %)

let starting = 0;

function start() {
  let interval = setInterval(() => {
    starting++;
    let minute = Math.floor(starting / 60);
    if (minute === 1) {
      clearInterval(interval);
      stop();
    }
    let seconds = starting % 60;
    minute = minute < 10 ? `0${minute}` : minute;
    seconds = seconds < 10 ? `0${seconds}` : seconds;
    date.innerText = `Time: ${minute}: ${seconds}`;
  }, 1000);
}

// Checking Green worlds on Computer data Array and displaying them

let greenWords = 0;
let allWords = 0;

function stop() {
  text.hidden = true;

  a.forEach((span) => {
    allWords++;
    if (
      getComputedStyle(span).getPropertyValue("color") === "rgb(170, 215, 88)"
    ) {
      greenWords++;
    }
  });

  data.className = `container add`;
  document.querySelector(
    ".pop-up h2"
  ).textContent = `You have Completed ${greenWords} out of ${allWords} total  words in given Time`;
}
