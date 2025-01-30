let GameName = "Guess Game";
Document.title = "GameName";
document.querySelector("h1").innerHTML = "GameName";
document.querySelector(
  "footer"
).innerHTML = `${GameName} created by Nada Helal`;

let numbersOfTry = 6;
let numbersOfLetters = 6;
let current = 1;
let numberOfHints = 2;

//manage words
let wordToGuess = "";
const words = [
  "Create",
  "Update",
  "Delete",
  "Master",
  "Branch",
  "Mainly",
  "Elzero",
  "School",
];
wordToGuess = words[Math.floor(Math.random() * words.length)].toLowerCase();
let messageArea = document.querySelector(".message");

document.querySelector(".hint span").innerHTML = numberOfHints;
const getHintButton = document.querySelector(".hint");
getHintButton.addEventListener("click", getHint);
function generateInputs() {
  const inputsContainer = document.querySelector(".inputs");
  for (let i = 1; i <= numbersOfTry; i++) {
    const tryDiv = document.createElement("div");
    tryDiv.classList.add(`try-${i}`);
    tryDiv.innerHTML = `<span>Try ${i}</span>`;
    if (i !== 1) tryDiv.classList.add("disabled-inputs");

    for (let j = 1; j <= numbersOfLetters; j++) {
      const input = document.createElement("input");
      input.type = "text";
      input.id = `guess-${i}-letter${j}`;
      input.setAttribute("maxlength", "1");
      tryDiv.appendChild(input);
    }
    inputsContainer.appendChild(tryDiv);
  }
  inputsContainer.children[0].children[1].focus();

  const inputDisable = document.querySelectorAll(".disabled-inputs input");
  inputDisable.forEach((input) => (input.disabled = true));

  const inputs = document.querySelectorAll("input");
  inputs.forEach((input, index) => {
    input.addEventListener("input", function () {
      this.value = this.value.toUpperCase();
      const nextInput = inputs[index + 1];
      if (nextInput) nextInput.focus();
    });
    input.addEventListener("keydown", function (event) {
      const currentIndex = Array.from(inputs).indexOf(event.target);
      if (event.key === "ArrowRight") {
        const nextInput = currentIndex + 1;
        if (nextInput < inputs.length) inputs[nextInput].focus();
      }

      if (event.key === "ArrowLeft") {
        const preInput = currentIndex - 1;
        if (preInput >= 0) inputs[preInput].focus();
      }
    });
  });
}

const guessButton = document.querySelector(".check");
guessButton.addEventListener("click", handleGuesses);
console.log(wordToGuess);
function handleGuesses() {
  let successGuess = true;
  console.log(wordToGuess);

  for (let i = 1; i <= numbersOfLetters; i++) {
    const inputFild = document.querySelector(`#guess-${current}-letter${i}`);

    const letter = inputFild.value.toLowerCase();

    const actualLetter = wordToGuess[i - 1];

    if (letter === actualLetter) {
      inputFild.classList.add("in-place");
    } else if (wordToGuess.includes(letter) && letter !== "") {
      inputFild.classList.add("not-in-place");
      successGuess = false;
    } else {
      inputFild.classList.add("no");
      successGuess = false;
    }
  }
  if (successGuess) {
    messageArea.innerHTML = `You win the Word is<span> ${wordToGuess}<span>`;
    if (numberOfHints === 2) {
      messageArea.innerHTML = `congratulation you win without using any hint`;
    }
    let allTry = document.querySelectorAll(".inputs > div");
    allTry.forEach((tryDiv) => tryDiv.classList.add("disabled-inputs"));
    guessButton.disabled = true;
    getHintButton.disabled = true;
  } else {
    document.querySelector(`.try-${current}`).classList.add("disabled-inputs");
    const currentTryInput = document.querySelectorAll(`.try-${current} input`);
    currentTryInput.forEach((input) => (input.disabled = true));
    current++;

    const nextTryInput = document.querySelectorAll(`.try-${current} input`);
    nextTryInput.forEach((input) => (input.disabled = false));

    let el = document.querySelector(`.try-${current}`);
    if (el) {
      document
        .querySelector(`.try-${current}`)
        .classList.remove("disabled-inputs");
      el.children[1].focus();
    } else {
      guessButton.disabled = true;
      getHintButton.disabled = true;
      messageArea.innerHTML = `You Lose The Game ${wordToGuess}`;
    }
  }
}
function getHint() {
  if (numberOfHints > 0) {
    numberOfHints--;
    document.querySelector(".hint span").innerHTML = numberOfHints;
  }
  if (numberOfHints === 0) {
    getHintButton.disabled = true;
  }
  const enabledInput = document.querySelectorAll("input:not([disabled])");
  const emptyEnableInputs = Array.from(enabledInput).filter(
    (input) => input.value === ""
  );
  if (emptyEnableInputs.length > 0) {
    const randomIndex = Math.floor(Math.random() * emptyEnableInputs.length);
    const randomInput = emptyEnableInputs[randomIndex];
    const indexToFill = Array.from(enabledInput).indexOf(randomInput);
    console.log(randomIndex);
    console.log(randomInput);
    console.log(indexToFill);
    if (indexToFill !== -1) {
      randomInput.value = wordToGuess[indexToFill].toUpperCase();
    }
  }
}
function handleBackSpace(event) {
  if (event.key === "Backspace") {
    const inputs = document.querySelectorAll("input:not([disabled])");
    const currentIndex = Array.from(inputs).indexOf(document.activeElement);
    if (currentIndex > 0) {
      const currentInput = inpu;
      ts[currentIndex];
      const preInput = inputs[currentIndex - 1];
      currentInput.value = "";
      preInput.value = "";
      preInput.focus();
    }
  }
}
document.addEventListener("keydown", handleBackSpace);
window.onload = function () {
  generateInputs();
};
