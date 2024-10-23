import { hourLimits } from "./constants";

const calculateProfit = ({A, B}) => {
    return 40 * A + 30 * B;
}

const zerofyFactor = (AB) => {
    const { A, B, totalHours, Alimit, Blimit } = AB
    //if A is 0
    const b = totalHours/B
    //if B is 0....
    const a = totalHours/A

    const points = []
    if(b <= Blimit){
        points.push({ A: 0, B: b})
    }

    if( a <= Alimit){
        points.push({ A: a, B: 0 })
    }

    return points
}

const solveEquations = ({
    firstEq:{
        A, B, totalHours
    },
    secondEq:{
        A: A2, B: B2, totalHours: totalHours2
    }, 
    Alimit, Blimit
}) => {
    // Coefficients from the equations
    const a1 = A, b1 = B, c1 = totalHours; // 2x + y = 160
    const a2 = A2, b2 = B2, c2 = totalHours2; // x + 2y = 180

    // Calculate the determinant
    const determinant = a1 * b2 - a2 * b1;

    if (determinant === 0) {
        return "No unique solution (the equations are either parallel or the same line).";
    }

    // Calculate x and y using Cramer's rule
    const x = (c1 * b2 - c2 * b1) / determinant;
    const y = (a1 * c2 - a2 * c1) / determinant;

    const roundedA = Math.ceil(x)
    const roundedB = Math.floor(y)
    //console.log('below hour limit? : ', belowHourLimit({A: roundedA, B: roundedB}))

    if(x > Alimit || y > Blimit){
        return null
    }
    
    return { A:roundedA, B:roundedB };
}

const belowHourLimit = ({A, B}) => {
    const laborHour = (2 * A) + B
    const machineHour = A + (2 * B)
    
    if(laborHour > hourLimits.labor || machineHour > hourLimits.machine){
        return false
    }
    return true
}

const solveProblem1 = () => {
    /*
        maximum profit = 40A + 30B

        weekly production limit :
        A = 80
        B = 100

        constraints : 
        labor hours : 2A + B <= 160
        machine hours A + 2B <= 180

        A >= 0
        B >= 0
        
    */

    /*
    We well focus on the labor and machine hours equations :
    First labor hours equation : 2A + B <= 160
    To reach maximum profit, we should maximize labor hours, therefore, the equation become : 
        
        2A + B = 160

    We use all the 160 labor hours.
    We're going to maximize labor hours for product A only, or product B only while testing if the maximized
    product amount will still meet the weekly maximum limit 
    
    product A = 80
    product B = 100

    The points that meet the weekly limit constraint will be used
    */

    const laborHourPoints = zerofyFactor({ A: 2, B: 1, totalHours: hourLimits.labor, Alimit: 80, Blimit: 100})

    /*
    Next is machine hours equation : A + 2B <= 180
    To reach maximum profit, we should maximize machine hours, therefore, the equation become : 
        
        A + 2B = 180

    We use all the 180 machine hours.
    We're going to maximize machine hours for product A only, or product B only while testing if the 
    maximized product amount will still meet the weekly maximum limit 
    
    product A = 80
    product B = 100

    The points that meet the weekly limit constraint will be used
    */
    
    const machineHourPoints = zerofyFactor({ A: 1, B: 2, totalHours: hourLimits.machine, Alimit: 80, Blimit: 100})

    const mixPoints = solveEquations({
        firstEq: {
            A: 2, B: 1, totalHours: hourLimits.labor
        },
        secondEq: {
            A: 1, B: 2, totalHours: hourLimits.machine
        },
        Alimit: 80, Blimit: 100})

    const allPoints = [mixPoints].concat(laborHourPoints).concat(machineHourPoints)
    
    const maxProfit = allPoints.reduce((acc, curr, i) => {
        const profit = calculateProfit(curr)
        
        return profit > acc.profit?{ profit, idx: i }:acc
    }, { profit:0, idx: -1 })

    const maxPoint = allPoints[maxProfit.idx]
    const maxPointWithProfit = {...maxPoint, profit: calculateProfit(maxPoint)}
    
    console.log('Product A optimal weekly count : ', maxPointWithProfit.A)
    console.log('Product B optimal weekly count : ', maxPointWithProfit.B)
    console.log('Maximum weekly profit : ', maxPointWithProfit.profit)
    return maxPointWithProfit
}

solveProblem1()