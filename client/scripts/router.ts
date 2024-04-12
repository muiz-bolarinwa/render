namespace core
{
    export class Router
    {
        private _activeLink: string;
        private _linkData: string;
        private _routingTable: string[];

        // public properties (getters and setters)
        get ActiveLink(): string
        {
            return this._activeLink;
        }

        set ActiveLink(link:string)
        {
            this._activeLink = link;
        }

        // public properties (getters and setters)
        get LinkData(): string
        {
            return this._linkData;
        }

        set LinkData(link:string)
        {
            this._linkData = link;
        }

        // constructor

        /**
         * Creates an instance of Router.
         *
         * @constructor
         */
        constructor()
        {
            this._activeLink = "";
            this._linkData = "";
            this._routingTable = []; // creates an empty array
        }

        // public methods

        /**
         * Adds a new route to the Routing table
         *
         * @param {string} route
         */
        Add(route: string): void
        {
            this._routingTable.push(route);
        }

        /**
         * This replaces the current routing table with a new one
         * Routes should begin with '/' character
         *
         * @param {string[]} routingTable
         */
        AddTable(routingTable: string[]): void
        {
            this._routingTable = routingTable;
        }

        /**
         * This method finds the index of the route in the routing table
         * otherwise it returns -1 if the route is not found
         *
         * @param {string} route
         * @returns {number}
         */
        Find(route: string): number
        {
            return this._routingTable.indexOf(route);
        }

        /**
         * This method removes a route from the Routing Table
         * It returns true if the route was successfully removed,
         * otherwise it returns false
         *
         * @param {string} route
         * @returns {boolean}
         */
        Remove(route: string): boolean
        {
            if(this.Find(route) > -1)
            {
                this._routingTable.splice(this.Find(route), 1);
                return true;
            }
            return false;
        }

        // overridden methods

        /**
         * This method overrides the built-in toString method and returns the entire routing table as a string
         *
         * @override
         * @returns {string}
         */
        toString(): string
        {
            return this._routingTable.toString();
        }
    }
}

let router: core.Router = new core.Router();
router.AddTable([
    "/",
    "/home",
    "/about",
    "/services",
    "/contact",
    "/contact-list",
    "/projects",
    "/register",
    "/login",
    "/edit"
]);

let route: string = location.pathname; // alias for location.pathname

if(router.Find(route) > -1)
{
    router.ActiveLink = (route == "/") ? "home" : route.substring(1);
}
else
{
    router.ActiveLink = "404"; // file not found
}