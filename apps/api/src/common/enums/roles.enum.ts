export enum Role {
  USER = 'USER',
  VENDOR = 'VENDOR',
  DESIGNER = 'DESIGNER',
}

export type RoleType = `${keyof typeof Role}`
