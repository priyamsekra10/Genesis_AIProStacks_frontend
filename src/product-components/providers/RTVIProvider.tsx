import { type PropsWithChildren } from 'react';
import { RTVIClient } from '@pipecat-ai/client-js';
import { DailyTransport } from '@pipecat-ai/daily-transport';
import { RTVIClientProvider } from '@pipecat-ai/client-react';
import React from 'react';

interface RTVIProviderProps extends PropsWithChildren {
  productId: string;
  agentId: string;
}

export function RTVIProvider({ children, productId, agentId }: RTVIProviderProps) {
  const transport = new DailyTransport();

  console.log("productId", productId);

  const client = new RTVIClient({
    transport,
    params: {
      baseUrl: 'https://68f817dee7af.ngrok-free.app',
      endpoints: {
        connect: `/connect`,
      },
    },
    enableMic: true,
    enableCam: false,
  });

  console.log("client", client);

  return <RTVIClientProvider client={client}>{children}</RTVIClientProvider>;
}
