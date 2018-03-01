"use strict";

function JobOrName(combatant) {
	combatant.JobOrName = combatant.Job || combatant.name; //方便统计陆行鸟和召唤兽，并统一定义名字和职业

	if(	combatant.JobOrName.indexOf("之灵 (") != -1 ||
		combatant.JobOrName.indexOf("宝石兽 (") != -1 ||
		combatant.JobOrName.indexOf("小仙女 (") != -1 ||
		combatant.JobOrName.indexOf("式浮空炮塔 (") != -1) { //召唤，学者和机工的宠物
		combatant.JobOrName = "Pet";
	} else if(combatant.JobOrName.indexOf(" (") != -1) { //陆行鸟
		combatant.JobOrName = "Cho";
	} else if(combatant.JobOrName.indexOf("Limit Break") == 0) { //Limit Break
		combatant.JobOrName = "Lmb";
	}

	return combatant.JobOrName;
}

function update(e) {
	var encounter = e.detail.Encounter; //战斗环境数据
	var players = e.detail.Combatant; //战斗人员数据
	var names = Object.keys(players).slice(0,15); //提取所有players数组，最多允许15组

	$('#header').find('.encountertitle').text(encounter.title); //标题
	$('#header').find('.duration').text(encounter.duration); //战斗时间

	$('#overlay').html(''); //删除数据出现前的提示
	$('#overlay').append($('.alldps').clone()); //在container结尾建立.alldps
	$('#overlay').append($('.allhps').clone()); //在container结尾建立.allhps

	var sortdps = []; //定义数组记录每次刷新的dps
	
	for (var i = 0; i < names.length; i++) {
		var combatant = players[names[i]]; //各战斗者的数据
		var row = $('#sdps').clone(); //使用.clone()建立新的li标签
		var maxdps = Math.max(combatant.encdps, maxdps); //比较并记录最大dps

		sortdps[i] = combatant.encdps; //记录每人的dps
		sortdps[i] = parseFloat(sortdps[i]); //转换为数字

		if (!maxdps) {
			maxdps = parseFloat(combatant.encdps);
		}

		row.find('.name').text(combatant.name);
		row.find('.icon').css('background', 'url(img/icons/' + JobOrName(combatant) + '.png)');
		row.find('.detail').text(combatant['crithit%'] + ' (' + combatant['damage'] + ', ' + combatant['damage%'] + ')'); //暴击 + 总伤害 + 占比
		row.find('.bar').css('width', ((parseFloat(combatant.encdps) / maxdps) * 100) + '%');

		combatant.encdps = parseFloat(combatant.encdps); //dps转化为数值
		if (maxdps >= 100) { //总dps大于100不使用小数
			row.find('#dps').text(combatant.ENCDPS);
		} else if (maxdps >= 10) {
			var encdpsfixed = combatant.encdps.toFixed(1); //定义encdpsfixed取一位小数
			if (combatant.encdps < 10) { //如果dps只有一位则在前面加0
				row.find('#dps').text('0' + encdpsfixed);
			} else {
				row.find('#dps').text(encdpsfixed);
			}
		} else {
			row.find('#dps').text(combatant.encdps);
		}

		if(	JobOrName(combatant) == 'War' ||
			JobOrName(combatant) == 'Pld' ||
			JobOrName(combatant) == 'Drk' ||
			JobOrName(combatant) == 'Mrd' ||
			JobOrName(combatant) == 'Gla') {
			row.find('.bar').css('background', '#28c0b4');
		}
		else if(JobOrName(combatant) == 'Whm' ||
				JobOrName(combatant) == 'Sch' ||
				JobOrName(combatant) == 'Ast' ||
				JobOrName(combatant) == 'Cnj') {
			row.find('.bar').css('background', '#1ac174');
		}
		else if(JobOrName(combatant) == 'Brd' ||
				JobOrName(combatant) == 'Drg' ||
				JobOrName(combatant) == 'Mnk' ||
				JobOrName(combatant) == 'Nin' ||
				JobOrName(combatant) == 'Smn' ||
				JobOrName(combatant) == 'Blm' ||
				JobOrName(combatant) == 'Mch' ||
				JobOrName(combatant) == 'Arc' ||
				JobOrName(combatant) == 'Lnc' ||
				JobOrName(combatant) == 'Pld' ||
				JobOrName(combatant) == 'Pgl' ||
				JobOrName(combatant) == 'Rog' ||
				JobOrName(combatant) == 'Acn' ||
				JobOrName(combatant) == 'Thm' ||
				JobOrName(combatant) == 'Rdm' ||
				JobOrName(combatant) == 'Sam') {
			row.find('.bar').css('background', '#ee2e48');
		}
		else if(JobOrName(combatant) == 'Cho' ||
				JobOrName(combatant) == 'Pet') {
			row.find('.bar').css('background', '#e6d033');
		}
		else if(JobOrName(combatant) == 'Lmb') {
			row.css('display', 'none');
		}

		$('#overlay .alldps').append(row);
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


	// sortdps.sort();
	// document.write(sortdps);
	

	for (var i = 0; i < names.length; i++) {
		var combatant = players[names[i]];
		var row = $('#shps').clone();
		var maxhps = Math.max(combatant.enchps, maxhps);

		if (!maxhps) {
			maxhps = parseFloat(combatant.enchps);
		}

		row.find('.name').text(combatant.name);
		row.find('.icon').css('background', 'url(img/icons/' + JobOrName(combatant) + '.png)');
		row.find('.detail').text(combatant['OverHealPct'] + ' (' + combatant['healed'] + ', ' + combatant['healed%'] + ')'); //过量治疗 + 总治疗 + 占比
		row.find('.bar').css('width', ((parseFloat(combatant.enchps) / maxhps) * 100) + '%'); 

		if (combatant.ENCHPS <= 100) {
			row.find('.hps').text(combatant.enchps);
		} else {
			row.find('.hps').text(combatant.ENCHPS);
		}

		if(	JobOrName(combatant) == 'War' ||
			JobOrName(combatant) == 'Pld' ||
			JobOrName(combatant) == 'Drk' ||
			JobOrName(combatant) == 'Mrd' ||
			JobOrName(combatant) == 'Gla') {
			row.find('.bar').css('background', '#28c0b4');
		}
		else if(JobOrName(combatant) == 'Whm' ||
				JobOrName(combatant) == 'Sch' ||
				JobOrName(combatant) == 'Ast' ||
				JobOrName(combatant) == 'Cnj') {
			row.find('.bar').css('background', '#1ac174');
		}
		else if(JobOrName(combatant) == 'Brd' ||
				JobOrName(combatant) == 'Drg' ||
				JobOrName(combatant) == 'Mnk' ||
				JobOrName(combatant) == 'Nin' ||
				JobOrName(combatant) == 'Smn' ||
				JobOrName(combatant) == 'Blm' ||
				JobOrName(combatant) == 'Mch' ||
				JobOrName(combatant) == 'Arc' ||
				JobOrName(combatant) == 'Lnc' ||
				JobOrName(combatant) == 'Pld' ||
				JobOrName(combatant) == 'Pgl' ||
				JobOrName(combatant) == 'Rog' ||
				JobOrName(combatant) == 'Acn' ||
				JobOrName(combatant) == 'Thm' ||
				JobOrName(combatant) == 'Rdm' ||
				JobOrName(combatant) == 'Sam') {
			row.find('.bar').css('background', '#ee2e48');
		}
		else if(JobOrName(combatant) == 'Cho' ||
				JobOrName(combatant) == 'Pet') {
			row.find('.bar').css('background', '#e6d033');
		}
		else if(JobOrName(combatant) == 'Lmb') {
			row.css('display', 'none');
		}

		$('#overlay .allhps').append(row);
	}
}

$(document).on('onOverlayDataUpdate', function(e) {
	update(e.originalEvent);
});

window.addEventListener('message', function(e) {
	if (e.data.type === 'onOverlayDataUpdate') {
		update(e.data);
	}
});

function hideoverlay() {
	if (document.getElementById('outside').style.opacity == '0') {
		$('#outside').css("display","block");
		$('#outside').css("display");
		$('#outside').css("opacity","1");
	} else {
		$('#outside').css('opacity', '0');
	}

	setTimeout (
		function hidedisplay() {
			if (document.getElementById('outside').style.opacity == '0') {
				$('#outside').css('display', 'none');
			}
		}
	, 500);
}

function dpstime() {
	$('.alldps').css('display', 'block');
	$('.allhps').css('display', 'none');
	$('.cdps').css('color', '#D8BB7D');
	$('.chps').css('color', '#C6C6C6');
}

function hpstime() {
	$('.allhps').css('display', 'block');
	$('.alldps').css('display', 'none');
	$('.chps').css('color', '#D8BB7D');
	$('.cdps').css('color', '#C6C6C6');
}