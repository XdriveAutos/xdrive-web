/**
 * Validates if the email belongs to the allowed domains.
 * Allowed domains: @xdrive.com, @xdriveautos.com
 */
export const validateEmailDomain = (email: string): boolean | string => {
  if (email.endsWith('@xdrive.com') || email.endsWith('@xdriveautos.com')) {
    return true;
  }
  return 'Email must end with @xdrive.com or @xdriveautos.com';
};
