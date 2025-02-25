<?php
    include('database.php');
    session_start();

    $id = $_GET['id']; // recuperer id produit
    $sql = "select * from produit where produit_id = $id"; // requete sql
    $result = mysqli_query($conn, $sql); // associer requete a la connexion a la db
    $produit = mysqli_fetch_assoc($result); // Récupérer une ligne de résultat sous la forme d'un tableau associatif

    // condition pour savoir si la requete est post
    if($_SERVER["REQUEST_METHOD"] == "POST") {
        // recuperation des valeurs dans les champs input
        $nom = htmlspecialchars(filter_input(INPUT_POST, 'nom'));
        $quantite = htmlspecialchars(filter_input(INPUT_POST, 'quantite')); 
        $categorie = htmlspecialchars(filter_input(INPUT_POST, 'categorie')); 
        $prix = htmlspecialchars(filter_input(INPUT_POST, 'prix')); 
        $description = htmlspecialchars(filter_input(INPUT_POST, 'description')); 

        $sql = "UPDATE produit SET produit_nom='$nom', produit_quantite='$quantite', produit_categorie='$categorie', produit_prix='$prix', produit_description='$description' WHERE produit_id = $id";
        $query = mysqli_query($conn, $sql);
        
        // verifier que le query est valide ou non
        if($query) {
            echo "<p>Produit mis à jour</p>";
        } else {
            echo "<p>Échec de la mise à jour du produit</p>";
        }
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
        <form method="POST" action="modifierProduit.php?id=<?php echo $id; ?>">
            <div>
                <label for="nom">Nom</label>
                <input type="text" name="nom" value="<?php echo htmlspecialchars($produit['produit_nom']); ?>">
            </div>

            <div>
                <label for="quantite">Quantite</label>
                <input type="text" name="quantite" value="<?php echo htmlspecialchars($produit['produit_quantite']); ?>">
            </div>

            <div>
                <label for="categorie">Categorie</label>
                <input type="text" name="categorie" value="<?php echo htmlspecialchars($produit['produit_categorie']); ?>">
            </div>

            <div>
                <label for="prix">Prix</label>
                <input type="text" name="prix" value="<?php echo htmlspecialchars($produit['produit_prix']); ?>">
            </div>

            <div>
                <label for="description">Description</label>
                <input type="text" name="description" value="<?php echo htmlspecialchars($produit['produit_description']); ?>">
            </div>

            <input type="submit" value="Mettre à jour">
        </form>
    </div>
</body>
</html>