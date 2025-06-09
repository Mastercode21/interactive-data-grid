/**
 * Handle an error with logging and alert.
 * @param error The error to handle
 * @param withAlert Whether to show an alert to the user
 */
export const handleError = (error: Error, withAlert?: boolean): void => {
  // Log the error to the console. Other error logging can be added here
  console.error(error)

  if (withAlert) {
    /**
     * Show an alert to the user.
     * This can be replaced with a more complex error handling mechanism.
     */
    alert(error.message)
  }
}
