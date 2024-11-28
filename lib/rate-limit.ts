class RateLimitError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

export function rateLimit({ interval }: { interval: number }) {
  const tokens = new Map();

  return {
    check: async (limit: number, token: string) => {
      const now = Date.now();
      const windowStart = now - interval;

      const tokenCount = tokens.get(token) || [];
      const validTokens = tokenCount.filter(
        (timestamp: number) => timestamp > windowStart
      );

      if (validTokens.length >= limit) {
        throw new RateLimitError("Rate limit exceeded", 429);
      }

      validTokens.push(now);
      tokens.set(token, validTokens);

      return true;
    },
  };
}
