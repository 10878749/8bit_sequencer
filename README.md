# The 8-BIT SEQUENCER
+ 8-bit music is a genre of electronic music that emulates the sound of vintage video game consoles and computers, using simple waveforms and limited audio channels to create nostalgic, pixelated melodies.
+ The 8-BIT SEQUENCER is an online app that allows users to create their own 8-bit style loops in an easy way. It can also generate random patterns that allow users to explore more potentials.

  [Live Demo](https://10878749.github.io/8bit_sequencer/public)

# Tech Stack
+ Language: HTML, CSS, JavaScript
+ Environment: Node.js
+ Libraries/Frameworks: Tone.js, Express.js
+ Other tools: Webpack

# Instalation Guide
## 1. Requirements
+ Node.js >= Version 16
+ Yarn
```bash
npm install --global yarn
```
## 2. Dependency Installation
```bash
yarn.cmd install
```
## 3. Build the Project
```bash
yarn.cmd run build
```
## 4. Run at Localhost
+ First, run the server:
```bash
yarn.cmd run start
```
+ Then open the address shown in console http://localhost:3000

# How to Play
+ When you open the website, you will be greeted with a 6-page instruction, which describes in detail the functions of each section.  
+ The instruction is very simple. You can skip it on any page, but reading it entirely the first time you play it is recommended.

+ The grid of buttons represents a series of sounds that will be played in a loop. 
+ Each color corresponds to a different instrument. The red buttons play the 8-bit style drum beats(in this project they are actually some common 8-bit game sound effects). The blue ones play the note of the square wave synthesizer. 

+ The sequencer buttons can be turned on with a click. When you turn one button on, it will play the sound it represents and start to glow.
+ To turn one button off, just click it again.

+ The control buttons are on the left. The triangle at the top is the play button.
+ The slider adjusts the speed at which your loop will play.
+ The EXAMPLE SEQUENCE button turns on a pre-set pattern that may inspire you.
+ The RANDOM button gives you a random speed and  a random pattern.
+ The CLEAR button will clear the entire grid.

+ When playing, the sequencer will highlight and play the sounds that are turned on in a loop at a constant speed.
+ To stop playing, click the glowing square button on the left.

+ The drum beats are already set to a suitable volume by a series of tests and all the notes of the synthesizer are from the G Major major pentatonic scale, which is a very harmonious scale.
+ That means you don't need any compositional skills to create a catchy loop! Even the random patterns can surprise you easily!
+ Just a little tip: Do not get greedy and turn on too many buttons. (But of course, you can give it a try ).
