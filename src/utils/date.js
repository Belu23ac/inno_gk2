export function formatDate(value) {
  if (!value) return 'Unknown Date';
  try {
    const date = value?.toDate ? value.toDate() : (value instanceof Date ? value : new Date(value));
    return isNaN(date.getTime()) ? 'Unknown Date' : date.toLocaleDateString();
  } catch (e) {
    return 'Unknown Date';
  }
}
