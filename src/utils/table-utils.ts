
export interface AugmentScenario {
  1: string;
  2: string;
  3: string;
  percent: number;
  [key: string]: string | number | undefined;
}

export interface AugmentScenarioWithSpans extends AugmentScenario {
  span1: number;
  span2: number;
  percent1?: number; // Integer 0-100
  percent2?: number; // Integer 0-100
  percent3?: number; // Integer 0-100
}

function smartRound(values: number[], targetSum: number = 100, precision: number = 0): number[] {
  const factor = Math.pow(10, precision);
  const scaledTarget = Math.round(targetSum * factor);
  const scaledValues = values.map(v => v * factor);

  // 1. Floor all values
  const floored = scaledValues.map(v => Math.floor(v));
  // 2. Calculate current sum
  const currentSum = floored.reduce((a, b) => a + b, 0);
  // 3. Calculate remainder
  let remainder = scaledTarget - currentSum;
  // 4. Calculate decimal parts to decide who gets the remainder
  const decimalParts = scaledValues.map((v, i) => ({ val: v - Math.floor(v), index: i }));

  // Sort by decimal part descending
  decimalParts.sort((a, b) => b.val - a.val);

  // 5. Distribute remainder
  const result = [...floored];
  for (let i = 0; i < remainder; i++) {
    result[decimalParts[i].index]++;
  }
  return result.map(v => v / factor);
}

export function calculateRowSpans(data: AugmentScenario[]): AugmentScenarioWithSpans[] {
  const result: AugmentScenarioWithSpans[] = data.map(item => ({ ...item, span1: 0, span2: 0 }));

  if (result.length === 0) return result;

  // --- Pass 1: Calculate Spans ---
  let currentSpan1Start = 0;
  let currentSpan2Start = 0;

  for (let i = 0; i < result.length; i++) {
    // Column 1 Logic
    if (i === 0 || result[i][1] !== result[i - 1][1]) {
      if (i > 0) result[currentSpan1Start].span1 = i - currentSpan1Start;
      currentSpan1Start = i;
    }
    // Column 2 Logic
    if (i === 0 || result[i][1] !== result[i - 1][1] || result[i][2] !== result[i - 1][2]) {
      if (i > 0) result[currentSpan2Start].span2 = i - currentSpan2Start;
      currentSpan2Start = i;
    }
  }
  result[currentSpan1Start].span1 = result.length - currentSpan1Start;
  result[currentSpan2Start].span2 = result.length - currentSpan2Start;

  // --- Pass 2: Calculate Percentages with Smart Rounding ---

  // 1. Calculate Percent 1 (Global)
  // Gather all unique Col 1 groups
  // Since data is sorted/grouped, we iterate through it.
  // Actually, we can just process the spans we just made.

  // No, we need to collect values for the rounding function first.
  // BUT the rounding is local to the group scope.
  // Scope 1: The distinct Col 1 groups relative to Total (sum of everything? usually 100).
  // Scope 2: The distinct Col 2 groups relative to Col 1 group.
  // Scope 3: The distinct Col 3 rows relative to Col 2 group.

  const totalSum = result.reduce((acc, r) => acc + r.percent, 0);

  // Group indices by level
  const col1Indices: number[] = [];
  result.forEach((r, i) => { if (r.span1 > 0) col1Indices.push(i); });

  // Calculate raw percentages for Col 1
  const col1RawPercents = col1Indices.map(idx => {
    let sum = 0;
    for (let k = 0; k < result[idx].span1; k++) sum += result[idx + k].percent;
    return (sum / totalSum) * 100;
  });

  const col1Rounded = smartRound(col1RawPercents, 100, 2);
  col1Indices.forEach((idx, i) => { result[idx].percent1 = col1Rounded[i]; });

  // For each Col 1 group, process Col 2
  col1Indices.forEach(idx1 => {
    const span1 = result[idx1].span1;
    const group1Total = result.slice(idx1, idx1 + span1).reduce((sum, r) => sum + r.percent, 0);

    // Find sub-groups (Col 2) within this Col 1 group
    const col2Indices: number[] = [];
    for (let k = 0; k < span1; k++) {
      const realIdx = idx1 + k;
      if (result[realIdx].span2 > 0) col2Indices.push(realIdx);
    }

    const col2RawPercents = col2Indices.map(idx2 => {
      let sum = 0;
      for (let m = 0; m < result[idx2].span2; m++) sum += result[idx2 + m].percent;
      return group1Total > 0 ? (sum / group1Total) * 100 : 0;
    });

    const col2Rounded = smartRound(col2RawPercents, 100, 2);
    col2Indices.forEach((idx2, i) => { result[idx2].percent2 = col2Rounded[i]; });

    // For each Col 2 group, process Col 3 (Rows)
    col2Indices.forEach(idx2 => {
      const span2 = result[idx2].span2;
      const group2Total = result.slice(idx2, idx2 + span2).reduce((sum, r) => sum + r.percent, 0);

      // Col 3 items are just the rows in this span
      // We calculate percent relative to group2Total
      const col3RawPercents = [];
      for (let m = 0; m < span2; m++) {
        const r = result[idx2 + m];
        col3RawPercents.push(group2Total > 0 ? (r.percent / group2Total) * 100 : 0);
      }

      const col3Rounded = smartRound(col3RawPercents, 100, 2);
      for (let m = 0; m < span2; m++) {
        result[idx2 + m].percent3 = col3Rounded[m];
      }
    });
  });

  return result;
}
