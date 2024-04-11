export class Ability{
    constructor(
        name_in,
        description_in,
        effects_in, // is array []

        is_buff_in = false,
        is_debuff_in = false
    ){
        this.name = name_in;
        this.description = description_in;

        this.effects = effects_in;

        this.is_buff = is_buff_in;
        this.is_debuff = is_debuff_in;
    }
}