export function validatePassword(password) {
  const uppercaseRegex = /[A-Z]/
  const lowercaseRegex = /[a-z]/
  const digitRegex = /[0-9]/
  const specialSymbolRegex = /[!@#$%^&*]/

  const hasUppercase = uppercaseRegex.test(password)
  const hasLowercase = lowercaseRegex.test(password)
  const hasDigit = digitRegex.test(password)
  const isWithinLengthRange = password.length >= 6
  const hasSpecialSymbol = specialSymbolRegex.test(password)

  return (
    (hasUppercase || hasLowercase) && hasDigit && isWithinLengthRange
    //   && hasSpecialSymbol
  )
}
