export class User {

    constructor (
        public usuario: string,
        public name: string,
        public password: string,
        public role: 'ADMIN' | 'STAFF',
        public status?: boolean,
        public address?: string,
        public img?: string,
        public valid?: boolean,
        public fecha?: Date,
        public uid?: string,
    ){}
    
}