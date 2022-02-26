// Проверяем, поддерживает ли браузер нужные API
let arr = [];
if (window.File && window.FileReader && window.FileList && window.Blob) {
	let el = document.getElementById('file');
    el.addEventListener('change', function(e) {
      // Если бы у input[type=file] был параметр multiple, пользователь смог бы выбрать
     // несколько файлов, а в e.target.files было бы больше одного элемента
      var file = e.target.files[0];
      // Для демонстрации прочитаем файл и выведем каждую его строку как элемент списка
      var output = document.getElementById('output');
      var reader = new FileReader();
      // Устанавливаем обработчик события onload. Оно произойдёт по окончанию чтения файла
      reader.onload = function(e) {
          // e.target.result содержит всё содержимое файла
          var text = e.target.result;
          // Разбиваем строку на элементы, разделителем служит исмвол перевода строки \n
          arr = text.split('\r\n');
        
          // Для демонстрации того, что файл прочитался и разбился на строки правильно,
          // рисуем список, элементами которого будут строки файла
          for (var i = 0; i < arr.length; i++) {
	           output.innerHTML += '<input type="checkbox" class="idElems" value="' + arr[i] + '"/>' + arr[i] + '</br>';
          }
      };
      
      // Начинаем чтение выбранного файла
      reader.readAsText(file);
    });
} else {
    alert('File API is not supported!');
}

function makeid() {
	if (confirm("точно хотите создать новый купон?")) {
	  var text = "";
	  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	  for (var i = 0; i < 6; i++){
	    text += possible.charAt(Math.floor(Math.random() * possible.length));
	}	
	text += arr.length + 1;
	  arr.push(text);
	  alert("создан купон "+ text +"");
	}
}
function makeVIPid() {
  if (confirm("точно хотите создать новый VIP-купон?")) {
    var text = "VIP - ";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for (var i = 0; i < 6; i++){
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  } 
  text += arr.length + 1;
    arr.push(text);
    alert("создан купон "+ text +"");
  }
}


(function () {
var textFile = null,
  makeTextFile = function (text) {
    var data = new Blob([text], {type: 'text/plain'});

    // If we are replacing a previously generated file we need to
    // manually revoke the object URL to avoid memory leaks.
    if (textFile !== null) {
      window.URL.revokeObjectURL(textFile);
    }

    textFile = window.URL.createObjectURL(data);

    return textFile;
  };


  var create = document.getElementById('create'),
    textbox = document.getElementById('textbox');

  create.addEventListener('click', function () {
    var link = document.getElementById('downloadlink');
    link.href = makeTextFile(arr.join('\r\n'));
    link.style.display = 'block';
  }, false);
})();

function makeIdUnused() {
  if (confirm("точно хотите сделать купон(ы) использованным(и)?")) {
  	let now = new Date();
    now = now.getDate() + '.' + (now.getMonth() + 1) + '.' + now.getFullYear() + '  ' + now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds();
    let res;
    let checkboxElems = document.getElementsByClassName('idElems');
    let activeCheckboxElems = [];
    for (var i = 0; i < checkboxElems.length; i++) {
      if (checkboxElems[i].checked) {
        activeCheckboxElems.push(checkboxElems[i]);
      }
    }
    if (activeCheckboxElems.length < 1) {
      alert("выберите использованные купоны");
    }
    else {
      res2 = dataSelect();
    };
    for (var i = 0; i < arr.length; i++) {
      for (var j = 0; j < activeCheckboxElems.length; j++) {
        if (arr[i] === activeCheckboxElems[j].value) {
          arr[i] += " - использован "+ now +" - "+ res2 +"" ;
        }
      }
    }
  }
}


function checkForActiveId() {
	let el = prompt("Введите купон полностью");
	if (arr.includes(el)) {
		alert("Купон активен :)");
	}
	else alert("Купон НЕ активен! :(");
}

function displayFile2() {
  let output = document.getElementById("output");
  let output2 = document.getElementById("output2");
  output2.innerHTML = "";
  for (var i = 0; i < arr.length; i++) {
    output2.innerHTML += '<input type="checkbox" class="idElems" value="' + arr[i] + '"/>' + arr[i] + '</br>';
  }
  output2.style.display = "block";
  output.innerHTML = "";
}

function dataSelect() {
       let form1 = document.forms.server;
      let form2 = document.forms.farm;
      let name = prompt("Введите ник персонажа");
      n = form1.server.selectedIndex;
      m = form2.farm.selectedIndex;
      if (form2.farm.options[m].value === "Другое") {
        form2.farm.options[m].value = prompt("выберите фарм");
      }
      let res = form1.server.options[n].value + " - " + form2.farm.options[m].value + " - " + name;
      return res;
    }

