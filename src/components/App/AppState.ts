import { RegistrationProps } from "../Authentication/RegistrationDialog";

export type AppState = {
    isAuthenticated: boolean;
    authToken: string | null;
    userId: string | null;
    username: string | null;
    error: {
      message: string;
      code: number;
    } | null;
    uiState: {
      isRegistering: boolean;
      isLoggingIn: boolean;
    };
    userProfile: {
      name: string;
      email: string;
    } & RegistrationProps
  }