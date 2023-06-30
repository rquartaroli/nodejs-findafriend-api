export function capitalizeFirstLetter(forCapitalize: string) {
  const wordsForFormat = forCapitalize.split(' ');
  const capitalizedWords = wordsForFormat.map((word) => word.charAt(0).toUpperCase() + word.slice(1));
  return capitalizedWords.join(' ');
}