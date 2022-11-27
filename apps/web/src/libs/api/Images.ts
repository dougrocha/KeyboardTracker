export const GetUserAvatar = (userId: string, avatarId?: string) =>
  avatarId
    ? `${process.env.NEXT_PUBLIC_API_URL}/user/${userId}/avatar/${avatarId}`
    : `/hero.jpg`
