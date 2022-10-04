export const sliceObject = (objetoARecortar, valor1 = 0, valor2 = -1) => {
    const sliced = Object.keys(objetoARecortar)
        .slice(valor1, valor2)
        .reduce((result, key) => {
            result[key] = objetoARecortar;
            return result;
        }, {});
    return sliced;
};

export const filterObject = (objetoRaw, keysPermitidas) => {

    const arrayKeysPermitidas = Object.keys(keysPermitidas);
    const filtered = Object.keys(objetoRaw)
        .filter((key) => arrayKeysPermitidas.includes(key))
        .reduce((objetoAcumulado, keyActual) => {
            objetoAcumulado[keyActual] = objetoRaw[keyActual];
            return objetoAcumulado;
        }, {});

    console.log(filtered);
    return filtered;
};

export const makeCheckableObject = (keysArray) => {
    let object = {}
    keysArray.forEach((key) => {
        Object.defineProperty(object, key.name, {
          configurable: true,
          enumerable: true,
          writable: true,
          value: false,
        });
      });
    return object;
}