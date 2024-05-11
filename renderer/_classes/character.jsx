export class Character{
    constructor(
        stats_in,

        name_in,
        race_in,
        class_in,
        abilities_in,

        background_in,

        biography_in,

        languages_in,

        passive_1_in = "",
        passive_2_in = "",

        deaths_door = 0,
        deaths_save = 0,
    ){
        this.name = name_in;
        this.race = race_in;
        this.class = class_in;
        this.background = background_in;

        this.biography = biography_in;
        this.languages = languages_in;
        this.permits = [];

        this.passive_1 = passive_1_in;
        this.passive_2 = passive_2_in;

        this.deaths_door = deaths_door;
        this.deaths_save = deaths_save;
        
        this.stats = new Stats();
        this.stats.jsonLoad(stats_in);

        this.bonus_stats = new Stats();
        // this.bonus_stats.jsonLoad(stats_in);

        this.equipment = []; // should be of type items
        
        this.inventory = []; // should be of type items
        
        this.abilities = [...abilities_in, ...class_in.abilities, ...race_in.abilities]; // should be of type abilities
        this.buffs = []; // should be of type abilities
        this.debuffs = []; // should be of type abilities

        this.personality_traits = [];
        this.stress_meter = 0;
    }
    
    //////////////////////////////////////////
    // EQUIP

    equipItem(inventory_in){
        let inventory_index = this.inventory.findIndex(e => ((e.name == inventory_in) && (e.is_equip)));

        this.stats.applyItem(this.inventory[inventory_index]);
        this.equipment.push(this.inventory[inventory_index]);
        this.inventory.splice(inventory_index, 1);
    }

    unequipItem(equipment_in){
        let equipment_index = this.equipment.findIndex(e => (e.name == equipment_in));

        this.stats.unApplyItem(this.equipment[equipment_index]);
        this.inventory.push(this.equipment[equipment_index]);
        this.equipment.splice(equipment_index, 1);
    }

    useItem(item_in){
        let item_ind = this.inventory.indexOf((e)=> e.name == item_in);
        this.stats.applyItem(this.inventory[item_ind])

        this.inventory.splice(item_ind, 1);
    }

    //////////////////////////////////////////
    // CLASS / LEVELING

    changeClass(new_class){
        this.class.abilities.forEach((class_ability)=>{
            let class_ability_index = this.abilities.findIndex((char_ability) => char_ability.name == class_ability.name);
            this.abilities.splice(class_ability_index, 1);
        });
        this.class = new_class;
        this.abilities = [...this.abilities, ...new_class.abilities]
    }

    //////////////////////////////////////////
    // PERMIT

    addPermit(permit_in){ // takes in str
        this.permits.push(permit_in)
    }

    removePermit(permit_in){
        let permit_ind = this.permits.indexOf(permit_in);
        this.permits.splice(permit_ind, 1);
    }

    //////////////////////////////////////////
    // ITEM MANAGEMENT

    addItem(item_in){ // takes in item
        this.inventory.push(item_in);
    }

    removeItem(item_in){
        let item_ind = this.inventory.findIndex((inventory_item) => inventory_item.name == item_in);
        this.inventory.splice(item_ind, 1);
    }

    getTreasure(){
        return this.inventory.filter((e) => e.is_treasure)
    }
    getUsables(){
        return this.inventory.filter((e) => e.is_use)
    }
    getEquipment(){
        return this.inventory.filter((e) => e.is_equip)
    }

    //////////////////////////////////////////
    // ABILITY MANAGEMENT

    learnAbility(ability_in){
        this.abilities.push(ability_in);
    }

    forgetAbility(ability_in){
        let ability_index = this.abilities.findIndex(a => a.name == ability_in.name);
        this.abilities.splice(ability_index, 1);
    }

    addBuff(buff_in){
        this.buffs.push(buff_in);
    }
    deleteBuff(buff_in){
        let ability_index = this.buffs.findIndex(a => a.name == buff_in.name);
        this.buffs.splice(ability_index, 1);
    }

    addDebuff(debuff_in){
        this.debuffs.push(debuff_in);
    }
    deleteDebuff(debuff_in){
        let ability_index = this.debuffs.findIndex(a => a.name == debuff_in.name);
        this.debuffs.splice(ability_index, 1);
    }
}