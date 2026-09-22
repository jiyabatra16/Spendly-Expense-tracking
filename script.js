document.addEventListener("DOMContentLoaded", function () {

    const buttons =
        document.querySelectorAll(".primary-btn, .secondary-btn");


    buttons.forEach(function (button) {

        button.addEventListener("click", function () {

            button.style.transform =
                "scale(0.97)";

            setTimeout(function () {

                button.style.transform =
                    "";

            }, 120);

        });

    });

});