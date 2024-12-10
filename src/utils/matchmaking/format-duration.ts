export function formatDuration(milliseconds: number) {
  const duration = new Date(milliseconds);

  const minutes = duration.getMinutes();
  const seconds = timeToPaddedString(duration.getSeconds());

  return `${minutes}:${seconds}`;
}

function timeToPaddedString(time: number) {
  return String(time).padStart(2, "0");
}
