
const maxWeeklyProfit = () => {
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

    const laborHourPoints = zerofyFactor({ A: 2, B: 1, total: 160, Alimit: 80, Blimit: 100})

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
    
    const machineHourPoints = zerofyFactor({ A: 1, B: 2, total: 180, Alimit: 80, Blimit: 100})

    const mixPoints = solveEquations({
        firstEq: {
            A: 2, B: 1, total: 160
        },
        secondEq: {
            A: 1, B: 2, total: 180
        },
        Alimit: 80, Blimit: 100})

    const allPoints = [mixPoints].concat(laborHourPoints).concat(machineHourPoints)
    
    const maxProfit = allPoints.reduce((acc, curr) => {
        const profit = calculateProfit(curr)
        
        return profit > acc?profit:acc
    }, 0)

    return maxProfit
}

const calculateProfit = ({A, B}) => {
    return 40 * A + 30 * B;
}

const zerofyFactor = (AB) => {
    const { A, B, total, Alimit, Blimit } = AB
    //if A is 0
    const b = total/B
    //if B is 0....
    const a = total/A

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
        A, B, total
    },
    secondEq:{
        A: A2, B: B2, total: total2
    }, 
    Alimit, Blimit
}) => {
    // Coefficients from the equations
    const a1 = A, b1 = B, c1 = total; // 2x + y = 160
    const a2 = A2, b2 = B2, c2 = total2; // x + 2y = 180

    // Calculate the determinant
    const determinant = a1 * b2 - a2 * b1;

    if (determinant === 0) {
        return "No unique solution (the equations are either parallel or the same line).";
    }

    // Calculate x and y using Cramer's rule
    const x = (c1 * b2 - c2 * b1) / determinant;
    const y = (a1 * c2 - a2 * c1) / determinant;

    if(x > Alimit || y > Blimit){
        return null
    }
    
    return { A:x, B:y };
}

console.log(maxWeeklyProfit())