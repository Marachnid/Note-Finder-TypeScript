export const returnHTMLQueries = () => {
    const queries = new Map([
        ["tableQuery", document.getElementById("fretboard")],
        ["minorScaleQuery", document.getElementById("minorScale")],
        ["majorScaleQuery", document.getElementById("majorScale")],
        ["hungarianScaleQuery", document.getElementById("hungarianMinorScale")],
        ["noteHighlight", document.getElementById("noteHighlight")],
        ["scaleHighlight", document.getElementById("scaleHighlight")]
    ]);
    return queries;
};
