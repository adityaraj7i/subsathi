import { useState, useEffect } from 'react';

const PRESENCE_CHANNEL_NAME = 'subsathi_live_presence';
const PRESENCE_STORAGE_KEY = 'subsathi_presence_ledger';
const HEARTBEAT_INTERVAL = 3000; // 3 seconds
const STALE_TIMEOUT = 8000; // 8 seconds
const BASELINE_USERS = 5; // User requested: start counting after 5

export const useRealtimeProductPresence = (productId) => {
  const [activeRealUsers, setActiveRealUsers] = useState(1);

  useEffect(() => {
    if (!productId) return;

    // Unique ID for this specific tab/session
    let clientId = sessionStorage.getItem('subsathi_presence_client_id');
    if (!clientId) {
      clientId = 'client_' + Math.random().toString(36).substring(2, 10) + '_' + Date.now();
      sessionStorage.setItem('subsathi_presence_client_id', clientId);
    }

    let channel = null;
    try {
      if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
        channel = new BroadcastChannel(PRESENCE_CHANNEL_NAME);
      }
    } catch {
      channel = null;
    }

    const updateAndCleanLedger = () => {
      try {
        const now = Date.now();
        const raw = localStorage.getItem(PRESENCE_STORAGE_KEY);
        let ledger = raw ? JSON.parse(raw) : {};

        // Update current client timestamp for this product
        if (!ledger[productId]) {
          ledger[productId] = {};
        }
        ledger[productId][clientId] = now;

        // Prune stale sessions older than STALE_TIMEOUT
        for (const pid in ledger) {
          for (const cid in ledger[pid]) {
            if (now - ledger[pid][cid] > STALE_TIMEOUT) {
              delete ledger[pid][cid];
            }
          }
          if (Object.keys(ledger[pid]).length === 0) {
            delete ledger[pid];
          }
        }

        localStorage.setItem(PRESENCE_STORAGE_KEY, JSON.stringify(ledger));

        // Count active real users on this specific product
        const realCount = ledger[productId] ? Object.keys(ledger[productId]).length : 1;
        setActiveRealUsers(Math.max(1, realCount));

        // Notify other open tabs
        if (channel) {
          channel.postMessage({
            type: 'PRESENCE_SYNC',
            productId,
            count: Math.max(1, realCount)
          });
        }
      } catch {
        setActiveRealUsers(1);
      }
    };

    // Remove this client when navigating away or closing tab
    const removeClientFromLedger = () => {
      try {
        const raw = localStorage.getItem(PRESENCE_STORAGE_KEY);
        if (!raw) return;
        const ledger = JSON.parse(raw);
        if (ledger[productId] && ledger[productId][clientId]) {
          delete ledger[productId][clientId];
          localStorage.setItem(PRESENCE_STORAGE_KEY, JSON.stringify(ledger));
        }
        if (channel) {
          channel.postMessage({
            type: 'PRESENCE_LEAVE',
            productId,
            clientId
          });
        }
      } catch {
        // ignore
      }
    };

    // Initial check in
    updateAndCleanLedger();

    // Heartbeat ticker
    const intervalId = setInterval(updateAndCleanLedger, HEARTBEAT_INTERVAL);

    // Listen to BroadcastChannel messages from other tabs
    const handleChannelMessage = (event) => {
      const data = event.data;
      if (!data) return;
      if (data.productId === productId) {
        if (data.type === 'PRESENCE_SYNC' && typeof data.count === 'number') {
          setActiveRealUsers(Math.max(1, data.count));
        } else if (data.type === 'PRESENCE_LEAVE') {
          updateAndCleanLedger();
        }
      }
    };

    if (channel) {
      channel.addEventListener('message', handleChannelMessage);
    }

    // Listen to localStorage storage events from other windows
    const handleStorageEvent = (event) => {
      if (event.key === PRESENCE_STORAGE_KEY) {
        try {
          const raw = event.newValue;
          if (raw) {
            const ledger = JSON.parse(raw);
            const realCount = ledger[productId] ? Object.keys(ledger[productId]).length : 1;
            setActiveRealUsers(Math.max(1, realCount));
          }
        } catch {
          // ignore
        }
      }
    };

    window.addEventListener('storage', handleStorageEvent);
    window.addEventListener('beforeunload', removeClientFromLedger);

    return () => {
      clearInterval(intervalId);
      removeClientFromLedger();
      if (channel) {
        channel.removeEventListener('message', handleChannelMessage);
        channel.close();
      }
      window.removeEventListener('storage', handleStorageEvent);
      window.removeEventListener('beforeunload', removeClientFromLedger);
    };
  }, [productId]);

  // Total viewer count: Baseline 5 + Real active user sessions
  const totalViewersCount = BASELINE_USERS + activeRealUsers;

  return {
    activeRealUsers,
    totalViewersCount
  };
};

export default useRealtimeProductPresence;
