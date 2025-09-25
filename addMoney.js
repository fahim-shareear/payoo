const addMoney = document.getElementById('btnBottom');
const validPin = 1234;
const withdrawMoney = document.getElementById('btnWithdraw');
const transferMoney = document.getElementById('btnTransfer');
const getBonus = document.getElementById('btnBonus');
const payBill = document.getElementById('payButton');

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

/* --------- your money logic (unchanged) --------- */
addMoney.addEventListener('click', function(e){
    e.preventDefault();
    const bankNumber = getValue('bankAdd');
    const addAmount = getInputValue('add-amount');
    const addPin = getInputValue('pinNumber');
    const mainBalance = parseInt(document.getElementById('balance').innerText);
    if(bankNumber.length < 11){ alert("Please Provide correct Bank Number"); return; }
    if(addPin !== validPin){ alert('Incorrect Pin'); return; }
    getInnerText(mainBalance + addAmount);
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
});

getBonus.addEventListener('click', function(e){
    e.preventDefault();
    const cupon = getValue('cupon');
    const balance = parseInt(document.getElementById('balance').innerText);
    if(cupon.length < 8 || isNaN(cupon)){ alert('Please Provide Correct Coupon Number'); return; }
    const randomBonus = Math.floor(Math.random() * 9001) + 1000;
    getInnerText(balance + randomBonus);
    alert(`🎉 Congrats! You received a bonus of ${randomBonus}`);
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
});

/* --------- toggles --------- */
document.getElementById('addSection').addEventListener('click', () => {
    toggleButtons('addSectionOne'); handleButonToggle('addSection');
});
document.getElementById('cashSection').addEventListener('click', () => {
    toggleButtons('cashOut'); handleButonToggle('cashSection');
});
document.getElementById('transferSection').addEventListener('click', () => {
    toggleButtons('transfer'); handleButonToggle('transferSection');
});
document.getElementById('bonusSection').addEventListener('click', () => {
    toggleButtons('bonus'); handleButonToggle('bonusSection');
});
document.getElementById('payBillSection').addEventListener('click', () => {
    toggleButtons('payBill'); handleButonToggle('payBillSection');
});

/* --------- logout --------- */
document.getElementById('logOut').addEventListener('click', () => {
    window.location.href = './index.html';
});
