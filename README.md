## Audio visual animation inspired pay [project-jdm](https://www.youtube.com/watch?v=4GaGnU8Ij2Y&ab_channel=ProjectJDM) 

This code is a React application that creates a visual representation of a music player with animated colored arcs. Let's break down the code and its functionalities:

1. Imports: The code imports required dependencies like `Image` from 'next/image', and several hooks from 'react'.

2. Colors: An array `colors` is defined, which contains objects with two color values (high and low) represented as hexadecimal values. These colors will be used for drawing arcs later in the application.

3. `nextImpactTimes` Array: An array `nextImpactTimes` is initialized with twenty-one zeros. This array will store the next impact times for each arc.

4. `calcCurrentImpactTime` Function: This function takes two parameters, `currentImpactTime` (a number) and `velocity` (a number), and calculates the next impact time based on the velocity.

5. `maxAngle` Constant: A constant `maxAngle` is set to `2 * Math.PI`, which represents the full circle in radians.

6. `MusicIcon` Component: This is a functional component that renders an SVG icon of a music note.

7. `MusicOffIcon` Component: This is a functional component that renders an SVG icon of a crossed-out music note.

8. `App` Component: The main functional component that represents the music player application. It contains the following functionalities:

   - State: `playing` state is used to determine if the music is currently playing or paused.
   - Refs: `contextRef` is a reference to the canvas element used for drawing the arcs, and `startTimeRef` is used to store the start time of the animation.
   - Pre-loading Audio Files: An array `audioFiles` is initialized as a ref, which will store the pre-loaded audio elements for each arc.
   - `draw` Function: This function is responsible for drawing and animating the arcs on the canvas. It calculates the elapsed time and the angle of each arc based on the velocity. The arcs change color and play an audio file when certain conditions are met.
   - `useEffect`: There are two `useEffect` hooks:
     - The first one runs when the component mounts and sets up the canvas, loads audio files, and initiates the animation using the `draw` function.
     - The second one sets up an event listener to handle visibility changes. When the page becomes hidden (e.g., user switches tabs), it pauses the animation and audio playback. When the page becomes visible again, it resumes the animation.

9. Return: The component returns a button that contains the canvas, background image, and music icon. The button toggles the `playing` state when clicked, and the canvas handles the animation of the arcs based on the state.

Overall, the code creates a music player interface with animated arcs that represent notes. When the user clicks the play button, the arcs start animating and playing corresponding audio files, giving a visual and audio representation of the music being played. The arcs change colors and play audio files according to a predefined sequence based on the elapsed time, creating a visually appealing effect.



https://github.com/Ali-Aizaz/audio-visual-animation/assets/50923380/3f1b2bc0-42e2-4a51-994d-a03643e78a43

