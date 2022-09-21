declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: Environment

      PORT: number

      SESSION_SECRET: string

      APP_URL: string
      CORS_ORIGIN: string

      DISCORD_CLIENT_SECRET: string
      DISCORD_CLIENT_ID: string
      DISCORD_CALLBACK_URL: string

      POSTGRES_PASSWORD: string
      POSTGRES_USER: string
      POSTGRES_DB: string
      DATABASE_URL: string

      REDIS_URL: string

      UPLOADS_PATH: string

      MAX_FILE_UPLOAD_SIZE: number
    }
  }
}

export {}
