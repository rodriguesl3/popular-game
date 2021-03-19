const baseUrl = "http://localhost:3535/game";
let boardId = 0;
let currentRow = 0;
let currentColumn = 0;

const buildBoard = async () => {
  const payload = await httpRequest(`${baseUrl}/10`, "POST");
  buildTable(payload.data);
};

const requestMove = async (direction) => {
  const payload = await httpRequest(
    `${baseUrl}/${boardId}/direction/${direction}`,
    "PUT"
  );
  buildTable(payload.data);
};

const getBoard = async () => {
  return await httpRequest(`${baseUrl}/${boardId}`, "GET");
};

const buildTable = (matrix) => {
  const element = document.getElementsByClassName("app")[0];
  boardId = matrix.id;
  let tableResponse = ``;
  const [[key, value]] = Object.entries(matrix.currentPosition);

  currentRow = +key;
  currentColumn = +value;

  matrix.state.forEach((row, index) => {
    tableResponse += buildComponent(index, row.column, +key === index, value);
  });

  element.innerHTML = tableResponse;
};

const buildComponent = (rowIndex, row, selectedRow, postion) => {
  return row
    .map(
      (cell, index) =>
        `<div class="cell ${
          index === postion && selectedRow ? "active" : ""
        }" style="background-color: ${cell.color}"
        onClick="makeMove(${index},${rowIndex})"
        ></div>`
    )
    .join("");
};

const makeMove = async (colIndex, rowIndex) => {
  let direction = "";
  if (colIndex !== currentColumn) {
    //right or left
    if (colIndex > currentColumn) {
      direction = "right";
    } else {
      direction = "left";
    }
  } else if (rowIndex !== currentRow) {
    //top or down
    if (rowIndex > currentRow) {
      direction = "down";
    } else {
      direction = "top";
    }
  }

  requestMove(direction);
};

const httpRequest = async (url, method) => {
  const response = await fetch(url, {
    method: method,
  });

  const payload = await response.json();
  return payload;
};

window.onload = (event) => buildBoard();
