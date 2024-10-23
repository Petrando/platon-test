const calculateMaxProduct = ({
    maxProduction, nettProfit, maxBeforeDiminish, diminishRate
}) => {
    const diminishingProduct = maxProduction - maxBeforeDiminish
    
    const profitableDiminishProduct = (nettProfit / diminishRate) - 1    
    //here assuming profitableDiminishProduct is integer
    
    const actualDiminishProduct = profitableDiminishProduct <= diminishingProduct?
        profitableDiminishProduct:diminishingProduct

    return  maxBeforeDiminish + actualDiminishProduct

}

/*
maxPremiumWidget * premiumWidgetCost = 150 * 80 = 12000
maxStandardWidget * standardWidgetCost = 200 * 30 = 6000
total max production cost = 12000 + 6000 = 18000 still lower than limit 20000
with these specific constraints production limit can be ignored
*/

const solveProblem2 = () => {
    const premiumWidgetAmt = calculateMaxProduct({ maxProduction: 150, nettProfit: 100, maxBeforeDiminish: 50, diminishRate: 1})
    const standardWidgetAmt = calculateMaxProduct({ maxProduction: 200, nettProfit: 50, maxBeforeDiminish: 100, diminishRate: 0.5})    

    console.log('optimum premium widget amount : ', premiumWidgetAmt)
    console.log('optimum standard widget amount : ', standardWidgetAmt)    
    
    return { premiumWidget: premiumWidgetAmt, standardWidget: standardWidgetAmt }
}

solveProblem2()