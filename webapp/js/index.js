import { returnHTMLQueries } from "./htmlQueries.js";
import { getScale } from "./musicalScales.js";
const musicalNotes = ["A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#"];
export const init = () => {
    const queries = returnHTMLQueries();
    generateDisplay(queries, generateFretboard());
};
const generateDisplay = (queries, fretboard) => {
    const tableQuery = queries.get("tableQuery");
    for (let guitarStrings of fretboard) {
        const tableRow = document.createElement("tr");
        for (let notes of guitarStrings) {
            const tableData = document.createElement("td");
            tableData.textContent = notes;
            createTableDataEventListeners(queries, tableData, notes);
            tableRow.appendChild(tableData);
        }
        tableQuery.append(tableRow);
    }
};
const generateFretboard = () => {
    const numberOfStrings = 5;
    const StandardTuningSpacing = 5;
    let startIndex = musicalNotes.indexOf("B");
    let fretboard = [];
    for (let i = 1; i <= numberOfStrings; i++) {
        let tempFretboard = [];
        for (let i = 0; i < musicalNotes.length; i++) {
            tempFretboard.push(musicalNotes[(startIndex + i) % musicalNotes.length]);
        }
        fretboard.push(tempFretboard);
        startIndex += StandardTuningSpacing;
    }
    return fretboard;
};
const createTableDataEventListeners = (queries, tableData, notes) => {
    tableData.addEventListener("mouseover", () => {
        let hoveredValue = notes;
        toggleHighlightMode(queries, hoveredValue);
    });
    tableData.addEventListener("mouseout", () => {
        const cells = document.querySelectorAll("td");
        cells.forEach(cell => { cell.classList.remove("highlight"); });
    });
};
const toggleHighlightMode = (queries, hoveredValue) => {
    const noteHighlight = queries.get("noteHighlight");
    const scaleHighlight = queries.get("scaleHighlight");
    (noteHighlight.checked ? highlightSingleNotes(hoveredValue) : null);
    (scaleHighlight.checked ? highlightScaleNotes(queries, hoveredValue) : null);
};
const highlightSingleNotes = (hoveredValue) => {
    const cells = document.querySelectorAll("td");
    for (let cell of cells) {
        hoveredValue == cell.textContent ? cell.classList.add("highlight") : null;
    }
};
const highlightScaleNotes = (queries, hoveredValue) => {
    const cells = document.querySelectorAll("td");
    let highlightedScale = determineScale(queries, hoveredValue);
    for (let cell of cells) {
        if (cell.textContent && highlightedScale.includes(cell.textContent)) {
            cell.classList.add("highlight");
        }
    }
};
const determineScale = (queries, hoveredValue) => {
    const minorScaleQuery = queries.get("minorScaleQuery");
    const majorScaleQuery = queries.get("majorScaleQuery");
    const hungarianScaleQuery = queries.get("hungarianScaleQuery");
    let hoveredScale = [];
    for (let index = 0; index < musicalNotes.length; index++) {
        if (musicalNotes[index] === hoveredValue) {
            (minorScaleQuery.checked ? hoveredScale = getScale(index, "minorScale") : null);
            (majorScaleQuery.checked ? hoveredScale = getScale(index, "majorScale") : null);
            (hungarianScaleQuery.checked ? hoveredScale = getScale(index, "hungarianMinorScale") : null);
            break;
        }
    }
    return hoveredScale;
};
