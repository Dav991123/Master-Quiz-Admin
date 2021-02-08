export const Enum = (...args) => {
    const enumPrototype = {};
    return ((startNumber = 0) => {
      const enums = args.reduce((accumulator, EItem, index, list) => {
        accumulator[index + startNumber] = EItem;
        enumPrototype[EItem] = index + startNumber;
        if (list.length === index + 1)
          Object.setPrototypeOf(accumulator, enumPrototype);
        return accumulator;
      }, {});
      Object.defineProperty(enums, 'keys', {
        enumerable: false,
        get() {
          return Object.keys(enums)
        }
      });
      Object.defineProperty(enums, 'values', {
        enumerable: false,
        get() {
          return args
        }
      });
      return Object.freeze(enums)
    })
  };