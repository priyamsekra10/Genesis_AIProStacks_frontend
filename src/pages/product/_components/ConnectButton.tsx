import React from 'react';
import {
  useRTVIClient,
  useRTVIClientTransportState,
} from '@pipecat-ai/client-react';
import { RTVIProvider } from '../_providers/RTVIProvider';

interface ConnectButtonProps {
  productId: string;
  agentId: string;
}

export function ConnectButton({ productId, agentId }: ConnectButtonProps) {
  const client = useRTVIClient();
  const transportState = useRTVIClientTransportState();
  const isConnected = ['connected', 'ready'].includes(transportState);
  const isConnecting = transportState === 'connecting';
  const isDisconnecting = transportState === 'disconnecting';

  const handleClick = async () => {
    if (!client) {
      console.error('RTVI client is not initialized');
      return;
    }

    try {
      if (isConnected) {
        await client.disconnect();
      } else {
        console.log('Attempting to connect with:', {
          productId,
          agentId,
          baseUrl: client.params.baseUrl
        });
        await client.connect();
      }
    } catch (error) {
      console.error('Connection error:', error);
      if (error instanceof Error) {
        console.error('Error details:', {
          message: error.message,
          stack: error.stack
        });
      }
    }
  };

  return (
    <RTVIProvider productId={productId} agentId={agentId}>
      <div className="controls" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
        <button
          style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            border: 'none',
            backgroundColor: isConnected ? '#FF4444' : '#ffffff',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            cursor: isConnecting || isDisconnecting ? 'wait' : 'pointer',
            position: 'relative',
            transition: 'all 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            animation: isConnecting ? 'pulse 1.5s infinite' : 'none',
          }}
          onClick={handleClick}
          disabled={!client || isConnecting || isDisconnecting}
        >
          <style>
            {`
              @keyframes pulse {
                0% { transform: scale(1); }
                50% { transform: scale(1.1); }
                100% { transform: scale(1); }
              }
              @keyframes wave {
                0% { transform: scale(1); opacity: 1; }
                100% { transform: scale(1.5); opacity: 0; }
              }
              .wave-circle {
                position: absolute;
                border: 2px solid ${isConnected ? '#FF4444' : '#ffffff'};
                width: 100%;
                height: 100%;
                border-radius: 50%;
                animation: wave 2s infinite;
              }
              .mic-icon {
                width: 24px;
                height: 24px;
                fill: ${isConnected ? '#ffffff' : '#000000'};
                transition: all 0.3s ease;
              }
            `}
          </style>
          {isConnected && <div className="wave-circle" />}
          <svg
            className="mic-icon"
            viewBox="0 0 24 24"
            style={{
              transform: isConnecting ? 'scale(0.9)' : 'scale(1)',
            }}
          >
            {isConnected ? (
              // Stop icon
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" />
            ) : (
              // Microphone icon
              <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm-1 1.93c-3.03-.32-5.5-2.79-5.5-5.93h-2c0 3.89 3.11 7.14 7 7.47V20h2v-2.53c3.89-.33 7-3.58 7-7.47h-2c0 3.14-2.47 5.61-5.5 5.93z" />
            )}
          </svg>
        </button>
        <span style={{
          fontSize: '14px',
          color: '#666',
          marginTop: '8px',
          textAlign: 'center'
        }}>
          {isConnecting ? 'Connecting...' :
           isDisconnecting ? 'Disconnecting...' :
           isConnected ? 'Click to end call' :
           'Click to talk to sales agent'}
        </span>
      </div>
    </RTVIProvider>
  );
}
