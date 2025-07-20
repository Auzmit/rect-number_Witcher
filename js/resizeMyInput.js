function resizeMyInput(el) {
  // console.log(el);
  el.style.width = (el.value.length + 1) + 'ch';
  console.log(el.style.width);
  // const tester = document.getElementById('widthTester');
  // tester.style.font = getComputedStyle(el).font;
  // tester.textContent = el.value || el.placeholder || '';
  // const width = tester.offsetWidth + 2; // маленький запас на курсор
  // el.style.width = width + 'px';
}

// const inputEl = document.getElementById('myInput');
// resizeMyInput(inputEl);