import { LanguageType } from '../components/LanguageProvider';

/**
 * Format a date according to the user's language and region preferences
 * @param date The date to format
 * @param language The user's selected language
 * @param options Optional formatting options
 * @returns Formatted date string
 */
export const formatDate = (
  date: Date,
  language: LanguageType,
  options?: Intl.DateTimeFormatOptions
): string => {
  // Default options based on language
  const defaultOptions: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    ...options,
  };

  // Language to locale mapping
  const languageToLocale: { [key in LanguageType]: string } = {
    'cs': 'cs-CZ',
    'en': 'en-US',
    'es': 'es-ES',
    'de': 'de-DE',
    'fr': 'fr-FR',
  };

  try {
    return new Intl.DateTimeFormat(languageToLocale[language], defaultOptions).format(date);
  } catch (error) {
    console.error('Error formatting date:', error);
    // Fallback to ISO format if formatting fails
    return date.toISOString().split('T')[0];
  }
};

/**
 * Format a time according to the user's language and region preferences
 * @param date The date (or time) to format
 * @param language The user's selected language
 * @param options Optional formatting options
 * @returns Formatted time string
 */
export const formatTime = (
  date: Date,
  language: LanguageType,
  options?: Intl.DateTimeFormatOptions
): string => {
  // Default options based on language
  const defaultOptions: Intl.DateTimeFormatOptions = {
    hour: '2-digit',
    minute: '2-digit',
    // Use 12-hour format for US English, 24-hour for others
    hour12: language === 'en',
    ...options,
  };

  // Language to locale mapping
  const languageToLocale: { [key in LanguageType]: string } = {
    'cs': 'cs-CZ',
    'en': 'en-US',
    'es': 'es-ES',
    'de': 'de-DE',
    'fr': 'fr-FR',
  };

  try {
    return new Intl.DateTimeFormat(languageToLocale[language], defaultOptions).format(date);
  } catch (error) {
    console.error('Error formatting time:', error);
    // Fallback to simple time format if formatting fails
    return date.toTimeString().split(' ')[0].substring(0, 5);
  }
};

/**
 * Format a date and time according to the user's language and region preferences
 * @param date The date and time to format
 * @param language The user's selected language
 * @param options Optional formatting options
 * @returns Formatted date and time string
 */
export const formatDateTime = (
  date: Date,
  language: LanguageType,
  options?: Intl.DateTimeFormatOptions
): string => {
  // Default options
  const defaultOptions: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    // Use 12-hour format for US English, 24-hour for others
    hour12: language === 'en',
    ...options,
  };

  return formatDate(date, language, defaultOptions);
};

/**
 * Get a human-readable relative time string (e.g., '5 minutes ago', '2 hours ago')
 * @param date The date to compare with current time
 * @param language The user's selected language
 * @returns Human-readable relative time string
 */
export const getRelativeTime = (
  date: Date,
  language: LanguageType
): string => {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  // Language to locale mapping
  const languageToLocale: { [key in LanguageType]: string } = {
    'cs': 'cs-CZ',
    'en': 'en-US',
    'es': 'es-ES',
    'de': 'de-DE',
    'fr': 'fr-FR',
  };

  try {
    // Using Intl.RelativeTimeFormat if available
    if ('RelativeTimeFormat' in Intl) {
      const rtf = new Intl.RelativeTimeFormat(languageToLocale[language], {
        numeric: 'auto',
      });

      if (diffInSeconds < 60) {
        return rtf.format(-diffInSeconds, 'second');
      } else if (diffInSeconds < 3600) {
        const minutes = Math.floor(diffInSeconds / 60);
        return rtf.format(-minutes, 'minute');
      } else if (diffInSeconds < 86400) {
        const hours = Math.floor(diffInSeconds / 3600);
        return rtf.format(-hours, 'hour');
      } else if (diffInSeconds < 604800) {
        const days = Math.floor(diffInSeconds / 86400);
        return rtf.format(-days, 'day');
      } else {
        // For longer periods, just show the date
        return formatDate(date, language);
      }
    } else {
      // Fallback for browsers without Intl.RelativeTimeFormat support
      if (diffInSeconds < 60) {
        return language === 'cs' ? 'před chvílí' : 'just now';
      } else if (diffInSeconds < 3600) {
        const minutes = Math.floor(diffInSeconds / 60);
        return language === 'cs' 
          ? `před ${minutes} minutami` 
          : `${minutes} minutes ago`;
      } else if (diffInSeconds < 86400) {
        const hours = Math.floor(diffInSeconds / 3600);
        return language === 'cs' 
          ? `před ${hours} hodinami` 
          : `${hours} hours ago`;
      } else {
        const days = Math.floor(diffInSeconds / 86400);
        return language === 'cs' 
          ? `před ${days} dny` 
          : `${days} days ago`;
      }
    }
  } catch (error) {
    console.error('Error formatting relative time:', error);
    // Fallback to simple date format if relative time formatting fails
    return formatDate(date, language);
  }
};

/**
 * Get the user's time zone
 * @returns The user's time zone (e.g., 'Europe/Prague')
 */
export const getUserTimeZone = (): string => {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  } catch (error) {
    console.error('Error getting user time zone:', error);
    // Fallback to UTC if time zone detection fails
    return 'UTC';
  }
};

/**
 * Convert a date to the user's local time zone
 * @param date The date to convert
 * @param timeZone The target time zone
 * @returns A new Date object in the target time zone
 */
export const convertToTimeZone = (
  date: Date,
  timeZone: string
): Date => {
  try {
    const dateTimeFormat = new Intl.DateTimeFormat('en-US', {
      timeZone,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
    
    const formattedDate = dateTimeFormat.format(date);
    const [month, day, year, hour, minute, second] = formattedDate
      .match(/(\d+)\/(\d+)\/(\d+), (\d+):(\d+):(\d+)/)
      ?.slice(1)?.map(Number) || [];
    
    return new Date(year, month - 1, day, hour, minute, second);
  } catch (error) {
    console.error('Error converting to time zone:', error);
    // Return original date if conversion fails
    return date;
  }
};