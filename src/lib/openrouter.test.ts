import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { generateContent } from './openrouter';

describe('OpenRouter AI Fallback Logic', () => {
  beforeEach(() => {
    vi.stubEnv('OPENROUTER_API_KEY', 'test-key');
    vi.stubEnv('OPENROUTER_MODELS', 'model1,model2');
    global.fetch = vi.fn();
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });

  it('should fallback to second model if the first one returns 429', async () => {
    const fetchMock = vi.fn()
      // First call fails with rate limit
      .mockResolvedValueOnce({
        ok: false,
        status: 429,
        json: async () => ({ error: { message: 'Rate limit reached' } })
      })
      // Second call succeeds
      .mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => ({
          choices: [{ message: { content: 'Success from model 2' } }]
        })
      });

    global.fetch = fetchMock;

    const result = await generateContent('test prompt');

    expect(result.success).toBe(true);
    expect(result.content).toBe('Success from model 2');
    expect(fetchMock).toHaveBeenCalledTimes(2);
    
    // Verify first call used model1
    const firstCallBody = JSON.parse(fetchMock.mock.calls[0][1].body as string);
    expect(firstCallBody.model).toBe('model1');
    
    // Verify second call used model2
    const secondCallBody = JSON.parse(fetchMock.mock.calls[1][1].body as string);
    expect(secondCallBody.model).toBe('model2');
  });

  it('should return error if all models fail', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: false,
      status: 429,
      json: async () => ({ error: { message: 'Quota exceeded' } })
    });

    global.fetch = fetchMock;

    const result = await generateContent('test prompt');

    expect(result.success).toBe(false);
    expect(result.error).toContain('All models failed');
    expect(fetchMock).toHaveBeenCalledTimes(2); // model1 and model2
  });
});
