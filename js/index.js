import * as choices from './choices.js';
import getRates from './handleapi.js';
import * as renders from './renders.js';


const apiKey = 'c60197d4d342f4da4dfcb5ee';

const convertForm = document.querySelector('.convert__form');
const reverseBtn = document.querySelector('.convert__reverse-button');
const selectBaseElement = document.querySelector('#baseCurrency');
const selectTargetElement = document.querySelector('#targetCurrency');
let savedObjWithCurrencies;


console.log(convertForm);


document.addEventListener('DOMContentLoaded', () => {
    //here we'll also retrieve all available currencies for the choicelist and render them
    getRates(apiKey, 'USD')
        .then(objWithCurrencies => {
            //Save the object to the variable just to make choice list without calling API every time.
            savedObjWithCurrencies = objWithCurrencies;
            choices.renderChoiceList(objWithCurrencies, 'USD', selectBaseElement)
            choices.renderChoiceList(objWithCurrencies, 'EUR', selectTargetElement)
            choices.initChoices();
        })
});


convertForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const formData = new FormData(convertForm);
    const formProps = Object.fromEntries(formData);
    const valueToConvert = +formProps['value-convert'];
    const baseCurrency = formProps['baseCurrency'];
    const targetCurrency = formProps['targetCurrency'];

    //base to target
    getRates(apiKey, baseCurrency)
        .then(objWithCurrencies => {
            const currentRate = renders.renderCurrencyRate(objWithCurrencies, targetCurrency);
            renders.calcAndRender(valueToConvert, baseCurrency, targetCurrency, currentRate);
        })
    convertForm.querySelector('[name="value-convert"]').value = '';


});

//ae to activate a reverse button and re-render choices lists
reverseBtn.addEventListener('click', function (e) {
    e.preventDefault();

    const oldBaseValue = selectBaseElement.value;
    const oldTargetValue = selectTargetElement.value;

    selectBaseElement.value = oldTargetValue;
    selectTargetElement.value = oldBaseValue;

    const newBaseValue = selectBaseElement.value;
    const newTargetValue = selectTargetElement.value;


    console.log(`old base value:${oldBaseValue} new base value: ${newBaseValue}`);
    console.log(`old target value:${oldTargetValue} new target value: ${newTargetValue}`);


    choices.renderChoiceList(savedObjWithCurrencies, newBaseValue, selectBaseElement);
    choices.renderChoiceList(savedObjWithCurrencies, newTargetValue, selectTargetElement);
    choices.initChoices();


});