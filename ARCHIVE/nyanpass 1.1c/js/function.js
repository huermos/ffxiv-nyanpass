"use strict"; //严格模式

    var rows = 10;
    var rdps_max = 0;

    String.prototype.capitalize = function() { //首字母大写，可能没有用
        return this.charAt(0).toUpperCase() + this.slice(1);
    }

    function JobOrName(combatant) {
        combatant.JobOrName = combatant.Job || combatant.name;
        var egiSearch = combatant.JobOrName.indexOf("-Egi (");
        if (egiSearch !=-1)
        {
            combatant.JobOrName = combatant.JobOrName.substring(0,egiSearch);
        }
        else if (combatant.JobOrName.indexOf("Eos (")==0)
        {
            combatant.JobOrName = "PET";
        }
        else if (combatant.JobOrName.indexOf("Selene (")==0)
        {
            combatant.JobOrName = "PET";
        }
        else if (combatant.JobOrName.indexOf("Carbuncle (")!=-1)
        {
            combatant.JobOrName = "PET";
        }
        else if (combatant.JobOrName.indexOf(" (")!=-1)
        {
            combatant.JobOrName = "CHO";
        }       
        return combatant.JobOrName;
    };

    function update(e) {
        var encounter = e.detail.Encounter;
        var combatants = e.detail.Combatant;
        var template = $('#source li');
        var container = $('#overlay').clone();

        container.html('');

        var rdps = parseFloat(encounter.encdps);

        if (!isNaN(rdps) && rdps != Infinity) {
            rdps_max = Math.max(rdps_max, rdps);
        }

        var header = $('#header li').clone();
        if (encounter.encdps.length <= 7) {
            header.find('.raiddps').text(encounter.encdps);
        } else {
            header.find('.raiddps').text(encounter.ENCDPS);
        }
        header.find('.encountertitle').text(encounter.title);
        header.find('.duration').text(encounter.duration);

        // set inactive
        if (!e.detail.isActive) {
            rdps_max = 0;
            $('body').addClass('inactive');
        } else {
            $('body').removeClass('inactive');
        }

        container.append(header);

        var limit = Math.max(combatants.length, rows);
        var names = Object.keys(combatants).slice(0,rows-1);
        var maxdps = false;

        for (var i = 0; i < names.length; i++) {
            var combatant = combatants[names[i]];
            var row = template.clone();

            if (!maxdps) {
                maxdps = parseFloat(combatant.encdps);
            }

            if (combatant.name == 'YOU') {
                row.addClass('you');
            }
            row.find('.job-icon').html('<img src="img/icons/' + JobOrName(combatant) + '.png" onerror="$(this).attr(\'src\', \'img/icons/error.png\');">');
            //row.find('.job-icon').html('<img src="img/icons/' + JobOrName(combatant) + '.png">');
            row.find('.name').text(combatant.name + ', ' + combatant['crithit%']);

            if (combatant.ENCDPS <= 100) {
                row.find('.number').text(combatant.encdps + ' (' + combatant['damage'] + ', ' + combatant['damage%'] +')');
            } else {
                row.find('.number').text(combatant.ENCDPS + ' (' + combatant['damage'] + ', ' + combatant['damage%'] +')');
            }

            row.find('.bar').css('width', ((parseFloat(combatant.encdps) / maxdps) * 100) + '%');

            if(JobOrName(combatant) == 'War') //战士//
            {row.find('.bar').css('background', '#e61a16');}

            else if(JobOrName(combatant) == 'Pld') //骑士//
            {row.find('.bar').css('background', '#28c0b4');}

            else if(JobOrName(combatant) == 'Brd') //诗人//
            {row.find('.bar').css('background', '#c6d738');}

            else if(JobOrName(combatant) == 'Drg') //龙骑士//
            {row.find('.bar').css('background', '#5188e7');}

            else if(JobOrName(combatant) == 'Mnk') //武僧//
            {row.find('.bar').css('background', '#e6d033');}

            else if(JobOrName(combatant) == 'Nin') //忍者//
            {row.find('.bar').css('background', '#ee2e48');}

            else if(JobOrName(combatant) == 'Smn') //召唤师//
            {row.find('.bar').css('background', '#1ac174');}

            else if(JobOrName(combatant) == 'Blm') //黑魔//
            {row.find('.bar').css('background', '#8361c1');}

            else if(JobOrName(combatant) == 'Whm') //白魔//
            {row.find('.bar').css('background', '#efedd0');
            row.find('.number').text(combatant.ENCHPS + '/' + combatant.ENCDPS + ' (' + combatant['damage'] + ', ' + combatant['damage%'] +')');}

            else if(JobOrName(combatant) == 'Sch') //学者//
            {row.find('.bar').css('background', '#1491d6');
            row.find('.number').text(combatant.ENCHPS + '/' + combatant.ENCDPS + ' (' + combatant['damage'] + ', ' + combatant['damage%'] +')');}

            else if(JobOrName(combatant) == 'Drk') //黑骑//
            {row.find('.bar').css('background', '#c29344');}

            else if(JobOrName(combatant) == 'Mch') //机工//
            {row.find('.bar').css('background', '#0bacd2');}

            else if(JobOrName(combatant) == 'Ast') //占星//
            {row.find('.bar').css('background', '#e8a874');
            row.find('.number').text(combatant.ENCHPS + '/' + combatant.ENCDPS + ' (' + combatant['damage'] + ', ' + combatant['damage%'] +')');}

            else if(JobOrName(combatant) == 'Mrd') //Marauder//
            {row.find('.bar').css('background', '#e61a16');}

            else if(JobOrName(combatant) == 'Gla') //Gladiator//
            {row.find('.bar').css('background', '#28c0b4');}

            else if(JobOrName(combatant) == 'Arc') //Archer//
            {row.find('.bar').css('background', '#c6d738');}

            else if(JobOrName(combatant) == 'Lnc') //Lancer//
            {row.find('.bar').css('background', '#5188e7');}

            else if(JobOrName(combatant) == 'Pgl') //Pugilist//
            {row.find('.bar').css('background', '#e6d033');}

            else if(JobOrName(combatant) == 'Rog') //Rogue//
            {row.find('.bar').css('background', '#ee2e48');}

            else if(JobOrName(combatant) == 'Acn') //Arcanist//
            {row.find('.bar').css('background', '#1ac174');
            row.find('.hps').text('HPS' + ' ' + combatant.enchps);}

            else if(JobOrName(combatant) == 'Thm') //Thaumaturge//
            {row.find('.bar').css('background', '#8361c1');}

            else if(JobOrName(combatant) == 'Cnj') //Conjurer//
            {row.find('.bar').css('background', '#efedd0');
            row.find('.number').text(combatant.ENCHPS + '/' + combatant.ENCDPS + ' (' + combatant['damage'] + ', ' + combatant['damage%'] +')');}

            else if(JobOrName(combatant) == 'Rdm') //赤魔//
            {row.find('.bar').css('background', '#da3a7d');}

            else if(JobOrName(combatant) == 'Sam') //武士//
            {row.find('.bar').css('background', '#f57819');}

            else if(JobOrName(combatant) == 'Alc') //Alchemist//
            {row.find('.bar').css('background', 'rgba(150,150,150,0.65)');}

            else if(JobOrName(combatant) == 'Arm') //Armorer//
            {row.find('.bar').css('background', 'rgba(150,150,150,0.65)');}

            else if(JobOrName(combatant) == 'Bsm') //Blacksmith//
            {row.find('.bar').css('background', 'rgba(150,150,150,0.65)');}

            else if(JobOrName(combatant) == 'Crp') //Carpenter//
            {row.find('.bar').css('background', 'rgba(150,150,150,0.65)');}

            else if(JobOrName(combatant) == 'Cul') //Culinarian//
            {row.find('.bar').css('background', 'rgba(150,150,150,0.65)');}

            else if(JobOrName(combatant) == 'Gsm') //Goldsmith//
            {row.find('.bar').css('background', 'rgba(150,150,150,0.65)');}

            else if(JobOrName(combatant) == 'Ltw') //Leatherworker//
            {row.find('.bar').css('background', 'rgba(150,150,150,0.65)');}

            else if(JobOrName(combatant) == 'Wvr') //Weaver//
            {row.find('.bar').css('background', 'rgba(150,150,150,0.65)');}

            else if(JobOrName(combatant) == 'Bot') //Botanist//
            {row.find('.bar').css('background', 'rgba(150,150,150,0.65)');}

            else if(JobOrName(combatant) == 'Fsh') //Fisher//
            {row.find('.bar').css('background', 'rgba(150,150,150,0.65)');}

            else if(JobOrName(combatant) == 'Min') //Miner//
            {row.find('.bar').css('background', 'rgba(150,150,150,0.65)');}

            else if(JobOrName(combatant) == 'CHO') //陆行鸟//
            {row.find('.bar').css('background', '#efe343');
            row.find('.hps').text('HPS' + ' ' + combatant.enchps);}

            else if(JobOrName(combatant) == 'Limit Break') //Limit Break//
            {row.css('display', 'none');}

            container.append(row);
        }
        
        $('#overlay').replaceWith(container);
    }

    $(document).on('onOverlayDataUpdate', function(e) {
        update(e.originalEvent);
    });

    window.addEventListener('message', function(e) {
    if (e.data.type === 'onOverlayDataUpdate') {
        update(e.data);
    }
});