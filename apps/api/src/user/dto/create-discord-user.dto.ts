export class CreateDiscordUserDto {
  discordId: string
  username: string
  discriminator: string
  email: string
  refreshToken: string
  accessToken: string
  mfaEnabled: boolean
}
