
type HttpResponse<T = any> = {
    statusCode: number;
    body?: T;
};

export const ok = <T = any> (body: T): HttpResponse<T> => ({
    statusCode: 200,
    body,
});

export const badRequest = (error: Error): HttpResponse<Error> => ({
    statusCode: 400,
    body: error,
});
