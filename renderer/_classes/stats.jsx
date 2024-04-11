export class Stats{
    constructor(
        max_hp_in = 0,
        dodge_in = 0,
        speed_in = 0,
        strength_in = 0,
        dexterity_in = 0,
        constitution_in = 0,
        intelligence_in = 0,
        wisdom_in = 0,
        charisma_in = 0,
        armor_in = 0,
        gold_in = 0,
    ){
        this.max_hp = max_hp_in;
        this.current_hp = max_hp_in;
        this.dodge = dodge_in;
        this.speed = speed_in;
        this.strength = strength_in;
        this.dexterity = dexterity_in;
        this.constitution = constitution_in;
        this.intelligence = intelligence_in;
        this.wisdom = wisdom_in;
        this.charisma = charisma_in;
        this.armor = armor_in;
        this.gold = gold_in;
    }

    //////////////////////////////////////////

    jsonSave(){
        return JSON.stringify(this.asObject())
    }

    jsonLoad(json_obj){
        this.max_hp = json_obj.max_hp;
        this.current_hp = json_obj.current_hp;
        this.dodge = json_obj.dodge;
        this.speed = json_obj.speed;
        this.strength = json_obj.strength;
        this.dexterity = json_obj.dexterity;
        this.constitution = json_obj.constitution;
        this.intelligence = json_obj.intelligence;
        this.wisdom = json_obj.wisdom;
        this.charisma = json_obj.charisma;
        this.armor = json_obj.armor;
        this.gold = json_obj.gold;
    }

    asObject(){
        return {
            max_hp: this.max_hp,
            current_hp: this.current_hp,

            dodge: this.dodge,
            speed: this.speed,
            strength: this.strength,
            dexterity: this.dexterity,
            constitution: this.constitution,
            intelligence: this.intelligence,
            wisdom: this.wisdom,
            charisma: this.charisma,

            armor: this.armor,
            gold: this.gold
        }
    }

    //////////////////////////////////////////

    applyItem(item_in){
        this.max_hp + item_in.stats.max_hp;
        this.current_hp + item_in.stats.current_hp;
        this.dodge + item_in.stats.dodge;
        this.speed + item_in.stats.speed;
        this.strength + item_in.stats.strength;
        this.dexterity + item_in.stats.dexterity;
        this.constitution + item_in.stats.constitution;
        this.intelligence + item_in.stats.intelligence;
        this.wisdom + item_in.stats.wisdom;
        this.charisma + item_in.stats.charisma;
        this.armor + item_in.stats.armor;
        this.gold + item_in.stats.gold;
    }

    unApplyItem(item_in){
        this.max_hp - item_in.stats.max_hp;
        this.current_hp - item_in.stats.current_hp;
        this.dodge - item_in.stats.dodge;
        this.speed - item_in.stats.speed;
        this.strength - item_in.stats.strength;
        this.dexterity - item_in.stats.dexterity;
        this.constitution - item_in.stats.constitution;
        this.intelligence - item_in.stats.intelligence;
        this.wisdom - item_in.stats.wisdom;
        this.charisma - item_in.stats.charisma;
        this.armor - item_in.stats.armor;
        this.gold - item_in.stats.gold;
    }
}