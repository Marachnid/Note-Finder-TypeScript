import { returnHTMLQueries  } from "./htmlQueries.js";
import { getScale } from "./musicalScales.js";

//global constant - used flexibly across functions
const musicalNotes: string[] = ["A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#"];


//init method called by index.html
export const init = (): void => {

    //map of queries used to reference html elements
    const queries: Map<string, HTMLElement | null> = returnHTMLQueries();

    //generate display - calls generateFretboard to create table
    generateDisplay(queries, generateFretboard());
}


//generates the interactive HTML fretboard table
const generateDisplay = (queries: Map<string, HTMLElement | null>, fretboard: string[][]): void => {

    //target html table to add content into
    const tableQuery = queries.get("tableQuery") as HTMLTableElement;


    //outer loop - creates guitar strings for frets to live in
    for (let guitarStrings of fretboard) {
        const tableRow: HTMLTableRowElement = document.createElement("tr");

        //inner loop - creates frets for notes to live in
        for (let notes of guitarStrings) {

            //target and set td content to = array[][i] values
            const tableData: HTMLTableCellElement = document.createElement("td");
            tableData.textContent = notes;

            /*
                add event listeners here/on creation
                tons of issues making them behave correctly if configured to run outside of this loop (ie. in init())
                highlightScaleNotes() refused to work but highlightSingleNotes() worked just fine interestingly
            */
            createTableDataEventListeners(queries, tableData, notes);

            tableRow.appendChild(tableData);
        }
        tableQuery.append(tableRow);
    }
}



/*
    generates the array/fretboard to be displayed based on fixed parameters for now
    standardTuningSpacing is arbitrary for standard tuning
*/
const generateFretboard = (): string[][] => {

    const numberOfStrings: number = 5;                      //temporary fixed value
    const StandardTuningSpacing: number = 5;
    let startIndex: number = musicalNotes.indexOf("B");     //temporary fixed value
    let fretboard: string[][] = [];


    //pass values to a temporary array to pass completed sub string[] into fretboard[][]
    for (let i: number = 1; i <= numberOfStrings; i++) {

        let tempFretboard: string[] = [];

        for (let i:number = 0; i < musicalNotes.length; i++) {
            tempFretboard.push(musicalNotes[(startIndex + i) % musicalNotes.length]);
        }

        //push completed string[] to fretboard and increment starting point for next string
        fretboard.push(tempFretboard);
        startIndex += StandardTuningSpacing;
    }
    return fretboard;
}



//attaches event listeners to td elements to control highlighting logic
const createTableDataEventListeners = (
    queries: Map<string, HTMLElement | null>, 
    tableData: HTMLTableCellElement, 
    notes: string): void => {

    //sets hovered value and controls highlight mode between single/scale
    tableData.addEventListener("mouseover", () => {

        //KEY value - wherever the mouse is hovering = current value for highlight logic
        let hoveredValue = notes;    

        //highlight td cells based on highlighting options
        toggleHighlightMode(queries, hoveredValue);
    });


    //remove highlight class for all td
    tableData.addEventListener("mouseout", () => {
        const cells = document.querySelectorAll("td");
        cells.forEach(cell => {cell.classList.remove("highlight"); });
    });
}



//determines which highlight mode is active/checked via html radio elements
const toggleHighlightMode = (queries: Map<string, HTMLElement | null>, hoveredValue: string): void => {

    const noteHighlight = queries.get("noteHighlight") as HTMLInputElement;
    const scaleHighlight = queries.get("scaleHighlight") as HTMLInputElement;

    //kept as two separate functions for now - working on a highlightLocalScaleNotes feature
    (noteHighlight.checked ? highlightSingleNotes(hoveredValue) : null);
    (scaleHighlight.checked ? highlightScaleNotes(queries, hoveredValue) : null);
}



//highlights repeated occurences of only hovered single notes
const highlightSingleNotes = (hoveredValue: string): void => {

    const cells: NodeListOf<HTMLTableCellElement> = document.querySelectorAll("td");

    for (let cell of cells) {
        hoveredValue == cell.textContent ? cell.classList.add("highlight") : null;
    }
}



//highlights all notes included in highlightedScale[]
const highlightScaleNotes = (queries: Map<string, HTMLElement | null>, hoveredValue: string): void => {

    const cells = document.querySelectorAll("td") as NodeListOf<HTMLTableCellElement>;
    let highlightedScale: string[] = determineScale(queries, hoveredValue);

    for (let cell of cells) {
        if (cell.textContent && highlightedScale.includes(cell.textContent)) {
            cell.classList.add("highlight");
        }
    }
}



//determines which scale to be highlighted via HTML radio elements
const determineScale = (queries: Map<string, HTMLElement | null>, hoveredValue: string): string[] => {

    const minorScaleQuery = queries.get("minorScaleQuery") as HTMLInputElement;
    const majorScaleQuery = queries.get("majorScaleQuery") as HTMLInputElement;
    const hungarianScaleQuery = queries.get("hungarianScaleQuery") as HTMLInputElement;

    let hoveredScale: string[] = [];


    /*
        this loops musicalNotes[] until it finds the matching value being hovered over
        once it finds the value, it uses it's index position to determine the note's scale

        I'm not sure the best method of doing this once more options are added, yet
    */
    for (let index = 0; index < musicalNotes.length; index++) {

        if (musicalNotes[index] === hoveredValue) {

            (minorScaleQuery.checked ? hoveredScale = getScale(index, "minorScale") : null);
            (majorScaleQuery.checked ? hoveredScale = getScale(index, "majorScale") : null);
            (hungarianScaleQuery.checked ? hoveredScale = getScale(index, "hungarianMinorScale") : null);

            break;
        }
    }
    return hoveredScale;
}