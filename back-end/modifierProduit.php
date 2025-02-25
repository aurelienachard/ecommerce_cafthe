<?php
    include('database.php');
    session_start();

    $id = $_GET['id']; // recuperer id produit

    try {
        // recuperation produit
        $sql = $conn->prepare("SELECT * FROM produit WHERE produit_id = ?");
        $sql->execute([$id]);
        $produit = $sql->fetch(PDO::FETCH_ASSOC);

        // condition pour savoir si la requete est post
        if($_SERVER["REQUEST_METHOD"] == "POST") {
            // recuperation des valeurs dans les champs input
            $nom = htmlspecialchars(filter_input(INPUT_POST, 'nom'));
            $quantite = htmlspecialchars(filter_input(INPUT_POST, 'quantite')); 
            $categorie = htmlspecialchars(filter_input(INPUT_POST, 'categorie')); 
            $prix = htmlspecialchars(filter_input(INPUT_POST, 'prix')); 
            $description = htmlspecialchars(filter_input(INPUT_POST, 'description')); 

            // Mise à jour des informations du produit
            $sql = $conn->prepare("UPDATE produit SET produit_nom = ?, produit_quantite = ?, produit_categorie = ?, produit_prix = ?, produit_description = ? WHERE produit_id = ?");
            $sql->execute([$nom, $quantite, $categorie, $prix, $description, $id]);

            echo "<p>Produit mis à jour avec succès.</p>";
        }
    } catch(PDOException $e) {
        echo "<p>Erreur : " . htmlspecialchars($e->getMessage()) . "</p>";
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