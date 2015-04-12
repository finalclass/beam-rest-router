import RestRouter from '../../dest/index';

describe('RestRouter', () => {
  it('is ok', () => {
    let restRouter = new RestRouter();
    expect(restRouter.test).toBe('ok');
  });
});
