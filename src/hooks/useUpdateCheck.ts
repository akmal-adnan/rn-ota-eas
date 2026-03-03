import {useEffect, useState, useRef, useCallback} from 'react';
import {AppState, AppStateStatus} from 'react-native';
import * as Updates from 'expo-updates';

interface UseUpdateCheckReturn {
  isUpdateAvailable: boolean;
  isChecking: boolean;
  error: string | null;
  checkForUpdate: () => Promise<void>;
  performUpdate: () => Promise<void>;
}

const CHECK_INTERVAL = 5 * 60 * 1000; // 5 minutes

export const useUpdateCheck = (): UseUpdateCheckReturn => {
  const [isUpdateAvailable, setIsUpdateAvailable] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const appState = useRef(AppState.currentState);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const checkForUpdate = useCallback(async () => {
    try {
      setIsChecking(true);
      setError(null);

      const update = await Updates.checkForUpdateAsync();

      if (update.isAvailable) {
        setIsUpdateAvailable(true);
        // Optionally download the update in the background
        await Updates.fetchUpdateAsync();
      } else {
        setIsUpdateAvailable(false);
      }
    } catch (err) {
      console.warn('Error checking for updates:', err);
      setError(
        err instanceof Error ? err.message : 'Failed to check for updates',
      );
    } finally {
      setIsChecking(false);
    }
  }, []);

  const performUpdate = useCallback(async () => {
    try {
      setIsChecking(true);
      await Updates.reloadAsync();
    } catch (err) {
      console.error('Error reloading app:', err);
      setError(err instanceof Error ? err.message : 'Failed to apply update');
      setIsChecking(false);
    }
  }, []);

  // Handle app state changes (check when app comes to foreground)
  useEffect(() => {
    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        // App has come to foreground, check for updates
        checkForUpdate();
      }

      appState.current = nextAppState;
    };

    const subscription = AppState.addEventListener(
      'change',
      handleAppStateChange,
    );

    return () => {
      subscription.remove();
    };
  }, [checkForUpdate]);

  // Set up periodic checks (every 5 minutes)
  useEffect(() => {
    // Initial check on mount
    checkForUpdate();

    // Set up interval for periodic checks
    intervalRef.current = setInterval(() => {
      checkForUpdate();
    }, CHECK_INTERVAL);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [checkForUpdate]);

  return {
    isUpdateAvailable,
    isChecking,
    error,
    checkForUpdate,
    performUpdate,
  };
};
