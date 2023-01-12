// animation de linput
let inputBox = document.querySelector(".input-box"),
    searchIcon = document.querySelector(".icon"),
    closeIcon = document.querySelector(".close-icon");

searchIcon.addEventListener("click", () => inputBox.classList.add("open"));
closeIcon.addEventListener("click", () => inputBox.classList.remove("open"));

$(".popup").hide();

// on verifie la connexion
function verifierConnexion(){
    if(navigator.onLine){
        $('.params .tools .fa-wifi').css("color", "#4070f4");   
        $('.params .tools .fa-wifi').attr("title", "En ligne");   
    }
    else{
        $('.params .tools .fa-wifi').css("color", "red");   
        $('.params .tools .fa-wifi').attr("title", "Hors ligne");   
    }
}

// Pour fermer la zone de proposition
$('#proposition .propositionCloser').click(function (e) { 
    $(".propositionBackground").fadeOut(300);
});

setInterval(verifierConnexion, 30000);
verifierConnexion();


// pour afficher et masquer les parametres
$('.params .fa-gear').click(function (e) { 
    $('#reglageZone').slideToggle(1000);
});

// pour masquer et afficher la zone de proposition
$('.params .fa-user').click(function (e) { 
    $('.propositionBackground').fadeToggle();
});


// affichage de lhistorique
$('.historiqueToggler').click(function (e) { 
    $(".historiqueToggler").toggleClass("togglerZone-inactive");
    $('.historiqueTmp').toggle("slide");
});

// affichaged la zone de projet
$('.projetToggler').click(function (e) { 
    $(".projetToggler").toggleClass("togglerZone-inactive");    
    $('.project').toggle("slide");
});

//Pour Afficher le profil de l'utilisateur demander en fonction de son nom d'utilisateur
function afficherProfil(nom){
    $.ajax({
        type: "GET",
        url: "https://api.github.com/users/"+nom,
        dataType: "JSON",
        success: function (e) {
            //on recupere ses information a part ses projets
            $('.profil .image img').attr("src",e.avatar_url);
            $('.profil .name').text(e.login);
            $('.profil .bio span').text(e.bio);
            $('.profil .follow .followers').text(e.followers);
            $('.profil .follow .following').text(e.following);
            $('.profil .follow .public_repos').text(e.public_repos);

            // on recupere ses projets
            $.ajax({
                type: "GET",
                url: "https://api.github.com/users/"+nom+"/repos",
                dataType: "JSON",
                success: function (e1) {
                    $('.profil .project').text('');
                    for(let i=0;i<e1.length;i++){
                        if(i==6){
                            break;
                        }
                        $('.profil .project').append('<span><a target="_blank" class="allText" href="'+e1[i].html_url+'">'+e1[i].name+'</a></span>');
                    }
                }
            });

            //on archive dans l'historique avec un succes
            listHistorique(nom, true);

        },
        error: function(){
            //on archive dans l'historique avec une erreur
            listHistorique(nom, false);
            popup(nom+ " n'existe pas")
        }
    });

    // on ajoute a lhistorique le mot saisie en fonction du resultat de la requete
    function listHistorique(e, stat){
        let value;
        if(stat){
            value="historique-success";
        }
        else{
            value="historique-failed";
        }
        $('.historique ul').append("<li class='"+value+"'>"+e+"</li>");
    }
}
//on affiche un premiers utilisateurs par defauts
afficherProfil("Abbv75");


let inputVal=$('.input-text').val();
$('.input-text').change(function (e) { 
    inputVal=$('.input-text').val();
});

$('.search-btn').click(function (e) { 
    $('.input-text').trigger("focus");
    if(inputVal!=''){
        afficherProfil(inputVal);
    }
    return false;
});


