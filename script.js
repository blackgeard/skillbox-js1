'use strict';
// Список курсов
let courses = [
    {
        name: "Courses in England",
        prices: [0, 100]
    },
    {
        name: "Courses in Germany",
        prices: [500, null]
    },
    {
        name: "Courses in Italy",
        prices: [100, 200]
    },
    {
        name: "Courses in Russia",
        prices: [null, 400]
    },
    {
        name: "Courses in China",
        prices: [50, 250]
    },
    {
        name: "Courses in USA",
        prices: [200, null]
    },
    {
        name: "Courses in Kazakhstan",
        prices: [56, 324]
    },
    {
        name: "Courses in France",
        prices: [null, null]
    },
];
let constCourses = courses;
// Варианты цен (фильтры), которые ищет пользователь
let requiredRange1 = [null, 200];
let requiredRange2 = [100, 350];
let requiredRange3 = [200, null];

//кнопки
let requiredRange1Button = document.getElementById('200');
let requiredRange2Button = document.getElementById('100350');
let requiredRange3Button = document.getElementById('201');
let showAllButton = document.getElementById('all');
let cheapButton = document.getElementById('cheap');
let expensiveButton = document.getElementById('expensive');

let renderCours = (item) => {
    if ((item.prices[0] === null) && (item.prices[1] === null)) {
        return `
        <div class="courses__item spec" price0 = 0 price1 = Infinity>
            <p>${item.name}</p>
            <div class="courses__item__price">
                <span>Уточняйте по телефону</span>
            </div>
        </div>`
    } else if (item.prices[0] === null) {
        return `
        <div class="courses__item" price0 = 0 price1 = ${item.prices[1]}>
            <p>${item.name}</p>
            <div class="courses__item__price">
                <span>до ${item.prices[1]}</span>
            </div>
        </div>`
    } else if (item.prices[1] === null) {
        return `
        <div class="courses__item" price0 = ${item.prices[0]} price1 = Infinity>
            <p>${item.name}</p>
            <div class="courses__item__price">
                <span>от ${item.prices[0]}</span>
            </div>
        </div>`
    } else {
        return `
<div class="courses__item" price0 = ${item.prices[0]} price1 = ${item.prices[1]}>
    <p>${item.name}</p>
    <div class="courses__item__price">
        <span>от ${item.prices[0]}</span>
        <span> до ${item.prices[1]}</span>
    </div>
</div>`}
}

let renderPage = list => {
    let targetToRender = document.querySelector('.courses');
    targetToRender.innerHTML = list.map(item =>
        renderCours(item)).join('');
};

let hideAll = () => {
    for (const cours of renderingCourses) {
        cours.classList.add('invisible');
    }
}

let showAll = () => {
    for (const cours of renderingCourses) {
        if (cours.classList.contains('invisible')) {
            cours.classList.remove('invisible');
        }
    }
}

let clear = () => {
    for (const cours of renderingCourses) {
        cours.remove();
    }
}

renderPage(courses);
let renderingCourses = document.getElementsByClassName('courses__item');

requiredRange1Button.addEventListener('click', () => {// <200
    hideAll();
    for (const cours of renderingCourses) {
        if (+cours.attributes.price0.nodeValue <= requiredRange1[1]) {
            cours.classList.remove('invisible');
        }
    }
});
requiredRange2Button.addEventListener('click', () => {// 100-350
    hideAll();
    for (const cours of renderingCourses) {
        if ((+cours.attributes.price0.nodeValue <= requiredRange2[1])
        ) {
            cours.classList.remove('invisible');
        }
    }
})
requiredRange3Button.addEventListener('click', () => {// 200+
    hideAll();
    for (const cours of renderingCourses) {
        if ((+cours.attributes.price0.nodeValue >= requiredRange3[1])
            &&
            (+cours.attributes.price1.nodeValue >= requiredRange3[0])) {
            cours.classList.remove('invisible');
        }
    }
});

showAllButton.addEventListener('click', () => {
    for (const cours of renderingCourses) {
        if (cours.classList.contains('invisible')) {
            cours.classList.remove('invisible');
        }
    }
});

cheapButton.addEventListener('click', () => {
    clear();
    courses.sort((a, b) => a.prices[0] > b.prices[0] ? 1 : -1);
    renderPage(courses);
})

expensiveButton.addEventListener('click', () => {
    clear();
    courses.sort((a, b) => a.prices[1] > b.prices[1] ? 1 : -1);
    renderPage(courses);
})
