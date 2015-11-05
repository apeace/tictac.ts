let table = document.getElementById('table');
table.addEventListener('click', (e: MouseEvent) => {
  let el = <HTMLElement>e.target;
  // parse the id "cell3" into the number 3
  let id = parseInt(el.id.substring(4));
  el.innerHTML = String(id);
});