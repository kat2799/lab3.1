  var el = function(element) {
    if (element.charAt(0) === "#") { 
      return document.querySelector(element);
    }
    return document.querySelectorAll(element);  
  };

  var viewer = el("#viewer"), // окошко с результатом
    equals = el("#equals"), // кнопки со значениями
    nums = el(".num"), // список чисел
    ops = el(".ops"), // список операторов
    theNum = "", // тек знач
    oldNum = "", // пред знач
    resultNum, // результат
    operator; 

  // при нажатии на число
  var setNum = function() {
    if (resultNum) { //если число отображено, удаляет рез-т и присваивает заново
      theNum = this.getAttribute("data-num");
      resultNum = "";
    } else { //добавляет сл число
      theNum += this.getAttribute("data-num");
    }
    viewer.innerHTML = theNum; 
  };
  // при нажатии оператора сохраняет стар чис и оператор
  function moveNum() {
    oldNum = theNum;
    theNum = "";
    operator = this.getAttribute("data-ops");
    equals.setAttribute("data-result", ""); 
  };
  // при нажатии равно происходит подсчет операции
    function displayNum () {
    oldNum = parseFloat(oldNum); //превращает стринг в число
    theNum = parseFloat(theNum);
    switch (operator) {
      case "+":
        resultNum = oldNum + theNum;
        break;
      case "-":
        resultNum = oldNum - theNum;
        break;
      case "*":
        resultNum = oldNum * theNum;
        break;
      case "/":
        resultNum = oldNum / theNum;
        break; 
    }
    viewer.innerHTML = resultNum;    // Отображение рез-та
    equals.setAttribute("data-result", resultNum);
    oldNum = 0; // удаляем старое число и присваиваем результат текущему
    theNum = resultNum;
  };
  // полная очистка
 function clearAll () {
    oldNum = "";
    theNum = "";
    viewer.innerHTML = "0";
    equals.setAttribute("data-result", resultNum);
  };
function deleteAll () //удаляем последнюю цифру
{
theNum=theNum.substring(0,theNum.length-1);
viewer.innerHTML = theNum;
};

  // добавляем клик на числа
  for (var i = 0, l = nums.length; i < l; i++) {
    nums[i].onclick = setNum;
  }

  // добавляем клик на знаки
  for (var i = 0, l = ops.length; i < l; i++) {
    ops[i].onclick = moveNum;
  }
