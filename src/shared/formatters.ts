/**
 * Formats a number as Nigerian Naira currency
 * @param amount - The amount to format
 * @param options - Optional configuration for the formatter
 * @param options.showSymbol - Whether to show the ₦ symbol (default: true)
 * @param options.showDecimal - Whether to show decimal places (default: true)
 * @returns Formatted currency string
 * @example
 * formatCurrency(1000.50)
 * formatCurrency(1000.50, { showSymbol: false })
 * formatCurrency(1000, { showDecimal: false })
 */
export const formatCurrency = (
  amount: number,
  options: { showSymbol?: boolean; showDecimal?: boolean } = {},
): string => {
  const { showSymbol = true, showDecimal = true } = options;
  const formatter = new Intl.NumberFormat('en-NG', {
    minimumFractionDigits: showDecimal ? 2 : 0,
    maximumFractionDigits: showDecimal ? 2 : 0,
  });

  return `${showSymbol ? '₦' : ''}${formatter.format(amount)}`;
};

/**
 * Formats a date string or Date object into a human-readable format
 * @param date - The date to format (string or Date object)
 * @param format - The format to use: 'short', 'long', 'relative', or 'iso'
 * @returns Formatted date string
 * @example
 * formatDate("2025-05-28")
 * formatDate("2025-05-28", "long")
 * formatDate("2025-05-28", "relative")
 * formatDate("2025-05-28", "iso")
 */
export const formatDate = (
  date: string | Date,
  format: 'short' | 'long' | 'relative' | 'iso' = 'short',
): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;

  if (isNaN(dateObj.getTime())) {
    return 'Invalid Date';
  }

  if (format === 'iso') {
    const isoString = dateObj.toISOString().split('T')[0];
    return isoString ?? 'Invalid Date';
  }

  if (format === 'relative') {
    const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
    const diff = dateObj.getTime() - new Date().getTime();
    const days = Math.round(diff / (1000 * 60 * 60 * 24));

    if (Math.abs(days) < 30) {
      return rtf.format(days, 'day');
    }
    return dateObj.toLocaleDateString('en-NG', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  }

  if (format === 'long') {
    return dateObj.toLocaleDateString('en-NG', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }

  return dateObj.toLocaleDateString('en-NG', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
};

/**
 * Formats a phone number to Nigerian format, enforcing a maximum of 11 digits
 * @param phone - The phone number to format
 * @returns Formatted phone number or truncated digits if invalid
 * @example
 * formatPhoneNumber("08012345678")
 * formatPhoneNumber("+2348012345678")
 * formatPhoneNumber("080123456789")
 * formatPhoneNumber("080123")
 */
export const formatPhoneNumber = (phone: string): string => {
  let cleaned = phone.replace(/\D/g, '');
  if (cleaned.startsWith('234')) {
    cleaned = '0' + cleaned.slice(3);
  }
  cleaned = cleaned.slice(0, 11);
  if (cleaned.length === 11) {
    return cleaned.replace(/(\d{4})(\d{3})(\d{4})/, '$1 $2 $3');
  }
  return cleaned;
};

/**
 * Formats an account number by adding spaces
 * @param accountNumber - The account number to format
 * @returns Formatted account number
 * @example
 * formatAccountNumber("1234567890")
 */
export const formatAccountNumber = (accountNumber: string): string => {
  const cleaned = accountNumber.replace(/\D/g, '');
  return cleaned.replace(/(\d{4})(\d{4})(\d{2})/, '$1 $2 $3');
};

/**
 * Truncates text with ellipsis if it exceeds maxLength
 * @param text - The text to truncate
 * @param maxLength - Maximum length before truncating
 * @returns Truncated text with ellipsis if necessary
 * @example
 * truncateText("Long text here", 8)
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};

/**
 * Formats file size in bytes to human readable format
 * @param bytes - The size in bytes
 * @returns Human readable file size
 * @example
 * formatFileSize(1024)
 * formatFileSize(1234567)
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
};

/**
 * Formats a percentage value
 * @param value - The value to format as percentage
 * @param decimals - Number of decimal places (default: 1)
 * @returns Formatted percentage string
 * @example
 * formatPercentage(0.156)
 * formatPercentage(0.156, 0)
 */
export const formatPercentage = (
  value: number,
  decimals: number = 1,
): string => {
  return `${(value * 100).toFixed(decimals)}%`;
};

export const formatAmount = (value: string) => {
  return value ? Number(value).toLocaleString() : '';
};

export const formatTime = (timeInSeconds: number) => {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = timeInSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

export const obfuscateEmail = (email: string): string => {
  if (!email) return '';

  const [local, domain] = email.split('@');
  if (!local || !domain) return email;

  const localObfuscated =
    local.length > 2
      ? `${local[0]}${'*'.repeat(local.length - 2)}${local[local.length - 1]}`
      : local;

  const domainParts = domain.split('.');
  const mainDomain = domainParts[0] || '';
  const tld = domainParts.slice(1).join('.');

  const domainObfuscated =
    mainDomain.length > 2
      ? `${mainDomain[0]}${'*'.repeat(mainDomain.length - 1)}`
      : mainDomain;

  return `${localObfuscated}@${domainObfuscated}${tld ? '.' + tld : ''}`;
};
