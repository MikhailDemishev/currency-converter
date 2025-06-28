
export default function getRates (apiKey, baseCurrency) {
    const url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${baseCurrency}`;
    return new Promise((resolve, reject) => {
        fetch(url)
            .then(res => {
                if (!res.ok) {
                    throw new Error(`HTTP Error: ${res.status}`);
                }
                return res.json();
            })
            .then(data => {
                return data.conversion_rates
            })
            .then(data => resolve(data))
            .catch(err => {
                reject(`Error while loading the files: ${err.message}`);

            })
    })
}
