
function fetchWithTimeout(url, timeout = 5000) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    return fetch(url, { signal: controller.signal })
        .then(response => {
            clearTimeout(timeoutId);
            return response.json();
        })
        .catch(err => {
            if (err.name === 'AbortError') {
                console.log('Fetch request timed out');
            } else {
                console.error('Fetch error:', err);
            }
        });
}

// Example usage
fetchWithTimeout('https://jsonplaceholder.typicode.com/posts', 3000)
    .then(data => console.log('Data:', data));


/*
making fetch request
request must complete within a specific duration(millisecomnds)
or else aborted
the promise return by the function should reject
setTimeout(() => {
    }, duration)
 */