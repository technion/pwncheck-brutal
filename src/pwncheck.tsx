async function sha1(message: string) {
  // Most examples provide a parameter to TextEncoder. However, per
  // https://developer.mozilla.org/en-US/docs/Web/API/TextEncoder
  // you should not.
  const msgBuffer = new TextEncoder().encode(message);

  const hashBuffer = await crypto.subtle.digest("SHA-1", msgBuffer);

  // convert ArrayBuffer to Array
  const hashArray = Array.from(new Uint8Array(hashBuffer));

  // I said this was "brutal"
  return hashArray.map((b) => ("00" + b.toString(16)).slice(-2)).join("");
}

// Performs an async fetch on the Pwned passwords API
// Does not catch errors
async function fetchAsync(code: string) {
  const response = await fetch(`https://api.pwnedpasswords.com/range/${code}`);
  return await response.text();
}

// Utilises k-anonimity algorith with Pwned Passwords API
// Get SHA-1 of password
// Supply that to API
// Search results for full matching hash
// Returns true if password is in breaches.
export async function pwnlookup(password: string) {
  let hash = await sha1(password);
  hash = hash.toUpperCase();
  const foundpasses = await fetchAsync(hash.slice(0, 5));

  foundpasses
    .split("\n")
    .map((p) => p.split(":")[0])
    .includes(hash);
}
