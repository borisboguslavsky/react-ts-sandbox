const generateBuckets = (data: number[]) => {
  // have at most 100 buckets
  const numBuckets = Math.min(100, data.length);

  // sort random number array by value, ascending
  [...data].sort((a, b) => a - b);

  // partition the sorted array into buckets
  const buckets: number[][] = Array.from({ length: numBuckets }, () => []);

  const bucketScope = Math.ceil(data[data.length - 1] / numBuckets);

  for (let i = 0; i < data.length; i++) {
    const value = data[i];
    const bucketIndex = Math.round(value / bucketScope);
    if (bucketIndex < numBuckets) {
      buckets[bucketIndex].push(data[i]);
    }
  }

  // map the size of each bucket to a height value
  const bucketHeights = buckets.map((bucket) => bucket.length);

  // normalize heights to fit within a range of 0 to 1
  const maxHeight = Math.max(...bucketHeights);
  const normalizedHeights = bucketHeights.map((height) => height / maxHeight);

  console.log("Data:", data);
  console.log("Buckets:", buckets);
  console.log("Bucket Heights:", bucketHeights);
  console.log("Normalized Heights:", normalizedHeights);

  return normalizedHeights;
};
export default generateBuckets;
