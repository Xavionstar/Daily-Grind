
var $todayDateHeader = $("#todayDateHeader");
var $hourBlockContainer = $("#hourBlockContainer");
var interval = 1000;



startSchedule();

//This method is a big method that populates all the parameters of the planner: The time blocks, the day and time, pulls up any saved data from local storage, and the color coding.
function startSchedule() {
   
    startTimeOfDay()
    var workHours = dayjs().hour(8);
    var rememberUserActivity = JSON.parse(localStorage.getItem("userActivity")) || Array(10).fill("");
    for (let i = 0; i < 10; i++) {

        createHourBlocks(workHours, rememberUserActivity[i]);
        workHours = workHours.add(1, "h");

    }
    var $saveButtons = $(".saveButton")
//The save buttons save any data and also any emoty blocks to populate the planner even if its refreshed
    $saveButtons.on("click", function () {
        var userTextInput = [];
        $(".userActivity").each(function (i, textarea) {
            var $textarea = $(textarea);
            userTextInput.push($textarea.val());
        })
        localStorage.setItem("userActivity", JSON.stringify(userTextInput));
    })
}

//This function creates the time blocks and pulls up the user data from local storage
function createHourBlocks(workHours, rememberUserActivity) {
    var workHourDisplay = workHours.format("ha");
    var workHourData = workHours.format("YYYY-MM-DD HH:00:00");

    $hourBlockContainer.append(`<li data-hour="${workHourData}" class="hourBlocks hourContainer"> <div class="hours">${workHourDisplay}</div><textarea class="userActivity">${rememberUserActivity}</textarea><button class="saveButton">Save</button></li>`);
}
 //This function pins the day and time to the header 
function startTimeOfDay() {
    setInterval(() => {
        var currentDateTime = dayjs().format("DD/MM/YYYY hh:mm:ss a");
        $todayDateHeader.text(currentDateTime);
        colorCodedTime()
    }, interval);

}
//This function color codes the past present and future(grey, blue and green)
function colorCodedTime() {
    $(".hourBlocks").each(function (i, hourBlock) {
        var now = dayjs().startOf("h");
        var $hourBlock = $(hourBlock)
        var hourData = $hourBlock.data("hour")
        if (now.isAfter(hourData)) {
            $hourBlock.addClass("past").removeClass("future present")
        }

        else if (now.isBefore(hourData)) {
            $hourBlock.addClass("future").removeClass("past present")
        }

        else {
            $hourBlock.addClass("present").removeClass("past future")
        }
    });
    


}
