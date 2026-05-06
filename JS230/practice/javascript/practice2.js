

fetch("https://api.github.com/repos/rails/rails")
  .then(response => { // ❌ Promise { <pending> }
    return response.json();
  })
  .then(data => {
    console.log(data.open_issues); // ✅ actual JS object
  });