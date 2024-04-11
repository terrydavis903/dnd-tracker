import { Stats } from "./stats"

export class Item{
    constructor(
        name_in
    ){
        this.name = name_in;
        this.is_use = false;
        this.is_equip = false;
        this.is_treasure = false;

        this.stats = new Stats();
    }

    asObject(){
        return {
            name: this.name,
            is_use: this.is_use,
            is_equip: this.is_equip,
            is_treasure: this.is_treasure,
            stats: this.stats.asObject()
        }
    }
}