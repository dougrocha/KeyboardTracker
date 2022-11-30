export default interface BaseAuthService<T> {
  register?(user: T, password: string): Promise<T>
  login?(email: string, password: string): Promise<T>
  validate(details: Partial<T>): Promise<T>
}
