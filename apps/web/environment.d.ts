declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_API_URL: string
      NEXT_PUBLIC_WEB_URL: string
    }
  }
}

export {}
