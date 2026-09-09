let transactions = [];

// Add Transaction

function addTransaction() {

    let amount =
        document.getElementById("amount").value;

    let type =
        document.getElementById("type").value;

    let category =
        document.getElementById("category").value;


    if (amount === "") {

        alert("Please enter amount");

        return;
    }


    let transaction = {

        amount: Number(amount),

        type: type,

        category: category

    };


    transactions.push(transaction);


    document.getElementById("amount").value = "";


    calculateTotal();

    displayTransactions();

}


// Calculate totals

function calculateTotal() {

    let totalIncome = 0;

    let totalExpense = 0;


    for (let i = 0; i < transactions.length; i++) {

        if (transactions[i].type === "income") {

            totalIncome =
                totalIncome + transactions[i].amount;

        }

        else {

            totalExpense =
                totalExpense + transactions[i].amount;

        }

    }


    let balance =
        totalIncome - totalExpense;


    document.getElementById("income").innerText =
        "₹" + totalIncome;


    document.getElementById("expense").innerText =
        "₹" + totalExpense;


    document.getElementById("balance").innerText =
        "₹" + balance;

}


// Display transactions

function displayTransactions() {

    let list =
        document.getElementById("transactionList");


    list.innerHTML = "";


    for (let i = 0; i < transactions.length; i++) {

        let transaction =
            transactions[i];


        let div =
            document.createElement("div");


        div.className = "transaction-item";


        div.innerHTML = `

            <span>
                ${transaction.category}
            </span>

            <span>
                ₹${transaction.amount}
            </span>

            <button onclick="deleteTransaction(${i})">
                Delete
            </button>

        `;


        list.appendChild(div);

    }

}


// Delete transaction

function deleteTransaction(index) {

    transactions.splice(index, 1);

    calculateTotal();

    displayTransactions();

}