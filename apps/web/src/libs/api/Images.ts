export const GetUserAvatar = (userId: string, avatarId?: string) =>
  avatarId
    ? `${process.env.NEXT_PUBLIC_API_URL}/users/${userId}/avatar/${avatarId}`
    : `/hero.jpg`
