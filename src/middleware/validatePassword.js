export function validatePassword(password) {
  const uppercaseRegex = /[A-Z]/
  const lowercaseRegex = /[a-z]/
  const digitRegex = /[0-9]/

  const hasUppercase = uppercaseRegex.test(password)
  const hasLowercase = lowercaseRegex.test(password)
  const hasDigit = digitRegex.test(password)
  const isWithinLengthRange = password.length >= 6

  return (hasUppercase || hasLowercase) && hasDigit && isWithinLengthRange
}
