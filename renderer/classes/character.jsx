export class Character{
    constructor(){
        this.name = "";
        this.race = "";
        this.class = "";
        this.background = "";

        this.biography = "";
        this.languages = "";
        this.permits = [];

        this.passive_1 = "";
        this.passive_2 = "";
        
        this.deaths_door = 0;
        
        this.stats = new Stats();

        this.equipment = []; // should be of type items
        this.usables = []; // should be of type items
        
        this.treasure = []; // should be of type items
        
        this.inventory = []; // should be of type items
        
        this.abilities = []; // should be of type abilities
        this.buffs = []; // should be of type abilities

        this.personality_traits = [];
        this.stress_meter = 0;
    }

    equipItem(inventory_index){
        let item = this.inventory[inventory_index];
        if(!item.is_equip){
            return;
        }

        this.equipment.push(item);
        this.inventory.splice(inventory_index, 1);
    }

    unequipItem
}