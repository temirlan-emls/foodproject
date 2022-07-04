"use strict";

window.addEventListener('DOMContentLoaded', () => {

    // Rendering Tabs
    const tabContent = document.querySelectorAll('.tabcontent'),
          tabItems = document.querySelector('.tabheader__items'),
          tabItem = tabItems.querySelectorAll('.tabheader__item');

    function hideContent() {
        tabContent.forEach(item => {
            item.classList.remove('show', 'fade'); 
            item.classList.add('hide');
        })
        tabItem.forEach((item) => {
            item.classList.remove('tabheader__item_active');
        })
    }

    function renderContent(i) {
        tabContent[i].classList.remove('hide');
        tabContent[i].classList.add('show', 'fade')
        tabItem[i].classList.add('tabheader__item_active')
    }

    tabItems.addEventListener('click', (event) => {
        if (event.target && event.target.classList.contains('tabheader__item')) {
            tabItem.forEach((item, i) => {
                if (event.target == item) {
                    hideContent();
                    renderContent(i);
                }
            })

        }
    });

    hideContent();
    renderContent(0);

    //Timer
    const timerItems = document.querySelectorAll('.timer__block');

    function toTwoDigits(num) {
        if (num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    function updateDateOnPage() {
        const now = +new Date(),
              endDate = +new Date(2022, 5, 30, 14),
              leftTime = endDate - now,
              seconds = Math.floor((leftTime/1000)%60),
              minutes = Math.floor((leftTime/1000/60)%60),
              hours = Math.floor((leftTime/1000/3600)%60),
              days = Math.floor((leftTime/1000/3600/24)%24);
        if (leftTime <= 0) {
            clearInterval(timerUpdater);
        }
        timerItems[0].querySelector('span').innerText = toTwoDigits(days);
        timerItems[1].querySelector('span').innerText = toTwoDigits(hours);
        timerItems[2].querySelector('span').innerText = toTwoDigits(minutes);
        timerItems[3].querySelector('span').innerText = toTwoDigits(seconds);
    }

    const timerUpdater = setInterval(updateDateOnPage, 1000);

    // MODAL
    const modal = document.querySelector('.modal'),
          modalOpenBtn = document.querySelectorAll('[data-modal]'),
          modalCloseBtn = document.querySelector('[data-close]');

    function closeModal() {
        modal.classList.toggle('show');
        document.body.style.overflow = '';
    }
    function openModal() {
        modal.classList.toggle('show');
        document.body.style.overflow = 'hidden';
        clearInterval(modalTimerId);
    }

    modalOpenBtn.forEach(item => {
        item.addEventListener('click', () => {
            openModal()
        })
    });
    modalCloseBtn.addEventListener('click', () => {
        closeModal();
    });
    modal.addEventListener('click', (e) => {
        if (e.target == modal) {
            closeModal();
        }
    })
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    })

    const modalTimerId = setTimeout(openModal, 15000)

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);

    // Menue
    document.querySelector('.menu .container').innerHTML = '';
    class menuItem {
        constructor(scr, alt, title, descr, price, currency, parentSelector, ...classes) {
            this.scr = scr;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.parent = document.querySelector(parentSelector);
            this.classes = classes;
            this.KZTtrans = 430;
            this.currency = currency;
            this.toKZT();
        }

        toKZT() {
            this.price = this.price * this.KZTtrans;
        }

        renderItem() {
            const elem = document.createElement('div')

            if (this.classes.length === 0) {
                elem.classList.add('menu__item');
            } else {
                this.classes.forEach(className => elem.classList.add(className));
            }
            
            elem.innerHTML = `
                    <img src=${this.scr} alt=${this.alt}>
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.descr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> ${this.currency}/день</div>
            `;

            this.parent.append(elem);
        }
    }


    new menuItem(
        "img/tabs/vegy.jpg" ,
        "vegy",
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        229,
        'Тг.',
        '.menu .container'
    ).renderItem()


    new menuItem(
        "img/tabs/elite.jpg",
        "elite",
        'Меню “Премиум”',
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        550,
        'Тг.',
        '.menu .container',
        'menu__item',
        'red'
    ).renderItem()

    new menuItem(
        "img/tabs/post.jpg",
        "post",
        'Меню "Постное"',
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков. ',
        430,
        'Тг.',
        '.menu .container',
        'menu__item',
        'red'
    ).renderItem()

    
        

});