interface AuthConfig {
  secret: string;
  jwtExpiration: number;
  jwtRefreshExpiration: number;
}

export const config: AuthConfig = {
  secret: "expressnuxtsecret",
  jwtExpiration: 1800, // 30 min
  jwtRefreshExpiration: 86400, // 24 hours
};
