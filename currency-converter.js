//https://restcountries.eu/rest/v2/currency/usd



const axios = require('axios');


/*
const getExchangeRate = (fromCurrency, toCurrency) => {
    axios.get('http://www.apilayer.net/api/live?access_key=b04349ad1be962903deb5e56ec3daf17').then((response) =>{
        const rate = response.data.quotes;
        const key = fromCurrency + toCurrency
        const exchangeRate = rate[key]
        console.log(exchangeRate)
    })
}
*/


//Asynchronus
const getExchangeRate = async (fromCurrency, toCurrency) => {
    const response =  await axios.get('http://www.apilayer.net/api/live?access_key=b04349ad1be962903deb5e56ec3daf17')
    const rate = response.data.quotes;
    const key = fromCurrency + toCurrency
    const exchangeRate = rate[key]

    if(isNaN(exchangeRate)){
        throw new Error (`Unable to get currency ${fromCurrency} and ${toCurrency}`)
    }

    return exchangeRate
}


const getCountries = async (toCurrency) => {
    try{
        const response = await axios.get(`https://restcountries.eu/rest/v2/currency/${toCurrency}`)
        return response.data.map(country => country.name)
    }catch{
        throw new Error(`Unable to get countries that used ${toCurrency}`)
    }
    
    
}

const convertCurrency = async (fromCurrency, toCurrency, amount) => {
    const countries = await getCountries(toCurrency)
    const exchangeRate = await getExchangeRate(fromCurrency, toCurrency)

    const convertedAmt = (amount * exchangeRate).toFixed(2)

    return `${amount} ${fromCurrency} is worth ${convertedAmt} ${toCurrency}. You can spend this in the following countries: ${countries}`

}

convertCurrency('USD', 'CAD', 30)
    .then((message) => {
         console.log(message)
    }).catch((error) => {
        console.log(error.message)
    })