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

    this.elements.keys = this.elements.keysContainer.querySelectorAll(
      ".keyboard__key"
    );

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

      document.onkeypress = function (event) {
        console.log(event.keyCode); //102
        console.log(event.code); //keyF
        console.log(event.key); //F

        for (var i = 1; i < keyLayout.length; i++) {
          if (event.key == keyLayout[i]) {
            var searchTag = document.getElementsByTagName("button");
            var searchText = keyLayout[i];
            var found;
            for (var t = 0; t < searchTag; t++) {
              if (searchTag[t].textContent == searchText) {
                found = searchTag[t];
                break;
              }
            }

            //console.log("it's working!");

            document.getElementsByClassName(
              "keyboard__key"
            )[0].style.backgroundColor = "red";
          }
        }
      };
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
    this.properties.capsLock = !this.properties.capsLock;
  },
  open(initialValue, oninput, oneclose) {},
  close() {},
};

window.addEventListener("DOMContentLoaded", function () {
  keyboard.init();
});
