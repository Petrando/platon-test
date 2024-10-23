const calculateMaxProduct = ({
    maxProduction, nettProfit, maxBeforeDiminish, diminishRate
}) => {
    const diminishingProduct = maxProduction - maxBeforeDiminish
    const profitableDiminishProduct = (diminishingProduct / diminishRate) - 1    
    //here assuming profitableDiminishProduct is integer
    const actualDiminishProduct = profitableDiminishProduct <= diminishingProduct?
        profitableDiminishProduct:diminishingProduct

    return actualDiminishProduct + maxBeforeDiminish

}

const optimumWidgetAmt = () => {
    const premiumWidgetAmt = calculateMaxProduct({ maxProduction: 150, nettProfit: 100, maxBeforeDiminish: 50, diminishRate: 1})
    const standardWidgetAmt = calculateMaxProduct({ maxProduction: 200, nettProfit: 50, maxBeforeDiminish: 100, diminishRate: 0.5})

    const optimumAmt = premiumWidgetAmt + standardWidgetAmt

    console.log('premiumWidgetAmt : ', premiumWidgetAmt)
    console.log('standardWidgetAmt : ', standardWidgetAmt)
    return optimumAmt
}

console.log(optimumWidgetAmt)