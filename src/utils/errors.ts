
export class UsernameExistsError extends Error {
    constructor() {
      super('Username already exists.');
      this.name = 'UsernameExistsError';
    }
  }
  
 export class InvalidCredentialsError extends Error {
    constructor() {
      super('Invalid username or password.');
      this.name = 'InvalidCredentialsError';
    }
  }