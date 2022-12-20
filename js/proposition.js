// for close de proposition pop up
$('#proposition .propositionCloser').click(function (e) { 
    $(".propositionBackground").fadeOut(300);
});


$("#proposition .propositionCard").click(function (e) { 
    activePropositions(this)
});

// for set the focus on the selected proposition
function activePropositions(e){
    $("#proposition .propositionCard").removeClass('propositionCardActive')
    $("#proposition .propositionCard .infoZone").slideUp()
    $("#proposition .propositionCard").css('filter', 'blur(3px)');
    $(e).addClass("propositionCardActive");
    $(e).css('filter', 'blur(0px)');
    
    e.children().slideDown();
}