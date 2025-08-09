import test from 'node:test';
import * as assert from 'node:assert/strict';

let EmployeeIdGenerator: typeof import('./employeeIdGenerator.js').EmployeeIdGenerator;

class LocalStorageMock {
  private store: Record<string, string> = {};
  getItem(key: string) {
    return this.store[key] ?? null;
  }
  setItem(key: string, value: string) {
    this.store[key] = value;
  }
  removeItem(key: string) {
    delete this.store[key];
  }
  clear() {
    this.store = {};
  }
}

async function loadModule() {
  // Reset module and provide fresh localStorage
  const globalWithStorage = globalThis as unknown as { localStorage?: LocalStorageMock };
  delete globalWithStorage.localStorage;
  globalWithStorage.localStorage = new LocalStorageMock();
  EmployeeIdGenerator = (await import('./employeeIdGenerator.js')).EmployeeIdGenerator;
}

test('generates employee id with format LERA-EMP-YYYY-NNNN', async () => {
  await loadModule();
  const id = await EmployeeIdGenerator.generateEmployeeId();
  const year = new Date().getFullYear();
  assert.match(id, new RegExp(`^LERA-EMP-${year}-\\d{4}$`));
});

test('validates employee id correctly', async () => {
  await loadModule();
  const year = new Date().getFullYear();
  const valid = `LERA-EMP-${year}-0001`;
  assert.equal(EmployeeIdGenerator.validateEmployeeId(valid), true);
  assert.equal(EmployeeIdGenerator.validateEmployeeId('invalid-id'), false);
});

test('resets counter', async () => {
  await loadModule();
  await EmployeeIdGenerator.generateEmployeeId();
  EmployeeIdGenerator.resetCounter();
  const id = await EmployeeIdGenerator.generateEmployeeId();
  const year = new Date().getFullYear();
  assert.equal(id, `LERA-EMP-${year}-0001`);
});
