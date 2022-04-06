import instance from '../../src/api-persistence/instance';

test('instance is a function', async () => {
  await expect(typeof instance).toBe('function');
});
