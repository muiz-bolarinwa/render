"use strict";
var core;
(function (core) {
    class Contact {
        _fullName;
        _contactNumber;
        _emailAddress;
        get FullName() {
            return this._fullName;
        }
        set FullName(full_name) {
            this._fullName = full_name;
        }
        get ContactNumber() {
            return this._contactNumber;
        }
        set ContactNumber(contact_number) {
            this._contactNumber = contact_number;
        }
        get EmailAddress() {
            return this._emailAddress;
        }
        set EmailAddress(email_address) {
            this._emailAddress = email_address;
        }
        constructor(fullName = "", contactNumber = "", emailAddress = "") {
            this._fullName = fullName;
            this._contactNumber = contactNumber;
            this._emailAddress = emailAddress;
        }
        serialize() {
            if (this._fullName !== "" && this._contactNumber !== "" && this._emailAddress !== "") {
                return `${this.FullName},${this.ContactNumber},${this.EmailAddress}`;
            }
            console.error("One or more properties of the Contact Object are missing or invalid");
            return "";
        }
        deserialize(data) {
            let propertyArray = data.split(",");
            this._fullName = propertyArray[0];
            this._contactNumber = propertyArray[1];
            this._emailAddress = propertyArray[2];
        }
        toString() {
            return `Full Name: ${this._fullName} \nContact Number: ${this._contactNumber} \nEmail Address: ${this._emailAddress}`;
        }
    }
    core.Contact = Contact;
})(core || (core = {}));
//# sourceMappingURL=contact.js.map