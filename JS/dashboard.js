let transactions =
    JSON.parse(
        localStorage.getItem(
            "spendlyTransactions"
        )
    ) || [];


const balance =
    document.getElementById("balance");

const income =
    document.getElementById("income");

const expense =
    document.getElementById("expense");

const count =
    document.getElementById("count");

const list =
    document.getElementById(
        "transactionList"
    );

const modal =
    document.getElementById("modal");

const form =
    document.getElementById(
        "transactionForm"
    );


/* LOGIN CHECK */

if (
    localStorage.getItem(
        "spendlyLoggedIn"
    ) !== "true"
) {

    window.location.href =
        "login.html";

}


/* MONEY FORMAT */

function money(number) {

    return "₹" +
        Number(number)
        .toLocaleString("en-IN");

}


/* OPEN MODAL */

function openModal() {

    modal.classList.add("active");

    document.getElementById("date").value =
        new Date()
        .toISOString()
        .split("T")[0];

}


/* CLOSE MODAL */

function closeModal() {

    modal.classList.remove("active");

    form.reset();

}


/* ADD TRANSACTION */

form.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        const transaction = {

            id: Date.now(),

            type:
                document.getElementById(
                    "type"
                ).value,

            title:
                document.getElementById(
                    "title"
                ).value,

            amount:
                Number(
                    document.getElementById(
                        "amount"
                    ).value
                ),

            category:
                document.getElementById(
                    "category"
                ).value,

            date:
                document.getElementById(
                    "date"
                ).value

        };


        transactions.push(transaction);


        localStorage.setItem(
            "spendlyTransactions",
            JSON.stringify(
                transactions
            )
        );


        closeModal();

        render();

    }
);


/* FILTER */

document
    .getElementById("filter")
    .addEventListener(
        "change",
        render
    );


/* RENDER */

function render() {

    let totalIncome = 0;

    let totalExpense = 0;


    transactions.forEach(
        transaction => {

            if (
                transaction.type ===
                "income"
            ) {

                totalIncome +=
                    transaction.amount;

            } else {

                totalExpense +=
                    transaction.amount;

            }

        }
    );


    balance.textContent =
        money(
            totalIncome -
            totalExpense
        );

    income.textContent =
        money(totalIncome);

    expense.textContent =
        money(totalExpense);

    count.textContent =
        transactions.length;


    const filter =
        document.getElementById(
            "filter"
        ).value;


    const filtered =
        [...transactions]
        .reverse()
        .filter(
            transaction =>
                filter === "all" ||
                transaction.type === filter
        );


    if (filtered.length === 0) {

        list.innerHTML = `
            <div class="empty">
                📭
                <br><br>
                No transactions found.
                <br>
                Add your first transaction.
            </div>
        `;

        return;

    }


    list.innerHTML =
        filtered.map(
            transaction => `

            <div class="transaction">

                <div class="left">

                    <div class="icon">
                        ${getIcon(
                            transaction.category
                        )}
                    </div>

                    <div>

                        <strong>
                            ${transaction.title}
                        </strong>

                        <div class="cat">
                            ${transaction.category}
                            •
                            ${transaction.date}
                        </div>

                    </div>

                </div>


                <div class="${transaction.type}">

                    ${
                        transaction.type ===
                        "income"
                        ? "+"
                        : "-"
                    }

                    ${money(
                        transaction.amount
                    )}

                </div>

            </div>
        `
        ).join("");

}


/* CATEGORY ICON */

function getIcon(category) {

    const icons = {

        Food: "🍔",

        Shopping: "🛍️",

        Travel: "✈️",

        Bills: "💡",

        Entertainment: "🎬",

        Salary: "💼",

        Other: "📌"

    };

    return icons[category] || "💰";

}


/* LOGOUT */

document
    .getElementById("logoutBtn")
    .onclick = function() {

        localStorage.removeItem(
            "spendlyLoggedIn"
        );

        window.location.href =
            "login.html";

    };


render();