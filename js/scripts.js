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

