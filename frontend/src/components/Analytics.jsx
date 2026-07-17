import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ReactGA from 'react-ga4';

const GA_TRACKING_ID = 'G-SP3K10LD72';

// Initialize GA4
ReactGA.initialize(GA_TRACKING_ID);

const Analytics = () => {
  const location = useLocation();

  useEffect(() => {
    // Send pageview with a custom path
    ReactGA.send({ hitType: 'pageview', page: location.pathname + location.search });
  }, [location]);

  return null;
};

export const trackEvent = (category, action, label = null) => {
  ReactGA.event({
    category,
    action,
    label,
  });
};

export default Analytics;
