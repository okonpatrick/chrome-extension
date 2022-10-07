let myLeads =[]
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deletebtn = document.getElementById("delete-btn")
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))
const tabFunc = document.getElementById("tab-btn")

if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    render(myLeads)
}

tabFunc.addEventListener("click", function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        render(myLeads)
    })
})
//iterate through the leads array and display the list items as a http link
function render(leads) {
   let listItems = ""
    for (let i = 0; i < leads.length; i++) {
    listItems += `
    <li>
    <a target='_blank' 
    href='${leads[i]}'>
    ${leads[i]}
    </a>
    </li>
    `
}
ulEl.innerHTML = listItems
}
//add a button to delete the values from the browser's local storage
deletebtn.addEventListener("dblclick", function() {
    localStorage.clear()
    myLeads = []
    render(myLeads)
})
//store the input in an array and save the value into the browser local storage.
inputBtn.addEventListener("click", function() {
    myLeads.push(inputEl.value)
    inputEl.value = "" 
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    render(myLeads)
})