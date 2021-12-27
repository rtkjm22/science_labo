"use strict";

const firstColor = "#31B7B8";

// pageTopボタンの挙動 0
$('.bl_pageTop').click(function () {
  $('body, html').delay(100).animate({
    easing: 'swing',
    scrollTop: 0
  }, 500);
  return false;
});

// グローバルナビゲーションの表示・非表示 12
$('.bl_openBtn').click(function () {
  $(this).toggleClass('active');
  $('.bl_gnav').toggleClass('active');
  $('.bl_gnav li').toggleClass('smooth');
});
$('.bl_gnav a').click(function () {
  $('.bl_openBtn').removeClass('active');
  $('.bl_gnav').removeClass('active');
  $('.bl_gnav li').removeClass('smooth');
});

// 数字カウントアップ 28
$('.bl_countUp .js_countUp').on('inview', function (e, isInView) {
  if (isInView) {
    $('.js_countUp').each(function () {
      $(this).prop('Counter', 0).animate({
        Counter: $(this).text()
      }, {
        duration: 3000,
        easing: 'swing',
        step: function (now) {
          $(this).text(Math.ceil(now));
        }
      })
    });
  }
});


// グラフ関連 51
Chart.register({
  id: 'insideText',
  afterDatasetsDraw: function (chart) {

    var ctx = chart.ctx;

    chart.data.datasets.forEach(function (dataset, i) {
      var meta = chart.getDatasetMeta(i);
      if (!meta.hidden) {
        meta.data.forEach(function (element, index) {
          // 値の表示
          ctx.fillStyle = 'rgb(0, 0, 0,0.8)'; //文字の色
          var fontSize = 12; //フォントサイズ
          var fontStyle = 'normal'; //フォントスタイル
          var fontFamily = 'Arial'; //フォントファミリー
          ctx.font = Chart.helpers.fontString(fontSize, fontStyle, fontFamily);
          var dataString = dataset.data[index].toString();

          // 値の位置
          ctx.textAlign = 'center'; //テキストを中央寄せ
          ctx.textBaseline = 'middle'; //テキストベースラインの位置を中央揃え

          var padding = -10; //余白
          var position = element.tooltipPosition();
          ctx.fillText(dataString, position.x, position.y - (fontSize / 2) - padding);

        });
      }
    });

  }
});

let chart_pie;
const pie_label = ["電磁波", "原子スペクトル", "光の速度", "熱放射"];
const pie_datasets = [{
  label: '実験の種類',
  backgroundColor: ["#31B7B8", "#0576c5", "#059ac5", "#0556c5"],
  data: ["20", "30", "10", "40"],
  borderWidth: 2,
}];

$('.js_chart__pie').on('inview', function (e, isInView) {

  if (isInView) {
    const ctx = document.querySelector('.js_chart__pie').getContext('2d');
    if (chart_pie) {
      chart_pie.destroy();
    }
    chart_pie = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: pie_label,
        datasets: pie_datasets,
      },
      options: {
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: '実験の種類 単位:%',
            position: 'top',
            // fontSize: 14,
            font: {
              size: 14,
              weight: "light"
            }
          },
          legend: {
            display: true,
          },
          tooltip: {
            enabled: true,
            callbacks: {
              label: function (item) {
                return ` ${item.label}: ${item.formattedValue}%`;
              }
            }
          },
          insideText: true,
        },
      },
    });
  }
});


let chart_bar;
const bar_label = ["令和3年度", "令和4年度", "令和5年度"];
const bar_datasets = [{
  label: "施設見学者数",
  backgroundColor: firstColor,
  data: ["2818", "1519", "1720"],
  barPercentage: 0.5
}];

