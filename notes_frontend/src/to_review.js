document.addEventListener("DOMContentLoaded", function(event) {
    let form = document.getElementById('form')
    const container = document.getElementById('container')

    form.addEventListener("submit", function(e){
      e.preventDefault();
      let userName = document.getElementById("username")
      userName.value = ''
    })

    function createUser(userName){
      fetch('')
    }
  });
