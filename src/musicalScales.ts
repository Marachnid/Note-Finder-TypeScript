//returns scale values after validating correct scale to use
export const getScale = (index: number, scaleName: string): string[] => {

    let scale: string[] = [];

    if (scaleName == "minorScale") {
        scale = parseScale(index, minorScaleIntervals());

    } else if (scaleName == "majorScale") {
        scale = parseScale(index, majorScaleIntervals());

    } else if (scaleName == "hungarianMinorScale") {
        scale = parseScale(index, hungarianMinorScaleIntervals());
    }

    return scale;
}



//recieves number[] intervals for each scale and pushes corresponding musicalNotes values to string[]
const parseScale = (index: number, intervals: number[]): string[] => {

    //musical scale intervals are determined from
    const musicalNotes: string[] = ["A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#"];
    const length: number = musicalNotes.length;

    let scale: string[] = [];

    for (let interval of intervals) {
        scale.push(musicalNotes[(index + interval) % length]);
    }

    return scale;
}


const minorScaleIntervals = (): number[] => {
    const intervals: number[] = [0, 2, 3, 5, 7, 8, 10];
    return intervals;
}

const majorScaleIntervals = (): number[] => {
    const intervals: number[] = [0, 2, 4, 5, 7, 9, 11];
    return intervals;
}

const hungarianMinorScaleIntervals = (): number[] => {
    const intervals: number[] = [0, 2, 3, 6, 7, 8, 11];
    return intervals;
}