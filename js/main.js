"use strict";
function _classCallCheck(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function _defineProperties(e, t) {
  for (var i = 0; i < t.length; i++) {
    var o = t[i];
    (o.enumerable = o.enumerable || !1),
      (o.configurable = !0),
      "value" in o && (o.writable = !0),
      Object.defineProperty(e, o.key, o);
  }
}
function _createClass(e, t, i) {
  return (
    t && _defineProperties(e.prototype, t), i && _defineProperties(e, i), e
  );
}
var CLASS_NAME_SELECT = "select",
  CLASS_NAME_ACTIVE = "select_show",
  CLASS_NAME_SELECTED = "select__option_selected",
  SELECTOR_ACTIVE = ".select_show",
  SELECTOR_DATA = "[data-select]",
  SELECTOR_DATA_TOGGLE = '[data-select="toggle"]',
  SELECTOR_OPTION_SELECTED = ".select__option_selected",
  CustomSelect = (function () {
    function e(t, i) {
      _classCallCheck(this, e),
        (this._elRoot = "string" == typeof t ? document.querySelector(t) : t),
        (this._params = i || {}),
        this._params.options &&
          (this._elRoot.classList.add(CLASS_NAME_SELECT),
          (this._elRoot.innerHTML = e.template(this._params))),
        (this._elToggle = this._elRoot.querySelector(SELECTOR_DATA_TOGGLE)),
        this._elRoot.addEventListener("click", this._onClick.bind(this));
    }
    return (
      _createClass(e, [
        {
          key: "_onClick",
          value: function (e) {
            var t = e.target;
            switch (t.closest(SELECTOR_DATA).dataset.select) {
              case "toggle":
                this.toggle();
                break;
              case "option":
                this._changeValue(t);
            }
          },
        },
        {
          key: "_update",
          value: function (e) {
            e = e.closest(".select__option");
            var t = this._elRoot.querySelector(SELECTOR_OPTION_SELECTED);
            return (
              t && t.classList.remove(CLASS_NAME_SELECTED),
              e.classList.add(CLASS_NAME_SELECTED),
              (this._elToggle.textContent = e.textContent),
              (this._elToggle.value = e.dataset.value),
              (this._elToggle.dataset.index = e.dataset.index),
              this._elRoot.dispatchEvent(new CustomEvent("select.change")),
              this._params.onSelected && this._params.onSelected(this, e),
              e.dataset.value
            );
          },
        },
        {
          key: "_reset",
          value: function () {
            var e = this._elRoot.querySelector(SELECTOR_OPTION_SELECTED);
            return (
              e && e.classList.remove(CLASS_NAME_SELECTED),
              (this._elToggle.textContent = "Выберите из списка"),
              (this._elToggle.value = ""),
              (this._elToggle.dataset.index = -1),
              this._elRoot.dispatchEvent(new CustomEvent("select.change")),
              this._params.onSelected && this._params.onSelected(this, null),
              ""
            );
          },
        },
        {
          key: "_changeValue",
          value: function (e) {
            e.classList.contains(CLASS_NAME_SELECTED) ||
              (this._update(e), this.hide());
          },
        },
        {
          key: "show",
          value: function () {
            document.querySelectorAll(SELECTOR_ACTIVE).forEach(function (e) {
              e.classList.remove(CLASS_NAME_ACTIVE);
            }),
              this._elRoot.classList.add(CLASS_NAME_ACTIVE);
          },
        },
        {
          key: "hide",
          value: function () {
            this._elRoot.classList.remove(CLASS_NAME_ACTIVE);
          },
        },
        {
          key: "toggle",
          value: function () {
            this._elRoot.classList.contains(CLASS_NAME_ACTIVE)
              ? this.hide()
              : this.show();
          },
        },
        {
          key: "dispose",
          value: function () {
            this._elRoot.removeEventListener("click", this._onClick);
          },
        },
        {
          key: "value",
          get: function () {
            return this._elToggle.value;
          },
          set: function (e) {
            var t = this,
              i = !1;
            if (
              (this._elRoot
                .querySelectorAll(".select__option")
                .forEach(function (o) {
                  if (o.dataset.value === e) return (i = !0), t._update(o);
                }),
              !i)
            )
              return this._reset();
          },
        },
        {
          key: "selectedIndex",
          get: function () {
            return this._elToggle.dataset.index;
          },
          set: function (e) {
            var t = this._elRoot.querySelector(
              '.select__option[data-index="'.concat(e, '"]')
            );
            return t ? this._update(t) : this._reset();
          },
        },
      ]),
      e
    );
  })();
(CustomSelect.template = function (e) {
  var t = e.name,
    i = e.options,
    o = e.targetValue,
    n = [],
    l = -1,
    r = "",
    s = "Выберите из списка";
  return (
    i.forEach(function (e, t) {
      var i = "";
      e[0] === o &&
        ((i = " select__option_selected"), (l = t), (r = e[0]), (s = e[1])),
        n.push(
          '<li class="select__option'
            .concat(i, '" data-select="option" data-value="')
            .concat(e[0], '" data-index="')
            .concat(t, '">')
            .concat(e[1], "</li>")
        );
    }),
    '<button type="button" class="select__toggle" name="'
      .concat(t, '" value="')
      .concat(r, '" data-select="toggle" data-index="')
      .concat(l, '">')
      .concat(
        s,
        '</button>\n  <div class="select__dropdown">\n    <ul class="select__options">'
      )
      .concat(n.join(""), "</ul>\n  </div>")
  );
}),
  document.addEventListener("click", function (e) {
    e.target.closest(".select") ||
      document.querySelectorAll(SELECTOR_ACTIVE).forEach(function (e) {
        e.classList.remove(CLASS_NAME_ACTIVE);
      });
  });
var select1 = new CustomSelect("#select-1");
function _toConsumableArray(e) {
  return (
    _arrayWithoutHoles(e) ||
    _iterableToArray(e) ||
    _unsupportedIterableToArray(e) ||
    _nonIterableSpread()
  );
}
function _nonIterableSpread() {
  throw new TypeError(
    "Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
  );
}
function _unsupportedIterableToArray(e, t) {
  if (e) {
    if ("string" == typeof e) return _arrayLikeToArray(e, t);
    var i = Object.prototype.toString.call(e).slice(8, -1);
    return (
      "Object" === i && e.constructor && (i = e.constructor.name),
      "Map" === i || "Set" === i
        ? Array.from(e)
        : "Arguments" === i ||
          /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i)
        ? _arrayLikeToArray(e, t)
        : void 0
    );
  }
}
function _iterableToArray(e) {
  if (
    ("undefined" != typeof Symbol && null != e[Symbol.iterator]) ||
    null != e["@@iterator"]
  )
    return Array.from(e);
}
function _arrayWithoutHoles(e) {
  if (Array.isArray(e)) return _arrayLikeToArray(e);
}
function _arrayLikeToArray(e, t) {
  (null == t || t > e.length) && (t = e.length);
  for (var i = 0, o = new Array(t); i < t; i++) o[i] = e[i];
  return o;
}
var LINKS = document.querySelectorAll(".menu__link");
LINKS.forEach(function (e) {
  e.addEventListener("click", function (t) {
    t.preventDefault();
    var i = e.getAttribute("href");
    document
      .querySelector(i)
      .scrollIntoView({ behavior: "smooth", block: "start" });
  });
});
var BTN_TEXT = document.querySelectorAll(".news-item__show-more"),
  DOTS = document.querySelectorAll(".dots"),
  MORE_TEXT = document.querySelectorAll(".more");
