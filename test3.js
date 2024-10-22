const constraintsAB = {
    aMin: 5, aMax: 15, bMin: 10, bMax: 20
}

const constraints = { aConst: 5, bConst: 4, total: 100 }

const countPairFromAMax = () => {
    const { aMin, aMax, bMin, bMax } = constraintsAB

    const pairs = []
    let a = aMax
    let maxTotal = 0    
    while(a >= aMin){
        let b = bMax
        while(b >= bMin){
            const inConstraints = inTotalConstraints(a, b)
            //console.log('a : ', a, ' b : ', b, ' inContstraints : ', inConstraints, ' maxPairFound : ', maxPairFound)
            if(inConstraints){
                let newTotal = a + b
                if(newTotal >= maxTotal){
                    if(newTotal > maxTotal){
                        pairs.length = 0
                        maxTotal = newTotal
                    }                    
                    pairs.push({a, b})                    
                }                
            }            
            b--
        }        
        a--
    }

    return pairs
}

const countPairFromBMax = () => {
    const { aMin, aMax, bMin, bMax } = constraintsAB

    const pairs = []
    let b = bMax
    let maxTotal = 0     
    while(b >= bMin){
        let a = aMax
        while(a >= aMin){
            const inConstraints = inTotalConstraints(a, b)            
            if(inConstraints){
                let newTotal = a + b
                if(newTotal >= maxTotal){
                    if(newTotal > maxTotal){
                        pairs.length = 0
                        maxTotal = newTotal
                    }                    
                    pairs.push({a, b})                    
                }
            }            
            a--
        }
        b--
    }

    return pairs
}

const inTotalConstraints = (a, b) => {
    const { aConst, bConst, total } = constraints
    const totalAB = (a * aConst) + (b * bConst)
    
    if( totalAB <= total ){
        return true
    }   
    return false
}

/*
    5000A + 4000B <= 100000
    divide by 1000, we get : 
    5A + 4B <= 100
*/

const maximizeTeamPerson = () => {
    const aMaxPair = countPairFromAMax()
    const bMaxPair = countPairFromBMax()

    console.log(aMaxPair)
    console.log(bMaxPair)
}

maximizeTeamPerson()

const calculateMaxProfit = ({
    nettProfit, maxBeforeDiminish, diminishRate
}) => {   
    let diminishingProduct = 0
    let diminishingProfit = nettProfit
    let totalDiminishingProfit = 0
    while(diminishingProfit > 0){        
        diminishingProfit -= diminishRate
        totalDiminishingProfit += diminishingProfit        

        diminishingProduct += 1
    }

    console.log('After while diminishingProfit : ', diminishingProfit, ' diminishRate : ', diminishRate)
    console.log('total diminishingProduct : ', diminishingProduct)
    return totalDiminishingProfit + (maxBeforeDiminish * nettProfit)

}

console.log('Team A : ', calculateMaxProfit({ nettProfit: 120, maxBeforeDiminish: 40, diminishRate: 2}))
console.log('Team B : ', calculateMaxProfit({ nettProfit: 60, maxBeforeDiminish: 80, diminishRate: 1}))





