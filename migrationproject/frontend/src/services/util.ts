export function getColor(val: number, colors: string[][], scale: number[]) {
    if (!val) {
        return '#ddd';
    }

    const colorsToUse = colors[scale.length - 7];

    for (let i = 0; i < scale.length; i++) {
        if (val < scale[i]) {
            return colorsToUse[i];
        }
    }

    return colorsToUse[colorsToUse.length - 1];
}

export function generateScaleRanges(minValue: number, maxValue: number, numRanges: number): number[] {
    const rangeSize = (maxValue - minValue) / numRanges;
    const scaleRanges: number[] = [];
    let startValue = minValue;

    for (let i = 0; i < numRanges; i++) {
        const endValue = startValue + rangeSize;
        scaleRanges.push(startValue);
        startValue = endValue;
    }

    return scaleRanges;
}