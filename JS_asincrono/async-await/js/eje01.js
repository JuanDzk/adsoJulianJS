async function getText(params) {
  return "hello adso!";
}

function getText2() {
  return Promise.resolve("hello adso!");
}

async function getCountries() {
  try {
    const url = "https://restcountries.com/v3.1/all";
    const resp = await fetch(url);
    console.log(resp.ok);
    console.log(resp.status);
    console.log(resp);
    if (resp.ok && resp.status == 200) {
      const data = await resp.json();
      console.log(data);
    } else {
      throw new Error("ERROR en la llamada del API");
    }
  } catch (error) {
    console.error(`ERROR ${error}`);
  } 
}
