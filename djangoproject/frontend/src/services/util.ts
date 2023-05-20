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