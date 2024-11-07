# Note-Finder-TypeScript

Hello there,

This project is meant to create an interactive display of a guitar/bass fretboard that highlights either repeating occurences of individual notes being hovered over, or entire scales, based on user selection. This is my first project with TypeScript, Node(mostly), and Express, so there are going to be some areas for improvement to the code and project structure/configurations. 

I focused on implementing some feedback to make the application much more dynamic in a couple areas:
    -Modulo is used to create open-ended arrays which allows for easier fretboard/scale generation by using the remainder of a value that might exceed index bounds
        -Fretboard generation is now dynamically generated with a loop based on desired number of strings and starting note instead of a hard-coded matrix
        -Scale note determination is now processed via a loop based on note interval distances instead of 2d positioning dependent on lower/higher subarrays

    -I utilized a map of HTML queries to store repetitive queries to target specific HTML elements
        -Queries are kept more consistent and more easily changed/retrieved
        -querySelectorAll was causing some issues iterating over td elements so it was excluded from the map

    -I worked on separating the application into different files and reducing code bulk
        -Queries and musical scales are in their own files and exported to index.ts
        -Musical scales have been parsed down to just a number[] of scale-specific intervals that are fed into processing logic instead of each scale function calculating their own values and repeating a ton of boilerplate


Older Examples of where the project started can be found in "oldFiles/" as a reference to where the project started and some of the improvements


Scripts are included as well: (npm run ....)
        build - cleans and compiles
        start - starts the server
        clean - removes dist and webapp/js directories
        compile - compiles dist and webapp/js
        launch - build and start


Coming soon to a browser near you:
1. User controls to set fretboard number of strings and starting note
    -Drop/custom tuning controls?
2. Custom scale input box to set user-specified scale
3. Profile page w/ MySQL database
    -Main function would be to save custom scales
4. Improve styling to suit a program with more than one user
    -Tailwind sounds interesting to learn, otherwise Bootstrap or custom CSS
5. New Name Ideas (don't dispute me):
    -Gnarly Gnar-Finder
    -The Shredulator
    -The Grateful B.E.A.D(g)
    -Dr. Evil's Alan Parsons Project (TBD on this one)