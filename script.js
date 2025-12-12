let playerTurn = "X"; // Current player's turn
const NUMBER_OF_ROWS = 3; // Number of rows and columns in the Tic Tac Toe Board
const turns = NUMBER_OF_ROWS ** 2; // Maximum number of turns in the game
let turnsCounter = 0; // Count the numbers of played turns to detect if the board is full

const container = document.querySelector(".container");
const resetButton = document.querySelector("#reset");

const message = document.createElement("span");
message.classList.add("message");

const createDynamicMatrix = () => {
  let board = [];

  for (let row = 0; row < NUMBER_OF_ROWS; row++) {
    board.push(Array.from({ length: NUMBER_OF_ROWS }, () => "_"));
  }

  return board;
};

let matrix = createDynamicMatrix();

// Check Winning Conditions
const checkRow = (currentPlayer) => {
  let column = 0;

  for (let row = 0; row < NUMBER_OF_ROWS; row++) {
    for (let j = 0; j < NUMBER_OF_ROWS; j++) {
      if (matrix[row][column] !== currentPlayer) {
        column = 0;
        break;
      }
      column++;
    }

    if (column === NUMBER_OF_ROWS) {
      return true;
    }
  }
};
const checkCol = (currentPlayer) => {
  let row = 0;

  for (let column = 0; column < NUMBER_OF_ROWS; column++) {
    for (let j = 0; j < NUMBER_OF_ROWS; j++) {
      if (matrix[row][column] !== currentPlayer) {
        row = 0;
        break;
      }
      row++;
    }

    if (row === NUMBER_OF_ROWS) {
      return true;
    }
  }
};
const checkDiagonal = (currentPlayer) => {
  let counter = 0;

  for (let j = 0; j < NUMBER_OF_ROWS; j++) {
    if (matrix[counter][counter] !== currentPlayer) {
      counter = 0;
      break;
    }
    counter++;
  }

  if (counter === NUMBER_OF_ROWS) {
    return true;
  }
};
const checkReversedDiagonal = (currentPlayer) => {
  let counter = 0;

  for (let j = 0; j < NUMBER_OF_ROWS; j++) {
    if (matrix[counter][NUMBER_OF_ROWS - 1 - counter] !== currentPlayer) {
      counter = 0;
      break;
    }
    counter++;
  }

  if (counter === NUMBER_OF_ROWS) {
    return true;
  }
};

const checkWinner = (currentPlayer) => {
  if (checkRow(currentPlayer)) return true;

  if (checkCol(currentPlayer)) return true;

  if (checkDiagonal(currentPlayer)) return true;

  if (checkReversedDiagonal(currentPlayer)) return true;
};
//-------------------------------------------------

const playerWon = (currentPlayer) => {
  message.classList.add(`player--${currentPlayer}`);
  message.textContent = `Player ${currentPlayer} Won!`;
  container.insertAdjacentElement("afterbegin", message);
  setTimeout(() => resetBoard(), 2000);
};

const resetBoard = () => {
  document.querySelector(".board").remove();
  message.classList.remove(`player--${playerTurn}`);
  message.remove();
  matrix = createDynamicMatrix();
  playerTurn = "X";
  turnsCounter = 0;

  InitializeBoard();
};

const runDrawEvent = () => {
  message.classList.add("draw");
  message.textContent = "It's a Draw!";
  container.insertAdjacentElement("afterbegin", message);
  setTimeout(() => resetBoard(), 2000);
};

const drawPlayer = (cell, playerTurn) => {
  cell.querySelector(".value").textContent = playerTurn;
  cell.classList.add(`cell--${playerTurn}`);
};

const cellClickHandler = (event, index) => {
  const cell = event.target;

  const row = Math.floor(index / NUMBER_OF_ROWS);
  const col = index % NUMBER_OF_ROWS;

  if (matrix[row][col] !== "_") return;

  matrix[row][col] = playerTurn;
  turnsCounter++;
  drawPlayer(cell, playerTurn);

  if (checkWinner(playerTurn)) playerWon(playerTurn);
  else {
    if (turnsCounter === turns) runDrawEvent();
    playerTurn = playerTurn === "X" ? "O" : "X";
  }
};

// Initialization Of The Game Board
const InitializeBoardCells = (index) => {
  const boardCell = `
                        <div class="cell" role="button" tabindex="${index + 1}">
                          <span class="value"></span>
                        </div>
                        `;
  const boardCellElement = document
    .createRange()
    .createContextualFragment(boardCell);
  boardCellElement.querySelector(".cell").onclick = (event) =>
    cellClickHandler(event, index);
  boardCellElement.querySelector(".cell").onkeydown = (event) =>
    event.key === "Enter" ? cellClickHandler(event, index) : true;

  return boardCellElement;
};

const InitializeBoard = () => {
  const board = document.createElement("div");

  board.classList.add("board");

  for (let i = 0; i < turns; i++) {
    let boardCellElement = InitializeBoardCells(i);
    board.appendChild(boardCellElement);
  }

  document.documentElement.style.setProperty("--grid-rows", NUMBER_OF_ROWS);

  container.insertAdjacentElement("afterbegin", board);
};

InitializeBoard();
//-------------------------------------------------

resetButton.onclick = resetBoard;


