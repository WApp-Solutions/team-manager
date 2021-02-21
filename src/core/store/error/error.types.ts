export enum TMErrorType {
  DATABASE = 'database',
}

export interface TMError {
  errorMessage: string;
  originalError: Error;
  occursAt: Date;
}

export interface TMErrorPayload {
  type: TMErrorType;
  error: Error;
}

export interface TMErrorSlice {
  [TMErrorType.DATABASE]: TMError[];
}

export const TMErrorMessage = {
  [TMErrorType.DATABASE]: 'Es ist ein Fehler bei der Verbindung zur Datenbank aufgetreten!',
} as const;
