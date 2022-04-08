import RestfulRouter from '../../src/wrap-http/restful-router';

test('create restful router with constructor', async () => {
  await expect(new RestfulRouter()).toBeInstanceOf(RestfulRouter);
});

test('get extra headers', async () => {
  const restfulRouter = new RestfulRouter();
  await expect(restfulRouter.getExtraHeaders()).toEqual({});
});

test('route with bad method', async () => {
  const restfulRouter = new RestfulRouter();
  restfulRouter.setRoute('OPTION', '/method/match/1', () => ({
    body: '1',
  }));
  await expect(
    restfulRouter.getHandler('OPTION', '/method/match/1'),
  ).toBeNull();
  await expect(restfulRouter.getHandler('GET', '/method/match/1')).toBeNull();
});

test('route with get method', async () => {
  const restfulRouter = new RestfulRouter();
  restfulRouter.setRoute('GET', '/method/match/1', () => ({
    body: '1',
  }));
  restfulRouter.setRoute('Get', '/method/match/2', () => ({
    body: '2',
  }));
  restfulRouter.setRoute('get', '/method/match/3', () => ({
    body: '3',
  }));
  const req = {
    getMethod: jest.fn(),
    getUrl: jest.fn(),
    getHeaders: jest.fn(),
    getBody: jest.fn(),
  };
  await expect(restfulRouter.getHandler('GET', '/method/match/1')(req)).toEqual(
    {
      body: '1',
    },
  );
  await expect(restfulRouter.getHandler('POST', '/method/match/1')).toBeNull();
  await expect(restfulRouter.getHandler('GET', '/method/match/2')(req)).toEqual(
    {
      body: '2',
    },
  );
  await expect(restfulRouter.getHandler('POST', '/method/match/2')).toBeNull();
  await expect(restfulRouter.getHandler('GET', '/method/match/3')(req)).toEqual(
    {
      body: '3',
    },
  );
  await expect(restfulRouter.getHandler('POST', '/method/match/3')).toBeNull();
});

test('route with all method', async () => {
  const restfulRouter = new RestfulRouter();
  restfulRouter.setRoute('ALL', '/method/match/1', () => ({
    body: '1',
  }));
  restfulRouter.setRoute('All', '/method/match/2', () => ({
    body: '2',
  }));
  restfulRouter.setRoute('all', '/method/match/3', () => ({
    body: '3',
  }));
  const req = {
    getMethod: jest.fn(),
    getUrl: jest.fn(),
    getHeaders: jest.fn(),
    getBody: jest.fn(),
  };
  await expect(restfulRouter.getHandler('GET', '/method/match/1')(req)).toEqual(
    {
      body: '1',
    },
  );
  await expect(
    restfulRouter.getHandler('POST', '/method/match/1')(req),
  ).toEqual({
    body: '1',
  });
  await expect(restfulRouter.getHandler('GET', '/method/match/2')(req)).toEqual(
    {
      body: '2',
    },
  );
  await expect(
    restfulRouter.getHandler('POST', '/method/match/2')(req),
  ).toEqual({
    body: '2',
  });
  await expect(restfulRouter.getHandler('GET', '/method/match/3')(req)).toEqual(
    {
      body: '3',
    },
  );
  await expect(
    restfulRouter.getHandler('POST', '/method/match/3')(req),
  ).toEqual({
    body: '3',
  });
});

test('route with many methods', async () => {
  const restfulRouter = new RestfulRouter();
  restfulRouter.setRoute(['GET'], '/method/match/1', () => ({
    body: '1',
  }));
  restfulRouter.setRoute(['GET', 'POST'], '/method/match/2', () => ({
    body: '2',
  }));
  restfulRouter.setRoute(['Get', 'post'], '/method/match/3', () => ({
    body: '3',
  }));
  const req = {
    getMethod: jest.fn(),
    getUrl: jest.fn(),
    getHeaders: jest.fn(),
    getBody: jest.fn(),
  };
  await expect(restfulRouter.getHandler('GET', '/method/match/1')(req)).toEqual(
    {
      body: '1',
    },
  );
  await expect(restfulRouter.getHandler('GET', '/method/match/2')(req)).toEqual(
    {
      body: '2',
    },
  );
  await expect(
    restfulRouter.getHandler('POST', '/method/match/2')(req),
  ).toEqual({
    body: '2',
  });
  await expect(restfulRouter.getHandler('GET', '/method/match/3')(req)).toEqual(
    {
      body: '3',
    },
  );
  await expect(
    restfulRouter.getHandler('POST', '/method/match/3')(req),
  ).toEqual({
    body: '3',
  });
});

