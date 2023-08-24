//import Tone from "Tone";
const Tone = require('Tone');

const numSynth=11;
const numDrum=6;
const numBeat=16

class Synthesizer {
    constructor() {
        this.source = new Tone.Synth({envelope: {attack  : 0.25}}).toMaster();
        this.noteHash = {
            sound1: 'G2',
            sound2: 'Bb2',
            sound3: 'C3',
            sound4: 'D3',
            sound5: 'F3',
            sound6: 'G3',
            sound7: 'Bb3',
            sound8: 'C4',
            sound9: 'D4',
            sound10: 'F4',
            sound11: 'G4'
        };

        this.playNote = this.playNote.bind(this);
    }

    playNote(soundKey) {
        this.source.triggerAttack(this.noteHash[soundKey], '+0.05');
        this.source.triggerRelease('+0.25');
    }
}



class Sampler {
    constructor() {
        this.source = {
            sound12: new Tone.Player({url: 'samples/drums/drum1.wav'}),
            sound13: new Tone.Player({url: 'samples/drums/drum2.wav'}),
            sound14: new Tone.Player({url: 'samples/drums/drum3.wav'}),
            sound15: new Tone.Player({url: 'samples/drums/drum4.wav'}),
            sound16: new Tone.Player({url: 'samples/drums/drum5.wav'}),
            sound17: new Tone.Player({url: 'samples/drums/drum6.wav'}),

        };

        // this.source.sound13.volume.value = -3;
        // this.source.sound14.volume.value = -6;
        // this.source.sound16.volume.value = -4;
        // this.source.sound17.volume.value = -8;
        // this.source.sound18.volume.value = -8;

        for (let i = numSynth+1 ; i <= numSynth+numDrum; i++) {
            const sound = 'sound' + i;
            this.source[sound].toMaster();
        }

        this.playSample = this.playSample.bind(this);
    }

    playSample(soundKey) {
        this.source[soundKey].start('+0.05');
    }
}



class Player {
    constructor() {
        this.synthesizer = new Synthesizer();
        this.sampler = new Sampler();

        this.playSound = this.playSound.bind(this);
        this.parser = this.parser.bind(this);
    }

    parser(clickEvent) {
        const buttonId = clickEvent.target.id;
        const splitIds = buttonId.split("s");
        const soundId = "s" + splitIds[1];

        return soundId;
    }

    playSound(soundKey) {
        let soundKeyCopy = soundKey;

        if (typeof soundKeyCopy === "object") {
            soundKeyCopy = this.parser(soundKey);
        }

        const keyInteger = parseInt(soundKeyCopy.slice(5));

        if (keyInteger < numSynth+1) {
            this.synthesizer.playNote(soundKeyCopy);
        } else {
            this.sampler.playSample(soundKeyCopy);
        }
    }
}



class Randomizer {
    constructor() {
        this.settings = {
            drums: "off",
            synth: "off"
        };

        this.createRandomSet = this.createRandomSet.bind(this);
        this.generateBooleanRandomly = this.generateBooleanRandomly.bind(this);
    }

    randomizeButtons() {
        this.createRandomSet().forEach((el) => {
            const buttonId = "beat" + el[0] + "sound" + el[1];
            $(`#${buttonId}`).addClass("turned-on");
        });

        let bpmValue = Math.random() * 400;

        if (bpmValue < 380 && bpmValue >= 300) {
            bpmValue += 20;
        } else if (bpmValue < 300 && bpmValue >= 200) {
            bpmValue += 35;
        } else if (bpmValue < 200 && bpmValue >= 100) {
            bpmValue += 50;
        } else {
            bpmValue += 70;
        }

        $("#bpm-slider").prop("value", `${bpmValue.toString()}`);
    }

    createRandomSet() {
        const set = [];

        for (let i = 1; i <= numBeat; i++) {
            for (let j = 1; j <= numSynth+numDrum; j++) {

                if (j <= numSynth) {
                    if (this.generateBooleanRandomly(3)) {
                        set.push([i,j]);
                    }
                } else if (j === numSynth+1) {
                    if (this.generateBooleanRandomly(2)) {
                        set.push([i,j]);
                    }
                } else if (j >= numSynth+2 && j <= numSynth+numDrum) {
                    if (this.generateBooleanRandomly(3)) {
                        set.push([i,j]);
                    }
                }

            }
        }

        return set;
    }

    generateBooleanRandomly(number) {
        return Math.random() < (0.1 * number);
    }
}



class Grid {
    constructor() {
        this.randomizer = new Randomizer();

        this.toggleButton = this.toggleButton.bind(this);
        this.exampleSequence = this.exampleSequence.bind(this);
        this.clearGrid = this.clearGrid.bind(this);
    }

