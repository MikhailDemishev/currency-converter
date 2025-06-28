import * as choices from './choices.js';
import getRates from './handleapi.js';
import * as renders from './renders.js';


const apiKey = 'c60197d4d342f4da4dfcb5ee';

const convertForm = document.querySelector('.convert__form');
console.log(convertForm);

document.addEventListener('DOMContentLoaded', () => {
    //here we'll also retrieve all available currencies for the choicelist and render them
    getRates(apiKey, 'USD')
        .then(objWithCurrencies => {
            ['USD', 'EUR'].forEach(currency => {
                choices.renderChoiceList(objWithCurrencies, currency);
            });
            choices.initChoices();
        })


}); 


convertForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const formData = new FormData(convertForm);
    const formProps = Object.fromEntries(formData);
    console.log(formProps);
    const valueToConvert = +formProps['value-convert'];
    const baseCurrency = formProps['baseCurrency'];
    const targetCurrency = formProps['targetCurrency'];

    //base to target
    getRates(apiKey, baseCurrency)
        .then(objWithCurrencies => {
            const currentRate = renders.renderCurrencyRate(objWithCurrencies, targetCurrency);

            //just for test to console:
            console.log(renders.calcAndRender(valueToConvert, baseCurrency, targetCurrency, currentRate));
            //base to target
            console.log(`1 ${baseCurrency} is ${currentRate} ${targetCurrency}`);
            //target to base
            console.log(`1 ${targetCurrency} is ${(1 / currentRate).toFixed(4)} ${baseCurrency}`);

        })
    convertForm.reset();

});

