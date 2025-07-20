const generateBuckets = (data: number[], min: number, max: number, step: number): number[] => {
  // how many unique values in the data by set
  const numPossibleValues = Math.floor((max - min) / step);

  console.log("Number of possible values:", numPossibleValues);

  console.log(data);

  // have at most 100 buckets
  let numBuckets = Math.min(100, numPossibleValues);

  // partition the sorted array into buckets
  const buckets: number[][] = Array.from({ length: numBuckets }, () => []);

  // what range of values each bucket will cover
  const bucketScope = (max - min) / numBuckets;

  // LEAVE FOR DEBUGGING:
  // const bucketScopeMap: Record<number, [number, number]> = buckets.reduce(
  //   (acc, _, bucketIndex) => {
  //     const start = min + bucketIndex * bucketScope;
  //     const end = start + bucketScope;
  //     acc[bucketIndex] = [start, end];
  //     return acc;
  //   },
  //   {} as Record<number, [number, number]>
  // );
  // console.log("Bucket scope:", bucketScope);

  // place data in corresponding bucket
  for (const value of data) {
    let bucketIndex = Math.floor((value - min) / bucketScope);

    if (!buckets[bucketIndex]) {
      continue;
    }
    buckets[bucketIndex].push(value);
  }

  // map the size of each bucket to a height value
  const bucketHeights = buckets.map((bucket) => bucket.length);

  // normalize heights to fit within a range of 0 to 1
  const maxHeight = Math.max(...bucketHeights);
  const normalizedHeights = bucketHeights.map((height) => height / maxHeight);

  return normalizedHeights;
};

export default generateBuckets;
