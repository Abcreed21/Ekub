 // Initialize variables
 let registered = [];
 let winner = null;
 let spinning = false;

 // Register function
 function register() {
   let name = document.getElementById("name").value;
   let money = document.getElementById("money").value;
   let bank = document.getElementById("bank").value;

   if (name == "") {
     alert("Please enter your name.");
     return false;
   }

   if (!/^[0-9]+$/.test(money)) {
     alert("Please enter a valid amount of money.");
     return false;
   }

   if (!/^[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{1}$/.test(bank)) {
     alert("Please enter a valid bank sequence (e.g. 1234-5678-9012-3).");
     return false;
   }

   let user = { name: name, money: parseInt(money), bank: bank };
   registered.push(user);
   alert("Registration successful!");
   return true;

 }

 function spin() {
   if (registered.length < 5) {
     alert("Not enough registered users!");
   } else if (registered.length < 10) {
     alert("Please wait......")
   }

   spinning = true;
   let slices = document.getElementsByClassName("slice");
   let sliceIndex = Math.floor(Math.random() * 5);
   let sliceAngle = 72 * sliceIndex + 1440;
   let totalMoney = 0;
   let selectedUsers = [];
   for (let i = 0; i < 5; i++) {
     let userIndex = Math.floor(Math.random() * registered.length);
     let user = registered[userIndex];
     selectedUsers.push(user);
     totalMoney += user.money;
     registered.splice(userIndex, 1);
   }

   slices[sliceIndex].classList.add("selected");
   document.querySelector(".wheel").style.transform = "rotate(-" + sliceAngle + "deg)";
   setTimeout(function () {
     alert("Winner: " + selectedUsers[sliceIndex].name + " - Birr: " + selectedUsers[sliceIndex].money + " - Total Birr: " + totalMoney);
     slices[sliceIndex].classList.remove("selected");
     winner = selectedUsers[sliceIndex];
     spinning = false;
   }, 3000);
 }

 function withdraw() {
   if (!winner) {
     alert("No winner to withdraw!");
     return;
   }
   let index = registered.indexOf(winner);
   registered.splice(index, 1);
   winner = null;
   alert("Withdrawal successful!");
 }

