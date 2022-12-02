export const GetUserAvatar = (userId: string, avatarId?: string | null) =>
  avatarId
    ? `${process.env.NEXT_PUBLIC_API_URL}/user/${userId}/avatar/${avatarId}`
    : `/images/hero.jpg`
