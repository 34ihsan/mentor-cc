/**
 * SystemStabilityManager
 * 
 * Provides robust utilities for application health, safe initializations,
 * and error recovery strategies.
 */

export class SystemStabilityManager {
  private static instance: SystemStabilityManager;
  private isInitialized = false;

  private constructor() {}

  public static getInstance(): SystemStabilityManager {
    if (!SystemStabilityManager.instance) {
      SystemStabilityManager.instance = new SystemStabilityManager();
    }
    return SystemStabilityManager.instance;
  }

  /**
   * Initializes critical system checks.
   * Call this in the root layout or a top-level provider.
   */
  public init() {
    if (this.isInitialized) return;
    
    if (typeof window !== 'undefined') {
      this.setupClientListeners();
    }
    
    this.isInitialized = true;
    console.log('[Stability] SystemStabilityManager initialized.');
  }

  /**
   * Handles common client-side crashes and provides recovery paths.
   */
  private setupClientListeners() {
    window.addEventListener('error', (event) => {
      // Check for specific known initialization errors
      if (event.message?.includes('Cannot access') && event.message?.includes('before initialization')) {
        console.error('[Stability] Initialization race condition detected. Attempting soft recovery...');
        // We don't necessarily want to reload immediately as it might cause a loop,
        // but we log it for the ErrorBoundary to catch.
      }
      
      if (event.message?.includes('ChunkLoadError')) {
        console.warn('[Stability] Chunk load failure. New deployment might be in progress. Reloading...');
        window.location.reload();
      }
    });

    window.addEventListener('unhandledrejection', (event) => {
      console.error('[Stability] Unhandled promise rejection:', event.reason);
    });
  }

  /**
   * Safe execution wrapper for potentially unstable client-side libraries (like animations).
   */
  public static async safeRun<T>(fn: () => Promise<T>, fallback: T): Promise<T> {
    try {
      return await fn();
    } catch (error) {
      console.error('[Stability] Execution failed:', error);
      return fallback;
    }
  }

  /**
   * Validates if the current environment is strictly production.
   */
  public static isStrictProduction(): boolean {
    return process.env.NODE_ENV === 'production' && 
           !process.env.NEXT_PUBLIC_SITE_URL?.includes('localhost');
  }
}
