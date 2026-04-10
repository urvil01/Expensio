var transactions=JSON.parse(localStorage.getItem("data"))||[];

function save(){
localStorage.setItem("data",JSON.stringify(transactions));
}

function update(){
var income=0,expense=0;

transactions.forEach(function(t){
if(t.type==="income") income+=t.amount;
else expense+=t.amount;
});

document.getElementById("totalIncome").textContent="₹"+income.toFixed(2);
document.getElementById("totalExpense").textContent="₹"+expense.toFixed(2);
document.getElementById("totalBalance").textContent="₹"+(income-expense).toFixed(2);

render();
save();
}

function render(){
var list=document.getElementById("transactionList");
list.innerHTML="";

transactions.forEach(function(t,index){
var li=document.createElement("li");

li.innerHTML=t.description+" ₹"+t.amount+
" <button onclick='del("+index+")'>X</button>";

list.appendChild(li);
});
}

function del(i){
transactions.splice(i,1);
update();
}

document.getElementById("transactionForm").addEventListener("submit",function(e){
e.preventDefault();

var t={
description:document.getElementById("description").value,
amount:parseFloat(document.getElementById("amount").value),
type:document.getElementById("type").value
};

if(!t.description||!t.amount)return;

transactions.push(t);
update();

e.target.reset();
});

function resetAll(){
transactions=[];
update();
document.getElementById("transactionList").innerHTML="";
localStorage.clear();
}

update();