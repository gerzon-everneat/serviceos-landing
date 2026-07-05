type ClassValue = string | number | null | undefined | false | ClassValue[];

export function cn(...inputs: ClassValue[]): string {
  const out: string[] = [];
  for (const input of inputs.flat(Infinity as 1)) {
    if (input) out.push(String(input));
  }
  return out.join(" ");
}
