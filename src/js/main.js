"use strict";

/*
const forms = document.querySelectorAll('form');
let step;
let inps = 0;
let percent;

function taisyo() {
  percent = new Progress(0);
  for (let i=forms.length;i--;) {
    const inp = forms[i].querySelectorAll("input[type='text']");
    inps += inp.length;
    for (let j = inp.length;j--;) {
      inp[j].setAttribute("onChange","koushin(this)")
    }
  }
  step = 100 / inps;
}

function koushin($this) {
  const elem = $this;
  if ($this.value) {  
    elem.className = 'up';
  } else {
    elem.className = '';
  }
  const nowUp = document.getElementsByClassName('up');
  const status = inps - (inps - nowUp.length);
  percent = status * step;
  new Progress(percent);
}


const Progress = (function () {
  function Progress(percent) {
    this.bar = document.querySelectorAll('.progressBar')[0];
    this.num = document.querySelectorAll('.num')[0];
    this.percent = percent;
    this.update();
  };
  Progress.prototype.update = function () {
    this.num.textContent = this.percent + '%';
    this.bar.style.width = this.percent + '%';
  }
  return Progress;
}());

$(window).on('load', function () {
  taisyo();
});
*/




class Progress {
  constructor(bar, num, percent) {
    this.bar = bar;
    this.num = num;
    this.percent = percent;
    this.update();
  }
  update() {
    this.num.textContent = this.percent + '%';
    this.bar.style.width = this.percent + '%';
    return;
  }
}


const inps = document.querySelectorAll('input[type="text"]');
const bar  = document.querySelectorAll('.progressBar')[0];
const num  = document.querySelectorAll('.num')[0];
let percent = 0;
let step = 0;

for (let i=0;i<inps.length;i++) {
  inps[i].setAttribute("onChange","koushin()");
}

const progressBar = new Progress(bar, num, percent);

const koushin = () => {
  step = 0;
  for (let i=0;i<inps.length;i++) {
    inps[i].value ? step++ : '';
  }
  percent = (step / inps.length) * 100;
  progressBar.percent = percent;
  progressBar.update();
}

window.onload = () => {
  const loader = document.getElementById('loader');
  loader.classList.add('loaded');
  setTimeout(() => {
    loader.style.display = 'none';
  }, 3000);
}