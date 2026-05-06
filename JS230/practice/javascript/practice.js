let URL1 = "https://jsonplaceholder.typicode.com/posts/1";
let URL2 = "https://jsonplaceholder.typicode.com/posts/2";
let URL3 = "https://jsonplaceholder.typicode.com/posts/3";

async function fetchAll() {
  try {
    // Run all fetch requests concurrently
    let responses = await Promise.all([
      fetch(URL1),
      fetch(URL2),
      fetch(URL3)
    ]);

    // Convert all responses to JSON
    let data = await Promise.all(
      responses.map(response => response.json())
    );

    // Extract titles
    let titles = data.map(post => post.title);

    console.log(titles);
  } catch (error) {
    console.log("Error:", error);
  }
}

fetchAll();