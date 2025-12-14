export enum Feature {
  MAX_CAR_LISTINGS_PER_MONTH = 'max_car_listings_per_month',
  MAX_CAR_IMAGES = 'max_car_images',
  MAX_MECHANIC_IMAGES = 'max_mechanic_images',
  MAX_WORKSHOP_IMAGES = 'max_workshop_images',
  MAX_ACTIVE_CARS = 'max_active_cars',
  MAX_ACTIVE_MECHANICS = 'max_active_mechanics',
  MAX_ACTIVE_WORKSHOPS = 'max_active_workshops',
  PRIORITY_LISTING = 'priority_listing',
  FEATURED_LISTING = 'featured_listing',
  VERIFIED_BADGE = 'verified_badge',
  ANALYTICS_ACCESS = 'analytics_access',
  CUSTOMER_SUPPORT = 'customer_support',
  SOCIAL_MEDIA_INTEGRATION = 'social_media_integration',
  CUSTOM_BRANDING = 'custom_branding',
  LEAD_MANAGEMENT = 'lead_management',
  API_ACCESS = 'api_access',
  CUSTOM_DEVELOPMENT = 'custom_development',
}

export const FEATURE_LABELS: Record<Feature, string> = {
  [Feature.MAX_CAR_LISTINGS_PER_MONTH]: 'Max Car Listings Per Month',
  [Feature.MAX_CAR_IMAGES]: 'Max Car Images',
  [Feature.MAX_MECHANIC_IMAGES]: 'Max Mechanic Images',
  [Feature.MAX_WORKSHOP_IMAGES]: 'Max Workshop Images',
  [Feature.MAX_ACTIVE_CARS]: 'Max Active Cars',
  [Feature.MAX_ACTIVE_MECHANICS]: 'Max Active Mechanics',
  [Feature.MAX_ACTIVE_WORKSHOPS]: 'Max Active Workshops',
  [Feature.PRIORITY_LISTING]: 'Priority Listing',
  [Feature.FEATURED_LISTING]: 'Featured Listing',
  [Feature.VERIFIED_BADGE]: 'Verified Badge',
  [Feature.ANALYTICS_ACCESS]: 'Analytics Access',
  [Feature.CUSTOMER_SUPPORT]: 'Customer Support',
  [Feature.SOCIAL_MEDIA_INTEGRATION]: 'Social Media Integration',
  [Feature.CUSTOM_BRANDING]: 'Custom Branding',
  [Feature.LEAD_MANAGEMENT]: 'Lead Management',
  [Feature.API_ACCESS]: 'API Access',
  [Feature.CUSTOM_DEVELOPMENT]: 'Custom Development',
};

export const getFeatureLabel = (feature: string): string => {
  const enumValue = Object.values(Feature).find((v) => v === feature);
  return enumValue ? FEATURE_LABELS[enumValue as Feature] : feature;
};