test('route with regex pathname', async () => {
  const restfulRouter = new RestfulRouter();
  restfulRouter.setRoute('GET', /^\/pathname\/match\/1$/, () => ({
    body: '1',
  }));
  restfulRouter.setRoute('GET', /^\/pathname\/match\/2/, () => ({
    body: '2',
  }));
  restfulRouter.setRoute('GET', /\/pathname\/match\/3$/, () => ({
    body: '3',
  }));
  restfulRouter.setRoute('GET', /\/pathname\/match\/4/, () => ({
    body: '4',
  }));
  restfulRouter.setRoute('GET', /^\/pathname\/match\/[0-9]+$/, () => ({
    body: '5',
  }));
  const req = {
    getMethod: jest.fn(),
    getUrl: jest.fn(),
    getHeaders: jest.fn(),
    getBody: jest.fn(),
  };
  await expect(
    restfulRouter.getHandler('GET', '/pathname/match/1')(req),
  ).toEqual({
    body: '1',
  });
  await expect(
    restfulRouter.getHandler('GET', '/pathname/match/1/'),
  ).toBeNull();
  await expect(
    restfulRouter.getHandler('GET', '/pathname/match/1/test'),
  ).toBeNull();
  await expect(
    restfulRouter.getHandler('GET', '/test/pathname/match/1'),
  ).toBeNull();
  await expect(
    restfulRouter.getHandler('GET', '/pathname/match/2')(req),
  ).toEqual({
    body: '2',
  });
  await expect(
    restfulRouter.getHandler('GET', '/pathname/match/2/')(req),
  ).toEqual({
    body: '2',
  });
  await expect(
    restfulRouter.getHandler('GET', '/pathname/match/2/test')(req),
  ).toEqual({
    body: '2',
  });
  await expect(
    restfulRouter.getHandler('GET', '/test/pathname/match/2'),
  ).toBeNull();
  await expect(
    restfulRouter.getHandler('GET', '/pathname/match/3')(req),
  ).toEqual({
    body: '3',
  });
  await expect(
    restfulRouter.getHandler('GET', '/pathname/match/3/'),
  ).toBeNull();
  await expect(
    restfulRouter.getHandler('GET', '/pathname/match/3/test'),
  ).toBeNull();
  await expect(
    restfulRouter.getHandler('GET', '/test/pathname/match/3')(req),
  ).toEqual({
    body: '3',
  });
  await expect(
    restfulRouter.getHandler('GET', '/pathname/match/4')(req),
  ).toEqual({
    body: '4',
  });
  await expect(
    restfulRouter.getHandler('GET', '/pathname/match/4/')(req),
  ).toEqual({
    body: '4',
  });
  await expect(
    restfulRouter.getHandler('GET', '/pathname/match/4/test')(req),
  ).toEqual({
    body: '4',
  });
  await expect(
    restfulRouter.getHandler('GET', '/test/pathname/match/4')(req),
  ).toEqual({
    body: '4',
  });
  await expect(
    restfulRouter.getHandler('GET', '/pathname/match/5')(req),
  ).toEqual({
    body: '5',
  });
  await expect(
    restfulRouter.getHandler('GET', '/pathname/match/5/'),
  ).toBeNull();
  await expect(
    restfulRouter.getHandler('GET', '/pathname/match/5/test'),
  ).toBeNull();
  await expect(
    restfulRouter.getHandler('GET', '/test/pathname/match/5'),
  ).toBeNull();
});

test('route with empty pathname', async () => {
  const restfulRouter = new RestfulRouter();
  restfulRouter.setRoute('GET', '', () => ({
    body: '1',
  }));
  const req = {
    getMethod: jest.fn(),
    getUrl: jest.fn(),
    getHeaders: jest.fn(),
    getBody: jest.fn(),
  };
  await expect(restfulRouter.getHandler('GET', '/')(req)).toEqual({
    body: '1',
  });
  await expect(restfulRouter.getHandler('GET', '/test')).toBeNull();
  await expect(restfulRouter.getHandler('GET', '/test/')).toBeNull();
});

test('route with root pathname', async () => {
  const restfulRouter = new RestfulRouter();
  restfulRouter.setRoute('GET', '/', () => ({
    body: '1',
  }));
  const req = {
    getMethod: jest.fn(),
    getUrl: jest.fn(),
    getHeaders: jest.fn(),
    getBody: jest.fn(),
  };
  await expect(restfulRouter.getHandler('GET', '/')(req)).toEqual({
    body: '1',
  });
  await expect(restfulRouter.getHandler('GET', '/test')(req)).toEqual({
    body: '1',
  });
  await expect(restfulRouter.getHandler('GET', '/test/')(req)).toEqual({
    body: '1',
  });
});

