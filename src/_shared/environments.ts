import { configDotenv } from 'dotenv';

export const EnvTypesValues = ['dev', 'prod'] as const;
export type EnvType = (typeof EnvTypesValues)[number];

export const EnvVarsValues = ['APP_ENV', 'APP_MONGO_URL'] as const;
export type EnvVars = (typeof EnvVarsValues)[number];
configDotenv();

export class Environment {
  private static validatedVars: Partial<Record<EnvVars, string>> = {};

  static getVar(varName: EnvVars): string {
    if (!this.validatedVars) {
      this.validateVars();
    }
    return process.env[varName];
  }

  private static validateVars(): void {
    const missingVars: string[] = [];

    EnvVarsValues.forEach((e) => {
      const value = process.env[e];
      if (!value) {
        missingVars.push(e);
      } else {
        this.validatedVars[e] = value;
      }
    });

    if (missingVars.length > 0) {
      throw new Error('Missing env vars: ' + missingVars.join(', '));
    }
  }

  static getEnvType(): EnvType {
    const envType = Environment.getVar('APP_ENV') as EnvType;

    if (!EnvTypesValues.includes(envType))
      throw new Error('Env type provided in APP_ENV is not valid');

    return envType;
  }
}

Environment.getVar('APP_MONGO_URL');
