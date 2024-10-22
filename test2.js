const calculateMaxProduct = ({
    maxProduction, nettProfit, maxBeforeDiminish, diminishRate
}) => {
    const diminishingProduct = maxProduction - maxBeforeDiminish
    console.log('diminishingProduct : ', diminishingProduct)
    const profitableDiminishProduct = (diminishingProduct / diminishRate) - 1
    console.log('profitableDiminishProduct : ', profitableDiminishProduct)
    //here assuming profitableDiminishProduct is integer
    const actualDiminishProduct = profitableDiminishProduct <= diminishingProduct?
        profitableDiminishProduct:diminishingProduct

    console.log('actualDiminishProduct : ', actualDiminishProduct)
    return actualDiminishProduct + maxBeforeDiminish

}

console.log(calculateMaxProduct({ maxProduction: 150, nettProfit: 100, maxBeforeDiminish: 50, diminishRate: 1}))
console.log(calculateMaxProduct({ maxProduction: 200, nettProfit: 50, maxBeforeDiminish: 100, diminishRate: 0.5}))