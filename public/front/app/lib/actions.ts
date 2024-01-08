export const addUser = async (formData: FormData) => {
  const { name, email, password, mobile, type, city_id } = Object.fromEntries(formData)

  try {
    const newUser = { name, email, password, mobile, type, city_id }

  } catch (err) {
    console.log(err)
    throw new Error("Failed to create user!")
  }
}