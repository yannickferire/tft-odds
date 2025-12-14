import React, { createContext, useContext, useEffect, useState } from 'react';

type ConsentCategory = 'essential' | 'analytics' | 'marketing';

interface ConsentState {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
}

interface CookieConsentContextType {
  consent: ConsentState;
  hasInteracted: boolean;
  setConsent: (consent: ConsentState) => void;
  acceptAll: () => void;
  declineAll: () => void;
  updateConsent: (category: ConsentCategory, value: boolean) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const CookieConsentContext = createContext<CookieConsentContextType | undefined>(undefined);

export const useCookieConsent = () => {
  const context = useContext(CookieConsentContext);
  if (!context) {
    throw new Error('useCookieConsent must be used within a CookieConsentProvider');
  }
  return context;
};

export const CookieConsentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [consent, setConsentState] = useState<ConsentState>({
    essential: true,
    analytics: true,
    marketing: true,
  });
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const storedConsent = localStorage.getItem('cookie-consent');
    if (storedConsent) {
      setConsentState(JSON.parse(storedConsent));
      setHasInteracted(true);
    } else {
      // Small delay to show the modal smoothly after load
      const timer = setTimeout(() => setIsOpen(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const saveConsent = (newConsent: ConsentState) => {
    setConsentState(newConsent);
    setHasInteracted(true);
    localStorage.setItem('cookie-consent', JSON.stringify(newConsent));
    setIsOpen(false);
  };

  const setConsent = (newConsent: ConsentState) => {
    saveConsent(newConsent);
  };

  const updateConsent = (category: ConsentCategory, value: boolean) => {
    if (category === 'essential') return;
    setConsentState((prev) => ({ ...prev, [category]: value }));
  };

  const acceptAll = () => {
    saveConsent({
      essential: true,
      analytics: true,
      marketing: true,
    });
  };

  const declineAll = () => {
    saveConsent({
      essential: true,
      analytics: false,
      marketing: false,
    });
  };

  return (
    <CookieConsentContext.Provider
      value={{
        consent,
        hasInteracted,
        setConsent,
        acceptAll,
        declineAll,
        updateConsent,
        isOpen,
        setIsOpen,
      }}
    >
      {children}
    </CookieConsentContext.Provider>
  );
};
