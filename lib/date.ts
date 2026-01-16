// dateHelpers.ts

/**
 * Get the start of a given month.
 * @param date The reference date.
 * @returns Date object representing the start of the month.
 */
export function getStartOfMonth(date: Date): Date {
    return new Date(date.getFullYear(), date.getMonth(), 1);
  }
  
  /**
   * Get the end of a given month.
   * @param date The reference date.
   * @returns Date object representing the end of the month.
   */
  export function getEndOfMonth(date: Date): Date {
    return new Date(date.getFullYear(), date.getMonth() + 1, 1);
  }
  
  /**
   * Get the start of the year for a given date.
   * @param date The reference date.
   * @returns Date object representing the start of the year.
   */
  export function getStartOfYear(date: Date): Date {
    return new Date(date.getFullYear(), 0, 1);
  }
  
  /**
   * Get the start of the next year for a given date.
   * @param date The reference date.
   * @returns Date object representing the start of the next year.
   */
  export function getStartOfNextYear(date: Date): Date {
    return new Date(date.getFullYear() + 1, 0, 1);
  }
  
  /**
   * Get the start of the current day.
   * @param date The reference date.
   * @returns Date object representing the start of the day.
   */
  export function getStartOfDay(date: Date): Date {
    const start = new Date(date);
    start.setHours(0, 0, 0, 0);
    return start;
  }
  
  /**
   * Get the end of the current day.
   * @param date The reference date.
   * @returns Date object representing the end of the day.
   */
  export function getEndOfDay(date: Date): Date {
    const end = new Date(date);
    end.setHours(23, 59, 59, 999);
    return end;
  }
  