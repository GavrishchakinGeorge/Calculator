window.addEventListener("load", () => {
  const divButtons = document.querySelector("#buttons-container");
  const input = document.querySelector("#input");
  const inputPow = document.querySelector("#input-pow");
  const buttons = [
    "%",
    "√",
    "С",
    "÷",
    "7",
    "8",
    "9",
    "×",
    "4",
    "5",
    "6",
    "-",
    "1",
    "2",
    "3",
    "+",
    "±",
    "0",
    ".",
    "=",
  ];

  const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."];
  const actions = ["%", "√", "С", "÷", "×", "-", "+", "±"];

  let firstNumber = "";
  let secondNumber = "";
  let result = "";
  let signOperation = "";
  let finish = false;

  buttons.map((buttonText, index) => {
    const addButtons = document.createElement("button");

    addButtons.textContent = buttonText;
    addButtons.classList.add("button-class");

    let count = index++;

    addButtons.id = count;
    divButtons.append(addButtons);

    addButtons.addEventListener("click", (event) => {
      if (!event.target.classList.contains("button-class")) return;

      input.textContent = firstNumber;

      const buttonText = event.target.textContent;

      if (numbers.includes(buttonText)) {
        if (secondNumber === "" && signOperation === "") {
          firstNumber += buttonText;
          input.textContent = firstNumber;
        } else if (firstNumber !== "" && secondNumber !== "") {
          secondNumber = buttonText;
          finish = false;
          input.textContent = secondNumber;
        } else {
          secondNumber += buttonText;
          input.textContent = firstNumber;
        }
        return;
      }

      if (actions.includes(buttonText)) {
        signOperation = buttonText;
        input.textContent = signOperation;
        return;
      }

      if (buttonText === "=") {
        if (secondNumber === "") secondNumber = firstNumber;
        switch (signOperation) {
          case "+":
            result = +firstNumber + +secondNumber;
            break;
          case "-":
            result = firstNumber - secondNumber;
            break;
          case "÷":
            result = firstNumber / secondNumber;
            break;
          case "×":
            result = firstNumber * secondNumber;
            break;
          case "√":
            result = Math.pow(firstNumber, 1 / 2);
            break;
          case "±":
            result = `±${firstNumber}`;
            break;
          case "%":
            result = firstNumber % secondNumber;
            break;
          case "С":
            firstNumber = "";
            secondNumber = "";
            signOperation = "";
            result = "";
            input.textContent = "";
            break;
        }
        finish = true;
        inputPow.textContent = firstNumber + signOperation + secondNumber;
        input.textContent = result;
      }
    });
  });
  divButtons.classList.add("button");
});
