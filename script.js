const switchColor = document.querySelector(".select-color");
const subBtn = document.querySelector(".sub-button");
const body = document.querySelector("body");
const headerMain = document.querySelector(".header-main");
const passContainer = document.querySelector("#main-container");
const inps = document.querySelectorAll("input");
const formContainer = document.querySelector("#form-container");
const passArea = document.querySelector("#pass-area");
const copyBtn = document.querySelector("#copy-button");
const passLength = document.querySelector("input");
const pass = document.querySelector("#pass-area h3");
const lengthInp = document.querySelector("#length");
const lettersCheck = document.querySelector("#letters");
const numbersCheck = document.querySelector("#numbers");
const symbolsCheck = document.querySelector("#symbols");
const moreOptions = document.querySelector("#more-options");
const advancedForm = document.querySelector("#advanced-pass-container");
const bigL = document.querySelector("#big-letters");
const smallL = document.querySelector("#small-letters");
const advancedNums = document.querySelector("#advanced-numbers");
const advancedSymbs = document.querySelector("#advanced-symbols");

const elements = [
  switchColor,
  subBtn,
  headerMain,
  body,
  passContainer,
  formContainer,
  advancedForm,
  passArea,
  copyBtn,
];

const sortLetter = (max = lengthInp.value) => {
  const letters = "abcdefghijklmnopqrstuvwxyz";
  if (max > 0) {
    return letters[Math.floor(Math.random() * letters.length)];
  }

  return;
  null;
};

const sortLetterPlus = (max = lengthInp.value) => {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  if (max > 0) {
    return letters[Math.floor(Math.random() * letters.length)];
  }

  return;
};

const sortNum = (max = lengthInp.value) => {
  if (max > 0) {
    return Math.floor(Math.random() * 10);
  }
  return;
};

const sortSymb = (max = lengthInp.value) => {
  const symbs = "(){}[]*%$#@!<>/-_='";
  if (max > 0) {
    return symbs[Math.floor(Math.random() * symbs.length)];
  }
  return;
};

const toggleMode = (elements) => {
  elements.forEach((el) => {
    el.classList.toggle("dark");
  });
  inps.forEach((inp) => inp.classList.toggle("dark"));
};

switchColor.addEventListener("click", (e) => {
  e.preventDefault();
  toggleMode(elements);

  if (e.target.classList.contains("dark")) {
    e.target.innerText = "Dark";
  }

  e.target.classList.contains("dark")
    ? (e.target.innerText = "Dark")
    : (e.target.innerText = "Light");
});

subBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const funcArr = [];
  passArr = [];
  passArea.classList.remove("hide");
  copyBtn.classList.remove("not-copy");

  if (!formContainer.classList.contains("hide")) {
    if (lettersCheck.checked) funcArr.push(sortLetter, sortLetterPlus);
    if (numbersCheck.checked) funcArr.push(sortNum);
    if (symbolsCheck.checked) funcArr.push(sortSymb);

    if (funcArr.length === 0 || parseInt(lengthInp.value) <= 0) {
      copyBtn.classList.add("not-copy");
      pass.innerText = "Impossible to generate!";
      copyBtn.innerText = "Unavaible to Copy!";
      return;
    }

    for (i = 0; i < lengthInp.value; i++) {
      passArr.push(funcArr[Math.floor(Math.random() * funcArr.length)]());
    }
  } else {
    const bigLength = parseInt(bigL.value);
    const smallLength = parseInt(smallL.value);
    const advNumsLength = parseInt(advancedNums.value);
    const advSymbsLength = parseInt(advancedSymbs.value);
    const advPassLength =
      bigLength + smallLength + advNumsLength + advSymbsLength;

    if (advPassLength <= 0) {
      copyBtn.classList.add("not-copy");
      pass.innerText = "Impossible to generate!";
      copyBtn.innerText = "Unavaible to Copy!";
      return;
    }

    const funcArr = [sortLetterPlus, sortLetter, sortNum, sortSymb];
    const funcsMax = [bigLength, smallLength, advNumsLength, advSymbsLength];
    counter = advPassLength;

    while (counter > 0) {
      const sortIndex = Math.floor(Math.random() * funcArr.length);

      if (funcsMax[sortIndex] <= 0) {
        counter++;
        funcArr.splice(sortIndex, 1);
        funcsMax.splice(sortIndex, 1);
      } else {
        const sortChar = funcArr[sortIndex](funcsMax[sortIndex]);
        funcsMax[sortIndex] = funcsMax[sortIndex] - 1;
        passArr.push(sortChar);
      }
      counter = 0;
      funcsMax.forEach((qtt) => (counter = counter + qtt));
    }
  }

  const passString = passArr.join("");
  pass.innerText = passString;
  copyBtn.innerText = "Copy!";
});

moreOptions.addEventListener("click", () => {
  formContainer.classList.toggle("hide");
  advancedForm.classList.toggle("hide");

  if (formContainer.classList.contains("hide")) {
    moreOptions.innerText = "Simple Password";
  } else {
    moreOptions.innerText = "More Options";
  }
});

copyBtn.addEventListener("click", (e) => {
  e.preventDefault();

  if (copyBtn.classList.contains("not-copy")) return;

  navigator.clipboard.writeText(pass.innerText).then(() => {
    e.target.innerText = "Copied!";
    setTimeout(() => (e.target.innerText = "Copy"), 1500);
  });
});
