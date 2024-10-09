let grids = document.querySelectorAll(".grid");
let grid = [];

grids.forEach((input) => {
    input.addEventListener('input',() => {
        input.value = input.value.replace(/[^0-9]/g, '');
    });
});


document.getElementById("generate").onclick = () => {
    document.getElementById("message").innerHTML = "<font color=\"#AD7A1A\"><b>Generating...</b></font>"
    document.getElementById("message").style = "background-color: rgba(255,255,255,0.5);"
    fetch('api/generate')
    .then(response => response.json())
    .then(data => {
        grids.forEach((input,index) => {
            let row = Math.floor(index/9);
            let col = index % 9;

            input.value = data[row][col]
            input.value = input.value.replace(0,"")
        });
        document.getElementById("message").style = "background-color: none;"
        document.getElementById("message").innerHTML = "&nbsp;"

    });

}

for (let i = 0; i < 9; i++) {
    grid[i] = [];
}

document.getElementById("solve").onclick = () => {
    document.getElementById("message").style = "background-color: none;"
    document.getElementById("message").innerHTML = "&nbsp;"
    grids.forEach((input, index) => {
        let row = Math.floor(index / 9);  // taking the quotient
        let col = index % 9;              // taking the remainder

                           //condition       true      false
        grid[row][col] = input.value === "" ? 0 : parseInt(input.value);
    });

    const controller = new AbortController();
    setTimeout(() => controller.abort(), 5000);

    fetch('api/solve', {
        method: "POST",
        body: JSON.stringify({
            grid: grid
        }),
        signal: controller.signal,
        headers: {
            "Content-Type":"application/json"
        }
    })
    .then(response => {
        if (response.status != 200){
            throw new Error("Invalid Sudoku");
        }
        return response.json();
    })
    .then(data => {
        grids.forEach((input,index) => {
            let row = Math.floor(index/9);
            let col = index % 9;

            input.value = data[row][col]
        });
    })
    .catch(() => {
        document.getElementById("message").innerHTML = "<b>This Sudoku can not be solved.</b>"
        document.getElementById("message").style = "background-color: rgba(255,255,255,0.5);"
    });
}

document.getElementById("reset").onclick = () => {
    document.getElementById("message").style = "background-color: none;"
    document.getElementById("message").innerHTML = "&nbsp;"
    grids.forEach(function(input) {
        input.value = null
    });
}

grids.forEach((input) => {
    input.addEventListener("keydown", function(event) {
        if(event.keyCode == 8 && input.value.length === 0){
            var previous = input.previousElementSibling
            while(previous.tagName != "INPUT"){
                var previous = previous.previousElementSibling;
            }
            if (previous) {
                previous.focus();
            }
        }
        if(input.value.length === 1 && event.keyCode != 8){
            var next = input.nextElementSibling
            while(next.tagName != "INPUT"){
                var next = next.nextElementSibling;
            }
            if (next) {
                next.focus();
            }
        }
    })
});

var github = document.getElementById("github")
github.addEventListener("mouseenter",() => {
    if (github.getAttribute("src") === "../static/images/github.png") {
        github.src = "../static/images/github-min.png";
    }
})

github.addEventListener("mouseleave", () => {
    if (github.getAttribute("src") === "../static/images/github-min.png") {
        github.src = "../static/images/github.png";
    }
})

var twitter = document.getElementById("twitter")
twitter.addEventListener("mouseenter",() => {
    if (twitter.getAttribute("src") === "../static/images/twitter.png") {
        twitter.src = "../static/images/twitter-min.png";
    }
})

twitter.addEventListener("mouseleave", () => {
    if (twitter.getAttribute("src") === "../static/images/twitter-min.png") {
        twitter.src = "../static/images/twitter.png";
    }
})