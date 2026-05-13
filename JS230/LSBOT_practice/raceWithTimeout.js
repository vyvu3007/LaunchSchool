

function raceWithTimeout(arrayOfPromises, ms) {
  

    const promisesWin = setTimeout(() => {
      throw new Error('Timeout!!')
    }, ms);
    
    if(Promise.race(arrayOfPromises)) {
      clearTimeout(promisesWin);
      return Promise.race(arrayOfPromises)
    };

}
const p1 = new Promise(resolve => setTimeout(() => resolve("One"), 500));
const p2 = new Promise(resolve => setTimeout(() => resolve("Two"), 1000));

raceWithTimeout([p1, p2], 800)
  .then(result => console.log(result)) // Logs "One"
  .catch(error => console.error(error));

raceWithTimeout([p1, p2], 300)
  .then(result => console.log(result))
  .catch(error => console.error(error)); // Logs "Timeout!"

function raceWithTimeout(promises, timeoutDuration) {
  // A promise that rejects after the specified timeout.
  const timeoutPromise = new Promise((_, reject) => {
    setTimeout(() => reject(new Error("Timeout!")), timeoutDuration);
  });

  // Promise.any resolves as soon as one of the promises in the array resolves.
  // We race this against our timeout promise.
  return Promise.race([
    Promise.any(promises),
    timeoutPromise
  ]);
}
