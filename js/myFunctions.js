function resizeMyInput(el) {
  el.style.width = (el.value.length) + 'ch';
}

function renderTable(data) {
  let errorMessage = '';
  const tableBox = document.querySelector('.myTable-Box');

  const selectedBtn = data.selectedBtnRadio.split('btnRadio')[1];
  let coeffPoints = 1;
  if (selectedBtn === 'HardSkill') {
    coeffPoints = 2;
  } else if (selectedBtn === 'BaseParameter') {
    coeffPoints = 10;
  }

  const mod = Number(data.modificator);
  const currLevel = Number(data['Current level']);
  const wantedLevel = Number(data['Wanted level']);
  let sumPoints = 0;
  let currCurrLevel = currLevel;
  let goalCurrLevel = 0;

  if (mod <= 0) {
    goalCurrLevel = wantedLevel + Math.abs(mod);
  } else if (mod > 0) {
    goalCurrLevel = wantedLevel - mod;
  }

  if (currLevel < 0) {
    errorMessage = `Ошибка: <b>Текущий</b> уровень должен быть больше или равен <b>0</b>`;
  } else if (currLevel >= goalCurrLevel) {
    errorMessage = `Вы уже достигли <b>Желаемого</b> уровня!`;
  }
  if (errorMessage !== '') {
    tableBox.innerHTML = errorMessage;
    return;
  }

  const table = document.createElement('table');
  table.className = 'table table-striped';
  
  // Заголовок таблицы
  const thead = document.createElement('thead');
  table.appendChild(thead);
  const trHead = document.createElement('tr');
  thead.appendChild(trHead);
  const headers = ['Уровень', 'Уровень + Модификатор', 'О.У. суммарно'];
  headers.forEach(headerText => {
    const th = document.createElement('th');
    th.scope = 'col';
    th.textContent = headerText;
    trHead.appendChild(th);
  });

  const tbody = document.createElement('tbody');
  table.appendChild(tbody);
  
  for (let i = currCurrLevel; i < goalCurrLevel; i += 1) {
    currCurrLevel += 1;
    const tr = document.createElement('tr');
    const th = document.createElement('th');
    th.scope = 'col';
    th.textContent = currCurrLevel;
    tr.appendChild(th);

    const tdLevelMod = document.createElement('td');
    let levelMod = currCurrLevel + mod;
    if (levelMod <= 0) levelMod = 1;
    tdLevelMod.textContent = levelMod;
    tr.appendChild(tdLevelMod);

    const tdSumPoints = document.createElement('td');
    sumPoints += (currCurrLevel - 1 === 0 ? 1 : currCurrLevel - 1) * coeffPoints;
    tdSumPoints.textContent = sumPoints;
    tr.appendChild(tdSumPoints);

    tbody.appendChild(tr);
  }

  tableBox.innerHTML = '';
  tableBox.appendChild(table);
}

// focus lastCell (with sum Skill Points) & show this number above
function focusAfterRender() {
  const tbody = document.querySelector('table tbody');
  const lastRow = tbody.lastElementChild;
  const cells = lastRow.querySelectorAll('th, td');
  const lastCell = cells[cells.length - 1];
  const lastCellValue = lastCell.textContent;
  lastCell.innerHTML = `<b>${lastCellValue}</b>`;

  // scroll display to... and focus lastCell:
  // lastCell.setAttribute('tabindex', '-1');
  // lastCell.focus();
  // lastCell.scrollIntoView({
  //   behavior: 'smooth',
  //   block: 'center',
  //   inline: 'nearest'
  // });
  
  const requiredSkillPoints = document.getElementById('requiredSkillPoints');
  requiredSkillPoints.innerHTML = `Потребуется <b>${lastCellValue}</b> О.У.`;
}

function calculator(e) {
  e.preventDefault;
  const form = document.getElementById('baseForm');
  const formData = new FormData(form);
  const data = {};
  for (const [key, value] of formData.entries()) {
    data[key] = value;
  }
  delete data.btnradio;
  const selectedBtnRadio = document
    .querySelector('input[name="btnradio"]:checked');
  data.selectedBtnRadio = selectedBtnRadio.id;

  renderTable(data);
  focusAfterRender();
};

// calculator(e);

// '+' and '-' buttons change input's value
function changeValue(event) {
  const btn = event.currentTarget;
  const value = Number(btn.textContent + '1');

  const parent = btn.parentElement;
  const input = parent.querySelector('input');
  input.value = Number(input.value) + value;
  resizeMyInput(input);
}