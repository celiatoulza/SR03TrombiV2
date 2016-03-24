<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Bootstrap 3, from LayoutIt!</title>

    <meta name="description" content="Source code generated using layoutit.com">
    <meta name="author" content="LayoutIt!">

    <link href="css/bootstrap.min.css" rel="stylesheet">
    <link href="css/style.css" rel="stylesheet">

  </head>
  <body>

    <div class="container-fluid">
	<div class="row">
		<div class="col-md-12">
			<div class="row">
				<div class="col-md-2">
				</div>
				<div class="col-md-8">
					<div class="jumbotron well">
						<h2>
							Trombinoscope
						</h2>
						<p>
							This is a template for a simple marketing or informational website. It includes a large callout called the hero unit and three supporting pieces of content. Use it as a starting point to create something more unique.
						</p>
						<p>
							<a class="btn btn-primary btn-large" href="#">Learn more</a>
						</p>
					</div>
					<form name="search" class="form-inline" role="form" method="POST" onsubmit="return verifForm(this)">
						<div class="form-group">
							 
							<label for="nom">
								Nom
							</label>
							<input class="form-control" name="nom" id="nom" type="text" onblur="verifField(this)">
						</div>
						<div class="form-group">
							<label for="prenom">
								Prénom
							</label>
							<input class="form-control" name="prenom" id="prenom" type="text" onblur="verifField(this)">
						</div>
						<input type="submit" name="submit" class="btn btn-default" value="Rechercher">
					</form>
					<div class="row">

					<?php
						if(isset($_POST['submit'])){
							$url_bad_picture = "/~sr03p027/common/img/unnamed.png";

							$url = 'https://webapplis.utc.fr/Trombi_ws/mytrombi/result?nom=xx&prenom=xx';
							$ch = curl_init($url);
							curl_setopt($ch, CURLOPT_TIMEOUT, 5);
							curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 5);
							curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
							curl_setopt($ch, CURLOPT_NOBODY, true);

							$result = curl_exec($ch);
							curl_close($ch);
							if($result === FALSE) {
								echo 'Service inaccessible</br>';
								exit();	
							}

							$results = json_decode(file_get_contents("https://webapplis.utc.fr/Trombi_ws/mytrombi/result?nom=".$_POST['nom']."&prenom=".$_POST['prenom']));



							// echo '<pre>';
							// var_dump($tmp);
							// echo '</pre>';
							$ch = curl_init();
							curl_setopt($ch, CURLOPT_TIMEOUT, 5);
							curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 5);
							curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
							// curl_setopt($ch, CURLOPT_NOBODY, true);

							foreach ($results as $key => $result) {
								// $result->photo = '<img src="https://demeter.utc.fr/portal/pls/portal30/portal30.get_photo_utilisateur_mini?username='.$result->login.'">';
								$url_photo = "https://demeter.utc.fr/portal/pls/portal30/portal30.get_photo_utilisateur_mini?username=$result->login";

								// echo '<pre>';
								// var_dump($tmp);
								// echo '</pre>';
								$result->photo = $url_bad_picture;

								if($result->autorisation == 'O'){
									curl_setopt($ch, CURLOPT_URL, $url_photo);
									$tmp = curl_exec($ch);
									$content_type = curl_getinfo($ch, CURLINFO_CONTENT_TYPE);
									// echo $content_type;
									if($content_type == 'image/jpeg')		
										$result->photo = $url_photo;
								}
					?>
								<div class="col-md-4 col-xs-12 col-lg-3">
									<div class="thumbnail">
										<?php
											echo '<img alt="Bootstrap Thumbnail First" src="'.$result->photo.'">'
										?>
										<div class="caption">
											<h4>
												<?php
													echo $result->nom;
													//echo $result->prenom;
												?>
											</h4>
											<p>
												Texte										
											</p>
											<p>
												<?php

													echo '<a href="'.$result->mail.'">'.$result->mail.'</a>';

												?>
											</p>
										</div>
									</div>
								</div>
					<?php
							}
							curl_close($ch);
						}
					?>
					</div>							
					<ul class="pagination">
						<li>
							<a href="#">Prev</a>
						</li>
						<li>
							<a href="#">1</a>
						</li>
						<li>
							<a href="#">2</a>
						</li>
						<li>
							<a href="#">3</a>
						</li>
						<li>
							<a href="#">4</a>
						</li>
						<li>
							<a href="#">5</a>
						</li>
						<li>
							<a href="#">Next</a>
						</li>
					</ul>
				</div>
				<div class="col-md-2">
				</div>
			</div>
		</div>
	</div>
</div>

    <script src="js/jquery.min.js"></script>
    <script src="js/bootstrap.min.js"></script>
    <script src="js/scripts.js"></script>
  </body>
</html>