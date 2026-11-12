/** Tiny class-name joiner — avoids pulling in a dependency for three lines. */
export type ClassValue = string | false | null | undefined

export function cx(...values: ClassValue[]): string {
  return values.filter(Boolean).join(' ')
}
