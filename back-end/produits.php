<?php
    include('database.php');

    // selectionner les produits
    $sql = "select * from produit";
    // faire la requete avec la db
    $result = mysqli_query($conn, $sql);
    // on recupere les donnees
    $rows = mysqli_fetch_all($result, MYSQLI_ASSOC);
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" type="text/css" href="./style/style.css" />
    <title>Index</title>
</head>
<body>
    <h1>Produits</h1>

    <button><a href="ajoutProduit.php">Ajouter un nouveau produit</a></button>

    <h2>Liste des produits</h2>

    <div>
        <table>
            <tr>
                <th>produit_id</th>
                <th>produit_nom</th>
                <th>produit_quantite</th>
                <th>produit_categorie</th>
                <th>produit_prix</th>
                <th>produit_description</th>
            </tr>

            <?php 
                foreach ($rows as $produit): 
            ?>
                <tr>
                    <td><?php echo htmlspecialchars($produit['produit_id']); ?></td>
                    <td><?php echo htmlspecialchars($produit['produit_nom']); ?></td>
                    <td><?php echo htmlspecialchars($produit['produit_quantite']); ?></td>
                    <td><?php echo htmlspecialchars($produit['produit_categorie']); ?></td>
                    <td><?php echo htmlspecialchars($produit['produit_prix']); ?>$</td>
                    <td><?php echo htmlspecialchars($produit['produit_description']); ?></td>
                    <td><a href="modifierProduit.php?id=<?php echo $produit['produit_id']; ?>">Modifier produit</a></td>
                    <td><a href="supprimerProduit.php?id=<?php echo $produit['produit_id']; ?>">Supprimer produit</a></td>
                </tr>
            <?php
                endforeach;
            ?>
        </table>
    </div>
</body>
</html>