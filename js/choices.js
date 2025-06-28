function initChoices() {
    const customSelects = document.querySelectorAll('.custom-select');
    customSelects.forEach(customSelect => {
        new Choices(customSelect, {
            searchEnabled: true,
            shouldSortItems: false,
            classNames: {
                containerInner: 'custom-select-inner',
                highlightedState: 'custom-select-highlight',
            }
        });
    });
}
function renderChoiceList(objWithCurrencies, currency) {
    const currencyList = Object.keys(objWithCurrencies);
    const currencyListFiltered = [
            ...currencyList.splice(currencyList.indexOf(currency), 1),
            ...currencyList
        ];
    if (currency == 'USD') {        
        const selectBaseElement = document.querySelector('#baseCurrency');
        renderSorted(currencyListFiltered, selectBaseElement)
    } else {
        const selectTargetElement = document.querySelector('#targetCurrency');
        renderSorted(currencyListFiltered, selectTargetElement)
    }



}

function renderSorted(list, selectElement) {
    list.forEach(currency => {
        const choiceCur = document.createElement('option');
        choiceCur.value = currency;
        choiceCur.textContent = currency;
        selectElement.append(choiceCur)
    });
}

export {
    initChoices,
    renderChoiceList,
}