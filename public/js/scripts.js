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

function generate_td_element() {
    var table = document.querySelector("table")
    var user_input = document.querySelector("input")
    var user_input_label = document.querySelector("label")
    var output_box = document.querySelector("#output_text")

    var td_array = document.querySelectorAll("td")

    if (td_array.length % 2 == 0) {
        var tr = document.createElement("tr")
    }
    var td = document.createElement("td")
    var value = user_input.value + " " + user_input_label.innerHTML + " &#8594 " + output_box.innerHTML
    td.appendChild(docujment.createTextNode(value))
    var del_button = document.createElement('button')
    del_button.addEventListener("click", delete_stored)
    var del_image = document.createElement('image')
    del_image.setAttribute("src", "./images/cross_button_icon.png")
    del_image.setAttribute("width", "24px")
    del_image.setAttribute("height", "24px")

    del_button.appendChild(del_image)
    td.appendChild(del_button)
    if (tr != null) {
        tr.appendChild(td)
    }


    //<td>hola<button><img src="./images/cross_button_icon.png" width="24px" height="24px"></button></td>
}

function delete_stored() {

}

function store_value() {
    //TODO store values and draw them when reloading pages
    var size = localStorage.length
    localStorage.setItem(size, "")
}

set_events()