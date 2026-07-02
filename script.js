let sources = document.querySelector("div#sources");
let acs = document.querySelector("#access button");
console.log(acs);
let currentmode = "original";
let ytextInput = document.querySelector("#name");

// #region Load Data
function getTxtFor(name, where) {
    // let txt =
        fetch(name)
            .then((res) => res.text())
            .then((text) => {
                LoadTxtData(text, where);
            })
            .catch((e) => console.error(e));
}

function LoadTxtData(txt, where) {
    let lines = txt.split("\r\n");
    lines.forEach(function(line) {
        // console.log(line);
        if (where === sources) {
            if (line.includes("https") || line.includes("www.") || line.includes("/")) {
                // console.log("WEBSITE")
                let alllist = where.querySelectorAll("ul");
                let thelist = alllist[alllist.length - 1];
                let newli = document.createElement("li");
                let website = document.createElement("a");
                website.setAttribute("href", line.trim())
                website.innerHTML = line.trim();
                newli.appendChild(website);
                thelist.appendChild(newli);
                let brk = document.createElement("br");
            } else if (line === "") {
                // console.log("EMPTY")
                let brk = document.createElement("br");
                where.appendChild(brk);
            } else {
                // console.log("HEADER")
                let header = document.createElement("h2");
                header.setAttribute("id",line.trim());
                header.innerHTML = line.trim();
                where.appendChild(header);
                let newlist = document.createElement("ul");
                newlist.setAttribute("class", line.trim());
                newlist.setAttribute("id", "list"+line.trim());
                where.appendChild(newlist);
            }
        } else {
            console.log(line);
        }
    });
}
// #endregion

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

function LoadMode() {
    if (localStorage.getItem('viewmode')) {
        currentmode = localStorage.getItem('viewmode');
    }
    console.log(currentmode);
    SetMode();
}

function SetMode() {
    let colorroot = document.styleSheets[0].cssRules[0].style;
    if (currentmode === "dark") {
        colorroot.setProperty("--first","black");
        colorroot.setProperty("--second","grey");
        colorroot.setProperty("--third","blue");
        colorroot.setProperty("--fourth","white");
    } else if (currentmode === "original") {
        colorroot.setProperty("--first","#2D4F2B");
        colorroot.setProperty("--second","#708A58");
        colorroot.setProperty("--third","#FFB823");
        colorroot.setProperty("--fourth","#FFF1CA");
    } else if (currentmode === "highc") {
        colorroot.setProperty("--first","white");
        colorroot.setProperty("--second","red");
        colorroot.setProperty("--third","blue");
        colorroot.setProperty("--fourth","black");
    } else if (currentmode === "teal") {
        colorroot.setProperty("--first","#008C8C");
        colorroot.setProperty("--second","#5C4B8A");
        colorroot.setProperty("--third","#FFD700");
        colorroot.setProperty("--fourth","#FFFFFF");
    } else if (currentmode === "coral") {
        colorroot.setProperty("--first","#333333");
        colorroot.setProperty("--second","#D9D9D9");
        colorroot.setProperty("--third","#FFFFFF");
        colorroot.setProperty("--fourth","#FF6F61");
    } else if (currentmode === "creamery") {
        colorroot.setProperty("--first","#00BFAE");
        colorroot.setProperty("--second","#FF007F");
        colorroot.setProperty("--third","grey");
        colorroot.setProperty("--fourth","white");
    } else if (currentmode === "vivid") {
        colorroot.setProperty("--first","#00FF00");
        colorroot.setProperty("--second","#FF0000");
        colorroot.setProperty("--third","#FFFFFF");
        colorroot.setProperty("--fourth","#000000");
    } else if (currentmode === "coffee") {
        colorroot.setProperty("--first","#8A4B3A");
        colorroot.setProperty("--second","#D2691E");
        colorroot.setProperty("--third","#F2E6D4");
        colorroot.setProperty("--fourth","#FFFFFF");
    }
    localStorage.setItem('viewmode',currentmode);
}

// #region Set Events
// #region Sources
window.addEventListener("load", function() {
    if (location.href.includes("sources.html")) {
        getTxtFor("sources.txt",sources);
    }
    LoadMode();
    console.log(currentmode);
});
// #endregion

//#region Accessibility
acs.addEventListener("click", function() {
    if (currentmode === "original") {
        currentmode = "dark";
    } else if (currentmode === "dark") {
        currentmode = "highc";
    } else if (currentmode === "highc") {
        currentmode = "teal";
    } else if (currentmode === "teal") {
        currentmode = "coral";
    } else if (currentmode === "coral") {
        currentmode = "creamery";
    } else if (currentmode === "creamery") {
        currentmode = "vivid";
    } else if (currentmode === "vivid") {
        currentmode = "coffee";
    } else {
        currentmode = "original";
    }
    SetMode();
});
//#endregion
// #endregion