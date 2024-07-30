import { createMockTask } from '@redux-saga/testing-utils';
import { call, cancel, take } from 'redux-saga/effects';
import categoriasService from 'services/categorias';
import { addCategories } from '../reducers/categorias';
import { categoriesSaga, observeCategories } from './categorias';


describe('Categorias Saga', () => {

  describe('workers', () => {
    test('should execute categoriasService.fetch on observeCategories', () => {
      const generatorFunction = observeCategories();
      const expectedFunction = call(categoriasService.fetch);

      generatorFunction.next(); // delay
      const executedFunction = generatorFunction.next(); // categoriasService.fetch

      expect(executedFunction.value).toEqual(expectedFunction);
    });
  });

  describe('watchers', () => {
    test('should execute addCategories on categoriesSaga watcher', () => {
      const generatorFunction = categoriesSaga();
      const expectedFunction = take(addCategories);

      generatorFunction.next();

      expect(generatorFunction.next().value).toEqual(expectedFunction);
    });

    test('should execute categoriesSaga once', () => {
      const generatorFunction = categoriesSaga();
      const tarefaMock = createMockTask();

      generatorFunction.next(tarefaMock);
      generatorFunction.next();

      const expectedCancelFunction = cancel(tarefaMock.cancel());

      expect(generatorFunction.next().value).toEqual(expectedCancelFunction);
    });
  });
});