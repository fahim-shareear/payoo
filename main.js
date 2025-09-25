// //login button functionality

// const btn = document.getElementById('loginButton');
// btn.addEventListener('click', function(event){
//     event.preventDefault();
//     const mobileNumber = 1234567890;
//     const pinNumber = 1234;
//     const mobileNumberValue = document.getElementById('mobileNumber').value;
//     const pinNumberValue = document.getElementById('pinNumber').value;
//     const mobileNumberConverted = parseInt(mobileNumberValue);
//     const pinNumberConverted = parseInt(pinNumberValue);

//     // console.log(mobileNumberConverted, pinNumberConverted);

//     if(mobileNumberConverted === mobileNumber && pinNumberConverted === pinNumber){
//         // console.log("all values matched");
//         window.location.href="./home.html";
//         // console.log("Home Page has been loaded");
//     }else{
//         // console.log("wrong information");
//         alert("Invalid credentials");
//     };
// });


const btn = document.getElementById('loginButton');

btn.addEventListener('click', function(event){
    event.preventDefault();
    const mobileNumber = 1234567890;
    const pinNumber = 1234;
    const accnumber = parseInt(document.getElementById('mobileNumber').value);
    const pinnumber = parseInt(document.getElementById('pinNumber').value);

    if(accnumber === mobileNumber && pinnumber === pinNumber){
        window.location.href = "./home.html";
    }else{
        alert("Please Provide Correct Credential");
    };
});