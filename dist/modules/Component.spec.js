import { assert } from 'chai.js';
import Component from './Component.js';
import EventBus from './EventBus.js';
import Store from './Store.js';
describe('Component.ts: Инициализация', function () {
    Component.prototype.compile = function () { return 'string'; };
    it('Инициализация по умолчанию (без входных аргументов)', function () {
        var component = new Component();
        assert.equal(component._meta.tagName, 'div', 'Тег по молчанию: div');
        assert.equal(typeof component._meta.props, 'object', 'Свойства по умолчанию');
        assert.equal(component._meta.storePath, null, 'Селектор хранилища по умолчанию: null');
        assert.equal(component.eventBus instanceof EventBus, true, 'Шина событий');
    });
    it('Инициализация с входными аргументами', function () {
        var storePath = 'storePath';
        var store = new Store();
        store.set(storePath, { key: 'value' });
        var component = new Component({ p: 'property' }, null, 'button');
        assert.equal(component._meta.tagName, 'button', 'Инициализация тега');
        assert.equal(component._meta.props.p, 'property', 'Инициализация свойств');
        component = new Component({ p: 'property' }, storePath, 'button');
        assert.equal(component._meta.storePath, storePath, 'Инициализация селектора хранилища');
        assert.equal(component.eventBus instanceof EventBus, true, 'Шина событий');
    });
});
describe('Component.ts: События жизненного цикла', function () {
    it('Обновление свойств', function () {
        var component = new Component({ prop: 'value' });
        component._parentNode = 'testPath';
        var events = [];
        component.eventBus.subscribe(Component.EVENTS.UPDATED, (function () { return events.push('CDU'); }));
        component.eventBus.subscribe(Component.EVENTS.COMPILED, (function () { return events.push('CDC'); }));
        component.setProps({ prop: 'newValue' });
        assert.equal(events[0], 'CDC');
        assert.equal(events[1], 'CDU');
    });
    it('Монтирование в DOM', function () {
        var component = new Component({ prop: 'value' });
        var events = [];
        var parent = document.querySelector('.app');
        component.eventBus.subscribe(Component.EVENTS.MOUNTED, (function () { return events.push('CDM'); }));
        component.eventBus.subscribe(Component.EVENTS.UNMOUNTED, (function () { return events.push('CDU'); }));
        if (parent) {
            component.mount(parent);
        }
        assert.equal(events.length, 1, 'Счётчик событий: 1');
        assert.equal(events.pop(), 'CDM', 'Тип события: CDM');
        component.unmount();
        assert.equal(events.length, 1, 'Счётчик событий: 1');
        assert.equal(events.pop(), 'CDU', 'Тип события: CDU');
    });
});
describe('Component.ts: Работа с элементом', function () {
    var component = new Component();
    it('Получение элемента', function () {
        var element = component.element;
        assert.equal(element instanceof HTMLElement, true, 'Возвращён DOM-объект');
    });
    it('Скрытие элемента', function () {
        component.show();
        component.hide();
        assert.equal(component.element.style.display, 'none');
    });
    it('Отображение элемента', function () {
        component.hide();
        component.show();
        assert.equal(component.element.style.display, 'block');
    });
});
