const generateBuckets = (rawData: number[]) => {
  // sort random number array by value, ascending
  const data = [...rawData].sort((a, b) => a - b);

  // how many unique values in the data by set
  const numUniqueValues = new Set(data).size;

  // have at most 100 buckets
  let numBuckets = Math.min(70, numUniqueValues);

  // partition the sorted array into buckets
  const buckets: number[][] = Array.from({ length: numBuckets }, () => []);

  // what range of values each bucket will cover
  const bucketScope = data[data.length - 1] / numBuckets;

  for (let i = 0; i < data.length; i++) {
    const value = data[i];
    let bucketIndex = Math.floor(value / bucketScope);

    if (bucketIndex === numBuckets) {
      bucketIndex -= 1;
    }
    if (bucketIndex < 0) {
      bucketIndex = 0;
    }

    try {
      buckets[bucketIndex].push(value);
    } catch (error) {
      console.error(
        `Error adding value ${value} to bucket ${bucketIndex} with scope ${bucketScope}`
      );
    }
  }

  // map the size of each bucket to a height value
  const bucketHeights = buckets.map((bucket) => bucket.length);

  // normalize heights to fit within a range of 0 to 1
  const maxHeight = Math.max(...bucketHeights);
  const normalizedHeights = bucketHeights.map((height) => height / maxHeight);

  return normalizedHeights;
};
export default generateBuckets;
