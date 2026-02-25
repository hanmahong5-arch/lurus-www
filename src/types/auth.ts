/**
 * OIDC Authentication Type Definitions
 * Used by useAuth composable for Zitadel OIDC integration
 */

export interface OIDCConfig {
  issuer: string
  clientId: string
  redirectUri: string
  postLogoutRedirectUri: string
  scopes: string[]
}

export interface OIDCTokens {
  access_token: string
  id_token: string
  refresh_token?: string
  token_type: string
  expires_in: number
  /** Timestamp (ms) when access_token expires */
  expires_at: number
  scope?: string
}

export interface OIDCUserInfo {
  sub: string
  name?: string
  given_name?: string
  family_name?: string
  preferred_username?: string
  email?: string
  email_verified?: boolean
  locale?: string
  picture?: string
}

export interface OIDCError {
  error: string
  error_description?: string
}
