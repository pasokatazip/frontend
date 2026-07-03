export function logServerError(message: string, error: unknown) {
  const details =
    error instanceof Error
      ? (error.stack ?? `${error.name}: ${error.message}`)
      : String(error);

  process.stderr.write(`[error] ${message}: ${details}\n`);
}
