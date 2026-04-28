$(window).load(function () {
	$('.loading').fadeOut('fast');
	$('.container').fadeIn('fast');
});

/* ==============================================================
   Yardımcı efekt fonksiyonları (konfeti, kalp, taç yaprağı)
   ============================================================== */

var SUMEYYE_PALETTE = [
	'#FF5F8D', '#FFD54F', '#FB8C00', '#7E57C2',
	'#42A5F5', '#66BB6A', '#EC407A', '#FFB6C1', '#AB47BC'
];

var PETAL_COLORS = [
	'linear-gradient(to bottom, #ffd54f, #fb8c00)',
	'linear-gradient(to bottom, #ff8fb1, #e91e63)',
	'linear-gradient(to bottom, #ce93d8, #7b1fa2)',
	'linear-gradient(to bottom, #fff, #e8eaf6)',
	'linear-gradient(to bottom, #ef5350, #c62828)'
];

function spawnConfetti() {
	for (var i = 0; i < 60; i++) {
		var endX = Math.floor((Math.random() * 900) - 450);
		var endY = Math.floor((Math.random() * 600) - 100);
		var c = document.createElement('div');
		c.className = 'confetti';
		c.style.left = (45 + Math.random() * 10) + '%';
		c.style.top = (40 + Math.random() * 10) + '%';
		c.style.background = SUMEYYE_PALETTE[Math.floor(Math.random() * SUMEYYE_PALETTE.length)];
		c.style.animationDelay = (Math.random() * 0.3) + 's';
		c.style.setProperty('--conf-end', 'translate(' + endX + 'px, ' + endY + 'px)');
		document.body.appendChild(c);
		(function (node) {
			setTimeout(function () {
				if (node.parentNode) node.parentNode.removeChild(node);
			}, 3500);
		})(c);
	}
}

function spawnHearts(count) {
	count = count || 18;
	for (var i = 0; i < count; i++) {
		var h = document.createElement('div');
		h.className = 'heart-float';
		h.style.left = (Math.random() * 95) + 'vw';
		h.style.animationDelay = (Math.random() * 1.5) + 's';
		h.style.animationDuration = (5 + Math.random() * 3) + 's';
		var scale = (0.6 + Math.random() * 0.7).toFixed(2);
		h.style.transform = 'scale(' + scale + ')';
		document.body.appendChild(h);
		(function (node) {
			setTimeout(function () {
				if (node.parentNode) node.parentNode.removeChild(node);
			}, 9500);
		})(h);
	}
}

function startPetalRain() {
	for (var i = 0; i < 18; i++) {
		var p = document.createElement('div');
		p.className = 'petal-fall';
		p.style.left = (Math.random() * 100) + 'vw';
		p.style.animationDuration = (8 + Math.random() * 6) + 's';
		p.style.animationDelay = (Math.random() * 5) + 's';
		p.style.background = PETAL_COLORS[Math.floor(Math.random() * PETAL_COLORS.length)];
		document.body.appendChild(p);
	}
}

/* ==============================================================
   Sahne akışı
   ============================================================== */

function balloonSpacing() {
	var w = $(window).width();
	if (w < 420) return 42;
	if (w < 720) return 60;
	return 100;
}
function balloonTop() {
	return $(window).width() < 720 ? 120 : 240;
}
function alignBalloonsCenter(vw, duration) {
	var s = balloonSpacing();
	var t = balloonTop();
	$('#b11').animate({ top: t, left: vw - 3.5 * s }, duration);
	$('#b22').animate({ top: t, left: vw - 2.5 * s }, duration);
	$('#b33').animate({ top: t, left: vw - 1.5 * s }, duration);
	$('#b44').animate({ top: t, left: vw - 0.5 * s }, duration);
	$('#b55').animate({ top: t, left: vw + 0.5 * s }, duration);
	$('#b66').animate({ top: t, left: vw + 1.5 * s }, duration);
	$('#b77').animate({ top: t, left: vw + 2.5 * s }, duration);
}

