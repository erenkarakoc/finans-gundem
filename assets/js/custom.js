// ===============================
// ====     FİNANS GÜNDEM    =====
// ===============================

const changeCategory = (selectedCategory) => {
  // kategorilere göre listeleme fonksiyonu buraya gelebilir

  alert(selectedCategory)
}

// TG Video Player
const TGVideoPlayer = document.querySelector(".tg-video-player")
if (TGVideoPlayer) {
  const TGVideo = TGVideoPlayer.querySelector("video")
  const TGVideoPlayButton = TGVideoPlayer.querySelector(".tg-video-play-button")
  const TGVolumeButton = TGVideoPlayer.querySelector(".tg-video-volume-button")
  const TGVolume = TGVideoPlayer.querySelector(".tg-video-volume")
  const TGCurrentTimeElement = TGVideoPlayer.querySelector(".tg-video-current")
  const TGDurationTimeElement =
    TGVideoPlayer.querySelector(".tg-video-duration")
  const TGRemainingTimeElement = TGVideoPlayer.querySelector(
    ".tg-video-remaining"
  )
  const TGProgress = TGVideoPlayer.querySelector(".tg-video-progress")
  const TGProgressBar = TGVideoPlayer.querySelector(".tg-video-progress-filled")
  const TGVideoFullScreen = TGVideoPlayer.querySelector(".tg-video-fullscreen")

  // play and pause button
  TGVideo.addEventListener("click", () => {
    if (TGVideo.paused) {
      TGVideo.play()
    } else {
      TGVideo.pause()
    }
  })
  TGVideo.addEventListener("play", () => {
    TGVideoPlayer.classList.remove("tg-video-first-time")

    TGVideoPlayButton.classList.add("tg-video-play-button-playing")
    TGVideoPlayer.classList.remove("tg-video-paused")
  })
  TGVideo.addEventListener("pause", () => {
    TGVideoPlayButton.classList.remove("tg-video-play-button-playing")
    TGVideoPlayer.classList.add("tg-video-paused")
  })
  TGVideo.addEventListener("ended", () => {
    TGVideoPlayButton.classList.remove("tg-video-play-button-playing")
  })
  TGVideoPlayButton.addEventListener("click", (e) => {
    if (TGVideo.paused) {
      TGVideo.play()
    } else {
      TGVideo.pause()
    }
  })

  // time
  const currentTime = () => {
    duration = new Date(TGVideo.duration * 1000)
      .toISOString()
      .substr(11, 8)
      .replace(/^0(?:0:0?)?/, "")
    current = new Date(TGVideo.currentTime * 1000)
      .toISOString()
      .substr(11, 8)
      .replace(/^0(?:0:0?)?/, "")
    remainingSeconds = TGVideo.duration - TGVideo.currentTime
    remaining = new Date(remainingSeconds * 1000)
      .toISOString()
      .substr(11, 8)
      .replace(/^0(?:0:0?)?/, "")

    TGDurationTimeElement.innerHTML = `${duration}`
    TGCurrentTimeElement.innerHTML = `${current}`
    TGRemainingTimeElement.innerHTML = `${
      remaining == "0:00" ? remaining : "-" + remaining
    }`
  }
  TGVideo.addEventListener("timeupdate", currentTime)
  // progress bar
  TGVideo.addEventListener("timeupdate", () => {
    const percentage = (TGVideo.currentTime / TGVideo.duration) * 100
    TGProgressBar.style.width = `${percentage}%`
  })
  TGProgress.addEventListener("mousedown", (e) => {
    const progressTime = (e.offsetX / TGProgress.offsetWidth) * TGVideo.duration
    TGVideo.currentTime = progressTime

    const percentage = (TGVideo.currentTime / TGVideo.duration) * 100
    TGProgressBar.style.width = `${percentage}%`
  })
  var mouseDown
  document.body.onmousedown = function () {
    mouseDown = true
  }
  document.body.onmouseup = function () {
    mouseDown = false
  }
  TGProgress.addEventListener("mousemove", (e) => {
    if (mouseDown) {
      const draggedTime =
        (e.offsetX / TGProgress.offsetWidth) * TGVideo.duration
      TGVideo.currentTime = draggedTime

      const percentage = (TGVideo.currentTime / TGVideo.duration) * 100
      TGProgressBar.style.width = `${percentage}%`
    }
  })
  // volume
  document.addEventListener("DOMContentLoaded", () => {
    TGVideoPlayer.classList.add("tg-video-first-time")
    const volumeLevel = localStorage.getItem("volumeLevel")
    if (volumeLevel) {
      TGVideo.volume = volumeLevel
      TGVolume.value = volumeLevel

      if (volumeLevel == "0") {
        TGVolumeButton.classList.add("tg-video-muted")
      } else {
        TGVolumeButton.classList.remove("tg-video-muted")
      }
    }
  })
  TGVolume.addEventListener("mousemove", (e) => {
    TGVideo.volume = e.target.value
    localStorage.setItem("volumeLevel", e.target.value)

    if (e.target.value == "0") {
      TGVolumeButton.classList.add("tg-video-muted")
    } else {
      TGVolumeButton.classList.remove("tg-video-muted")
    }
  })
  TGVolumeButton.addEventListener("click", (e) => {
    if (window.innerWidth < 991) {
      TGVolumeButton.classList.toggle("active")
    }

    if (!e.target.classList.contains("tg-video-volume")) {
      if (TGVolumeButton.classList.contains("tg-video-muted")) {
        TGVolume.value = 1
        TGVideo.volume = 1
        localStorage.setItem("volumeLevel", "1")
        TGVolumeButton.classList.remove("tg-video-muted")
      } else {
        if (window.innerWidth > 991) {
          TGVolume.value = 0
          TGVideo.volume = 0
          localStorage.setItem("volumeLevel", "0")
          TGVolumeButton.classList.add("tg-video-muted")
        }
      }
    }
  })
  // fullscreen
  TGVideoFullScreen.addEventListener("click", (e) => {
    TGVideo.webkitRequestFullScreen()
  })
}