//une fonction qui permet de proposer des utilisateurs a partir d'un tableau donner
function afficherUserProposition(){
    tab=["abbv75","sounkalo20","as"];

    for(let i=0;i<tab.length;i++){
        $.ajax({
            type: "GET",
            url: "https://api.github.com/users/"+tab[i],
            dataType: "JSON",
            success: function (response) {
                //on cree un composant qui contiendra les infos de l'utilisateur en fonction de l'index du tableau 
                let component='<div class="propositionCard '+ tab[i]+'">'+
                    '<div style="display: flex; justify-content: center;">'+
                        '<div class="userImage">'+
                            '<img src="'+response.avatar_url+'" alt="">'+
                        '</div>'+
                    '</div>'+
                    '<h3 align="center">'+response.login+'</h3>'+
                    '<div class="infoZone ">'+
                        '<p align="center">'+
                            '<span class="voirPlus"><i class="fa fa-arrow-right"></i></span>'+
                        '</p>'+
                    '</div>'+
                '</div>';

                $('.propositionMain').append(component);

                //on recupere les projets de l'utilisateur courant
                $.ajax({
                    type: "GET",
                    url: "https://api.github.com/users/"+tab[i]+"/repos",
                    dataType: "JSON",
                    success: function (response2) {
                        for(let j=0;j<response2.length;j++){
                            if(j==4){
                                break;
                            }
                            let component2='<div class="projectList">'+
                                '<span class="projetName">'+response2[j].name+'</span>'+
                                '<a class="projetIcone" target="_blank" href="'+response2[j].html_url+'"><i class="fab fa-github"></i></a>'+
                            '</div>';

                            $('.'+tab[i]+' .infoZone').prepend(component2);
                        }
                    }
                });

                //on ferme la div et on affiche les infos de l'utilisateur courant 
                $('.'+tab[i]+" .voirPlus").click(function (e) { 
                    afficherProfil(tab[i]);
                    $(".propositionBackground").fadeOut(300);
                });
            }
        });  
    }    
}
afficherUserProposition()



let backgroundcolor1=$("#backgroundColor1").val();
let backgroundcolor2=$("#backgroundColor2").val();
//background animation
$("#backgroundColor1").on("input", function () {
     backgroundcolor1=$("#backgroundColor1").val();
});
$("#backgroundColor2").on("input", function () {
     backgroundcolor2=$("#backgroundColor2").val();
});

$(".background input").on("input", function () {
    changeBackgroundColor();
});

let rotate1=0;
let rotate2=0;
let rotate3=0;

//gestion theme fond d'ecran
function changeBackgroundColor(){
    $(".backgroundColor1").css("background", backgroundcolor1);
    $(".backgroundColor2").css("background", backgroundcolor2);
    $("body").css("background", "linear-gradient(45deg,"+backgroundcolor1+" 40%, "+backgroundcolor2);
}

$(".backgroundReset").click(function (e) { 
    backgroundcolor1="rgba(171, 4, 171, 0.699)"
    backgroundcolor2="rgba(5, 5, 172, 0.722)"
    changeBackgroundColor();
    rotate1+=180;
    $(this).css("transform", "rotate("+rotate1+"deg)");
});


//change text color
function changeTextColor(value){
    $('.profil .image img').css("border-color",value)
    $('#title .image').css("border-color",value)
    $('.profil .name').css("color",value)
    $('.profil .bio b').css("color",value)
    $('.profil .project span').css("background",value)
    $(".textColor1").css("background", value);
}
function changeTextColor2(value){
    $('.allText').css("color",value)
    $(".textColor2").css("background", value);
}

let textColor1=$("#textColor1").val();
$("#textColor1").on("input", function () {
    textColor1=$("#textColor1").val();
    changeTextColor(textColor1)
});

let textColor2=$("#textColor2").val();
$("#textColor2").on("input", function () {
    textColor2=$("#textColor2").val();
    changeTextColor2(textColor2)
});

$(".textReset").click(function (e) { 
    rotate2+=180;
    $(this).css("transform", "rotate("+parseInt(rotate2)+"deg)");
    changeTextColor("purple")
    changeTextColor2("white")
});

//components color
function changeComposentColor1(value){
    $(".componantBackgroundColor").css("background", value);
    $(".componantIconColor i").css("color", value);
    $(".composantColor1").css("background", value);
}
function changeComposentColor2(value){
    $(".composantColor2").css("background", value);
    $(".allBackgroundColor").css("background", value);
}

let componantColor1=$("#composantColor1").val();
let componantColor2=$("#composantColor2").val();

$("#composantColor1").on("input", function () {
    componantColor1=$("#composantColor1").val()
    changeComposentColor1(componantColor1);
});

$("#composantColor2").on("input", function () {
    componantColor2=$("#composantColor2").val()
    changeComposentColor2(componantColor2);
});

$(".composantReset").click(function (e) { 
    rotate3+=180;
    $(this).css("transform", "rotate("+parseInt(rotate3)+"deg)");
    changeComposentColor2("rgba(255, 255, 255, 0.746)")
    changeComposentColor1("#4070f4")
});

function popup(text){
    $(".popup").slideDown(500);
    $(".popup").text(text);
    setTimeout(function(){
        $(".popup").slideUp(500);
    },3000);
}