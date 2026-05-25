const mockMedusaConstructor = jest.fn();

jest.mock("@medusajs/js-sdk", () => {
  return function(config: any) {
    mockMedusaConstructor(config);
    return {
      config
    };
  };
});

describe('Medusa SDK Initialization', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.resetModules(); // clears the cache
    mockMedusaConstructor.mockClear();
    process.env = { ...originalEnv };
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  it('initializes with default backend URL when no env var is provided', () => {
    delete process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL;
    process.env.NODE_ENV = 'production';

    // Using require to force evaluation after env var changes
    require('../medusa');

    expect(mockMedusaConstructor).toHaveBeenCalledWith({
      baseUrl: "http://localhost:9000",
      debug: false,
      publishableKey: undefined,
    });
  });

  it('initializes with custom backend URL from env var', () => {
    process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL = "https://api.example.com";
    process.env.NODE_ENV = 'production';

    require('../medusa');

    expect(mockMedusaConstructor).toHaveBeenCalledWith({
      baseUrl: "https://api.example.com",
      debug: false,
      publishableKey: undefined,
    });
  });

  it('enables debug mode in development environment', () => {
    process.env.NODE_ENV = 'development';

    require('../medusa');

    expect(mockMedusaConstructor).toHaveBeenCalledWith(expect.objectContaining({
      debug: true
    }));
  });

  it('passes publishableKey from env var', () => {
    process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY = "pk_test_123";

    require('../medusa');

    expect(mockMedusaConstructor).toHaveBeenCalledWith(expect.objectContaining({
      publishableKey: "pk_test_123"
    }));
  });
});
