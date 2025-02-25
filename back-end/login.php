<?php
    include("database.php"); // importer le fichier 

    if($_SERVER["REQUEST_METHOD"] == "POST") {
        // on recupere les valeurs dans les champs
        $username = filter_input(INPUT_POST, 'username');
        $password = filter_input(INPUT_POST, 'password');

        // requete sql dans une variable
        $sql = "select * from utilisateurs where utilisateurs_nom = '$username' and utilisateurs_mot_de_passe = '$password'";        
        
        // on fait la requete dans la db
        $result = mysqli_query($conn, $sql);

        // verification des champs s'il ne sont pas vide3
        if(!isset($_POST['username'], $_POST['password'])) {
            exit('les champs sont vides');
        } else { 
            session_start(); // alors on demarre une session
            if (mysqli_num_rows($result) > 0) {
                
            }
        }
    } else {
        exit('connexion echoue');
    }
?>