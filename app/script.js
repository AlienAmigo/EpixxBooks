import funcBooks from '../modules/books.js'
import funcPopup from '../modules/popup.js'
import funcSliders from '../modules/sliders.js'
import funcCart from '../modules/cart.js'
// import func

ready(function(){

  // ОБЩИЕ ФУНКЦИИ
  funcPopup();

  // Функция-конвертер вида суммы валюты
  // расставляет нули между классами числа
  // по умолчанию добавляет знак рубля через пробел
  window.convRUB = function convRUB(num, postfix = '₽') {
    let myRez = num.toString();
    if (myRez.match(/\d{4,}/g)) {
      while (myRez.replace(/(\d+)(\d{3}(\s\d{3})*$)/g, '$1 $2') != myRez) {
        myRez = myRez.replace(/(\d+)(\d{3}(\s\d{3})*$)/g, '$1 $2');
      }
    }

    if ((postfix != undefined) && (postfix.length) && (!postfix.match([/^[\s]+$/g]))) {
      myRez = `${myRez} ${postfix.trim()}`;
    }
    return myRez;
  }

  funcBooks();
  funcSliders();
  funcPopup();
  funcCart();

  // ВНИМАНИЕ!
  // Нижеследующий код (кастомный селект и выбор диапазона цены) работает
  // корректно и не вызывает ошибок в консоли браузера только на главной.
  // Одна из ваших задач: сделать так, чтобы на странице корзины в консоли
  // браузера не было ошибок.

  // Кастомные селекты (кроме выбора языка)
  new Choices('.field-select:not(#lang) select.field-select__select', {
    searchEnabled: false,
    shouldSort: false,
  });
  // Кастомный селект выбора языка отдельно
  new Choices('#lang select.field-select__select', {
    searchEnabled: false,
    shouldSort: false,
    callbackOnCreateTemplates: function (template) {
      return {
        item: (classNames, data) => {
          return template(`
            <div class="${classNames.item} ${data.highlighted ? classNames.highlightedState : classNames.itemSelectable}" data-item data-id="${data.id}" data-value="${data.value}" ${data.active ? 'aria-selected="true"' : ''} ${data.disabled ? 'aria-disabled="true"' : ''}>
              ${getLangInSelectIcon(data.value)} ${data.label.substr(0,3)}
            </div>
          `);
        },
        choice: (classNames, data) => {
          return template(`
            <div class="${classNames.item} ${classNames.itemChoice} ${data.disabled ? classNames.itemDisabled : classNames.itemSelectable}" data-select-text="${this.config.itemSelectText}" data-choice ${data.disabled ? 'data-choice-disabled aria-disabled="true"' : 'data-choice-selectable'} data-id="${data.id}" data-value="${data.value}" ${data.groupId > 0 ? 'role="treeitem"' : 'role="option"'}>
              ${getLangInSelectIcon(data.value)} ${data.label}
            </div>
          `);
        },
      };
    }
  });
  function getLangInSelectIcon(value) {
    if (value == 'ru') return '<span class="field-select__lang-ru"></span>';
    else if (value == 'en') return '<span class="field-select__lang-en"></span>';
    return '<span class="field-select__lang-null"></span>';
  }

  // Выбор диапазона цен
  if (document.getElementById('price-range')) {
    var slider = document.getElementById('price-range');
    noUiSlider.create(slider, {
      start: [400, 1000],
      connect: true,
      step: 100,
      range: {
        'min': 200,
        'max': 2000
      }
    });
  }

});

function ready (fn) {
  if (document.attachEvent ? document.readyState === 'complete' : document.readyState !== 'loading'){
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}
