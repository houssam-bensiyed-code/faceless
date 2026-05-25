import * as dotenv from 'dotenv';

dotenv.config();

/**
 * Typed application configuration.
 * Maps directly to the environment variables defined in .env.
 */
export interface AppConfig {
  port: number;
  env: 'development' | 'production';

  ai: {
    provider: 'anthropic' | 'stub';
    apiKey: string;
    model: string;
    retry: { maxAttempts: number; baseDelayMs: number };
    circuitBreaker: { threshold: number; resetMs: number };
    rateLimit: { maxRequests: number; windowMs: number };
  };

  dataStore: {
    provider: 'google-sheets' | 'stub';
    sheetsId?: string;
    credentialsPath?: string;
  };

  storage: {
    provider: 'google-drive' | 'local' | 'stub';
    driveParentFolderId?: string;
    driveCredentialsPath?: string;
    localBasePath?: string;
  };

  pipeline: {
    writingPatternPath: string;
  };
}

/**
 * Loads environment variables into a typed AppConfig object.
 * Uses sensible defaults for optional values.
 */
export function loadConfig(): AppConfig {
  return {
    port: parseInt(process.env.PORT || '3000', 10),
    env: (process.env.NODE_ENV === 'production' ? 'production' : 'development'),

    ai: {
      provider: (process.env.AI_PROVIDER as 'anthropic' | 'stub') || 'stub',
      apiKey: process.env.AI_API_KEY || '',
      model: process.env.AI_MODEL || 'claude-sonnet-4-20250514',
      retry: {
        maxAttempts: parseInt(process.env.AI_RETRY_MAX_ATTEMPTS || '3', 10),
        baseDelayMs: parseInt(process.env.AI_RETRY_BASE_DELAY_MS || '1000', 10),
      },
      circuitBreaker: {
        threshold: parseInt(process.env.AI_CIRCUIT_BREAKER_THRESHOLD || '5', 10),
        resetMs: parseInt(process.env.AI_CIRCUIT_BREAKER_RESET_MS || '30000', 10),
      },
      rateLimit: {
        maxRequests: parseInt(process.env.AI_RATE_LIMIT_MAX_REQUESTS || '50', 10),
        windowMs: parseInt(process.env.AI_RATE_LIMIT_WINDOW_MS || '60000', 10),
      },
    },

    dataStore: {
      provider: (process.env.DATASTORE_PROVIDER as 'google-sheets' | 'stub') || 'stub',
      sheetsId: process.env.GOOGLE_SHEETS_ID,
      credentialsPath: process.env.GOOGLE_SHEETS_CREDENTIALS_PATH,
    },

    storage: {
      provider: (process.env.STORAGE_PROVIDER as 'google-drive' | 'local' | 'stub') || 'stub',
      driveParentFolderId: process.env.GOOGLE_DRIVE_PARENT_FOLDER_ID,
      driveCredentialsPath: process.env.GOOGLE_DRIVE_CREDENTIALS_PATH,
      localBasePath: process.env.LOCAL_STORAGE_BASE_PATH,
    },

    pipeline: {
      writingPatternPath: process.env.WRITING_PATTERN_PATH || './patterns/default-writing-pattern.txt',
    },
  };
}
