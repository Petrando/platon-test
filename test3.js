
import { constraints, constraintsAB } from "./constants"

const getMaxPairs = () => {
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

const inTotalConstraints = (a, b) => {
    const { aCost, bCost, total } = constraints
    const totalAB = (a * aCost) + (b * bCost)
    
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

const optimalTeam = () => {
    const maxPairs = getMaxPairs()    
    
    const salaries = maxPairs.map(d => ({a:d.a, b:d.b, salary:(5000 * d.a) + (4000 * d.b)}))
    
    const minSalaryIdx = salaries.reduce((acc, curr, idx) => {
        if(curr.salary < acc.salary){
            return { salary: acc.salary, idx }
        }

        return acc
    }, { salary: Number.MAX_SAFE_INTEGER, idx: -1})

    return salaries[minSalaryIdx.idx]
}

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
    
    return totalDiminishingProfit + (maxBeforeDiminish * nettProfit)

}

const solveProblem3 = () => {
    const teamCombo = optimalTeam()
    
    const teamAProfit = calculateMaxProfit({ nettProfit: 120, maxBeforeDiminish: 40, diminishRate: 2})
    const teamBProfit = calculateMaxProfit({ nettProfit: 60, maxBeforeDiminish: 80, diminishRate: 1})

    return { teamAProfit, teamBProfit, teamCombo}

}

solveProblem3()





