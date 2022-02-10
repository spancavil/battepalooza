export const sliceObject = (objetoARecortar, valor1 = 0, valor2 = -1) => {
    const sliced = Object.keys(objetoARecortar)
    .slice(valor1, valor2)
    .reduce((result, key)=>{
        result[key] = objetoARecortar;
        return result
    }, {})
    return sliced;
}