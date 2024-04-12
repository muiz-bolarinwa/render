"use strict";
(function () {
    function DisplayHome() {
        console.log("Home Page");
        $("#AboutUsButton").on("click", () => {
            location.href = "/about";
        });
        $("main").append(`<p id="MainParagraph" class="mt-3">This is the Main Paragraph</p>`);
        $("main").append(`<p id="MainParagraph" class="mt-3">This is the Main Paragraph</p>`);
        $("main").append(`<article>
        <p id="ArticleParagraph" class="mt-3">This is the Article Paragraph</p>
        </article>`);
    }
    function DisplayAboutPage() {
        console.log("About Us Page");
    }
    function DisplayProjectsPage() {
        console.log("Our Projects Page");
    }
    function DisplayServicesPage() {
        console.log("Our Services Page");
    }
    function AddContact(fullName, contactNumber, emailAddress) {
        let contact = new core.Contact(fullName, contactNumber, emailAddress);
        if (contact.serialize()) {
            let key = contact.FullName.substring(0, 1) + Date.now();
            localStorage.setItem(key, contact.serialize());
        }
    }
    function ValidateField(input_field_ID, regular_expression, error_message) {
        let messageArea = $("#messageArea").hide();
        $("#" + input_field_ID).on("blur", function () {
            let inputFieldText = $(this).val();
            if (!regular_expression.test(inputFieldText)) {
                $(this).trigger("focus").trigger("select");
                messageArea.addClass("alert alert-danger").text(error_message).show();
            }
            else {
                messageArea.removeAttr("class").hide();
            }
        });
    }
    function ContactFormValidation() {
        ValidateField("fullName", /^([A-Z][a-z]{1,3}\.?\s)?([A-Z][a-z]{1,})+([\s,-]([A-Z][a-z]{1,}))*$/, "Please enter a valid Full Name.");
        ValidateField("contactNumber", /^(\+\d{1,3}[\s-.])?\(?\d{3}\)?[\s-.]?\d{3}[\s-.]?\d{4}$/, "Please enter a valid Contact Number.");
        ValidateField("emailAddress", /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,10}$/, "Please enter a valid Email Address.");
    }
    function DisplayContactPage() {
        console.log("Contact Us Page");
        $("a[data='contact-list']").off("click");
        $("a[data='contact-list']").on("click", function () {
            location.href = "/contact-list";
        });
        ContactFormValidation();
        let sendButton = document.getElementById("sendButton");
        let subscribeCheckbox = document.getElementById("subscribeCheckbox");
        let fullname = document.forms[0].fullName.value;
        let contactnum = document.forms[0].contactNumber.value;
        let emailadd = document.forms[0].emailAddress.value;
        sendButton.addEventListener("click", function () {
            if (subscribeCheckbox.checked) {
                AddContact(fullname, contactnum, emailadd);
            }
        });
    }
    function DisplayContactListPage() {
        console.log("Contact-List Page");
        $("a.delete").on("click", function (event) {
            if (!confirm("Confirm contact Delete?")) {
                event.preventDefault();
                location.href = "/contact-list";
            }
        });
    }
    function DisplayEditPage() {
        console.log("Edit Page");
        ContactFormValidation();
    }
    function DisplayLoginPage() {
        console.log("Login Page");
        $("#cancelButton").on("click", function () {
            document.forms[0].reset();
            location.href = "/home";
        });
    }
    function DisplayRegisterPage() {
        console.log("Register Page");
    }
    function Display404() {
        console.log("Called Display404Page");
    }
    function Start() {
        console.log("App Started!!");
        let page_id = $('body')[0].getAttribute('id');
        switch (page_id) {
            case "home":
                DisplayHome();
                break;
            case "about":
                DisplayAboutPage();
                break;
            case "products":
                DisplayProjectsPage();
                break;
            case "services":
                DisplayServicesPage();
                break;
            case "contact-list":
                DisplayContactListPage();
                break;
            case "contact":
                DisplayContactPage();
                break;
            case "edit":
            case "add":
                DisplayEditPage();
                break;
            case "login":
                DisplayLoginPage();
                break;
            case "register":
                DisplayRegisterPage();
                break;
            case "404":
                Display404();
                break;
        }
    }
    window.addEventListener("load", Start);
})();
//# sourceMappingURL=app.js.map