namespace core
{
    export class Contact
    {
        // private instance members
        private _fullName: string;
        private _contactNumber: string;
        private _emailAddress: string;

        // getters and setters
        get FullName(): string
        {
            return this._fullName;
        }

        set FullName(full_name: string)
        {
            this._fullName = full_name;
        }

        get ContactNumber(): string
        {
            return this._contactNumber;
        }

        set ContactNumber(contact_number: string)
        {
            this._contactNumber = contact_number;
        }

        get EmailAddress(): string
        {
            return this._emailAddress;
        }

        set EmailAddress(email_address: string)
        {
            this._emailAddress = email_address;
        }

        // constructor
        constructor(fullName: string = "", contactNumber: string = "", emailAddress: string = "")
        {
            this._fullName = fullName;
            this._contactNumber = contactNumber;
            this._emailAddress = emailAddress;
        }

        // public utility methods
        /**
         * Returns object parameters in comma seperated string
         * @returns string
         */
        serialize() : string
        {
            if(this._fullName !== "" && this._contactNumber !== "" && this._emailAddress !== "")
            {
                return `${this.FullName},${this.ContactNumber},${this.EmailAddress}`;
            }
            console.error("One or more properties of the Contact Object are missing or invalid");
            return "";
        }

        /**
         * Takes object and divides it into different properties
         * @param data
         * @return void
         */
        deserialize(data: string): void // assume that data is in a comma-separated format (string array of properties)
        {
            let propertyArray: string[] = data.split(",");
            this._fullName = propertyArray[0];
            this._contactNumber = propertyArray[1];
            this._emailAddress = propertyArray[2];
        }

        // overridden methods
        /**
         * @override
         * @returns null
         */
        toString(): string
        {
            return `Full Name: ${this._fullName} \nContact Number: ${this._contactNumber} \nEmail Address: ${this._emailAddress}`;
        }
    }
}