if (BTN_TEXT)
  for (
    var _loop = function (e) {
        BTN_TEXT[e].addEventListener("click", function () {
          "none" !== DOTS[e].style.display &&
            ((DOTS[e].style.display = "none"),
            (MORE_TEXT[e].style.display = "inline"),
            (BTN_TEXT[e].style.display = "none"));
        });
      },
      i = 0;
    i < BTN_TEXT.length;
    i++
  )
    _loop(i);
var MENU = document.querySelector(".header-right"),
  HEADER_BUTTON = document.querySelector(".header__burger");
HEADER_BUTTON &&
  HEADER_BUTTON.addEventListener("click", function () {
    MENU.classList.toggle("show"), HEADER_BUTTON.classList.toggle("open");
  });
var WORKS_SLIDER = document.querySelectorAll(".works-slider");
if (WORKS_SLIDER && window.innerWidth <= 575)
  for (var _i = 0; _i < WORKS_SLIDER.length; _i++)
    new Swiper(WORKS_SLIDER[_i], {
      slidesPerView: 1,
      spaceBetween: 15,
      navigation: {
        nextEl: ".swiper-button-next.swiper-button--".concat(_i),
        prevEl: ".swiper-button-prev.swiper-button--".concat(_i),
      },
      pagination: {
        el: ".swiper-pagination.swiper-pagination--".concat(_i),
        type: "bullets",
        clickable: !0,
      },
    });
