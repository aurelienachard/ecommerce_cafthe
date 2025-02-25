<?php
    include('database.php');
    session_start();

    $id = $_GET['id']; // recuperer id produit
    $sql = "delete from produit where produit_id = $id"; // requete de suppression
    $result = mysqli_query($conn, $sql); // faire la requete sql

    // verification
    if ($result) {
        echo "<p>produit supprimer</p>";
    } else {
        echo "<p>produit non supprimer</p>";
    }
?>
