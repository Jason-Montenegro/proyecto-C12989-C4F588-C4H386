// thrown by value objects when raw input does not meet their rules; the
// message is safe to send back to the client
export default class ValidationError extends Error {
  readonly status = 400;
}
