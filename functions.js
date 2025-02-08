const axios = require('axios');
const redis = require('redis')

const isPrime = (number) => {
    if (number < 2){
        return { is_prime: false, divisor: [] };
    } 

    if (number === 2){
        return { is_prime: true, divisor: [1] };
    } 
    
    let divisor = [1];
    let is_prime = true;
    
    for (let i = 2; i < number; i++) {        
        if (number % i === 0) {
            divisor.push(i);
            is_prime = false;
        }
    }
    
    return { is_prime, divisor: [...new Set(divisor)] };
};

const isPerfect = (number, divisor) =>{
    let sumDivisor = 0;
    let is_perfect = false;
    if(divisor){
        for(let y = 0; y < divisor.length; y++){
                sumDivisor += divisor[y]
            }
        if (sumDivisor === number){
            is_perfect = true;
        }
    }
    return result = {is_perfect}
}  

const armstrongDigitSum = (Number) =>{
    let number = Math.abs(Number)
    let terminateProp = false;
    let digit_sum = 0
    let strNum = number.toString()
    
    let properties = []
    let isArmstrong = 0

    while (terminateProp == false){
        let numSum = 0
        let numCount = 0
        
        for(let x = 0; x < strNum.length; x++){
            numSum +=parseInt(strNum[x]);
            numCount++
        }        
        
        if(numCount > 1){
            for(let w = 0; w < numCount; w++){
                isArmstrong += parseInt(strNum[w])**numCount;
            }
        } 
    
        if(isArmstrong == number){
            properties.push('armstrong');
        }
    
        if(number%2 === 0){
            properties.push('even')
        }else{
            properties.push('odd')
        }
        digit_sum = numSum
        terminateProp = true;
    }
    return result = {digit_sum, properties}
}

const number_Api=async (number)=>{
    const fun_fact = await axios.get(`http://numbersapi.com/${number}/math`)
    return fun_fact.data
}

const Num =async (req, res) =>{
    try {
        let num = req.query.number
        let number = Number(num)                         

        if(isNaN(number) == true ||
            Number.isInteger(number) == false ||
            num === ""){
            return res.status(400).json({
                "number": `${req.query.number}`,
                "error": true
            })
        }

        const { is_prime, divisor } = isPrime(number);
        const { is_perfect } = isPerfect(number, divisor);
        const { digit_sum, properties } = armstrongDigitSum(number);
        const fun_fact = await number_Api(number);

        return res.status(200).json({
            number,
            is_prime, 
            is_perfect,
            properties,
            digit_sum,
            fun_fact
        })
    } catch (error) {
       console.log(error);
       return res.status(500).json({error: error.message})
    }
}

module.exports = {
    Num
}



