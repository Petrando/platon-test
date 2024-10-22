const constraintsAB = {
    aMin: 5, aMax: 15, bMin: 10, bMax: 20
}

const constraints = { aConst: 5, bConst: 4, total: 100 }

const countPairFromAMax = () => {
    const { aMin, aMax, bMin, bMax } = constraintsAB

    const pairs = { a: aMax, b: bMax }
    let a = aMax    
    let maxPairFound = false
    while(a >= aMin){
        let b = bMax
        while(b >= bMin){
            const inConstraints = inTotalConstraints(a, b)
            //console.log('a : ', a, ' b : ', b, ' inContstraints : ', inConstraints, ' maxPairFound : ', maxPairFound)
            if(inConstraints){
                pairs.a = a
                pairs.b = b
                maxPairFound = true
                break;
            }            
            b--
        }
        if(maxPairFound){
            break;
        }
        a--
    }

    return pairs
}

const countPairFromBMax = () => {
    const { aMin, aMax, bMin, bMax } = constraintsAB

    const pairs = { a: aMax, b: bMax }
    let b = bMax    
    let maxPairFound = false
    while(b >= bMin){
        let a = aMax
        while(a >= aMin){
            const inConstraints = inTotalConstraints(a, b)            
            if(inConstraints){
                pairs.a = a
                pairs.b = b
                maxPairFound = true
                break;
            }            
            a--
        }
        if(maxPairFound){
            break;
        }
        b--
    }

    return pairs
}

const inTotalConstraints = (a, b) => {
    const { aConst, bConst, total } = constraints
    const totalAB = (a * aConst) + (b * bConst)

    /*
    console.log('a : ', a)
    console.log('b : ', b)
    console.log('totalAB : ', totalAB)
    console.log('comparison : ', totalAB <= total)
    */
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



