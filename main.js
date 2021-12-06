//MODAL 
//FUNCTION OPEN
const openModal = () => {
  const modal = document.querySelector('.modal');
  modal.classList.add('open');  
}

//FUNCTION CLOSE
const closeModal = () => {
  const modal = document.querySelector('.modal');
  modal.classList.remove('open');
}

//EVENTS
document.querySelector('#openModal').addEventListener('click', openModal);
document.querySelector('#cancel').addEventListener('click', closeModal);

//MODAL END

//LIST TRANSACTIONS
//VARIABLE DE DATABASE
let bank = [];

//CLEAR INPUT
const clearInput = () =>{
  document.querySelector('#nameTransactions').value = '';
  document.querySelector('#valueTransactions').value = '';
}

//LOCALSTORAGE
const getBank = () => JSON.parse(localStorage.getItem('list')) ?? [];

const setBank = (bank) => localStorage.setItem('list', JSON.stringify(bank));

//FUNCTION CREATE TRANSACTION
const createTransaction = (transaction, amount, date, index) => {
  const row = document.createElement('tr');
  row.innerHTML = `
    <td>${transaction}</td>
    <td>R$${amount}</td>
    <td>${date}</td>
    <td>
    <input class="delete" type="button" value="X" data-index=${index}>
    </td>`;
  document.querySelector('#list').appendChild(row);
}

//DO NOT REPEAT TRANSACTION
const clearTransaction = () => {
  const list = document.querySelector('#list');
  while (list.firstChild) {
    list.removeChild(list.firstChild);
  }
}

//UPDATE TRANSACTION
const updateTransactions = () => {
  clearTransaction();
  const bank = getBank();
  bank.forEach((item, index) =>
  createTransaction(item.transaction, item.amount, item.date ,index));
  uptadaBalance()
}

//FUNCTION UPDATE BALANCE VALUE
const uptadaBalance = () => {
  const transactionsAmounts = getBank().map(transaction => transaction.amount);

  const total = transactionsAmounts.reduce((accumulator, transaction) => accumulator + transaction, 0).toFixed(2);

  const valuePlus = transactionsAmounts.filter(value => value > 0).reduce((accumulator, value) => accumulator + value, 0).toFixed(2);

  const valueMinus = Math.abs(transactionsAmounts.filter(value => value < 0).reduce((accumulator, value) => accumulator + value, 0)).toFixed(2);

  const amountPlus = document.querySelector('#amountPlus').textContent = `R$ ${valuePlus}`;

  const amountMinus = document.querySelector('#amountMinus').textContent = `R$ ${valueMinus}`;

  const amountTotal = document.querySelector('#amountTotal').textContent = `R$ ${total}`;
}

//FUNCTION TRANSACTION
const transactions = () => {
  const name = document.querySelector('#nameTransactions').value;
  const date = document.querySelector('#date').value;
  const dateBr = date.replace(/(\d*)-(\d*)-(\d*).*/, '$3/$2/$1');

  const amount = document.querySelector('#valueTransactions').value;
  const newAmount = parseFloat(amount);
  if(name === '' || amount === '' || date === ''){
      alert('Preencha os campos corretamente!')
      return;
  }
  const bank = getBank();
  bank.push({transaction:name, amount:newAmount, date:dateBr});
  setBank(bank);
  updateTransactions();
  clearInput();
  closeModal();
}

//REMOVE TRANSACTION
const removeTransaction = (index) => {
  const bank = getBank();
  bank.splice(index, 1)
  setBank(bank);
  updateTransactions();
}

//CLICK FOR DELETE
const deleteTransaction = (event) => {
  const element = event.target;
  if(element.type === 'button'){
    const index = element.dataset.index;
    removeTransaction(index);
    updateTransactions();
  }
}

//EVENT
document.querySelector('#send').addEventListener('click', transactions);

document.querySelector('#list').addEventListener('click', deleteTransaction);

//UPDATE TRANSACTIONS
updateTransactions();
