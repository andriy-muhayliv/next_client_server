import { NextResponse } from 'next/server';

const rateLimitWindowMs = 1000;
let lastRequestTimestamp = Date.now();
let requestCount = 0;
let requestsPerSecond = 0;

export function middleware(req) {
  const currentTimestamp = Date.now();
  
  if (currentTimestamp - lastRequestTimestamp < rateLimitWindowMs) {
    requestCount++;
  } else {
    lastRequestTimestamp = currentTimestamp;
    requestsPerSecond = requestCount; 
    requestCount = 1; 
  }

  const response = NextResponse.next();
  response.headers.set('X-Requests-Per-Second', `${requestsPerSecond}`);
  
  return response;
}

