// Main elements
const main_title = document.getElementById('main-title')
const search_input = document.getElementById('search-input')
const search_button = document.getElementById('search-button')
const main_html = document.getElementById('main-html')
let main_view = ''

// JSON
var request = new XMLHttpRequest();
request.open("GET", `Data.json`, false);
request.send(null)
const json_data = JSON.parse(request.responseText)

// Title event listener
main_title.addEventListener("click", e => draw_home_screen())

// Search event listener
search_button.addEventListener("click", e => {
  if (search_input.value == "") {
    draw_home_screen()
    return
  }
  main_view = '<br><div style="margin: 10px 50px;">'
  for (let i = 0; i < json_data.length; i++) {
    for (let j = 0; j < json_data[i].content.length; j++) {
      if (~json_data[i].content[j].title.toLowerCase().indexOf(search_input.value.toLowerCase())) {
        main_view += `<h3>(${json_data[i].app}) ${json_data[i].content[j].title}</h3><p style="text-align: justify;">${json_data[i].content[j].steps}</p>`
      }
    }
  }
  main_html.innerHTML = main_view + '</div>'
})

// Function to draw home screen
function draw_home_screen() {
  search_input.value = ''
  // Setting all buttons
  main_view = '<br><div class="text-center">'
  for (let i = 0; i < json_data.length; i++) {
    main_view += `<button id="${json_data[i].app}" type="button" class="app btn btn-lg" style="background:url('${json_data[i].icon}'); background-color: #FAFAFA; background-repeat: no-repeat; background-size: 75px 75px; height: 75px; width: 400px; padding-left: 75px; font-size: 30px; margin: 20px; border-radius: 8px;">${json_data[i].app}</button>`
  }
  main_html.innerHTML = main_view + '</div>'

  // Assigning add listeners to them
  document.querySelectorAll('button.app').forEach(b => b.addEventListener("click", e => draw_app_home(b)))
}

// Function to draw apps tips
function draw_app_home(button) {
  search_input.value = ''
  for (let i = 0; i < json_data.length; i++) {
    if (button.id == json_data[i].app) {
      main_view = '<br><div style="margin: 10px 50px;">'
      for (let j = 0; j < json_data[i].content.length; j++) {
        main_view += `<h3>${json_data[i].content[j].title}</h3><p style="text-align: justify;">${json_data[i].content[j].steps}</p>`
      }
      main_html.innerHTML = main_view + '</div>'
      break
    }
  }
}

// Initialize main view
draw_home_screen()