// jQuery
;(function () {
  // Loader
  $(document).ready(() => {
    $("#tgLoader").fadeOut()
    $("body").css("position", "unset")
  })

  // =========================
  // ==== FİNANS GÜNDEM BORSA
  // -------------------------

  const createFGExchange = () => {
    fetch(window.location.href + "/@exchange.json")
      .then((res) => res.json())
      .then((data) => {
        const swiperWrapper = document.createElement("div")
        swiperWrapper.className = "swiper-wrapper"

        data.map((symbol) => {
          var lastPrice = symbol.lastPrice
          var prevPrice = symbol.prevPrice
          var symbolStatus = lastPrice > prevPrice ? "fgBorsaUp" : "fgBorsaDown"
          var priceChange =
            lastPrice < prevPrice
              ? (lastPrice - prevPrice).toFixed(2)
              : (lastPrice - prevPrice).toFixed(2)
          var priceChangePercentage =
            lastPrice < prevPrice
              ? (((lastPrice - prevPrice) / prevPrice) * 100.0).toFixed(2)
              : (((lastPrice - prevPrice) / prevPrice) * 100.0).toFixed(2)

          var symbolEl = `
          <div class="${symbolStatus} symbol-el swiper-slide">
            <div class="fgBorsaIcon"></div>
            <h4 class="fgBorsaSymbol">${symbol.symbol}</h4>
            <span class="fgBorsaPrice">${symbol.lastPrice}</span>
            <div class="fgBorsaChange">
              <small>${priceChange}</small>
              <small>${priceChangePercentage}%</small>
            </div>
          </div>
        `
          swiperWrapper.innerHTML += symbolEl
        })

        document.getElementById("fgBorsa").appendChild(swiperWrapper)

        const FGBorsaSlider = new Swiper("#fgBorsa", {
          loop: true,
          slidesPerView: "auto",
          autoWidth: true,
          autoplay: {
            delay: 1500,
          },
        })
        $("#fgBorsa").on("mouseenter", () => {
          FGBorsaSlider.autoplay.stop()
        })
        $("#fgBorsa").on("mouseleave", () => {
          FGBorsaSlider.autoplay.start()
        })
      })
      .catch((err) => console.log(err))
  }

  createFGExchange()

  setTimeout(() => createFGExchange, 3000)

  // -------------------------
  // ==== FİNANS GÜNDEM BORSA
  // =========================

  var HTmonths = [
    "Ocak",
    "Şubat",
    "Mart",
    "Nisan",
    "Mayıs",
    "Haziran",
    "Temmuz",
    "Ağustos",
    "Eylül",
    "Ekim",
    "Kasım",
    "Aralık",
  ]
  var HTn = new Date()
  var HTy = HTn.getFullYear()
  var HTm = HTn.getMonth()
  var HTd = HTn.getDate()
  $("#headerTopDate")
    .find("span")
    .html(HTd + " " + HTmonths[HTm] + " " + HTy)

  // FG Hero Slider
  const FGHeroSlider = new Swiper(".fg-hero-slider", {
    spaceBetween: 16,
    pagination: {
      el: ".fg-hero-slide-pagination",
      type: "bullets",
      clickable: true,
    },
    breakpoints: {
      0: {
        slidesPerView: 2,
        centeredSlides: true,
      },
      576: {
        slidesPerView: 3,
      },
      991: {
        slidesPerView: 4,
        centeredSlides: false,
      },
    },
  })

  const FGHeroSliderSecondary = new Swiper(".fg-hero-slider-secondary", {
    spaceBetween: 16,
    pagination: {
      el: ".fg-hero-slide-pagination",
      type: "bullets",
      clickable: true,
    },
    breakpoints: {
      0: {
        slidesPerView: 2,
        centeredSlides: true,
      },
      576: {
        slidesPerView: 3,
      },
      991: {
        centeredSlides: false,
      },
    },
  })

  const FGVerticalSlider = new Swiper(".fg-vertical-slider", {
    slidesPerView: 1,
    resistanceRatio: 0,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      renderBullet: function (index, className) {
        index = Number(index) + 1
        return '<span class="' + className + '">' + index + "</span>"
      },
    },
    breakpoints: {
      768: {
        direction: "vertical",
      },
    },
  })

  const FGSlider = new Swiper(".fg-slider", {
    slidesPerView: 1,
    resistanceRatio: 0,
    loop: true,
    autoplay: {
      delay: 1500,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      renderBullet: function (index, className) {
        index = Number(index) + 1
        return '<span class="' + className + '">' + index + "</span>"
      },
    },
  })
  $(".fg-slider").on("mouseenter", () => {
    FGSlider.autoplay.stop()
  })
  $(".fg-slider").on("mouseleave", () => {
    FGSlider.autoplay.start()
  })

  const sideCardSlider = new Swiper(".side-card-slider", {
    slidesPerView: 1,
    spaceBetween: 16,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      renderBullet: function (index, className) {
        index = Number(index) + 1
        return '<span class="' + className + '">' + index + "</span>"
      },
    },
  })

  const writerCardsPrevEl =
    $(window).width() < 768
      ? ".writer-cards-navigation.fg-custom-nav-mobile .fg-custom-nav-prev"
      : ".writer-cards-navigation.fg-custom-nav-desktop .fg-custom-nav-prev"
  const writerCardsNextEl =
    $(window).width() < 768
      ? ".writer-cards-navigation.fg-custom-nav-mobile .fg-custom-nav-next"
      : ".writer-cards-navigation.fg-custom-nav-desktop .fg-custom-nav-next"

  const writerCardsSlider = new Swiper(".writer-cards-slider", {
    slidesPerView: 4,
    spaceBetween: 16,
    navigation: {
      nextEl: writerCardsNextEl,
      prevEl: writerCardsPrevEl,
    },
    breakpoints: {
      0: {
        slidesPerView: 1,
        width: 190,
      },
      576: {
        slidesPerView: 2,
      },
      768: {
        slidesPerView: 3,
        width: null,
      },
      991: {
        slidesPerView: 4,
      },
    },
  })

  const fotoGallerySlider = new Swiper(".fg-foto-gallery-slider", {
    spaceBetween: 14,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    breakpoints: {
      0: {
        width: 260,
        slidesPerView: 1,
      },
      768: {
        width: null,
        slidesPerView: 2,
      },
      991: {
        slidesPerView: 3,
      },
    },
  })

  // Dropdown
  const dropdown = (el) => {
    $(el).css("display", "none")

    var parent = $(el).parent()
    var options = []
    elID = $(el).attr("id")
      ? $(el).attr("id")
      : Math.floor(Math.random() * 10000)
    styledID = elID + "-styled"

    $(el)
      .find("option")
      .each((idx, val) => {
        options.push(`<li>${val.innerHTML}</li>`)
      })

    $(parent).append(`
      <div class="dropdown-wrap" id="${styledID}">
        <button type="button">
          ${$(el).find("option:selected").html()}
        </button>
        <ul>
          ${options.join("")}
        </ul>
      </div>
    `)

    $("#" + styledID)
      .find("li:contains('" + $(el).find("option:selected").html() + "')")
      .addClass("selected")

    $(".dropdown-wrap")
      .find("button")
      .on("click", function () {
        var below =
          (window.innerHeight + 80) / 2 < $(this)[0].getBoundingClientRect().top
            ? true
            : false

        if (below) {
          $(this).parent().find("ul").css("bottom", "0")
        } else {
          $(this).parent().find("ul").css("bottom", "unset")
        }

        $(".dropdown-wrap").toggleClass("active")
      })
    $(document).on("click", (e) => {
      if (
        !$(e.target).closest(".dropdown-wrap").length &&
        !$(e.target).closest("label[for=" + elID + "]").length
      ) {
        $(".dropdown-wrap").removeClass("active")
      }
    })
    $("label[for=" + elID + "]").on("click", () => {
      $("#" + styledID).toggleClass("active")
    })
    $("#" + styledID + " li").on("click", function () {
      selected = $(this).html()
      $("#" + styledID)
        .find("button")
        .html(selected)

      $("#" + elID + " option[value='" + selected + "']").prop("selected", true)

      $("#" + styledID)
        .find("li")
        .removeClass("selected")
      $("#" + styledID)
        .find("li:contains('" + selected + "')")
        .addClass("selected")

      $("#" + styledID).removeClass("active")

      changeCategory(selected)
    })
  }

  dropdown($(".filterTime"))

  let switchSize = 0
  $(document).on("click", "#articleZoomIn", () => {
    if (switchSize < 6) {
      $(".article-title").each((idx, val) => {
        $(val).css(
          "font-size",
          Number($(val).css("font-size").replace("px", "")) + 2 + "px"
        )
      })
      $(".article-inner")
        .find("p")
        .each((idx, val) => {
          $(val).css(
            "font-size",
            Number($(val).css("font-size").replace("px", "")) + 2 + "px"
          )
        })
      switchSize = switchSize + 2
    }
  })
  $(document).on("click", "#articleZoomOut", () => {
    if (switchSize > -4) {
      $(".article-title").each((idx, val) => {
        $(val).css(
          "font-size",
          Number($(val).css("font-size").replace("px", "")) - 2 + "px"
        )
      })
      $(".article-inner")
        .find("p")
        .each((idx, val) => {
          $(val).css(
            "font-size",
            Number($(val).css("font-size").replace("px", "")) - 2 + "px"
          )
        })
      switchSize = switchSize - 2
    }
  })

  // Emoji
  $(document).on("click", ".emoji", (e) => {
    var emoji = $(e.target).closest(".emoji").attr("data-id")
    var target = $(e.target).closest(".emojis").attr("data-target")
    $(target).val($(target).val() + " " + String.fromCodePoint(emoji))
  })

  // Comment
  $(document).on("click", "#replyComment", () => {
    $(".comment-replying").toggleClass("active")
    document.querySelector(".comment-replying").scrollIntoView()
    $("#replying").focus()
  })
  $(document).on("click", ".comment-close", () => {
    $(".comment-replying").removeClass("active")
  })

  // Side Bar
  // create side bar
  document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("tgSideBar").querySelector(".tg-nav").innerHTML =
      document.getElementById("tgHeader").querySelector(".tg-nav").innerHTML
    document
      .getElementById("tgSideBar")
      .querySelector(".tg-nav")
      .querySelector(".tg-nav-sponsor")
      .remove()
  })

  // close sidebar  if clicking outside
  $(document).on("click", (e) => {
    if (
      !$(e.target).closest("#tgSideBar").length &&
      !$(e.target).closest(".tg-toggle-sidebar").length
    ) {
      $("body").removeClass("tg-sidebar-open")
    }
  })

  // toggle sidebar
  $(document).on("click", ".tg-toggle-sidebar", () => {
    if ($("body").hasClass("tg-sidebar-open")) {
      $("body").removeClass("tg-sidebar-open")
    } else {
      $("body").addClass("tg-sidebar-open")
    }
  })

  // toggle search
  $(document).on("click", "#TGToggleSearch", () => {
    $(".tg-mobile-header").toggleClass("tg-search-active")
    $("#tgMobileSearch").focus()
  })

  // comments tag check if 0
  $(".comments-tag").each((idx, val) => {
    if (parseInt($(val).text()) === 0)
      $(val).addClass("comments-tag-no-comment")
  })

  // Todays Toolbar Date
  $("#todaysToolbarDate").daterangepicker(
    {
      singleDatePicker: true,
      showDropdowns: true,
      opens: "center",
      locale: {
        format: "DD/MM/YYYY",
        separator: " - ",
        applyLabel: "Uygula",
        cancelLabel: "İptal",
        daysOfWeek: ["Pa", "Pz", "Sa", "Ça", "Pe", "Cu", "Ct"],
        monthNames: [
          "Ocak",
          "Şubat",
          "Mart",
          "Nisan",
          "Mayıs",
          "Haziran",
          "Temmuz",
          "Ağustos",
          "Eylül",
          "Ekim",
          "Kasım",
          "Aralık",
        ],
        firstDay: 1,
      },
    },
    (date) => {
      alert(date)
      alert(date.format("DD, MM, YYYY"))
    }
  )

  $(document).on("click", ".footer-cat-title", function () {
    if ($(window).width() < 991) $("#footer-categories").toggleClass("closed")
  })
})(jQuery)

// ===============================
// ====     FİNANS GÜNDEM    =====
// ===============================
