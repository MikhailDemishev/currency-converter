
function calcAndRender(value, baseCurrency, targetCurrency, currentRate) {
    const resultBlock = document.querySelector('.convert__result');
    resultBlock.innerHTML = '';
    const quotesfor1Unit = document.createElement('p');
    quotesfor1Unit.classList.add('convert__text-one');
    const baseToTarg = document.createElement('span');
    baseToTarg.textContent = `1 ${baseCurrency} = ${currentRate} ${targetCurrency}`;
    const targToBase = document.createElement('span');
    targToBase.textContent = `1 ${targetCurrency} = ${(1 / currentRate).toFixed(4)} ${baseCurrency}`;
    quotesfor1Unit.append(baseToTarg);
    quotesfor1Unit.append(targToBase);
    resultBlock.append(quotesfor1Unit)

    const calculatedValue = `${value} ${baseCurrency} = ${(currentRate * value).toFixed(2)} ${targetCurrency}`;
    const quoteResult = document.createElement('p');
    quoteResult.classList.add('convert__text-main')
    quoteResult.textContent = calculatedValue;
    resultBlock.append(quoteResult)


    return calculatedValue;
}

function renderCurrencyRate(objWithCurrencies, currency) {
    const rateFor1Unit = objWithCurrencies[currency]
    return rateFor1Unit;
}

export {
    calcAndRender,
    renderCurrencyRate,
}
