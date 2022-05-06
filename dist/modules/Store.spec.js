import { assert, expect } from 'chai.js';
import Store from './Store.js';
describe('Store: Grey Box Testing', function () {
    var store = new Store;
    store.enableStrictMode();
    describe('Black Box Tests', function () {
        describe('Инициализация. Singleton', function () {
            it('Повторный вызов конструктора. Ожидается: сущности идентичны', function () {
                assert.strictEqual(new Store(), new Store());
            });
        });
        describe('Методы set(path, data) и get(path)', function () {
            beforeEach(function () {
                store.flush();
            });
            it('Запись/чтение примитива по несуществующему пути', function () {
                store.set('a.b.c', 123);
                assert.strictEqual(store.get('a.b.c'), 123);
            });
            it('Запись/чтение объекта по несуществующему пути', function () {
                store.set('a.b.c', { d: 123, e: 456 });
                assert.strictEqual(store.get('a.b.c.d'), 123);
                assert.strictEqual(store.get('a.b.c.e'), 456);
            });
            it('Запись/чтение объекта по существующему пути', function () {
                store.set('a.b.c', { d: 123, e: 456 });
                store.set('a.b.c', { f: 789 });
                assert.strictEqual(store.get('a.b.c.d'), 123);
                assert.strictEqual(store.get('a.b.c.e'), 456);
                assert.strictEqual(store.get('a.b.c.f'), 789);
            });
        });
        describe('Метод rewrite(path)', function () {
            beforeEach(function () {
                store.flush();
                store.set('a.b.c', { d: 123, e: 456 });
            });
            it('Перезапись объекта по несуществующему пути', function () {
                store.rewrite('a.b.c.f', { g: 789 });
                assert.strictEqual(store.get('a.b.c.d'), 123);
                assert.strictEqual(store.get('a.b.c.e'), 456);
                assert.strictEqual(store.get('a.b.c.f.g'), 789);
            });
            it('Перезапись объекта по существующему пути', function () {
                store.rewrite('a.b.c.d', { f: 789 });
                assert.strictEqual(store.get('a.b.c.d.f'), 789);
                assert.strictEqual(store.get('a.b.c.e'), 456);
            });
        });
        describe('Метод delete(path)', function () {
            beforeEach(function () {
                store.flush();
            });
            it('Удаление объекта по несуществующему пути. Ожидается исключение', function () {
                store.set('a.b.c', { d: 123, e: 456 });
                expect(function () { return store.delete('a.b.c.f.g'); }).to.throw("".concat(store.constructor.name, ": Key 'f' of path 'a.b.c.f' doesn't exist in store"));
            });
            it('Удаление объекта по существующему пути', function () {
                store.set('a.b.c', { d: 123, e: 456 });
                var data = store.get('a.b.c');
                expect(data.hasOwnProperty('d')).to.be.true;
                expect(data.hasOwnProperty('e')).to.be.true;
                store.delete('a.b.c.e');
                data = store.get('a.b.c');
                expect(data.hasOwnProperty('d')).to.be.true;
                expect(data.hasOwnProperty('e')).to.be.false;
            });
        });
    });
    describe('White Box Tests', function () {
        var dummyContent = {
            key1: {
                key2: 'value',
                key3: {
                    internal1: 'test',
                    internal2: { key: 123 },
                    internal3: ['test'],
                },
            },
        };
        describe('Метод set(path, data) и get(path)', function () {
            var data = { key: 'test' };
            var path = 'a.b.c';
            beforeEach(function () {
                store._store = dummyContent;
            });
            it('В хранилище помещается глубокая копия', function () {
                store.set(path, data);
                assert.strictEqual(store._store.a.b.c.key, data.key);
                assert.notStrictEqual(store._store.a.b.c, data);
            });
            it('Из хранилища возвращается глубокая копия', function () {
                store.set(path, data);
                var copy = store.get(path);
                assert.strictEqual(store._store.a.b.c.key, data.key);
                assert.notStrictEqual(store._store.a.b.c, copy);
            });
        });
        describe('Метод _getByPathOrRaiseError(path)', function () {
            function getByPathOrRaiseError(path) {
                return store._getByPathOrRaiseError(path);
            }
            beforeEach(function () {
                store._store = dummyContent;
            });
            it('Получение значения по существующему ключу. Значение - примитив', function () {
                assert.strictEqual(getByPathOrRaiseError('key1.key3.internal1'), 'test');
            });
            it('Получение значения по существующему ключу. Значение - объект', function () {
                assert.strictEqual(getByPathOrRaiseError('key1.key3.internal2'), dummyContent.key1.key3.internal2);
                assert.strictEqual(getByPathOrRaiseError('key1.key3.internal3'), dummyContent.key1.key3.internal3);
            });
            it('Выброс исключения при получении значения по несуществующему пути', function () {
                expect(function () { return getByPathOrRaiseError('non.existed.path'); }).to.throw("".concat(store.constructor.name, ": Key 'non' of path 'non.existed.path' doesn't exist in store"));
            });
        });
        describe('Метод flush()', function () {
            it('Очистка хранилища', function () {
                store._store = dummyContent;
                assert.strictEqual(store._store, dummyContent);
                store.flush();
                assert.strictEqual(Object.keys(store._store).length, 0);
            });
        });
    });
});
