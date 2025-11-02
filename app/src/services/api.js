export async function callMe(endpoint) {
  const res = await fetch("https://nahpizhub.onrender.com/api/"+endpoint);  
  const data = await res.json();
  return data.data;
}