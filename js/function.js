//获取数据
$(document).on('onOverlayDataUpdate', function(e) {
	update(e.originalEvent);
});

var	list;

function update(e) {
	var encounter = e.detail.Encounter;
	var	combatant = e.detail.Combatant;
	var	player = Object.keys(combatant);

	//判断是否已经进入战斗并已存在list
	if (typeof(list) == 'undefined') {
		list = 0;
	}

	//判断人数是否改变需要重新建立列表
	if (list != player.length) {

		//重新计算人数
		list = 0;
		
		//格式化列表
		$('#overlay').html('');
		$('#overlay').append("<ul class='dpslist'></ul>");

		//基于人数建立数据框架
		for (; list < player.length; list++) {
			$('.dpslist').append("<li id='idps'><div class='icon'></div><span id='dps'></span><span class='name'></span><span class='detail'></span><div class='background'><span class='bar'></span></div></li>");
		}
		updateData(e);
	} else {
		updateData(e);
	}

	//传递战斗数据
	function updateData(e) {

		//标题
		$('#header').find('.encountertitle').text(encounter.title);

		//战斗时间
		$('#header').find('.duration').text(encounter.duration);

		for (var i = 0; i < player.length; i++) {
			var name = combatant[player[i]];
			var row = $('.dpslist>li:nth-child(' + (i + 1) + ')');
			var maxdps = combatant[player[0]].encdps;

			row.find('.name').text(name.name);
			row.find('.icon').css('background', 'url(img/icons/' + name.Job + '.png)');
			row.find('.bar').css('width', ((name.encdps / maxdps) * 100) + '%');

			//暴击 + 总伤害 + 占比
			row.find('.detail').text(name['crithit%'] + ' (' + name['damage'] + ', ' + name['damage%'] + ')');

			if (maxdps >= 100) {
				row.find('#dps').text(name.ENCDPS);
			} else if (maxdps >= 10) {
				name.encdps = parseFloat(name.encdps);
				var encdpsfixed = name.encdps.toFixed(1);
				if (name.encdps < 10) {
					row.find('#dps').text('0' + encdpsfixed);
				} else {
					row.find('#dps').text(encdpsfixed);
				}
			} else {
				row.find('#dps').text(name.encdps);
			}

			if (name.Job == 'War' ||
				name.Job == 'Pld' ||
				name.Job == 'Drk' ||
				name.Job == 'Mrd' ||
				name.Job == 'Gla') {
				row.find('.bar').css('background', '#28c0b4');
			} else if (
				name.Job == 'Whm' ||
				name.Job == 'Sch' ||
				name.Job == 'Ast' ||
				name.Job == 'Cnj') {
				row.find('.bar').css('background', '#1ac174');
			} else if (
				name.Job == 'Brd' ||
				name.Job == 'Drg' ||
				name.Job == 'Mnk' ||
				name.Job == 'Nin' ||
				name.Job == 'Smn' ||
				name.Job == 'Blm' ||
				name.Job == 'Mch' ||
				name.Job == 'Arc' ||
				name.Job == 'Lnc' ||
				name.Job == 'Pld' ||
				name.Job == 'Pgl' ||
				name.Job == 'Rog' ||
				name.Job == 'Acn' ||
				name.Job == 'Thm' ||
				name.Job == 'Rdm' ||
				name.Job == 'Sam') {
				row.find('.bar').css('background', '#ee2e48');
			} else if (
				name.name.indexOf(" (") != -1) {
				row.find('.bar').css('background', '#e6d033');
			} else if (
				name.name.indexOf("Limit Break") == 0) {
				row.css('display', 'none');
			}
		}
	}
}

function titleFadeOut() {
	$('body').fadeOut();
}

/*
var aaali = document.getElementById("overlay");
var ali = aaali.getElementsByTagName("li"); //建立数组加入overlay中所有的li
var list = [];
var tli=ali.length;

for(var i = 0; i < tli; i++) {
	list[i] = ali[i];
} //对数组进行排序

list.sort(
	function (a,b) {
		return parseFloat(b.innerHTML) - parseFloat(a.innerHTML); //这样来进行我们简单的比较
});

for(var j=0;j<tli;j++){
	overlay.appendChild(list[j]);
}
*/