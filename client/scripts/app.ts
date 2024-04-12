// IIFE -- Immediately Invoked Function Express
// AKA anonymous self-executing function

"use strict";
(function()
{
    function DisplayHome(): void
    {
        console.log("Home Page");
        $("#AboutUsButton").on("click", () =>
        {
            location.href = "/about";
        });

        $("main").append(`<p id="MainParagraph" class="mt-3">This is the Main Paragraph</p>`);
        $("main").append(`<p id="MainParagraph" class="mt-3">This is the Main Paragraph</p>`);
        $("main").append(`<article>
        <p id="ArticleParagraph" class="mt-3">This is the Article Paragraph</p>
        </article>`);
    }

    function DisplayAboutPage(): void
    {
        console.log("About Us Page");
    }

    function DisplayProjectsPage(): void
    {
        console.log("Our Projects Page");
    }

    function DisplayServicesPage(): void
    {
        console.log("Our Services Page");
    }

    /**
     * Adds a Contact Object to localStorage
     *
     * @param {string} fullName
     * @param {string} contactNumber
     * @param {string} emailAddress
     */
    function AddContact(fullName: string, contactNumber: string, emailAddress: string)
    {
        let contact = new core.Contact(fullName, contactNumber, emailAddress);
        if(contact.serialize())
        {
            let key = contact.FullName.substring(0, 1) + Date.now();

            localStorage.setItem(key, contact.serialize());
        }
    }

    /**
     * This method validates an input text field in the form and displays
     * an error in the message area
     *
     * @param {string} input_field_ID
     * @param {RegExp} regular_expression
     * @param {string} error_message
     */
    function ValidateField(input_field_ID: string, regular_expression: RegExp, error_message: string)
    {
        let messageArea = $("#messageArea").hide();

        $("#" + input_field_ID).on("blur", function()
        {

            let inputFieldText: any = $(this).val();

            if(!regular_expression.test(inputFieldText))
            {
                $(this).trigger("focus").trigger("select");
                messageArea.addClass("alert alert-danger").text(error_message).show();
            }
            else
            {
                messageArea.removeAttr("class").hide();
            }
        });
    }
    /**
     * Method Validates fullname, contact number and email address
     */
    function ContactFormValidation() : void
    {
        ValidateField("fullName", /^([A-Z][a-z]{1,3}\.?\s)?([A-Z][a-z]{1,})+([\s,-]([A-Z][a-z]{1,}))*$/,"Please enter a valid Full Name.");
        ValidateField("contactNumber", /^(\+\d{1,3}[\s-.])?\(?\d{3}\)?[\s-.]?\d{3}[\s-.]?\d{4}$/, "Please enter a valid Contact Number.");
        ValidateField("emailAddress", /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,10}$/, "Please enter a valid Email Address.");
    }

    function DisplayContactPage() : void
    {
        console.log("Contact Us Page");
        $("a[data='contact-list']").off("click");
        $("a[data='contact-list']").on("click", function(){
            location.href = "/contact-list";
        });

        ContactFormValidation();

        let sendButton = document.getElementById("sendButton") as HTMLElement;
        let subscribeCheckbox = document.getElementById("subscribeCheckbox") as HTMLInputElement;

        let fullname = document.forms[0].fullName.value as string;
        let contactnum = document.forms[0].contactNumber.value as string;
        let emailadd = document.forms[0].emailAddress.value as string;
        sendButton.addEventListener("click", function()
        {
            if(subscribeCheckbox.checked)
            {
                AddContact(fullname, contactnum, emailadd);
            }
        });
    }

    function DisplayContactListPage()
    {
        console.log("Contact-List Page");


        $("a.delete").on("click", function(event){
           if(!confirm("Confirm contact Delete?")){
               event.preventDefault();
               location.href = "/contact-list";
           }
        });

    }

    function DisplayEditPage(): void
    {
        console.log("Edit Page");
        ContactFormValidation();
    }

    function DisplayLoginPage(): void
    {
        console.log("Login Page");

        $("#cancelButton").on("click", function()
        {
            // clear the login form
            document.forms[0].reset();

            // return to the home page
            location.href = "/home";
        });
    }

    function DisplayRegisterPage(): void
    {
        console.log("Register Page");
    }

    function Display404()
    {
        console.log("Called Display404Page");
    }

    function Start()
    {
        console.log("App Started!!");

        let page_id = $('body')[0].getAttribute('id');


        switch (page_id)
        {
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