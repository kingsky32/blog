export default function classNames(...array: string[]): string {
  const [a] = array;

  if (Array.isArray(a)) {
    return a.filter(Boolean).join(' ');
  }

  return array.filter(Boolean).join(' ');
}
