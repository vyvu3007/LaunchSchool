function mergeIntervals(intervals) {
  if (intervals.length <= 1) return intervals;
  
  // Sort intervals by start time
  intervals.sort((a, b) => a[0] - b[0]);
  
  let writeIndex = 0;
  let i = 1;
  
  while (i < intervals.length) {
    // Check if current interval overlaps with the last merged interval
    if (intervals[i][0] <= intervals[writeIndex][1]) {
      // Merge by extending the end to the maximum of both ends
      intervals[writeIndex][1] = Math.max(intervals[writeIndex][1], intervals[i][1]);
    } else {
      // No overlap, move current interval to next write position
      writeIndex++;
      intervals[writeIndex] = intervals[i];
    }
    
    i++;
  }
  
  // Truncate array to only include merged intervals
  intervals.length = writeIndex + 1;
  
  console.log(intervals);
}


    mergeIntervals([[1, 3],[2,2], [2, 6], [8, 10], [15, 18]]); // [[1, 6], [8, 10], [15, 18]]
    mergeIntervals([[1, 4], [4, 5]]); // [[1, 5]]
    mergeIntervals([[1, 5], [2, 4]]); // [[1, 5]]
    mergeIntervals([[1, 4], [0, 4]]); // [[0, 4]]
    mergeIntervals([[1, 4], [2, 3], [5, 7]]); // [[1, 4], [5, 7]]