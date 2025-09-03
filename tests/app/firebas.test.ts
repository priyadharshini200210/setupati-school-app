import { beforeEach, describe, expect, it, vi } from 'vitest';

describe('app/firebase.ts', () => {
  beforeEach(() => {
    vi.resetModules();
    vi.restoreAllMocks();
    delete process.env.FIREBASE_SERVICE_ACCOUNT_BASE64;
  });

  it('throws when FIREBASE_SERVICE_ACCOUNT_BASE64 is not set', async () => {
    await expect(import('../../app/firebase.ts')).rejects.toThrow(
      'FIREBASE_SERVICE_ACCOUNT_BASE64 environment variable is not set.'
    );
  });

  it('logs error and rethrows when base64 decodes to invalid JSON', async () => {
    const infoSpy = vi.fn();
    const errorSpy = vi.fn();
    vi.doMock('../../app/utils/logger.js', () => ({
      default: { info: infoSpy, error: errorSpy }
    }));
    process.env.FIREBASE_SERVICE_ACCOUNT_BASE64 =
      Buffer.from('not-json').toString('base64');

    await expect(import('../../app/firebase.ts')).rejects.toBeDefined();
    expect(errorSpy).toHaveBeenCalled();
    expect(errorSpy.mock.calls[0][0]).toContain(
      'Failed to decode or parse FIREBASE_SERVICE_ACCOUNT_BASE64:'
    );
    expect(infoSpy).not.toHaveBeenCalled();
  });

  it('initializes firebase admin, exports db and logs info when env is valid', async () => {
    const infoSpy = vi.fn();
    const errorSpy = vi.fn();
    vi.doMock('../../app/utils/logger.js', () => ({
      default: { info: infoSpy, error: errorSpy }
    }));

    // create mock admin with auth + firestore + credential + initializeApp
    const mockDb = { __isMockDb: true };
    const mockAdmin = {
      initializeApp: vi.fn(),
      credential: { cert: vi.fn((obj: unknown) => ({ _certObject: obj })) },
      firestore: vi.fn(() => mockDb),
      auth: vi.fn(() => ({ currentUser: null }))
    };

    // export both default and top-level properties so imports like `import admin from 'firebase-admin'`
    // and any other import styles work in the tested module
    vi.doMock('firebase-admin', () => ({ default: mockAdmin, ...mockAdmin }));

    const serviceAccount = {
      project_id: 'test-project',
      client_email: 'a@b.com'
    };
    process.env.FIREBASE_SERVICE_ACCOUNT_BASE64 = Buffer.from(
      JSON.stringify(serviceAccount)
    ).toString('base64');

    const mod = await import('../../app/firebase.ts');

    expect(mockAdmin.credential.cert).toHaveBeenCalledWith(serviceAccount);
    expect(mockAdmin.initializeApp).toHaveBeenCalledWith({
      credential: { _certObject: serviceAccount }
    });
    expect(mockAdmin.firestore).toHaveBeenCalled();
    expect(mod.db).toBe(mockDb);

    expect(infoSpy).toHaveBeenCalledWith(
      'Firebase service account JSON parsed successfully.'
    );
    expect(errorSpy).not.toHaveBeenCalled();
  });
});
