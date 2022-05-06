export class Product{

    constructor(
        public code: string,
        public serial: string,
        public brand?: string,
        public model?: string,
        public year?: number,
        public status?: boolean,
        public estado?: string,
        public client?: any,
        public next?: Date,
        public date?: Date,
        public pid?: string
    ) {}

}