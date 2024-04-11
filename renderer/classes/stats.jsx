export class Stats{
    constructor(){
        
    }

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
    }

    manualLoad(
        max_hp_in,

        dodge_in,
        speed_in,
        strength_in,
        dexterity_in,
        constitution_in,
        intelligence_in,
        wisdom_in,
        charisma_in,

        armor_in
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

            armor: this.armor
        }
    }
}