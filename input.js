// #region Text Input
ytextInput.addEventListener("focus", function() {
    ytextInput.select();
});

ytextInput.addEventListener("keypress", function(event) {
    // Submit is permanent
    if (event.code === "Enter") {
        if (!((ytextInput.value).includes("Name here")) && !((ytextInput.value).includes("Fill this out please."))) {
            setTimeout(Input(),500);                
        } else  {
            ytextInput.value="Fill this out please.";
        }
    }
});
//#endregion
