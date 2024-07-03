import { add, init, track } from '@amplitude/analytics-browser';
import { BaseEvent } from '@amplitude/analytics-types';
import { sessionReplayPlugin } from '@amplitude/plugin-session-replay-browser';
import { createContext, useEffect } from 'react';

const AMPLITUDE_API_KEY = process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY;

export const AmplitudeContext = createContext<{
  trackAmplitudeEvent: (
    eventName: string | BaseEvent,
    eventProperties?: Record<string, any>,
  ) => void;
}>({ trackAmplitudeEvent: () => {} });

const AmplitudeContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  useEffect(() => {
    init(AMPLITUDE_API_KEY || '', undefined, {
      defaultTracking: {
        sessions: true,
        pageViews: true,
      },
    });

    const sessionReplayTracking = sessionReplayPlugin({
      sampleRate: 1,
    });

    add(sessionReplayTracking);
  }, []);

  const trackAmplitudeEvent = (
    eventName: string | BaseEvent,
    eventProperties?: Record<string, any>,
  ) => {
    track(eventName, eventProperties);
  };

  const value = { trackAmplitudeEvent };

  return (
    <AmplitudeContext.Provider value={value}>
      {children}
    </AmplitudeContext.Provider>
  );
};

export default AmplitudeContextProvider;
