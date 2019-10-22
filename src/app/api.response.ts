export type Error = {
  type: string;
  message: string;
  kind: string;
}

export class ApiResponse {
  private errors: Array<Error>;
  private payload: any;

  constructor() {
    this.errors = [];
    this.payload = undefined;
  }

  public setPayload(payload: Object) {
    this.errors = [];
    this.payload = payload;
  }

  public addError(err: Error) {
    this.errors.push(err);
  }

  public setError(errors: Array<Error>) {
    this.errors = errors;
    this.payload = undefined;
  }

  public json() {
    const { errors, payload } = this;
    if (errors) {
      return { errors };
    }

    return { payload };
  }
}

export default ApiResponse;
