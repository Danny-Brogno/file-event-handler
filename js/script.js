
function vueInit() {

  new Vue({

    el: "#app",

    data: {

      // main
      "file": null,
      "content": null,
      "newArr": [],
      "logoImg": "img/bull.png",
      "select": "All"

    }, // END of DATA

    methods: {

      readFile() {
        this.file = this.$refs.doc.files[0];
        const reader = new FileReader();
        if (this.file.name.includes(".txt")) {
          reader.onload = (res) => {
            this.content = res.target.result;

            // transforms into array with each line as element
            let myArr = this.content.split("\n");
            myArr.pop();

            // A loop to go looking for square brackets in the string (if there are any [in each element] )
            myArr.forEach((element) => {

              let bracket1 = element.indexOf("[");
              let bracket2 = element.indexOf("]");

              // saving the content in a variable (this is the content of the square brackets)
              let contentBrackets = element.substring(bracket1, bracket2 + 1);
              // now I gotta search and delete the square brackets that are in the substring otherwise I'll see this Array [ "[status", " companyUrl]" ]
              contentBrackets = contentBrackets.replace("[", "").replace("]", "");

              let transIntoArr = contentBrackets.split(", "); //  Transform content of brackets into array. That extra space is to not see space in the console

              // replace() does not change the original string
              let removeBracket = element.replace(contentBrackets, "");

              let stringIntoArr = removeBracket.split(", "); // String into array. That extra space is to not see space in the console

              let recordArray = ["UPDATED",  "Placement", "12", "null", "2018-04-10 12:44:00.123"];

              let recordObj = {
                eventType: stringIntoArr[0],
                entityName: stringIntoArr[1],
                entityId: stringIntoArr[2],
                fieldsUpdated: transIntoArr,
                timestamp: stringIntoArr[4],
              }

              console.log(recordObj)
              this.newArr.push(recordObj);
              // console.log(recordObj);
              // console.log(this.newArr);

            }); // END of forEach()

          }; // END of reader.onload (under if)
          reader.onerror = (err) => console.log(err);
          reader.readAsText(this.file);
        } else {
          this.content = "check the console for file output";
          reader.onload = (res) => {
            console.log(res.target.result);
          };
          reader.onerror = (err) => console.log(err);
          reader.readAsText(this.file);
        }

      } // END of readFile() function

    }, // END of METHODS

    computed: {

      selectType: function() {

        const selectOption = [];

        for(i = 0; i < this.newArr.length; i++) {
          let iesimo = this.newArr[i];

          if(!selectOption.includes(iesimo.eventType)) {
            selectOption.push(iesimo.eventType);
          } // END IF

        } // END FOR
        return selectOption;

      }, // END selectType()

      selectName: function() {

        const selectOption = [];

        for(i = 0; i < this.newArr.length; i++) {
          let iesimo = this.newArr[i];

          if(!selectOption.includes(iesimo.entityName)) {
            selectOption.push(iesimo.entityName);
          } // END IF

        } // END FOR
        return selectOption;

      } // END selectName()

    } // END COMPUTED

  }) // END NEW VUE

} // END FUNCTION vueInit

function init () {
  vueInit();
}

document.addEventListener("DOMContentLoaded", init);
