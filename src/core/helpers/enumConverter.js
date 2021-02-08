export const enumConverter = (dataEnum, translate)=> dataEnum.keys.map(item => ({
    id : item,
    label : dataEnum[item],
    value : item
}));