$('document').ready(function () {
	var vw;
	$(window).resize(function () {
		vw = $(window).width() / 2;
		$('#b1,#b2,#b3,#b4,#b5,#b6,#b7').stop();
		alignBalloonsCenter(vw, 500);
	});

	/* 1) Işıkları Aç — peri ışıkları yanar */
	$('#turn_on').click(function () {
		$('.fairy-lights').addClass('on');
		$('body').addClass('peach');

		setTimeout(function () {
			$('.fairy-lights').addClass('glow');
		}, 1500);

		$(this).fadeOut('slow').delay(3000).promise().done(function () {
			$('#play').fadeIn('slow');
		});
	});

	/* 2) Müziği Başlat */
	$('#play').click(function () {
		var audio = $('.song')[0];
		audio.play();
		$('body').addClass('peach-after');
		$(this).fadeOut('slow').delay(4000).promise().done(function () {
			$('#bannar_coming').fadeIn('slow');
		});
	});

	/* 3) Süslemeleri Getir + Çiçek bahçesi açılır */
	$('#bannar_coming').click(function () {
		$('.bannar').addClass('bannar-come');
		$('#garden').addClass('show');
		$(this).fadeOut('slow').delay(4000).promise().done(function () {
			$('#balloons_flying').fadeIn('slow');
		});
	});

	/* Yedi balonun rastgele uçuş döngüleri */
	function rL() { return $(window).width()  * 0.85 * Math.random(); }
	function rT() { return $(window).height() * 0.45 * Math.random(); }
	function loopOne()   { $('#b1').animate({ left: rL(), bottom: rT() }, 10000, loopOne);   }
	function loopTwo()   { $('#b2').animate({ left: rL(), bottom: rT() }, 10000, loopTwo);   }
	function loopThree() { $('#b3').animate({ left: rL(), bottom: rT() }, 10000, loopThree); }
	function loopFour()  { $('#b4').animate({ left: rL(), bottom: rT() }, 10000, loopFour);  }
	function loopFive()  { $('#b5').animate({ left: rL(), bottom: rT() }, 10000, loopFive);  }
	function loopSix()   { $('#b6').animate({ left: rL(), bottom: rT() }, 10000, loopSix);   }
	function loopSeven() { $('#b7').animate({ left: rL(), bottom: rT() }, 10000, loopSeven); }

	/* 4) Balonları Uçur */
	$('#balloons_flying').click(function () {
		$('.balloon-border').animate({ top: -500 }, 8000);
		$('#b1,#b4,#b5,#b7').addClass('balloons-rotate-behaviour-one');
		$('#b2,#b3,#b6').addClass('balloons-rotate-behaviour-two');
		loopOne(); loopTwo(); loopThree();
		loopFour(); loopFive(); loopSix(); loopSeven();
		$(this).fadeOut('slow').delay(5000).promise().done(function () {
			$('#cake_fadein').fadeIn('slow');
		});
	});

	/* 5) Pastan görünür */
	$('#cake_fadein').click(function () {
		$('.cake').fadeIn('slow');
		$(this).fadeOut('slow').delay(3000).promise().done(function () {
			$('#light_candle').fadeIn('slow');
		});
	});

	/* 6) Mumları Yak + Konfeti patlaması */
	$('#light_candle').click(function () {
		$('.fuego').fadeIn('slow');
		spawnConfetti();
		setTimeout(spawnConfetti, 600);
		$(this).fadeOut('slow').promise().done(function () {
			$('#wish_message').fadeIn('slow');
		});
	});

	/* 7) Doğum Günün Kutlu Olsun */
	$('#wish_message').click(function () {
		vw = $(window).width() / 2;
		$('#b1,#b2,#b3,#b4,#b5,#b6,#b7').stop();
		$('#b1').attr('id', 'b11');
		$('#b2').attr('id', 'b22');
		$('#b3').attr('id', 'b33');
		$('#b4').attr('id', 'b44');
		$('#b5').attr('id', 'b55');
		$('#b6').attr('id', 'b66');
		$('#b7').attr('id', 'b77');
		alignBalloonsCenter(vw, 500);
		$('.balloons').css('opacity', '0.9');
		$('.balloons h2').fadeIn(3000);

		spawnHearts(18);
		setTimeout(function () { spawnHearts(14); }, 1800);
		setTimeout(function () { spawnHearts(12); }, 3600);

		$(this).fadeOut('slow').delay(5000).promise().done(function () {
			$('#story').fadeIn('slow');
		});
	});

	/* 8) Sümşibumime: yıldızlı gece + düşen taç yaprakları + mesaj */
	$('#story').click(function () {
		$(this).fadeOut('slow');
		$('body').addClass('starry-night');
		$('.message').addClass('typewriter-mode');
		startPetalRain();

		$('.cake').fadeOut('fast').promise().done(function () {
			$('.message').fadeIn('slow');
		});

		var TOTAL = $('.message p').length;

		function msgLoop(i) {
			$('.message p:nth-child(' + i + ')').fadeOut('slow').delay(1000).promise().done(function () {
				i = i + 1;
				$('.message p:nth-child(' + i + ')').fadeIn(1500).delay(3000);
				if (i >= TOTAL) {
					return;
				} else {
					msgLoop(i);
				}
			});
		}
		msgLoop(0);
	});
});
