export function useCapitalize(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1)
}
