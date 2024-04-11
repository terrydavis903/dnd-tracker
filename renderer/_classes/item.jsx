import { Stats } from "./stats"

export class Item{
    constructor(
        name_in,
        is_use_in = false,
        is_equip_in = false,
        is_treasure_in = false,
    ){
        this.name = name_in;
        this.is_use = is_use_in;
        this.is_equip = is_equip_in;
        this.is_treasure = is_treasure_in;

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