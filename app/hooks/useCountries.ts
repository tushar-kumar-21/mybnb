import countries from "world-countries";

const formattedCountries = countries.map((country)=>({
    value:country.cca2,
    label:country.name.common,
    flag:country.flag,
    lating:country.latlng,
    region:country.region
}))

const userCountries = () => {    
    const getAll = () => formattedCountries;

    const getByValue = ( value: string) => {
        return formattedCountries.find((item) => item.value === value)
    }

    return {
        getAll,
        getByValue
    }
}

export default userCountries;