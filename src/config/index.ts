/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
type CommonEnvsType = {
  ENVIRONMENT: string | undefined;
  BASE_URL: string | undefined;
  CLOUDINARY_API_URL: string | undefined;
  CLOUDINARY_CLOUD_NAME: string | undefined;
  CLOUDINARY_UPLOAD_PRESET: string | undefined;
};

const commonEnvs: CommonEnvsType = {
  ENVIRONMENT: process.env.ENVIRONMENT,
  BASE_URL: process.env.BASE_URL,
  CLOUDINARY_API_URL: process.env.CLOUDINARY_API_URL,
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_UPLOAD_PRESET: process.env.CLOUDINARY_UPLOAD_PRESET,
};

const config: Record<string, any> = Object.freeze({
  production: {
    ...commonEnvs,
  },
  local: {
    ...commonEnvs,
  },
  development: {
    ...commonEnvs,
  },
  staging: {
    ...commonEnvs,
  },
});

export default config[commonEnvs.ENVIRONMENT!];