test('route with string pathname', async () => {
  const restfulRouter = new RestfulRouter();
  restfulRouter.setRoute('GET', '/pathname/match/1/', () => ({
    body: '1',
  }));
  restfulRouter.setRoute('GET', '/pathname/match/2', () => ({
    body: '2',
  }));
  restfulRouter.setRoute('GET', 'pathname/match/3/', () => ({
    body: '3',
  }));
  restfulRouter.setRoute('GET', 'pathname/match/4', () => ({
    body: '4',
  }));
  const req = {
    getMethod: jest.fn(),
    getUrl: jest.fn(),
    getHeaders: jest.fn(),
    getBody: jest.fn(),
  };
  await expect(restfulRouter.getHandler('GET', '/pathname/match/1')).toBeNull();
  await expect(
    restfulRouter.getHandler('GET', '/pathname/match/1/')(req),
  ).toEqual({
    body: '1',
  });
  await expect(
    restfulRouter.getHandler('GET', '/pathname/match/1/test')(req),
  ).toEqual({
    body: '1',
  });
  await expect(
    restfulRouter.getHandler('GET', '/test/pathname/match/1'),
  ).toBeNull();
  await expect(
    restfulRouter.getHandler('GET', '/pathname/match/2')(req),
  ).toEqual({
    body: '2',
  });
  await expect(
    restfulRouter.getHandler('GET', '/pathname/match/2/')(req),
  ).toEqual({
    body: '2',
  });
  await expect(
    restfulRouter.getHandler('GET', '/pathname/match/2/test'),
  ).toBeNull();
  await expect(
    restfulRouter.getHandler('GET', '/test/pathname/match/2'),
  ).toBeNull();
  await expect(restfulRouter.getHandler('GET', '/pathname/match/3')).toBeNull();
  await expect(
    restfulRouter.getHandler('GET', '/pathname/match/3/')(req),
  ).toEqual({
    body: '3',
  });
  await expect(
    restfulRouter.getHandler('GET', '/pathname/match/3/test')(req),
  ).toEqual({
    body: '3',
  });
  await expect(
    restfulRouter.getHandler('GET', '/test/pathname/match/3'),
  ).toBeNull();
  await expect(
    restfulRouter.getHandler('GET', '/pathname/match/4')(req),
  ).toEqual({
    body: '4',
  });
  await expect(
    restfulRouter.getHandler('GET', '/pathname/match/4/')(req),
  ).toEqual({
    body: '4',
  });
  await expect(
    restfulRouter.getHandler('GET', '/pathname/match/4/test'),
  ).toBeNull();
  await expect(
    restfulRouter.getHandler('GET', '/test/pathname/match/4'),
  ).toBeNull();
});

test('route without handler', async () => {
  const restfulRouter = new RestfulRouter();
  restfulRouter.setRoute('GET', '/test');
  const req = {
    getMethod: jest.fn(),
    getUrl: jest.fn(),
    getHeaders: jest.fn(),
    getBody: jest.fn(),
  };
  await expect(restfulRouter.getHandler('GET', '/test')(req)).toBeUndefined();
});

test('route with overridden handler', async () => {
  const restfulRouter = new RestfulRouter();
  restfulRouter.setRoute('GET', '/test', () => ({
    body: '1',
  }));
  restfulRouter.setRoute('Get', '/test', () => ({
    body: '2',
  }));
  restfulRouter.setRoute('get', '/test', () => ({
    body: '3',
  }));
  restfulRouter.setRoute(['GET'], '/test', () => ({
    body: '4',
  }));
  restfulRouter.setRoute('ALL', '/test', () => ({
    body: '5',
  }));
  restfulRouter.setRoute('All', '/test', () => ({
    body: '6',
  }));
  restfulRouter.setRoute('all', '/test', () => ({
    body: '7',
  }));
  restfulRouter.setRoute(['ALL'], '/test', () => ({
    body: '8',
  }));
  const req = {
    getMethod: jest.fn(),
    getUrl: jest.fn(),
    getHeaders: jest.fn(),
    getBody: jest.fn(),
  };
  await expect(restfulRouter.getHandler('GET', '/test')(req)).toEqual({
    body: '4',
  });
  await expect(restfulRouter.getHandler('POST', '/test')(req)).toEqual({
    body: '8',
  });
});
