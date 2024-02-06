export enum HttpStatusCode {
	OK = 200,
	BAD_REQUEST = 400,
	NOT_FOUND = 404,
	ALREADY_EXISTS = 409,
	INTERNAL_SERVER = 500,
}

export class BaseError extends Error {
	public readonly name: string;
	public readonly httpCode: HttpStatusCode;
	public readonly isOperational: boolean;

	constructor(name: string, httpCode: HttpStatusCode, description: string, isOperational = true) {
		super(description);
		Object.setPrototypeOf(this, new.target.prototype);

		this.name = name;
		this.httpCode = httpCode;
		this.isOperational = isOperational;

		Error.captureStackTrace(this);
	}
}

export class APIError extends BaseError {
	constructor(
		name: string,
		httpCode = HttpStatusCode.INTERNAL_SERVER,
		description = 'Internal server error',
		isOperational = true,
	) {
		super(name, httpCode, description, isOperational);
	}
}
