function initChoices() {
    const customSelects = document.querySelectorAll('.custom-select');
    customSelects.forEach(customSelect => {

        if (customSelect.choicesInstance) {
            customSelect.choicesInstance.destroy();
        }

        customSelect.choicesInstance = new Choices(customSelect, {
            searchEnabled: true,
            shouldSortItems: false,
            classNames: {
                containerInner: 'custom-select-inner',
                highlightedState: 'custom-select-highlight',
            }
        });
    });
}
function renderChoiceList(objWithCurrencies, currency, targetElement) {
    const currencyList = Object.keys(objWithCurrencies);
    const currencyListFiltered = [
        ...currencyList.splice(currencyList.indexOf(currency), 1),
        ...currencyList
    ];
    renderSorted(currencyListFiltered, targetElement)

}

function renderSorted(list, selectElement) {
    selectElement.innerHTML='';
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