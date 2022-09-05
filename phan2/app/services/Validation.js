function Validation() {

    // check if input is empty
    this.checkEmpty = function (inputVal, spanID, message) {
        if (inputVal.trim() != "") {
          // hợp lệ
          document.getElementById(spanID).innerHTML = "";
          document.getElementById(spanID).style.display = "none";
          return true;
        }
        // không hợp lệ và thông báo cho user lên UI
        document.getElementById(spanID).innerHTML = message;
        document.getElementById(spanID).style.display = "block";
        return false;
      };

      // check price should be in interger 
      this.checkPrice = function (inputVal, spanID, message){
        var pattern = /^[0-9]+$/;   
        if (inputVal.match(pattern)) {
            // hợp lệ
            document.getElementById(spanID).innerHTML = "";
            document.getElementById(spanID).style.display = "none";
            return true;
          } else {
            // Ko hợp lệ
            document.getElementById(spanID).innerHTML = message;
            document.getElementById(spanID).style.display = "block";
            return false;
          }
      }

      //check if screen format is correct
      this.checkScreen = function (inputVal, spanID, message) {
        var pattern = /^[0-9]+$/;
        var myArray = inputVal.toLowerCase().split(" ");
        if (myArray.length != 2) {
          // Ko hợp lệ
          document.getElementById(spanID).innerHTML = message;
          document.getElementById(spanID).style.display = "block";
          return false;
        } else {
          for (let i = 0; i < myArray.length; i++) {
              if (myArray[0] == "screen" && myArray[1].match(pattern)) {
                  console.log('myArray[0]', myArray[0]);
                  console.log('myArray[1]', myArray[1]);
                  // hợp lệ
                  document.getElementById(spanID).innerHTML = "";
                  document.getElementById(spanID).style.display = "none";
                  return true;
              } else {
                  // Ko hợp lệ
                  document.getElementById(spanID).innerHTML = message;
                  document.getElementById(spanID).style.display = "block";
                  return false;
              }
            }
        
        }
      }

    // check desc, type of phone
    this.checkTextInput = function (inputVal, spanID, message) {
        var pattern =
          /^[a-z  A-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹý\\s]+$/;
        if (inputVal.match(pattern)) {
          // hợp lệ
          document.getElementById(spanID).innerHTML = "";
          document.getElementById(spanID).style.display = "none";
          return true;
        } else {
          document.getElementById(spanID).innerHTML = message;
          document.getElementById(spanID).style.display = "block";
          return false;
        }
      };

}