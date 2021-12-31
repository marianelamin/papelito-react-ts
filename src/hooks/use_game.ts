import { useState } from 'react'

// custom hook that stores form state

export const useForm = (initialValues: any) => {
  const [values, setValues] = useState<any>({})

  return [
    values,
    (e: any) => {
      setValues({ ...values, [e.target.name]: e.target.value })
    },
  ]
}
