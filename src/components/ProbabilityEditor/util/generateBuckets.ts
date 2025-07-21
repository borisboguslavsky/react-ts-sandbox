const generateBuckets = (data: number[], min: number, max: number, step: number): number[] => {
  // how many unique values in the data by set
  const numPossibleValues = Math.floor((max - min) / step) + 1;

  // have at most 100 buckets
  // if there are fewer than 100 possible unique values in the data, then we will have that many buckets
  let numBuckets = Math.min(100, numPossibleValues);

  // generate empty buckets
  const buckets: number[][] = Array.from({ length: numBuckets }, () => []);

  // what range of values each bucket will cover
  let bucketScope = (max - min) / numBuckets;

  // if we're limiting buckets based on the number of possible values
  // then the bucket scope is the step size
  if (numPossibleValues === numBuckets) {
    bucketScope = step;
  }

  // logs out an object that maps bucket index to the max value threshold of that bucket
  // useful for debugging
  const bucketThresholdMap: Record<number, number> = buckets.reduce(
    (acc, _, bucketIndex) => {
      const endThreshhold = min + (bucketIndex + 1) * bucketScope;
      acc[bucketIndex] = endThreshhold;
      return acc;
    },
    {} as Record<number, number>
  );

  const failedToPlaceData: Record<
    number,
    { dataIndex: number; dataValue: number; bucketIndex: number }
  > = {};

  // place data in corresponding bucket
  for (var i = 0; i < data.length; i++) {
    const value = data[i];
    let bucketIndex = Math.floor((value - min) / bucketScope);

    if (!buckets[bucketIndex]) {
      failedToPlaceData[i] = { dataIndex: i, dataValue: value, bucketIndex };
      continue;
    }
    buckets[bucketIndex].push(value);
  }

  // map the size of each bucket to a height value
  const bucketHeights = buckets.map((bucket) => bucket.length);

  // normalize heights to fit within a range of 0 to 1
  const maxHeight = Math.max(...bucketHeights);
  const normalizedHeights = bucketHeights.map((height) => height / maxHeight);

  console.log("Unable to place some data in buckets:", failedToPlaceData);
  console.log("Bucket map:", bucketThresholdMap);
  console.log("Buckets:", buckets);
  console.log("Bucket heights:", bucketHeights, "\n", "Normalized heights:", normalizedHeights);

  return normalizedHeights;
};

export default generateBuckets;
