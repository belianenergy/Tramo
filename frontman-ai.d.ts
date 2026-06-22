declare module '@frontman-ai/nextjs' {
  import type { NextRequest, NextResponse } from 'next/server';

  export function createMiddleware(options: { host: string }): (req: NextRequest) => Promise<NextResponse | undefined>;
}

declare module '@frontman-ai/nextjs/Instrumentation' {
  import type { LogRecordProcessor } from '@opentelemetry/sdk-logs';
  import type { SpanProcessor } from '@opentelemetry/sdk-trace-base';

  export function setup(): [LogRecordProcessor, SpanProcessor];
}
