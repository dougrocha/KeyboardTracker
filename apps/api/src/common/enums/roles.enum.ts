export enum Role {
  ADMIN = 'ADMIN',
  DESIGNER = 'DESIGNER',
  USER = 'USER',
  EDITOR = 'EDITOR',
  VIEWER = 'VIEWER',
}

export type RoleType = `${keyof typeof Role}`
