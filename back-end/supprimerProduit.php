<?php
    include('database.php');
    session_start();

    try { 
        $id = $_GET['id'];
        $sql = "delete from produit where produit_id = $id"; // requete de suppression
        $result = $conn->query($sql);

        // verification
        if ($result) {
            echo "<p>produit supprimer</p>";
        } else {
            echo "<p>produit non supprimer</p>";
        }
    } catch (Exception $e) {
        echo "<p>Erreur : " . $e->getMessage() . "</p>";
    }
?>
