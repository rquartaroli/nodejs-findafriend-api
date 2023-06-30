export function extractNumbers(stringForExtract: string): string {
  return stringForExtract.match(/\d+/g)?.join('') ?? '';
}