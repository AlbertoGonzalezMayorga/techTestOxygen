var formulas = {
    "0": 0.62137119,
    "1": 1.609344,
    "2": 0.3048,
    "3": 1.3048,
    "4": 0.3937,
    "5": 1.3937
}

var units = {
    "0": "mi",
    "1": "km",
    "2": "m",
    "3": "ft",
    "4": "in",
    "5": "cm"
}

var units_reverse = {
    "0": "km",
    "1": "mi",
    "2": "ft",
    "3": "m",
    "4": "cm",
    "5": "in"
}

function set_events() {
    var save_button = document.querySelector("#favorite_button")
    save_button.addEventListener("click", store_value)
    var select = document.querySelector("select")
    select.addEventListener("change", change_ui)
    select.addEventListener("change", convert)
    var user_input = document.querySelector("input")
    user_input.addEventListener("change", convert)
    user_input.addEventListener("input", convert)
}

function change_ui() {
    var user_input_label = document.querySelector("label")
    var selection = document.querySelector("select").value
    user_input_label.innerHTML = units[selection]
}

function convert() {
    var user_input = document.querySelector("input").value
    var selection = document.querySelector("select").value
    var output_box = document.querySelector("#output_text")
    var result = user_input * formulas[selection]
    output_box.innerHTML = result.toFixed(2) + " " + units_reverse[selection]
}

function draw_td_element(value, value_attr) {

    if (!value)
        return

    var tbody = document.querySelector("tbody")
    var td_array = document.querySelectorAll("td")

    var tr = null
    tr = td_array.length % 2 == 0 ?
        document.createElement("tr") :
        document.querySelector("table tr:last-of-type")

    var td = document.createElement("td")

    td.innerHTML = value
    var del_button = document.createElement("button")
    del_button.addEventListener("click", delete_stored)
    del_button.setAttribute("value", value_attr)
    var del_image = document.createElement('img')
    del_image.setAttribute("src", "./images/cross_button_icon.png")
    del_image.setAttribute("width", "24px")
    del_image.setAttribute("height", "24px")

    del_button.appendChild(del_image)
    td.appendChild(del_button)

    tr.appendChild(td)
    tbody.appendChild(tr)
}

function delete_stored() {
    localStorage.removeItem(this.value)
    this.parentElement.remove()
}

function store_value() {
    var output_box = document.querySelector("#output_text")
    var user_input = document.querySelector("input")
    var user_input_label = document.querySelector("label")
    if (output_box.innerHTML == "") {
        alert("You've not converted anything yet!")
        return
    }
    var key = genHexString(15)
    var value = user_input.value + " " + user_input_label.innerHTML + " &#8594; " + output_box.innerHTML
    draw_td_element(value, key)
    localStorage.setItem(key, value)
    output_box.innerHTML = ""
    user_input.value = 0

}

function draw_stored() {
    var size = localStorage.length
    if (size > 0) {
        for (var i = 0; i < 6; i++) {
            var stored_value = localStorage.getItem(localStorage.key(i));
            draw_td_element(stored_value, localStorage.key(i))

        }
    }
}

function genHexString(len) {
    var output = '';
    for (let i = 0; i < len; ++i) {
        output += (Math.floor(Math.random() * 16)).toString(16);
    }
    return output;
}

set_events()
draw_stored()