$('.js_chart__bar').on('inview', function (e, isInView) {
  if (isInView) {
    const ctx = document.querySelector('.js_chart__bar').getContext('2d');
    ctx.height = 300;
    if (chart_bar) {
      chart_bar.destroy();
    }
    chart_bar = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: bar_label,
        datasets: bar_datasets
      },
      options: {
        maintainAspectRatio: false,
        scales: {
          yAxes: {
            suggestedMax: 3000, //最大が1000
            suggestedMin: 0, //最小が0
            beginAtZero: true, //0からスタート
            ticks: {
              stepSize: 500,
              callback: function (value) {
                return value + '人' //数字＋人で表示					
              },
              major: true,
            },
          },
        },
        plugins: {
          insideText: false,
          legend: {
            display: false,
          },
          title: {
            display: true,
            fontSize: 14,
            text: '施設見学数 単位:人',
          },
          tooltip: {
            callbacks: {
              label: function (item) {
                return ` ${item.dataset.label}: ${item.formattedValue}人`;
              }
            }
          },
        }
      }
    });
  }
});


// 文字のランダム出現 209
const random_obj = {
  loop: false,
  minDisplayTime: 2000, 
  initialDelay: 100,
  autoStart: true,
  in: {
    effect: 'fadeInUp',
    delayScale: 1,
    delay: 100,
    sync: false, 
    shuffle: true
  },
  out: {

  }
}
let element;
//初期設定
function RandomInit() {
  element = $(".randomAnime");
  $(element[0]).textillate(random_obj);
}

function RandomAnimeControl() {
  var elemPos = $(element[1]).offset().top - 50;
  var scroll = $(window).scrollTop();
  var windowHeight = $(window).height();

  if (scroll >= elemPos - windowHeight) {
    $(element[1]).textillate(random_obj);
  }
}


// particles.js 244 
particlesJS("js_particlesJS", {
  "particles": {
    "number": {
      "value": 38,
      "density": {
        "enable": true,
        "value_area": 800
      },
    },
    "color": {
      "value": firstColor
    },
    "shape": {
      "type": "polygon",
      "stroke": { // ボーダー
        "width": 0,
      },
      "polygon": {
        "nb_sides": 3
      },
      "image": {
        "width": 190,
        "height": 100
      }
    },
    "opacity": {
      "value": 0.8,
      "random": false,
      "anim": {
        "enable": true, // チカチカする
        "speed": 0.2,
        "opacity_min": 0.08,
        "sync": false
      }
    },
    "size": {
      "value": 3,
      "random": true,
      "anim": {
        "enable": false,
        "speed": 40,
        "size_min": 0.1,
        "sync": false,
      }
    },
    "line_linked": {
      "enable": true,
      "distance": 150,
      "color": firstColor,
      "opacity": .6,
      "width": 1
    },
    "move": {
      "enable": true,
      "speed": 6,
      "direction": "none",
      "random": false,
      "straight": false,
      "out_mode": "out",
      "bounce": false,
      "attract": {
        "enable": false,
        "rotateX": 600, 
        "rotateY": 961,
      }
    },
  },
  "interactivity": {
    "detect_on": "canvas",
    "events": {
      "onhover": {
        "enable": false,
        "mode": "repulse"
      },
      "onclick": {
        "enable": false
      },
      "resize": true
    }
  },
  "retina_detect": true,
});

// フェードアニメ 339
function fadeAnime() {
  $('.js_fadeDownTrigger').each(function () {
    const elemPos = $(this).offset().top - 50;
    const scroll = $(window).scrollTop();
    const windowHeight = $(window).height();
    if (scroll >= elemPos - windowHeight) {
      $(this).addClass('fadeDown');
    } else {
      $(this).removeClass('fadeDown');
    }
  });

  $('.js_smoothTrigger').each(function () {
    const elemPos = $(this).offset().top - 50;
    const scroll = $(window).scrollTop();
    const windowHeight = $(window).height();
    if (scroll >= elemPos - windowHeight) {
      $(this).addClass('smooth');
    } else {
      $(this).removeClass('smooth');
    }
  });
}

// 波打つフッター 371




$(window).scroll(function () {
  fadeAnime();
  RandomAnimeControl();
});

$(window).on('load', function () {
  fadeAnime();
  RandomInit();
  RandomAnimeControl();
});