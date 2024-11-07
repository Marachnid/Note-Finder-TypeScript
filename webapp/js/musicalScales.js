export const getScale = (index, scaleName) => {
    let scale = [];
    if (scaleName == "minorScale") {
        scale = parseScale(index, minorScaleIntervals());
    }
    else if (scaleName == "majorScale") {
        scale = parseScale(index, majorScaleIntervals());
    }
    else if (scaleName == "hungarianMinorScale") {
        scale = parseScale(index, hungarianMinorScaleIntervals());
    }
    return scale;
};
const parseScale = (index, intervals) => {
    const musicalNotes = ["A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#"];
    const length = musicalNotes.length;
    let scale = [];
    for (let interval of intervals) {
        scale.push(musicalNotes[(index + interval) % length]);
    }
    return scale;
};
const minorScaleIntervals = () => {
    const intervals = [0, 2, 3, 5, 7, 8, 10];
    return intervals;
};
const majorScaleIntervals = () => {
    const intervals = [0, 2, 4, 5, 7, 9, 11];
    return intervals;
};
const hungarianMinorScaleIntervals = () => {
    const intervals = [0, 2, 3, 6, 7, 8, 11];
    return intervals;
};
