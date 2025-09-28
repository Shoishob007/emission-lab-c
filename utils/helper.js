// regex for email and pass
export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// export const phoneRegex = /^[+]?[\d\s\-\(\)]{10,}$/;

export function checkPasswordStrength(password) {
  let score = 0;
  if (password.length >= 3) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[^a-zA-Z\d]/.test(password)) score++;
  if (score >= 4) return "strong";
  if (score >= 2) return "medium";
  if (score > 0) return "weak";
  return "";
}