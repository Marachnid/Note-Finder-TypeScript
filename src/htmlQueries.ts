/*
    bulk map of HTML queries used throughout the application
    querySelectorAll("td") was having issues and is excluded - likely from element creation/querying timing
        adds a huge amount of type declaration bulk too
*/
export const returnHTMLQueries = (): Map<string, HTMLElement | null> => {

    const queries = new Map<string, HTMLElement | null>([
        ["tableQuery", document.getElementById("fretboard")],
        ["minorScaleQuery", document.getElementById("minorScale")],
        ["majorScaleQuery", document.getElementById("majorScale")],
        ["hungarianScaleQuery", document.getElementById("hungarianMinorScale")],
        ["noteHighlight", document.getElementById("noteHighlight")],
        ["scaleHighlight", document.getElementById("scaleHighlight")]
    ]);
    
    return queries;
}