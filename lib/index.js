module.exports = {
    distinc: (array, key) => {
        return [...new Set(array.map(item => item[key]))];
    },
    where: (array, key, value) => {
        return array.filter( (item) => item[key] === value)
    },
    between: (array, key, min, max) => {
        return array.filter( (item) => {
            let valor = parseInt(item[key].replace("$", "").replace(",", ""));
            return (valor >= min && valor <= max)
        })
    }
}