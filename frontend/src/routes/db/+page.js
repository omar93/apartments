export async function load ({ fetch })  {
  const result = await fetch('http://localhost:3000/db/tables')
  const data = await result.json()
  
  return {
    data
  }
}