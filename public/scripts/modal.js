if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    $(".instructions").css("display", "none");
    $(".mobile-warning").css("display", "flex");
}
$(".controls").css("visibility", "visible");


const instructions = [
    "Welcome! The 8 BIT SEQUENCER is a music app that allows you to create your own 8-bit-style loops.<br> <br>Press Next to continue through the instructions, or press Skip to head straight to playing!",
    "The grid of buttons represents a series of sounds that will be played in a loop.<br> <br>Each color corresponds to a different instrument.",
    "When the sequencer is playing, it will highlight and play the sounds that are turned on in your loop.",
    "The main controls are on the left.<br> <br>The triangle at the top is the play button.<br> <br>The slider adjusts the speed at which your loop will play.",
    "The randomize button will randomly change the speed and all the buttons on the grids.<br> <br>The clear button will clear the entire grids.",
    "The example sequence might give you a better idea of how it works.<br> <br>Try playing it after you click Finish!"
];

$(".instruction").html(instructions[0]);

let currentIndex = 0;

const step = (clickEvent) => {
    const stepId = clickEvent.target.id;

    if (stepId === "next") {
        currentIndex += 1;
    } else {
        currentIndex -= 1;
    }

    switch (currentIndex) {
        case 0:
            $("#back").html("");
            break;
        case 1:
            $("#back").html("< Back");
            // // $(".controls").css("visibility", "hidden");
            // $(".controls").css("visibility", "visible");
            if ($(".play-stop-button").hasClass("playing")) {
                $(".play-stop-button").trigger("click");
            }
        case 3:
            // $(".controls").css("visibility", "visible");
            if ($(".play-stop-button").hasClass("playing")) {
                $(".play-stop-button").trigger("click");
            }
            break;
        case 2:
            $(".play-stop-button").trigger("click");
            // $(".controls").css("visibility", "visible");
            break;
        case 5:
            $("#skip").css("visibility", "hidden");
            $("#back").html("");
            $("#next").html("Finish >");
            $(".demo-button").trigger("click");
            break;
        case 6:
            $(".instructions").css("display", "none");
            break;
        default:
            $("#back").html("< Back");
            $("#next").html("Next >");
            $("#skip").html("Skip");
            $("#skip").css("visibility", "visible");
    }

    $(".instruction").html(instructions[currentIndex]);
};

const skip = (clickEvent) => {
    // $(".controls").css("visibility", "visible");
    $(".instructions").css("display", "none");
};

$("#back").click(step);
$("#next").click(step);
$("#skip").click(skip);
