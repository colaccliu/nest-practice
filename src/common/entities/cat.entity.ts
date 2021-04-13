import { Exclude, Expose } from 'class-transformer'

export class catEntity { 
    id: number;
    name: string;
    age: string;
    breed: string;
    @Exclude()
    color: string;

    @Expose()
    get fullname():string {
        return `${this.color}${this.name}`
    }
    constructor(partial: Partial<catEntity>) {
        Object.assign(this, partial)
    }
}