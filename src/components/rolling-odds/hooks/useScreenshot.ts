'use client';

import React from 'react';
import { toPng } from 'html-to-image';

interface UseScreenshotOptions {
  elementRef: React.RefObject<HTMLElement>;
  championName?: string;
  onStart?: () => void;
  onEnd?: () => void;
}

const WATERMARK_HTML = `
  <div class="text-center">
    <p class="text-morning text-sm leading-tight">
      <span class="text-crema/60 text-xs">made with</span> <strong class="font-medium">tftodds.com</strong> <span class="text-crema/60 text-xs">rolling odds calculator</span>
    </p>
  </div>
`;

const SCREENSHOT_CONFIG = {
  backgroundColor: '#041C32',
  pixelRatio: 2,
  cacheBust: true,
} as const;

type ScreenshotStatus = 'idle' | 'capturing' | 'success';

export function useScreenshot({ elementRef, championName, onStart, onEnd }: UseScreenshotOptions) {
  const [status, setStatus] = React.useState<ScreenshotStatus>('idle');

  const captureScreenshot = React.useCallback(async () => {
    if (!elementRef.current || !championName || status !== 'idle') return;

    setStatus('capturing');
    onStart?.();

    // Clone the element to capture it off-screen
    const clone = elementRef.current.cloneNode(true) as HTMLElement;

    // Create off-screen container
    const offscreenContainer = document.createElement('div');
    offscreenContainer.style.position = 'fixed';
    offscreenContainer.style.top = '-9999px';
    offscreenContainer.style.left = '-9999px';
    offscreenContainer.style.width = elementRef.current.offsetWidth + 'px';
    offscreenContainer.appendChild(clone);
    document.body.appendChild(offscreenContainer);

    // Inject watermark
    const watermarkPlaceholder = clone.querySelector('[data-watermark-placeholder]');
    if (watermarkPlaceholder) {
      watermarkPlaceholder.innerHTML = WATERMARK_HTML;
    }

    // Hide screenshot/reset buttons
    const buttons = clone.querySelector('[data-screenshot-buttons]');
    if (buttons) {
      (buttons as HTMLElement).style.opacity = '0';
    }

    // Hide inactive legend items
    const legendContainer = clone.querySelector('[data-legend-container]');
    if (legendContainer) {
      const legendButtons = legendContainer.querySelectorAll('button[data-star-visible]');
      legendButtons.forEach((button) => {
        const isVisible = button.getAttribute('data-star-visible') === 'true';
        if (!isVisible) {
          (button as HTMLElement).style.display = 'none';
        }
      });
    }

    // Small delay to ensure styles are applied
    await new Promise(resolve => setTimeout(resolve, 50));

    try {
      const dataUrl = await toPng(clone, SCREENSHOT_CONFIG);

      // Download the image
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = `tftodds-${championName.toLowerCase().replace(/\s+/g, '-')}-rolling-odds.png`;
      link.click();

      // Show success state
      setStatus('success');

      // Reset to idle after 2 seconds
      setTimeout(() => {
        setStatus('idle');
      }, 2000);
    } catch (error) {
      console.error('Screenshot failed:', error);
      setStatus('idle');
    } finally {
      // Clean up
      document.body.removeChild(offscreenContainer);
      onEnd?.();
    }
  }, [elementRef, championName, status, onStart, onEnd]);

  return {
    captureScreenshot,
    status,
  };
}
