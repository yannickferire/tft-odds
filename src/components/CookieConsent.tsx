import React, { useState } from 'react';
import { useCookieConsent } from '@/context/CookieConsentContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, Shield, BarChart, Settings, X, Check } from 'lucide-react';
import { Switch } from '@/components/ui/switch'; // Assuming you have a Switch component from updated package.json

export const CookieConsent = () => {
  const {
    isOpen,
    setIsOpen,
    consent,
    updateConsent,
    acceptAll,
    declineAll,
  } = useCookieConsent();

  const [showDetails, setShowDetails] = useState(false);

  // Floating button to re-open settings
  if (!isOpen) {
    return (
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.1 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 left-4 z-50 p-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full shadow-lg hover:bg-white/20 transition-colors group"
      >
        <Cookie className="w-6 h-6 text-morning group-hover:rotate-12 transition-transform" />
      </motion.button>
    );
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-start sm:p-4 pointer-events-none">
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="pointer-events-auto w-full max-w-[400px] bg-midnight/95 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden m-4 sm:m-0"
          >
            {/* Header */}
            <div className="p-6 pb-2">
              <div className="flex items-start justify-between gap-4">
                <div className="flex gap-3">
                  <div className="p-2.5 bg-morning/10 rounded-2xl">
                    <Cookie className="w-6 h-6 text-morning" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white mb-1">Cookies & Privacy</h2>
                    <p className="text-sm text-silver/80 leading-tight">
                      We use cookies to improve your experience and ensure the site works beautifully. Your data is safe and never sold.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="px-6 py-2">
              {showDetails && (
                <div className="space-y-4 animate-fadein mb-4">
                  {/* Essential */}
                  <div className="flex items-center justify-between p-3 rounded-2xl bg-white/5 border border-white/5">
                    <div className="flex items-center gap-3">
                      <Shield className="w-5 h-5 text-green-400" />
                      <div>
                        <p className="text-sm font-medium text-white">Essential</p>
                        <p className="text-xs text-silver/60">Required for the site to work.</p>
                      </div>
                    </div>
                    <Switch
                      checked={true}
                      disabled
                      className="data-[state=checked]:bg-morning"
                    />
                  </div>

                  {/* Analytics */}
                  <div className="flex items-center justify-between p-3 rounded-2xl bg-white/5 border border-white/5">
                    <div className="flex items-center gap-3">
                      <BarChart className="w-5 h-5 text-blue-400" />
                      <div>
                        <p className="text-sm font-medium text-white">Analytics</p>
                        <p className="text-xs text-silver/60">Help us improve our site.</p>
                      </div>
                    </div>
                    <Switch
                      checked={consent.analytics}
                      onCheckedChange={(checked) => updateConsent('analytics', checked)}
                      className="data-[state=checked]:bg-morning"
                    />
                  </div>

                  {/* Marketing */}
                  <div className="flex items-center justify-between p-3 rounded-2xl bg-white/5 border border-white/5">
                    <div className="flex items-center gap-3">
                      <Settings className="w-5 h-5 text-purple-400" />
                      <div>
                        <p className="text-sm font-medium text-white">Marketing</p>
                        <p className="text-xs text-silver/60">Personalized advertisements.</p>
                      </div>
                    </div>
                    <Switch
                      checked={consent.marketing}
                      onCheckedChange={(checked) => updateConsent('marketing', checked)}
                      className="data-[state=checked]:bg-morning"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="p-6 pt-2 flex items-center justify-between gap-2">
              <button
                onClick={acceptAll}
                className="flex-1 py-3 px-2 bg-morning text-midnight font-bold rounded-xl hover:bg-morning/90 transition-all hover:scale-[1.02] active:scale-[0.98] text-sm whitespace-nowrap"
              >
                Accept All
              </button>

              <button
                onClick={declineAll}
                className="flex-1 py-3 px-2 bg-white/5 text-silver font-medium rounded-xl hover:bg-white/10 transition-colors text-sm whitespace-nowrap"
              >
                No, thanks
              </button>

              {showDetails ? (
                <button
                  onClick={() => setIsOpen(false)}
                  className="flex-1 py-3 px-2 bg-white/5 text-silver font-medium rounded-xl hover:bg-white/10 transition-colors text-sm whitespace-nowrap"
                >
                  Save selection
                </button>
              ) : (
                <button
                  onClick={() => setShowDetails(true)}
                  className="flex-1 py-3 px-2 bg-white/5 text-silver font-medium rounded-xl hover:bg-white/10 transition-colors text-sm whitespace-nowrap"
                >
                  Customize
                </button>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
