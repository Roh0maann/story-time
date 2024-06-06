export function formatDate(dateStr: string): string {
    const date = new Date(dateStr);
    const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: 'short', year: 'numeric' };
    return new Intl.DateTimeFormat('id-ID', options).format(date);
};

export function formatDateStory(dateStr: string): string {
    const date = new Date(dateStr);

    // Opsi untuk tanggal
    const dateOptions: Intl.DateTimeFormatOptions = { day: '2-digit', month: 'short', year: 'numeric' };
    const formattedDate = new Intl.DateTimeFormat('id-ID', dateOptions).format(date);

    // Opsi untuk waktu
    const timeOptions: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit', hour12: false };
    const formattedTime = new Intl.DateTimeFormat('id-ID', timeOptions).format(date);

    return `${formattedTime}, ${formattedDate}`;
};