var TIMELINES = _toConsumableArray(document.querySelectorAll(".timeline-item")),
  CLOSE_TOOLTIP = _toConsumableArray(
    document.querySelectorAll(".timeline-close")
  );
if (TIMELINES.length > 0)
  if (window.innerWidth >= 991)
    for (
      var _loop2 = function (e) {
          TIMELINES[e].addEventListener("mouseover", function (t) {
            var i = t.target.closest(
                ".timeline-item__inner > .timeline-item__circle"
              ),
              o = TIMELINES[e].querySelector(".timeline-item__content");
            try {
              if (!i) return;
              i.classList.contains("timeline-item__circle--none")
                ? ((i.querySelector(".timeline-item__close").style.opacity =
                    "0"),
                  (i.querySelector(".timeline-item__open").style.opacity = "1"),
                  (o.style.opacity = "1"))
                : (o.style.opacity = "1");
            } catch (e) {
              return e;
            }
          }),
            TIMELINES[e].addEventListener("mouseout", function (t) {
              var i = t.target.closest(
                  ".timeline-item__inner > .timeline-item__circle"
                ),
                o = TIMELINES[e].querySelector(".timeline-item__content");
              if (i)
                try {
                  i.classList.contains("timeline-item__circle--none")
                    ? ((i.querySelector(".timeline-item__close").style.opacity =
                        "1"),
                      (i.querySelector(".timeline-item__open").style.opacity =
                        "0"),
                      (o.style.opacity = "0"))
                    : (o.style.opacity = "0");
                } catch (e) {
                  return e;
                }
            });
        },
        _i2 = 0;
      _i2 < CLOSE_TOOLTIP.length;
      _i2++
    )
      _loop2(_i2);
  else if (window.innerWidth <= 990)
    for (
      var _loop3 = function (e) {
          TIMELINES[e].addEventListener("click", function (t) {
            var i = t.target.closest(
                ".timeline-item__inner > .timeline-item__circle"
              ),
              o = TIMELINES[e].querySelector(".timeline-item__content"),
              n = TIMELINES[e].querySelector(".timeline-close");
            try {
              if (!i) return;
              i.classList.contains("timeline-item__circle--none")
                ? (i.classList.add("active"),
                  (i.querySelector(".timeline-item__close").style.opacity =
                    "0"),
                  (i.querySelector(".timeline-item__open").style.opacity = "1"),
                  setTimeout(function () {
                    (o.style.opacity = "1"),
                      (o.style.visibility = "visible"),
                      document
                        .querySelector(".site-container")
                        .classList.add("show"),
                      (document.querySelector(".body").style.overflow =
                        "hidden");
                  }, 1e3))
                : ((o.style.opacity = "1"),
                  (o.style.visibility = "visible"),
                  document
                    .querySelector(".site-container")
                    .classList.add("show"),
                  (document.querySelector(".body").style.overflow = "hidden")),
                n.addEventListener("click", function (e) {
                  (o.style.opacity = "0"),
                    (o.style.visibility = "hidden"),
                    document
                      .querySelector(".site-container")
                      .classList.remove("show"),
                    i.classList.contains("timeline-item__circle--none") &&
                      ((i.querySelector(".timeline-item__close").style.opacity =
                        "1"),
                      (i.querySelector(".timeline-item__open").style.opacity =
                        "0")),
                    (document.querySelector(".body").style.overflow =
                      "visible");
                });
            } catch (e) {
              return e;
            }
          });
        },
        _i3 = 0;
      _i3 < CLOSE_TOOLTIP.length;
      _i3++
    )
      _loop3(_i3);
