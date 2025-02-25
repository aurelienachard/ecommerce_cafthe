<?php
    include('database.php');
    session_start();

    // condition pour savoir si la requete est post
    if($_SERVER["REQUEST_METHOD"] == "POST") {
        // recuperation des valeurs dans les champs input
        $nom = htmlspecialchars(filter_input(INPUT_POST, 'nom'));
        $quantite = htmlspecialchars(filter_input(INPUT_POST, 'quantite')); 
        $categorie = htmlspecialchars(filter_input(INPUT_POST, 'categorie')); 
        $prix = htmlspecialchars(filter_input(INPUT_POST, 'prix')); 
        $description = htmlspecialchars(filter_input(INPUT_POST, 'description')); 

        $sql = "insert into produit (produit_nom, produit_quantite, produit_categorie, produit_prix, produit_description) values ('$nom', '$quantite', '$categorie', '$prix', '$description')";
        $query = mysqli_query($conn, $sql);

            if($query) {
                echo "<p>produit ajouter</p>";
            } else {
                echo "<p>produit non ajouter</p>";
            }
        } else {
            echo "les champs sont obligatoires";
        }
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Modification produit</title>
</head>
<body>
    <div>
        <form method="POST" action="ajoutProduit.php">
            <div>
                <label for="nom">Nom</label>
                <input type="text" name="nom">
            </div>

            <div>
                <label for="nom">Quantite</label>
                <input type="text" name="quantite">
            </div>

            <div>
                <label for="nom">Categorie</label>
                <input type="text" name="categorie">
            </div>

            <div>
                <label for="nom">Prix</label>
                <input type="text" name="prix">
            </div>

            <div>
                <label for="nom">Description</label>
                <input type="text" name="description">
            </div>

            <input type="submit" value="ajouter valeur">
        </form>
    </div>
</body>
</html>