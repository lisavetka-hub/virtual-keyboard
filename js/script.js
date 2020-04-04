// const keyboard = [
//   113,
//   119,
//   101,
//   114,
//   116,
//   121,
//   117,
//   105,
//   111,
//   112,
//   91,
//   93,
//   97,
//   115,
//   100,
//   102,
//   103,
//   104,
//   106,
//   107,
//   108,
//   59,
//   39,
//   122,
//   120,
//   99,
//   118,
//   98,
//   110,
//   109,
//   44,
//   46,
//   47
// ];
// // document.onkeypress = function(event) {
// //   // console.log(event);
// //   keyboard.push(event.charCode);
// //   console.log(keyboard);
// // };
// function init() {
//   let out = "";
//   for (let i = 0; i < keyboard.length; i++) {
//     if (i == 12 || i == 23) {
//       out += '<div class="clearfix"></div>';
//     }
//     out +=
//       '<div class="k-key" data="' +
//       keyboard[i] +
//       '">' +
//       String.fromCharCode(keyboard[i]) +
//       "</div>";
//   }
//   document.querySelector("#keyboard").innerHTML = out;
// }
// init();

// document.onkeypress = function(event) {
//   console.log(event.code);
//   console.log(event.keyCode);
//   document.querySelectorAll("#keyboard .k-key").forEach(function(element) {
//     element.classList.remove("active");
//   });
//   document
//     .querySelector('#keyboard .k-key[data = "' + event.keyCode + '"]')
//     .classList.add("active");
// };
const keyboard = {
  elements: {
    main: null,
    keys: [],
    keysConteiner: null,
  },
  eventHandlers: {
    oninput: null,
    oneclose: null,
  },
  properties: {
    capsLock: false,
    value: "",
  },
  init() {
    // Create main elements
    this.elements.main = document.createElement("div");
    this.elements.keysContainer = document.createElement("div");

    // Setup main elements
    this.elements.main.classList.add("keyboard", "keyboard--hidden");
    this.elements.keysContainer.classList.add("keyboard__keys");
    this.elements.keysContainer.appendChild(this._createKeys());

    // Add to DOM
    this.elements.main.appendChild(this.elements.keysContainer);
    document.body.appendChild(this.elements.main);
  },
  _createKeys() {
    const fragment = document.createDocumentFragment();
    const keyLayout = [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "0",
      "backspace button",
      "q",
      "w",
      "e",
      "r",
      "t",
      "y",
      "u",
      "i",
      "o",
      "p",
      "caps Lock",
      "a",
      "s",
      "d",
      "f",
      "g",
      "h",
      "j",
      "k",
      "l",
      "enter button",
      "done button",
      "z",
      "x",
      "c",
      "v",
      "b",
      "n",
      "m",
      ",",
      ".",
      "?",
      "spacebar",
    ];
    //create HTML for an icon
    const createIconHTML = (icon_name) => {
      return `<i class="material-icons">${icon_name}}</i>`;
    };
    keyLayout.forEach((key) => {
      const keyElement = document.createElement("button");
      const insertLineBreak =
        ["backspace button", "p", "enter button", "?"].indexOf(key) !== -1;

      //add atributes/classes
      keyElement.setAttribute("type", "button");
      keyElement.classList.add("keyboard__key");

      switch (key) {
        case "backspace":
          keyElement.classList.add("keyboard__key--wide");
          keyElement.innerHTML = createIconHTML("backspace");

          keyElement.addEventListener("click", () => {
            this.properties.value = this.properties.value.substring(
              0,
              this.properties.value.length - 1
            );
            this._triggerEvent("oninput");
          });
          break;

        case "caps":
          keyElement.classList.add(
            "keyboard__key--wide",
            "keyboard__key--activatable"
          );
          keyElement.innerHTML = createIconHTML("keyboard_capslock");

          keyElement.addEventListener("click", () => {
            this._toggleCapsLock();
            keyElement.classList.toggle(
              "keyboard__key--active",
              this.properties.capsLock
            );
          });
          break;

        case "enter":
          keyElement.classList.add("keyboard__key--wide");
          keyElement.innerHTML = createIconHTML("keyboard_return");

          keyElement.addEventListener("click", () => {
            this.properties.value += "\n";
            this._triggerEvent("oninput");
          });
          break;

        case "space":
          keyElement.classList.add("keyboard__key--extra--wide");
          keyElement.innerHTML = createIconHTML("space_bar");

          keyElement.addEventListener("click", () => {
            this.properties.value += " ";
            this._triggerEvent("oninput");
          });
          break;

        case "done":
          keyElement.classList.add(
            "keyboard__key--wide",
            "keyboard__key--dark"
          );
          keyElement.innerHTML = createIconHTML("check_circle");

          keyElement.addEventListener("click", () => {
            this.close();
            this._triggerEvent("onclose");
          });
          break;

        default:
          keyElement.textContent = key.toLocaleLowerCase();

          keyElement.addEventListener("click", () => {
            this.properties.value += this.properties.capsLock
              ? key.toLocaleUpperCase()
              : key.toLocaleLowerCase();
            this._triggerEvent("oninput");
          });
          break;
      }
      fragment.appendChild(keyElement);

      if (insertLineBreak) {
        fragment.appendChild(document.createElement("br"));
      }
    });

    return fragment;
  },
  _triggerEvent(hendlerName) {
    console.log("event Triggered! event name:" + hendlerName);
  },
  _toggleCapsLock() {
    console.log("caps Lock toggled");
  },
  open(initialValue, oninput, oneclose) {},
  close() {},
};

// document.onkeypress = function (event) {
//   console.log(event.code);
//   console.log(event.keyCode);
//   document
//     .querySelectorAll(".keyboard .keyboard__keys")
//     .forEach(function (element) {
//       element.classList.remove("keyboard__key--dark");
//     });
//   document
//     .querySelector(".keyboard .keyboard__keys" + event.keyCode + "")
//     .classList.add("keyboard__key--dark");
// };

window.addEventListener("DOMContentLoaded", function () {
  keyboard.init();
});
