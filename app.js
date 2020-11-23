let breed;
let dogPic;
let shouldLoadPic = false;
let errorFound = false;

function main(){
  render();
  handleNumberSelect();
}

function render(){
  $('#form').html(generateFormPage());
  if(shouldLoadPic){
    $('#pics').html(generateDogPage());
  }
}

function generateFormPage(){
  return `<form id='breed-form'>
            <label>What breed of dog would you like to see?</label>
            <input id='breed' type='text' placeholder='boxer' required='required'>
          </form>`;
}

function generateDogPage(){
  let html;
  if(errorFound){
    html = '<h2>Sorry! I couldn\'t find a dog like that!</h2>';
  }else{
    html = '<div class>';
    html += `<div class="item"><img src='${dogPic}' alt='${breed}'></div>`;
    html += '</div>';
  }
  return html;
}

function handleNumberSelect(){
  $('main').on('submit', '#breed-form', e => {
    e.preventDefault();
    breed = $('#breed').val();
    if(breed === ''){
      shouldLoadPic = false;
    } 
    else
      shouldLoadPic = true;
    getDogImage();
  });
}

function getDogImage(){
  fetch(`https://dog.ceo/api/breed/${breed}/images/random`).then(response => response.json()).then(responseJson => handleResponse(responseJson)).catch(error => console.log(error));
}

function handleResponse(response){
  if(response.status !== 'error'){
    dogPic = response.message;
    errorFound = false;
  }
  else errorFound = true;
  console.log(errorFound);
  render();

}

$(main);