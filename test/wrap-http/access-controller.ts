import AccessController from '../../src/wrap-http/access-controller';

test('create access controller with constructor', async () => {
  await expect(new AccessController()).toBeInstanceOf(AccessController);
});

test('get extra headers when disable', async () => {
  const accessController = new AccessController();
  accessController.setAllowOptions({
    origin: (origin) => origin === 'localhost',
  });
  accessController.setEnable(false);
  await expect(accessController.getExtraHeaders('OPTIONS')).toEqual({});
  await expect(accessController.getExtraHeaders('GET')).toEqual({});
  await expect(
    accessController.getExtraHeaders('OPTIONS', '127.0.0.1'),
  ).toEqual({});
  await expect(accessController.getExtraHeaders('GET', '127.0.0.1')).toEqual(
    {},
  );
  await expect(
    accessController.getExtraHeaders('OPTIONS', 'localhost'),
  ).toEqual({});
  await expect(accessController.getExtraHeaders('GET', 'localhost')).toEqual(
    {},
  );
});

test('get extra headers without origin', async () => {
  const accessController = new AccessController();
  accessController.setAllowOptions({
    origin: (origin) => origin === 'localhost',
  });
  accessController.setEnable(true);
  await expect(accessController.getExtraHeaders('OPTIONS')).toEqual({});
  await expect(accessController.getExtraHeaders('GET')).toEqual({});
});

test('get extra headers with bad origin', async () => {
  const accessController = new AccessController();
  accessController.setAllowOptions({
    origin: (origin) => origin === 'localhost',
  });
  accessController.setEnable(true);
  await expect(
    accessController.getExtraHeaders('OPTIONS', '127.0.0.1'),
  ).toEqual({});
  await expect(accessController.getExtraHeaders('GET', '127.0.0.1')).toEqual(
    {},
  );
});

test('get extra headers with options method', async () => {
  const accessController = new AccessController();
  accessController.setAllowOptions({
    origin: (origin) => origin === 'localhost',
  });
  accessController.setEnable(true);
  await expect(
    accessController.getExtraHeaders('OPTIONS', 'localhost'),
  ).toMatchObject({
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Headers': expect.any(String),
    'Access-Control-Allow-Methods': expect.any(String),
    'Access-Control-Allow-Origin': 'localhost',
    'Access-Control-Max-Age': expect.any(Number),
  });
});

test('get extra headers with get method', async () => {
  const accessController = new AccessController();
  accessController.setAllowOptions({
    origin: (origin) => origin === 'localhost',
  });
  accessController.setEnable(true);
  await expect(
    accessController.getExtraHeaders('GET', 'localhost'),
  ).toMatchObject({
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Origin': 'localhost',
  });
});

test('get handler when disable', async () => {
  const accessController = new AccessController();
  accessController.setAllowOptions({
    origin: (origin) => origin === 'localhost',
  });
  accessController.setEnable(false);
  await expect(accessController.getHandler('OPTIONS')).toBeNull();
  await expect(accessController.getHandler('GET')).toBeNull();
  await expect(accessController.getHandler('OPTIONS', '127.0.0.1')).toBeNull();
  await expect(accessController.getHandler('GET', '127.0.0.1')).toBeNull();
  await expect(accessController.getHandler('OPTIONS', 'localhost')).toBeNull();
  await expect(accessController.getHandler('GET', 'localhost')).toBeNull();
});

test('get handler without origin', async () => {
  const accessController = new AccessController();
  accessController.setAllowOptions({
    origin: (origin) => origin === 'localhost',
  });
  accessController.setEnable(true);
  await expect(accessController.getHandler('OPTIONS')).toBeNull();
  await expect(accessController.getHandler('GET')).toBeNull();
});

test('get handler with bad origin', async () => {
  const accessController = new AccessController();
  accessController.setAllowOptions({
    origin: (origin) => origin === 'localhost',
  });
  accessController.setEnable(true);
  const req = {
    getMethod: jest.fn(),
    getUrl: jest.fn(),
    getHeaders: jest.fn(),
    getBody: jest.fn(),
  };
  await expect(
    accessController.getHandler('OPTIONS', '127.0.0.1')(req),
  ).toEqual({
    code: 403,
  });
  await expect(accessController.getHandler('GET', '127.0.0.1')(req)).toEqual({
    code: 403,
  });
});

test('get handler with options method', async () => {
  const accessController = new AccessController();
  accessController.setAllowOptions({
    origin: (origin) => origin === 'localhost',
  });
  accessController.setEnable(true);
  const req = {
    getMethod: jest.fn(),
    getUrl: jest.fn(),
    getHeaders: jest.fn(),
    getBody: jest.fn(),
  };
  await expect(
    accessController.getHandler('OPTIONS', 'localhost')(req),
  ).toEqual({
    code: 204,
  });
});

test('get handler with get method', async () => {
  const accessController = new AccessController();
  accessController.setAllowOptions({
    origin: (origin) => origin === 'localhost',
  });
  accessController.setEnable(true);
  await expect(accessController.getHandler('GET', 'localhost')).toBeNull();
});

test('default allow options', async () => {
  const accessController = new AccessController();
  accessController.setEnable(true);
  await expect(
    accessController.getExtraHeaders('OPTIONS', 'localhost'),
  ).toMatchObject({
    'Access-Control-Allow-Headers': '*',
    'Access-Control-Allow-Methods': '*',
  });
});

test('set allow options', async () => {
  const accessController = new AccessController();
  accessController.setAllowOptions({
    headers: 'Accept',
    methods: 'OPTIONS, GET, POST',
    origin: (origin) => origin === 'localhost',
  });
  accessController.setEnable(true);
  await expect(
    accessController.getExtraHeaders('OPTIONS', 'localhost'),
  ).toMatchObject({
    'Access-Control-Allow-Headers': 'Accept',
    'Access-Control-Allow-Methods': 'OPTIONS, GET, POST',
  });
});

test('default enable', async () => {
  const accessController = new AccessController();
  await expect(
    accessController.getExtraHeaders('OPTIONS', 'localhost'),
  ).toEqual({});
});

test('set enable', async () => {
  const accessController = new AccessController();
  accessController.setEnable(true);
  await expect(
    accessController.getExtraHeaders('OPTIONS', 'localhost'),
  ).toMatchObject({
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Origin': 'localhost',
  });
  accessController.setEnable(false);
  await expect(
    accessController.getExtraHeaders('OPTIONS', 'localhost'),
  ).toEqual({});
});

test('default max age', async () => {
  const accessController = new AccessController();
  accessController.setEnable(true);
  await expect(
    accessController.getExtraHeaders('OPTIONS', 'localhost'),
  ).toMatchObject({
    'Access-Control-Max-Age': expect.any(Number),
  });
});

test('set max age', async () => {
  const accessController = new AccessController();
  accessController.setEnable(true);
  accessController.setMaxAge(300);
  await expect(
    accessController.getExtraHeaders('OPTIONS', 'localhost'),
  ).toMatchObject({
    'Access-Control-Max-Age': 300,
  });
});
