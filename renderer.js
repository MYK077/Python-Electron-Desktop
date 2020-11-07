
const $ = function(id) { return document.getElementById(id); };
const selector = function(input) { return document.querySelector(input); };
const zerorpc = require("zerorpc")
let client = new zerorpc.Client()

function sendToPython() 
{
  client.connect("tcp://127.0.0.1:4242")
  let input1 = selector('#input1')
  let input2 = selector('#input2')
  let result = selector('#result')
  if(input1.value != "" && input2.value != "")
  {
    client.invoke("calc", input1.value, input2.value, (error, res) => {
      if(error) {
        console.error(error)
      } else {
        result.value = res
        $('displayError').innerHTML = ""
      }
    })
  }
  else if(input1.value == "" && input2.value == ""){
    selector("#result").value= ""
  }
  else if(input1.value == "" || input2.value == ""){
    $('displayError').innerHTML = "Please enter numbers to be added in both fields"
    selector("#result").value= ""
  }

}
btn.addEventListener('click', () => {
  sendToPython();
});
btn.dispatchEvent(new Event('click'));