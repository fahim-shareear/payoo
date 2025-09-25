const addMoney = document.getElementById('btnBottom');
const validPin = 1234;
const withdrawMoney = document.getElementById('btnWithdraw');
const transferMoney = document.getElementById('btnTransfer');
const getBonus = document.getElementById('btnBonus');
const payBill = document.getElementById('payButton');



function getInputValue(id){
    const mainInputValue = parseInt(document.getElementById(id).value);
    return mainInputValue;
};

function getValue(id){
    const value = document.getElementById(id).value;
    return value;
}

function getInnerText(value){
    const innerText = document.getElementById('balance');
    innerText.innerText = value;
};


//toggle button
function toggleButtons(id){
    const forms = document.getElementsByClassName('form');
    for(const form of forms){
        form.style.display = 'none';
    };

    document.getElementById(id).style.display = 'block';
};

function handleButonToggle(id){
    const formBtn = document.getElementsByClassName('card');
    for(const btn of formBtn){
        btn.classList.remove('border-[#0874f2]', 'bg-[#0874f20d]')
        btn.classList.add("border-[#0808081A]");
    };

    document.getElementById(id).classList.remove("border-[#0808081A]")
    document.getElementById(id).classList.add("border-[#0874f2]", "bg-[#0874f20d]");
};

addMoney.addEventListener('click', function(e){
    e.preventDefault();
    const getBank = document.getElementById('bank');
    const bankNumber = getValue('bankAdd');
    const addAmount = getInputValue('add-amount');
    const addPin = getInputValue('pinNumber');
    const mainBalance = parseInt(document.getElementById('balance').innerText);

    if(bankNumber.length < 11){
        alert("Please Provide correct Bank Number");
        return;
    };

    if(addPin !== validPin){
        alert('Incorrect Pin');
        return;
    };

    const total = mainBalance + addAmount;
    getInnerText(total);
});


withdrawMoney.addEventListener('click', function(e){
    e.preventDefault();
    const getAgentNumber = getValue('agent');
    const withdrawMoney = getInputValue('remove-amount');
    const withdrawpin = getInputValue('pinWithdraw');
    const mainbalance = parseInt(document.getElementById('balance').innerText);

    if(getAgentNumber.length < 11){
        alert('Please provide correct Agent Number');
        return;
    };

    if(withdrawpin !== validPin){
        alert('Please enter Correct Pin Number');
        return;
    };

    if(withdrawMoney > mainbalance){
        alert('Insufficient Balance');
        return;
    };

    const balance = mainbalance - withdrawMoney;
    getInnerText(balance);
});



transferMoney.addEventListener('click', function(e){
    e.preventDefault();
    const getAccountNumber = getValue('user');
    const transferMoney = getInputValue('send-amount');
    const transferPin = getInputValue('pinTransfer');
    const transferBalance = parseInt(document.getElementById('balance').innerText);


    if(getAccountNumber.length < 11){
        alert('Please provide correct Agent Number');
        return;
    };

    if(transferPin !== validPin){
        alert('Please enter Correct Pin Number');
        return;
    };

    if(transferMoney > transferBalance){
        alert('Insufficient Balance');
        return;
    };

    const availableBalance = transferBalance - transferMoney;
    getInnerText(availableBalance);
});


getBonus.addEventListener('click', function(e){
    e.preventDefault();
    const getCuponNumber = getValue('cupon');
    const couponBalance = parseInt(document.getElementById('balance').innerText);

    if(getCuponNumber.length < 8 || isNaN(getCuponNumber)){
        alert('Please Provide Corrct Cupon Number');
        return;
    };

    const randomBonus = Math.floor(Math.random() * 9001) + 1000;
    const newBalance = couponBalance + randomBonus;

    getInnerText(newBalance);
    alert(`🎉 Congrats! You received a bonus of ${randomBonus}`);
});

payButton.addEventListener('click', function(e){
    e.preventDefault();
    const getBill = document.getElementById('bill');
    const billAccount = getValue('payAdd');
    const payAmount = getInputValue('pay-amount');
    const payPin = getInputValue('payPin');
    const mainBalance = parseInt(document.getElementById('balance').innerText);

    if(billAccount.length < 11){
        alert("Please Provide correct Account Number");
        return;
    };

    if(payPin !== validPin){
        alert('Incorrect Pin');
        return;
    };

    if(payAmount > mainBalance){
        alert('Insufficient Balance');
        return;
    };

    const total = mainBalance - payAmount;
    getInnerText(total);
});

//toggle button feature
document.getElementById('addSection').addEventListener('click', function(e){
    toggleButtons('addSectionOne');
    handleButonToggle('addSection');
});


document.getElementById('cashSection').addEventListener('click', function(e){
    toggleButtons('cashOut');
    handleButonToggle('cashSection');
});

document.getElementById('transferSection').addEventListener('click', function(e){
    toggleButtons('transfer');
    handleButonToggle('transferSection');
});

document.getElementById('bonusSection').addEventListener('click', function(e){
    toggleButtons('bonus');
    handleButonToggle('bonusSection');
});

document.getElementById('payBillSection').addEventListener('click', function(e){
    toggleButtons('payBill');
    handleButonToggle('payBillSection');
});

//Log out button code
const logInBtn = document.getElementById('logOut');
logInBtn.addEventListener('click', function(){
    window.location.href = './index.html';
});