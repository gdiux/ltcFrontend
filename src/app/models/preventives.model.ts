export class Preventive {

    constructor(
        public control: string,
        public create: any,
        public product: any,
        public staff: any,
        public client: any,
        public notes: any[],
        public items: any[],
        public imgBef: any[],
        public imgAft: any[],
        public video: string,
        public status: boolean,
        public estado: string,
        public checkin: Date,
        public checkout: Date,
        public date: Date,
        public preid: string,
    ) {
        
    }

}