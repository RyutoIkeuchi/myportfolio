'use strict';

// ファーストビュー
$(".start-btn").on('click', function () {
  $('.car-body .whyper-base').addClass("animate");
  $(".first-view").remove();
  setTimeout(function () {
    $('.load,.base').removeClass("none")
    $('body').removeClass("hidden");
  }, 2000);
});

// ページトップに戻るボタン
$("#page-top").click(function () {

    $("html,body").animate({
      scrollTop: 0
    }, 2000);
});

// 道の高さ
let load = document.getElementById("load");
load.style.borderBottomWidth =$(window).innerHeight()/2+"px";

// ナビボタン
$('a[href^="#"]').on('click', function() {
  var speed = 300;
  var easing = 'swing';
  $(scrollElm).animate({
    scrollTop: $($(this).attr("href")).data('z') * 500
  }, speed, easing);
  return false;
});

let scrollElm = (function() {
  if('scrollingElement' in document) {
    return document.scrollingElement;
  }
  if(navigator.userAgent.indexOf('WebKit') != -1) {
    return document.body;
  }
  return document.documentElement;
})();
 
// 全てのセクション要素を取得
let sections = document.querySelectorAll('.section');
 
// 全体をz方向に動かす#scaler要素を取得
let scaler = document.getElementById('scaler');
 
// 画面の高さを設定する#scroll要素を取得
let scrollDiv = document.getElementById('scroll');
 
// セクション要素のdata-z属性を取得し、transformを設定
// 最後のセクション要素のdata-zを元に、画面の高さを計算して設定
for(let i = 0; sections.length > i; i++) {
  let itemZ = sections[i].getAttribute('data-z');
  sections[i].style.transform = 'translateZ(' + - itemZ + 'px)';
  if(i === sections.length -1) {
    scrollDiv.style.height = itemZ * 500 + window.innerHeight + 'px';
  }
}


function draw() {
      let canvas = document.getElementById('window');
      if (canvas.getContext) {
        let line_ctx = canvas.getContext("2d");

        
        // 窓枠
        line_ctx.lineWidth = 15;
        
        line_ctx.beginPath();
        line_ctx.moveTo(0, 180);
        line_ctx.lineTo(65, 750);
        line_ctx.lineTo(1440 - 65, 750);
        line_ctx.lineTo(1440, 180);
        line_ctx.lineTo(1440, 35);
        line_ctx.quadraticCurveTo(720, 10, 0, 35);
        line_ctx.closePath();
        line_ctx.stroke();
        line_ctx.clip();
        
        // グラデーション 
        let gradient = line_ctx.createLinearGradient(0, 100, 1400, 800);
        gradient.addColorStop(0.0, 'rgba(255,255,255,0.2)');
        gradient.addColorStop(0.2, 'rgba(255,255,255,0.4)');
        gradient.addColorStop(0.4, 'rgba(255,255,255,0.9)');
        gradient.addColorStop(0.5, 'rgb(255,255,255)');
        gradient.addColorStop(0.6, 'rgba(255,255,255,0.9)');
        gradient.addColorStop(0.8, 'rgba(255,255,255,0.4)');
        gradient.addColorStop(1.0, 'rgba(255,255,255,0.2)');
        line_ctx.fillStyle = gradient;


        // 画像の読み込み
        let image = new Image();
        image.onload = function () {
          line_ctx.imageSmoothingEnabled = false;
          line_ctx.drawImage(image, -250, -300);
        }
        
        
        // スクロールイベントで、#scaler要素のtransformでz軸を動かす
        window.addEventListener('scroll', function () {
          let scrollNum = Math.round(scrollElm.scrollTop / 500);
          let section_article;
          let section_container;

          
          if (scrollNum === 10) {
            section_article = $(".section-1>article");
            section_container = $(".profile-container");
            image.src = "img/profile-bg.jpg";
          } else if (scrollNum === 20) {
            section_article = $(".section-2>article");
            section_container = $(".skill-container");
            image.src = 'img/skill-bg.jpg';
          } else if (scrollNum === 30) {
            section_article = $(".section-3>article");
            section_container = $(".works-container");
            image.src = 'img/works-bg.jpg';
          } else if (scrollNum === 40) {
            section_article = $(".section-4>article");
            section_container = $(".peace-container");
            image.src = "img/peace-bg.jpg";
          } else if (scrollNum === 50) {
            section_article = $(".section-5>article");
            section_container = $(".contact-container");
            image.src = 'img/contact-bg.jpg';
          }

          if (scrollNum % 5 === 0 ) {
            scaler.style.transform = 'translateZ(' + scrollNum + 'px)';
            $(".section>article").addClass("opa");     
          }
          
          if (scrollNum % 10 === 0 && scrollNum !== 0) {
            section_article.removeClass("opa");
            section_container.removeClass("article");
            section_container.addClass("add-article");
            line_ctx.globalCompositeOperation = "destination-over";
            line_ctx.fill()
            $("#window").addClass('fadeIn');
            console.log(line_ctx);
            if (scrollNum / 5>= 2) {
              $(".section-ttl").addClass("none");
            }
          }

          if (scrollNum % 10 === 5) {
            line_ctx.clearRect(0, 0, 1440, 750);
            $("#window").removeClass('fadeIn');
            $(".section-ttl").removeClass("none");
            $(".section>artcle").removeClass("opa");
          }        
        });
        
       
  }
}



    
        
 
