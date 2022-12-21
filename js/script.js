// animation de linput
let inputBox = document.querySelector(".input-box"),
        searchIcon = document.querySelector(".icon"),
        closeIcon = document.querySelector(".close-icon");

searchIcon.addEventListener("click", () => inputBox.classList.add("open"));
closeIcon.addEventListener("click", () => inputBox.classList.remove("open"));

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

// pour afficher et masquer les parametres
$('.params .fa-gear').click(function (e) { 
    $('#reglageZone').slideToggle(1000);
});

// pour masquer et afficher la zone de proposition
$('.params .fa-user').click(function (e) { 
    $('.propositionBackground').fadeToggle();
});

// on verifie la connexion
setInterval(verifierConnexion, 30000);
verifierConnexion();

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

function afficherProfil(nom){
    $.ajax({
        type: "GET",
        url: "https://api.github.com/users/"+nom,
        dataType: "JSON",
        success: function (e) {
            
             $('.profil .image img').attr("src",e.avatar_url);
             $('.profil .name').text(e.login);
             $('.profil .bio span').text(e.bio);
             $('.profil .follow .followers').text(e.followers);
             $('.profil .follow .following').text(e.following);
             $('.profil .follow .public_repos').text(e.public_repos);

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
                        $('.profil .project').append('<span><a target="_blank" href="'+e1[i].html_url+'">'+e1[i].name+'</a></span>');
                    }
                }
            });
        }
    });
}

afficherProfil("Abbv75");

function afficherUserProposition(){
    tab=["abbv75","sounkalo20"];
    for(let i=0;i<tab.length;i++){
        $.ajax({
            type: "GET",
            url: "https://api.github.com/users/"+tab[i],
            dataType: "JSON",
            success: function (response) {
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
                $('.'+tab[i]+" .voirPlus").click(function (e) { 
                    afficherProfil(tab[i]);
                    $(".propositionBackground").fadeOut(300);
                });
            }
        });
        
    }

    
    
}
afficherUserProposition()

let inputVal=$('.input-text').val();
$('.input-text').change(function (e) { 
    inputVal=$('.input-text').val();
});

$('.search-btn').click(function (e) { 
    $('.historiqueTmp ul').append('<li>'+inputVal+'</li>');
    afficherProfil(inputVal);
    return false;
});