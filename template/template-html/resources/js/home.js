const app = document.querySelector('#app')

app.innerHTML = `
        <div>
            <a href="https://developer.mozilla.org/fr/docs/Web/HTML" target="_blank">
                <img src="../../public/HTML5.png" class="logo" alt="Html Logo" />
            </a>
            <a href="https://expressjs.com/" target="_blank">
                <img src="../../public/Expressjs.png" class="logo vanilla" alt="Expressjs Logo" />
            </a>
            <h1>
                Hello Express!
            </h1>
            <div class="card">
                <button id="counter" type="button"></button>
            </div>
            <p class="read-the-docs">
                Click on the Express logo to learn more
            </p>
        </div>`

const btn = document.querySelector('#counter')

/**
 * @param {HTMLElement} element 
 */
function setupCounter(element) {
    let counter = 0
    /**
     * @param { number } count 
     */
    const setCounter = count => {
        counter = count
        element.innerHTML = `count is ${counter}`
    }
    element.addEventListener('click', e => setCounter(counter + 1))
    setCounter(0)
}

setupCounter(btn)