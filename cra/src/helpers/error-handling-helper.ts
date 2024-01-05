export const notifyError = (error: Error | string) => {
  if (error instanceof Error) console.error(error.message)
  else console.error(error)
}
