/************************************************************************************************************
*************************************************************************************************************
	Fichier de scripts Javascript pour l'ensemble du projet.

*************************************************************************************************************
*************************************************************************************************************/



/************************************************************************************************************
	1. Gestion des formulaires
*************************************************************************************************************/


/* 	Vérifie si le champs est rempli.
	@param field : input field
	@return boolean
*/
function isFilled(field){
	return !(field.value == null || field.value == "");
}

/* 	Marque un champs comme erronné
	@param field : input field
*/
function markError(field, msg){
	field.style.backgroundColor = "#fba";
	// TODO : Gérer message
}

/* 	Marque un champs comme valide
	@param field : input field
*/
function markValid(field){
	field.style.backgroundColor = "";
	// TODO : Retirer message
}

/*	Vérifie la validité d'un champs, et le marque selon le résultat
	@param field : input field
	@return boolean
*/
function verifField(field){
	msg = "Ce champs doit contenir au moins deux caractères.";

	if (field.value.length < 2 && isFilled(field)){
		markError(field, msg);
		field.testValid = false;
	}
	else {
		markValid(field);
		field.testValid = true;
	}
}

/*	Vérifie la validité d'un formulaire, et le marque les champs en fonction
	@param form : form
	@return boolean
*/
function verifForm(form)
{
	var formOk = true;
	var msg	=	"";
	// Si les deux champs ne sont pas remplis
	if(!isFilled(form.firstname) && !isFilled(form.lastname)) {
		formOk = false;
		msg	=	"Vous devez remplir au moins un des deux champs.";
	}
	else if(formOk){
		formOk = form.firstname.testValid && form.lastname.testValid;
	}

	return formOk;
}


function changePage(page){
	
	if(page < 1 || page > (dom_results.length-1)/3 + 1) return;
	var pagination = $(".pagination");
	// Déermine s'il faut ajuster les valeurs des pages :

	updatePagination(page);

	var result_offset =  (page-1)*3;
	res_div.empty();
/*	console.log(result_offset);
	console.log(dom_results.length);
*/	for(i=0; i < 3 && (result_offset < dom_results.length); ++i){
		res_div.append(dom_results[result_offset]);
		++result_offset;
	}


}

function updatePagination(page){
	var i;
  console.log(page);
	//Données :
	var pagination = $(".pagination");
	nbPages = Math.floor((dom_results.length-1)/3) + 1;
	if(pagination.children().length == 0)
	{
		initPagination();
		console.log('initPagination');
		return;
	}
	if(nbPages < 2) return;

	for(i=1; i <= $(".pagination li").length-2; ++i){
		if($(".pagination li")[i].textContent == page)
			break;
	}// i = page cliquée

  var offset = i-6; // Offset de décalage avec le mileu (case 6)
	var page_old = parseInt(pagination.children()[1].textContent); // Première page de la liste
	var new_page = 0;
	// Si le dernier chiffre de la liste à faire est > nbPages, ou si le premier est < 1, 
	// On ne décale pas les pages
	new_page = page_old + offset;

  if(page <= 6){
		new_page=1;
	} 
	else if (page >= nbPages-4){
		new_page	=	nbPages-9;
	}

	pagination.empty();
	if(page==1){
		pagination.append('<li><a>Prec</a></li>');
	}
	else 
		pagination.append('<li><a href="#result" onClick="changePage('+(page-1)+')">Prec</a></li>');
	
    for(j=0; j<10 && (j < nbPages); j++){
      pagination.append('<li><a href="#result" onClick="changePage('+(j+new_page)+')">'+(j+new_page)+'</a></li>');
    }

	if(page==nbPages){
		pagination.append('<li><a>Suiv</a></li>');	
	}
	else 
		pagination.append('<li><a href="#result" onClick="changePage('+(page+1)+')">Suiv</a></li>');			
}


function initPagination(){
	var pagination = $(".pagination");
	pagination.empty();
	nbPages = Math.floor((dom_results.length-1)/3) + 1;
	pagination.append('<li><a>Prec</a></li>');	
	for(i = 1; i <= nbPages && i <= 10; ++i){
		pagination.append('<li><a href="#result" onClick="changePage('+i+')">'+i+'</a></li>');
	}
	if(nbPages > 1)
		pagination.append('<li><a href="#result" onClick="changePage(2)">Suiv</a></li>');
	else 
		pagination.append('<li><a>Suiv</a></li>');
}
// Main functions : 
function init(){
	res_div = $(".result");
	dom_results = res_div.children();
	changePage(1);
}

init();