    setup(player) {
        for (let i = 1; i <= numBeat; i++) {
            const beatId = "beat" + i;

            $(".sampler").append(`<ol class='sampler-beat ${beatId}'></ol>`);
            $(".synthesizer").append(`<ol class='synthesizer-beat ${beatId}'></ol>`);

            for (let j = 1; j <= numSynth+numDrum; j++) {
                const buttonId = beatId + "sound" + j;
                let type, inst;

                if (j <= numSynth) {
                    type = "synthesizer"; inst = "synth";
                } else if (j >= numSynth+1 && j <= numSynth+numDrum) {
                    type = "sampler"; inst = "drums";
                }

                $(`.${type}-beat.${beatId}`)
                    .append(`<li class='sequencer-button ${inst}' id=${buttonId}></li>`);

                $(`#${buttonId}`).click((e) => {
                    if ($(`#${buttonId}`).hasClass("turned-on") === false) {
                        player.playSound(e);
                    }
                });
            }
        }

        $('.sequencer-button').click(this.toggleButton);
        $('.demo-button').click(this.exampleSequence);
        $('.clear-button').click(this.clearGrid);
        $('.random-button').click(() => {
            this.clearGrid();
            this.randomizer.randomizeButtons();
        });
    }

    toggleButton(event) {
        const button = $(event.target);

        if (button.hasClass('turned-on')) {
            button.removeClass('turned-on');
        } else {
            button.addClass('turned-on');
        }
    }

    highlightColumn(beatId) {
        $('.highlighted').removeClass('highlighted');
        $(`.${beatId}`).addClass('highlighted');
    }

    exampleSequence() {
        this.clearGrid();

        const buttonIds = [[1,12], [3,12], [5,12], [7,12], [9,12], [11,12], [13,12], [15,12],
            [3,13], [7,13], [11,13], [15,13],
            [3,15], [7,15], [11,15], [15,15],
            [2,16], [4,16], [6,16], [8,16], [10,16], [12,16], [14,16], [16,16],
            [1,1], [3,9], [4,6], [7,10], [11,11], [15,3]
        ];

        buttonIds.forEach((el) => {
            const buttonId = "beat" + el[0] + "sound" + el[1];
            $(`#${buttonId}`).addClass("turned-on");
        });

        $("#bpm-slider").prop("value", "215");
    }

    clearGrid() {
        for (let i = 1; i <= numBeat; i++) {
            const beatId = "beat" + i;

            for (let j = 1; j <= numSynth+numDrum; j++) {
                const buttonId = beatId + "sound" + j;
                $(`#${buttonId}`).removeClass('turned-on');
            }
        }
    }
}



class Sequencer {
    constructor() {
        this.player = new Player();
        this.grid = new Grid();
        this.grid.setup(this.player);
        this.timeouts = {};

        this.playOrStop = this.playOrStop.bind(this);
        this.startPlaying = this.startPlaying.bind(this);
        this.stopPlaying = this.stopPlaying.bind(this);

        this.setupPlayButton();
    }

    setupPlayButton() {
        $(".play-stop-button").click(this.playOrStop);
    }

    splitter(buttonId, returnVal) {
        const splitIds = buttonId.split("s");
        const beatId = splitIds[0];
        const soundId = "s" + splitIds[1];

        if (returnVal === "beatId") {
            return beatId;
        } else if (returnVal === "soundId") {
            return soundId;
        }
    }

    bpm() {
        return $("#bpm-slider").val();
    }

    playOrStop() {
        if ($(".play-stop-button").hasClass("stopped")) {
            this.startPlaying();
        } else if ($(".play-stop-button").hasClass("playing")) {
            this.stopPlaying();
        }
    }

    startPlaying(looping = false) {
        $(".slider-container").css("display", "none");
        $(".demo-button").css("display", "none");
        $(".random-button").css("display", "none");
        $(".clear-button").css("display", "none");
        $(".play-stop-button").removeClass("stopped").addClass("playing");

        const milsToAdd = 60000 / this.bpm();
        let mils = 5;

        for (let i = 1; i <= numBeat; i++) {
            const beatId = "beat" + i;

            this.timeouts[beatId] = setTimeout(() => {
                this.grid.highlightColumn(beatId);
            }, mils);

            for (let j = 1; j <= numSynth+numDrum; j++) {
                const buttonId = beatId + "sound" + j;

                this.timeouts[buttonId] = setTimeout(() => {
                    this.triggerButton(buttonId);
                }, mils);
            }

            mils += milsToAdd;
        }

        if (looping === false) {
            this.timeouts.loop = setInterval(() => this.startPlaying(true), mils);
        }
    }

    stopPlaying() {
        $(".slider-container").css("display", "flex");
        $(".demo-button").css("display", "inline");
        $(".random-button").css("display", "inline");
        $(".clear-button").css("display", "inline");
        $(".play-stop-button").removeClass("playing").addClass("stopped");

        for (let i = 1; i <= numBeat; i++) {
            const beatId = "beat" + i;
            clearTimeout(this.timeouts[beatId]);

            for (let j = 1; j <= numSynth+numDrum; j++) {
                const buttonId = beatId + "sound" + j;
                clearTimeout(this.timeouts[buttonId]);
            }
        }

        clearInterval(this.timeouts.loop);
    }

    triggerButton(buttonId) {
        if ($(`#${buttonId}`).hasClass('turned-on')) {
            const soundId = this.splitter(buttonId, "soundId");
            this.player.playSound(soundId);
        }
    }
}

const seq = new Sequencer();
