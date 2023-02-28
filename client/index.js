document.addEventListener('DOMContentLoaded', function () {
  fetch('http://localhost:5500/getAll')
    .then((response) => response.json())
    .then((data) => loadHTMLTable(data['data']));
});
// funkcija za brisanje v tabeli

document
  .querySelector('table tbody')
  .addEventListener('click', function (event) {
    if (event.target.className === 'delete-row-btn') {
      deleteRowById(event.target.dataset.id);
    }
  });

function deleteRowById(id) {
  fetch('http://localhost:5500/delete/' + id, {
    method: 'DELETE',
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        location.reload();
      }
    });
}
const numberList = document.getElementById('numberList');
// dodavanje naključne številke v listo
const addRandomNumberButton = document.getElementById('dodajRandom');
addRandomNumberButton.addEventListener('click', function () {
  const randomNumber = Math.floor(Math.random() * 1000) + 1;
  const li = document.createElement('li');
  li.innerText = randomNumber;
  numberList.appendChild(li);
});
// dodaj 5 naključnih številk MED 1 IN 1000 v listo

for (let i = 0; i < 5; i++) {
  const randomNumber = Math.floor(Math.random() * 100) + 1;
  const listItem = document.createElement('li');
  listItem.innerText = randomNumber;
  numberList.appendChild(listItem);
}
/////////////////////////////////////////////////////////////////////////////////

const manualNumberInput = document.getElementById('dodajInput');
const addManualNumberButton = document.getElementById('dodajButton');
// Dodaj številko iz inputa

addManualNumberButton.addEventListener('click', function () {
  const manualNumber = manualNumberInput.value;
  manualNumberInput.value = '';
  if (manualNumber === '') {
    alert('Prosimo unestie celo številko.');
  } else if (Number.isInteger(Number(manualNumber))) {
    const li = document.createElement('li');
    li.innerText = manualNumber;
    numberList.appendChild(li);
  } else {
    alert('Prosimo unesite celo številko.');
  }
});
//////////////////////////////////////////////////////////////

//izbriši naključno številko iz liste

const removeRandomNumberButton = document.getElementById(
  'odstraniRandomStevilko'
);
// Odstrani naključno številko

removeRandomNumberButton.addEventListener('click', function () {
  const numberListItems = numberList.getElementsByTagName('li');
  if (numberListItems.length > 0) {
    const randomIndex = Math.floor(Math.random() * numberListItems.length);
    numberList.removeChild(numberListItems[randomIndex]);
  }
});
/////////////////////////////////////////////////////////////
const removeAllNumbersButton = document.getElementById('odstraniVse');
removeAllNumbersButton.addEventListener('click', function () {
  numberList.innerHTML = '';
});

// izracun mediane
const addBtn = document.querySelector('#add-mediana-btn');

addBtn.onclick = function () {
  const numberList = getNumberList();
  const mediana = calculateMedian(numberList);

  fetch('http://localhost:5500/insert', {
    headers: {
      'Content-type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({ mediana: mediana }),
  })
    .then((response) => response.json())
    .then((data) => insertRowIntoTable(data['data']));
};

function getNumberList() {
  const numberElements = document.querySelectorAll('#numberList li');
  const numberList = [];

  for (let i = 0; i < numberElements.length; i++) {
    numberList.push(parseInt(numberElements[i].textContent));
  }

  return numberList;
}

function calculateMedian(numberList) {
  const sortedList = numberList.slice().sort((a, b) => a - b);
  const middleIndex = Math.floor(sortedList.length / 2);

  if (sortedList.length % 2 === 0) {
    return (sortedList[middleIndex - 1] + sortedList[middleIndex]) / 2;
  } else {
    return sortedList[middleIndex];
  }
}

//dodaj novo vrstico v tabelu
function insertRowIntoTable(data) {
  console.log(data);
  const table = document.querySelector('table tbody');
  const isTableData = table.querySelector('.no-data');

  let tableHtml = '<tr>';

  for (var key in data) {
    if (data.hasOwnProperty(key)) {
      if (key === 'dateAdded') {
        data[key] = new Date(data[key]).toLocaleString();
      }
      tableHtml += `<td>${data[key]}</td>`;
    }
  }

  tableHtml += `<td><button class="delete-row-btn" data-id=${data.id}>Delete</td>`;
  tableHtml += '</tr>';

  if (isTableData) {
    table.innerHTML = tableHtml;
  } else {
    const newRow = table.insertRow();
    newRow.innerHTML = tableHtml;
  }
}

function loadHTMLTable(data) {
  const table = document.querySelector('table tbody');

  if (data.length === 0) {
    table.innerHTML = "<tr><td class='no-data' colspan='4'>No Data</td></tr>";
    return;
  }

  let tableHtml = '';

  data.forEach(function ({ id, mediana, date_added }) {
    tableHtml += '<tr>';
    tableHtml += `<td>${id}</td>`;
    tableHtml += `<td>${mediana}</td>`;
    tableHtml += `<td>${new Date(date_added).toLocaleString()}</td>`;
    tableHtml += `<td><button class="delete-row-btn" data-id=${id}>Delete</td>`;
    tableHtml += '</tr>';
  });

  table.innerHTML = tableHtml;
}

function updateNumberList() {
  const numberList = getNumberList();
  const listElement = document.getElementById('numberList');
  listElement.innerHTML = '';

  numberList.forEach(function (number) {
    const listItem = document.createElement('li');
    listItem.innerText = number;
    listElement.appendChild(listItem);
  });
}
