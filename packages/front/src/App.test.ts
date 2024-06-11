import { describe, test } from '@jest/globals';
import { renderHook } from "@testing-library/react";
import '@testing-library/jest-dom';
import { getObjetivosOficina, SetGuardadoFichero, SetEliminadoFichero } from './servicecall/serviceintegration';
import { fileMock } from '../src/common/formatcsv';
import { useFileUploader } from '../src/customHooks/useFileUploader';

describe('Test getObjetivosOficina', () => {
    test('getObjetivosOficina', async () => {
         expect(((await getObjetivosOficina("")).iserror)).toEqual(false);
    });
});


describe('Test SetGuardadoFichero', () => {
    var file = fileMock();
    test('SetGuardadoFichero', async () => {
         expect(((await SetGuardadoFichero(file)).iserror)).toEqual(false);
    });
});

describe('Test SetEliminadoFichero', () => {
    test('SetEliminadoFichero', async () => {
         expect(((await SetEliminadoFichero("30")).iserror)).toEqual(false);
    });
});

describe('Test FileUploader Hook', () => {
    const { result } = renderHook(useFileUploader);
    test('useFileUploader Hook', async () => {
        expect(result.current.csvFile).toBe(undefined);
    });
});
