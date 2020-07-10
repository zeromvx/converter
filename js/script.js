const curItem1 = document.querySelector('.converter__item-1');
const curItem2 = document.querySelector('.converter__item-2');
const curValue1 = document.querySelector('.converter__input-1');
const curValue2 = document.querySelector('.converter__input-2');

const changeBtn = document.querySelector('.change-btn');
const rateBox = document.querySelector('.rate');

function calc() {
    const curItemValue1 = curItem1.value;
    const curItemValue2 = curItem2.value;

    fetch(`https://api.exchangerate-api.com/v4/latest/${curItemValue1}`)
        .then((res) => res.json())
        .then((data) => {
            const rate = data.rates[`${curItemValue2}`];
            rateBox.textContent = `1 ${curItemValue1} = ${rate.toFixed(4)} ${curItemValue2}`;
            curValue2.value = (curValue1.value * rate).toFixed(2);
        });
}

function listeners() {
    curItem1.addEventListener('change', calc);
    curItem2.addEventListener('change', calc);
    curValue1.addEventListener('input', calc);
    curValue2.addEventListener('input', calc);

    let degIndex = 1;

    changeBtn.addEventListener('click', () => {
        [curItem1.value, curItem2.value] = [curItem2.value, curItem1.value];
        changeBtn.style.transform = `rotate(${180 * degIndex}deg)`;
        degIndex === 1 ? degIndex = 0 : degIndex++;
        calc();
    });
}

window.onload = () => {
    listeners();
    calc();
};