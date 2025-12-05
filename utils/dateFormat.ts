/**
 * Formats a date string (YYYY-MM-DD) or Date object to d/m/Y format
 * @param date - Date string in YYYY-MM-DD format or a Date object
 * @returns Formatted date string in d/m/Y format (e.g., "15/3/2025" or "5/12/2024")
 */
export function formatDateDMY(date: string | Date): string {
    let dateObj: Date;

    if (typeof date === 'string') {
        // Parse YYYY-MM-DD format
        dateObj = new Date(date + 'T00:00:00'); // Add time to avoid timezone issues
    } else {
        dateObj = date;
    }

    const day = dateObj.getDate();
    const month = dateObj.getMonth() + 1; // getMonth() returns 0-11
    const year = dateObj.getFullYear();

    return `${day}/${month}/${year}`;
}

