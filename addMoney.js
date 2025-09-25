const addMoney = document.getElementById('btnBottom');
const validPin = 1234;
const withdrawMoney = document.getElementById('btnWithdraw');
const transferMoney = document.getElementById('btnTransfer');
const getBonus = document.getElementById('btnBonus');
const payBill = document.getElementById('payButton');
const viewAllBtn = document.getElementById('viewAllBtn');
const historyContainer = document.getElementById('historyContainer');
const historyList = document.getElementById('historyList');

// ---------- Edited: Added transactionHistory array and addTransaction function ----------
const transactionHistory = []; // stores all transactions

function addTransaction(type, amount, details){
    const date = new Date().toLocaleString();
    const transaction = { type, amount, details, date };
    transactionHistory.push(transaction);
}
// ------------------------------------------------------------------------------

// helpers
function getInputValue(id){ return parseInt(document.getElementById(id).value); }
function getValue(id){ return document.getElementById(id).value; }
function getInnerText(value){ document.getElementById('balance').innerText = value; }

// toggle with animation
function toggleButtons(id){
    const forms = document.getElementsByClassName('form');
    for(const form of forms){
        if(form.classList.contains('active')){
            form.classList.remove('active');
            form.classList.add('hide');
            setTimeout(() => {
                form.classList.remove('show','hide');
                form.style.display = 'none';
            }, 400);
        }
    }
    const target = document.getElementById(id);
    target.style.display = 'block';
    target.classList.add('show');
    setTimeout(() => target.classList.add('active'), 10);
}

// highlight card
function handleButonToggle(id){
    const formBtn = document.getElementsByClassName('card');
    for(const btn of formBtn){
        btn.classList.remove('border-[#0874f2]', 'bg-[#0874f20d]');
        btn.classList.add("border-[#0808081A]");
    }
    const target = document.getElementById(id);
    target.classList.remove("border-[#0808081A]");
    target.classList.add("border-[#0874f2]", "bg-[#0874f20d]");
}

// ---------- Event Listeners for all forms ----------
addMoney.addEventListener('click', function(e){
    e.preventDefault();
    const bankNumber = getValue('bankAdd');
    const addAmount = getInputValue('add-amount');
    const addPin = getInputValue('pinNumber');
    const mainBalance = parseInt(document.getElementById('balance').innerText);

    if(bankNumber.length < 11){ alert("Please Provide correct Bank Number"); return; }
    if(addPin !== validPin){ alert('Incorrect Pin'); return; }

    getInnerText(mainBalance + addAmount);

    addTransaction("Add Money", addAmount, `Bank: ${bankNumber}`); // log transaction
});

withdrawMoney.addEventListener('click', function(e){
    e.preventDefault();
    const agent = getValue('agent');
    const amount = getInputValue('remove-amount');
    const pin = getInputValue('pinWithdraw');
    const balance = parseInt(document.getElementById('balance').innerText);

    if(agent.length < 11){ alert('Please provide correct Agent Number'); return; }
    if(pin !== validPin){ alert('Please enter Correct Pin Number'); return; }
    if(amount > balance){ alert('Insufficient Balance'); return; }

    getInnerText(balance - amount);

    addTransaction("Cash Out", amount, `Agent: ${agent}`); // log transaction
});

transferMoney.addEventListener('click', function(e){
    e.preventDefault();
    const acc = getValue('user');
    const amount = getInputValue('send-amount');
    const pin = getInputValue('pinTransfer');
    const balance = parseInt(document.getElementById('balance').innerText);

    if(acc.length < 11){ alert('Please provide correct Account Number'); return; }
    if(pin !== validPin){ alert('Please enter Correct Pin Number'); return; }
    if(amount > balance){ alert('Insufficient Balance'); return; }

    getInnerText(balance - amount);

    addTransaction("Transfer Money", amount, `To Account: ${acc}`); // log transaction
});

getBonus.addEventListener('click', function(e){
    e.preventDefault();
    const cupon = getValue('cupon');
    const balance = parseInt(document.getElementById('balance').innerText);

    if(cupon.length < 8 || isNaN(cupon)){ alert('Please Provide Correct Coupon Number'); return; }

    const randomBonus = Math.floor(Math.random() * 9001) + 1000;
    getInnerText(balance + randomBonus);
    alert(`🎉 Congrats! You received a bonus of ${randomBonus}`);

    addTransaction("Bonus Received", randomBonus, `Coupon: ${cupon}`); // log transaction, fixed typo
});

payBill.addEventListener('click', function(e){
    e.preventDefault();
    const billAccount = getValue('payAdd');
    const amount = getInputValue('pay-amount');
    const pin = getInputValue('payPin');
    const balance = parseInt(document.getElementById('balance').innerText);

    if(billAccount.length < 11){ alert("Please Provide correct Account Number"); return; }
    if(pin !== validPin){ alert('Incorrect Pin'); return; }
    if(amount > balance){ alert('Insufficient Balance'); return; }

    getInnerText(balance - amount);

    addTransaction("Pay Bill", amount, `Biller Account: ${billAccount}`); // log transaction
});

// ---------- View All button ----------
viewAllBtn.addEventListener('click', function(e){
    e.preventDefault();
    historyList.innerHTML = '';

    for(let i = transactionHistory.length -1; i >= 0; i--){
        const tx = transactionHistory[i];

        const div = document.createElement('div');
        div.classList.add(
            'flex', 'items-center', 'justify-between',
            'bg-white', 'rounded-xl', 'shadow-sm',
            'p-4', 'mb-3'
        );

        div.innerHTML = `
            <div class="flex items-center space-x-3">
                <div class="w-12 h-12 flex items-center justify-center rounded-full bg-gray-100">
                    <img src="./assets/wallet1.png" alt="icon" class="w-7 h-7">
                </div>
                <div>
                    <h2 class="font-semibold text-gray-800">${tx.type}</h2>
                    <p class="text-sm text-gray-500">${tx.date}</p>
                </div>
            </div>
            <div class="text-gray-500">
                <span class="cursor-pointer">⋮</span>
            </div>
        `;

        historyList.appendChild(div);
    };
});



// ---------- toggles ----------
document.getElementById('addSection').addEventListener('click', () => { toggleButtons('addSectionOne'); handleButonToggle('addSection'); });
document.getElementById('cashSection').addEventListener('click', () => { toggleButtons('cashOut'); handleButonToggle('cashSection'); });
document.getElementById('transferSection').addEventListener('click', () => { toggleButtons('transfer'); handleButonToggle('transferSection'); });
document.getElementById('bonusSection').addEventListener('click', () => { toggleButtons('bonus'); handleButonToggle('bonusSection'); });
document.getElementById('payBillSection').addEventListener('click', () => { toggleButtons('payBill'); handleButonToggle('payBillSection'); });
document.getElementById('transactionSection').addEventListener('click', () => { toggleButtons('transactionHistory'); handleButonToggle('transactionSection'); });

// ---------- logout ----------
document.getElementById('logOut')
.addEventListener('click', () => {
    window.location.href = './index.html';
});
