//CREATION MATRICE VIDE
function creationMatriceVide(matrice) {
    let nouvelleMatrice = [];
    for (let i = 0; i < matrice.length; i++) {
        nouvelleMatrice[i] = [];
        for (let j = 0; j < matrice[i].length; j++) {
            if (i === 0 || j === 0) {
                nouvelleMatrice[i][j] = matrice[i][j];
            } else {
                nouvelleMatrice[i][j] = -Infinity;
            }
        }
    }
    // Retourner la nouvelle matrice
    return nouvelleMatrice;
}

// CREATION DE LA MATRICE CARREE DE DIAGONALE INFINIE AVEC LA 1ere LIGNE ET COLONNE AVEC DES LETTRES DE L'ALPHABET
function creeMatrice(taille) {
    let matrice = [];
    for (let i = 0; i < taille + 1; i++) {
        let row = [];
        for (let j = 0; j < taille + 1; j++) {
            if (i === 0 && j === 0) {
                row.push('');
            } else if (i === 0 || j === 0) {
                let letter = String.fromCharCode(65 + Math.max(i, j) - 1); // ASCII 'A' est 65
                row.push(letter);
            } else if (i === j) {
                row.push(Infinity);
            } else {
                row.push(Math.floor(Math.random() * 9) + 1);
            }
        }
        matrice.push(row);
    }
    return matrice;
}

//AFFICHAGE DE LA MATRICE
function affichageMatrice(matrice) {
    console.table(matrice);
}

//TROUVER LE MINIMUM POUR UNE LIGNE
function minili(ligne, exclu) {
    let minimum = Infinity;
    for (let i = 1; i < ligne.length; i++) {
        if (i !== exclu && ligne[i] < minimum) {
            minimum = ligne[i];
        }
    }
    return minimum;
}

//TROUVER LE MINIMUMS POUR CHAQUE LIGNE DU MATRICE
function trouverMinimumLigne(matriceInitial) {
    const nbLignes = matriceInitial.length;
    const nbColonnes = matriceInitial[0].length;

    // Initialiser les tableaux pour stocker les minimums par ligne
    const minimumLigne = [];

    // Trouver le minimum par ligne
    for (let i = 1; i < nbLignes; i++) {
        let minForRow = Infinity;
        for (let j = 1; j < nbColonnes; j++) {
            // Trouver le minimum par ligne
            if (matriceInitial[i][j] < minForRow) {
                minForRow = matriceInitial[i][j];
            }
        }
        minimumLigne.push(minForRow);
    }

    return minimumLigne;
}

//SOUSTRAIRE CHAQUE LIGNE PAR SON MINIMUM
function soustraireMinili(matriceInitial, minLigne) {
    const nbLignes = matriceInitial.length;
    const nbColonnes = matriceInitial[0].length;

    // Trouver le minimum par ligne
    for (let i = 1; i < nbLignes; i++) {
        for (let j = 1; j < nbColonnes; j++) {
            matriceInitial[i][j] = matriceInitial[i][j] - minLigne[i - 1];
        }
    }

    return matriceInitial;
}

//TROUVER LE MINIMUM POUR UNE COLONNE
function minico(matrice, ligne, colonne) {
    let taille = matrice.length;
    let minimum = Infinity;
    for (let i = 1; i < taille; i++) {
        if (i !== ligne && matrice[i][colonne] < minimum) {
            minimum = matrice[i][colonne];
        }
    }
    return minimum;
}

//TROUVER LE MINIMUM POUR CHAQUE COLONNES
function trouverMinimumColonne(matriceSoustraitLigne) {
    const nbLignes = matriceSoustraitLigne.length;
    const nbColonnes = matriceSoustraitLigne[0].length;

    // Initialiser les tableaux pour stocker les minimums par colonne
    const minimumColonne = new Array(nbColonnes - 1).fill(Infinity);

    // Trouver le minimum par colonne
    for (let i = 1; i < nbLignes; i++) {
        for (let j = 1; j < nbColonnes; j++) {
            // Trouver le minimum par colonne
            if (matriceSoustraitLigne[i][j] < minimumColonne[j - 1]) {
                minimumColonne[j - 1] = matriceSoustraitLigne[i][j];
            }
        }
    }

    return minimumColonne;
}

//SOUSTRAIRE CHAQUE COLONNE PAR SON MINIMUM
function soustraireMinico(matriceSoustraitLigne, minCol) {
    const nbLignes = matriceSoustraitLigne.length;
    const nbColonnes = matriceSoustraitLigne[0].length;

    // Trouver le minimum par ligne
    for (let i = 1; i < nbLignes; i++) {
        for (let j = 1; j < nbColonnes; j++) {
            matriceSoustraitLigne[i][j] = matriceSoustraitLigne[i][j] - minCol[j - 1];
        }
    }

    return matriceSoustraitLigne;
}

//CALCUL REGRET
function calculeRegret(matriceSoustraitColonne) {
    let resultat = creationMatriceVide(matriceSoustraitColonne);
    let nbLignes = matriceSoustraitColonne.length;
    let nbColonnes = matriceSoustraitColonne[0].length;
    for (let i = 1; i < nbLignes; i++) {
        for (let j = 1; j < nbColonnes; j++) {
            if (matriceSoustraitColonne[i][j] == 0) {
                let minimumLigne = minili(matriceSoustraitColonne[i], j);
                let minimumColonne = minico(matriceSoustraitColonne, i, j);
                resultat[i][j] = minimumLigne + minimumColonne;
            }
        }
    }
    return resultat;
}

//CALCUL DE DU RACINE DE L'ARBRE ( SOMME(minili et minico))
function calculRacine(minili, minico) {
    let racine = 0;
    for (let i = 0; i < minili.length; i++) {
        racine = racine + (minili[i] + minico[i])
    }

    return racine;
}

//TROUVER LE MAXIMUM MINIMORUM ET SON EMPLACEMENT (LIGNE,COLONNE)
function trouverMaximumMinimorum(matriceRegret) {
    const nbLignes = matriceRegret.length;
    const nbColonnes = matriceRegret[0].length;
    let maximumMinimorumValue = -Infinity;
    let maximumMinimorumPosition = null;
    let ligne = null;
    let colonne = null;
    for (let i = 1; i < nbLignes; i++) {
        for (let j = 1; j < nbColonnes; j++) {
            if (matriceRegret[i][j] > maximumMinimorumValue) {
                maximumMinimorumValue = matriceRegret[i][j];
                ligne = matriceRegret[i][0];
                colonne = matriceRegret[0][j];
            }
        }
    }
    maximumMinimorumPosition = ligne + colonne;
    return { maximumMinimorumValue, maximumMinimorumPosition };
}

//EFFACER LA LIGNE ET LA COLONNE DU MAXIMUM MINIMORUM
function effacerMaximumMinimorum(matriceSoustraitColonne, maxminPosition) {
    const [ligne, colonne] = maxminPosition.split('');
    for (let j = 1; j < matriceSoustraitColonne[0].length; j++) {
        if (matriceSoustraitColonne[0][j] === colonne) {
            for (let i = 0; i < matriceSoustraitColonne.length; i++) {
                matriceSoustraitColonne[i].splice(j, 1);
            }
            break;
        }
    }

    for (let i = 1; i < matriceSoustraitColonne.length; i++) {
        if (matriceSoustraitColonne[i][0] === ligne) {
            matriceSoustraitColonne.splice(i, 1);
            break;
        }
    }

    return matriceSoustraitColonne;
}

//BLOQUER UN ARC {TRANSFORMER L'ARC EN INFINIE}
function bloquerArc(matriceSource, arcABloquer) {
    let [ligne, colonne] = arcABloquer.split('');
    const nbLignes = matriceSource.length;
    const nbColonnes = matriceSource[0].length;
    let indiceLigne = null;
    let indiceColonne = null;
    for (let j = 1; j < nbColonnes; j++) {
        if (matriceSource[0][j] === colonne) {
            indiceColonne = j
            break;
        }
    }
    for (let i = 1; i < nbLignes; i++) {
        if (matriceSource[i][0] === ligne) {
            indiceLigne = i;
            break;
        }
    }
    matriceSource[indiceLigne][indiceColonne] = Infinity;

    return matriceSource;
}

//VERIFIER L'EXISTANCE D'UN 0 PAR LIGNE ET PAR COLONNE
function verifierZeroLigneEtZeroColonne(matrice) {
    const nbLignes = matrice.length;
    const nbColonnes = matrice[0].length;

    // Vérifier chaque ligne
    for (let i = 1; i < nbLignes; i++) {
        let trouver = false;
        for (let j = 1; j < nbColonnes; j++) {
            if (matrice[i][j] === 0) {
                trouver = true;
                break;
            }
        }
        if (!trouver) {
            return false;
        }
    }

    // Vérifier chaque colonne
    for (let j = 1; j < nbColonnes; j++) {
        let trouver = false;
        for (let i = 1; i < nbLignes; i++) {
            if (matrice[i][j] === 0) {
                trouver = true;
                break;
            }
        }
        if (!trouver) {
            return false;
        }
    }

    return true;
}

//TROUVER ARC PARASITE {TRANSFORMER L'ARC PROVOQUANT UN CIRCUIT PARASITE EN INFINIE DANS LA MATRICE SOURCE PUIS RETOURNE CETTE MATRICE}
function trouverParasite(arcSolution, ancienParasite, noeud) {

    // Initialiser les degrés entrants et sortants de chaque nœud
    let arcsParasites = [];
    let parasiteSource = [];
    let parasiteDestination = [];
    let degrees = {};
    for (const node of noeud) {
        degrees[node] = { in: 0, out: 0 };
    }

    // Mettre à jour les degrés entrants et sortants
    for (const arc of arcSolution) {
        const [source, dest] = arc.split('');
        degrees[source].out++;
        degrees[dest].in++;
    }

    for (let noeud in degrees) {
        if (degrees.hasOwnProperty(noeud)) {
            // ---1---> A ---0--->
            if (degrees[noeud].in === 1 && degrees[noeud].out === 0) {
                parasiteSource.push(noeud);
            }
            // ---0---> A ---1--->
            if (degrees[noeud].in === 0 && degrees[noeud].out === 1) {
                parasiteDestination.push(noeud);
            }
        }
    }

    arcsParasites = arcParasitePossible(parasiteSource, parasiteDestination);

    for (const element of ancienParasite) {
        if (arcsParasites.includes(element)) {
            const [a, b] = element.split('');
            arcsParasites = arcsParasites.filter(item => !item.includes(a) && !item.includes(b));
        }
    }
    function arcParasitePossible(source, destination) {
        let possible = [];
        source.forEach(item1 => {
            destination.forEach(item2 => {
                possible.push(item1 + item2);
            });
        });

        return possible;
    }
    return arcsParasites[0];
}

//TRACER GRAPHE ARBORESCENCE
function tracerGrapheArbre(donnee) {
    let sommet = [];
    let arcarbre = [];
    let racineValue = donnee[0][0].valueSommet - donnee[0][0].valueArc;
    // Noeud racine
    var racine = { id: 'R', label: 'R = ' + racineValue };
    let racineTemporaire = null;
    sommet.push(racine);

    for (let i = 0; i < donnee.length; i++) {
        for (let j = 0; j < donnee[i].length; j++) {
            let elem = donnee[i][j];
            let node = { id: elem.arc, label: elem.arc + " = " + String(elem.valueSommet) };
            sommet.push(node);

            let edge = { from: racine.id, to: elem.arc, label: String(elem.valueArc) };

            if (elem.status) {
                racineTemporaire = node;
            }
            arcarbre.push(edge);
        }
        racine = racineTemporaire;
    }

    function getColor(node) {
        if (node.label.includes("NON")) {
            return "red";
        } else {
            return "green";
        }
    }

    //Proprieté des sommet
    for (let node of sommet) {
        //Défini la couleur des noeuds
        if (node.id != 'R') {
            node.color = {
                background: getColor(node)
            }
        }
        //Enlever le 'NON' et changer en barre au dessus des arcs
        if (node.label.includes("NON")) {
            node.label = node.label.replace('NON', '');
            node.label = node.label.replace(/^.{2}/gm, match => match + '\u0305');
        }
        //Changer le mot Infinity en son symbol
        if (node.label.includes("Infinity")) {
            node.label = node.label.replace('Infinity', '∞');
        }
    }

    // Parcours des arcs pour changer la valeur Infinity en son symbol
    for (let edge of arcarbre) {
        if (edge.label === 'Infinity') {
            edge.label = '∞';
        }
    }

    var container = document.getElementById("network");
    var data = {
        nodes: sommet,
        edges: arcarbre
    };
    var options = {
        layout: {
            hierarchical: {
                direction: 'UD', // Haut vers bas
                sortMethod: 'directed'
            }
        },
    };
    new vis.Network(container, data, options);
}

//TRACER GRAPHE CHEMIN
function tracerGrapheChemin(arcsSolution, valeursDesArcs, noeuds) {

    var edgesArray = [];

    arcsSolution.forEach(function (edge, index) {
        edgesArray.push({ from: edge[0], to: edge[1], label: String(valeursDesArcs[index]), arrows: "to" });
    });

    var nodesArray = noeuds.map(function (node) {
        return { id: node, label: node };
    });

    var graphData = {
        nodes: nodesArray,
        edges: edgesArray
    };

    var options = {
        layout: {
            hierarchical: false,
        },
        physics: {
            enabled: true,
        },
    };

    var container = document.getElementById('network1');
    new vis.Network(container, graphData, options);
}

//PRENDRE LES VALEURS DES ARCS DE LA SOLUTION DANS LA MATRICE INITIAL
function prendreValeursArcs(matriceInitial, solution) {
    let valeurs = [];
    solution.forEach(arc => {
        let source = matriceInitial[0].indexOf(arc[0]);
        let destination = matriceInitial[0].indexOf(arc[1]);
        let valeur = matriceInitial[source][destination];
        valeurs.push(valeur);
    });
    return valeurs;
}

function afficherMatriceSurHtml(matrice) {
    var conteneur = document.getElementById("afficheMatrice");
    var table = document.createElement("table");

    matrice.forEach(function (ligne) {
        let row = document.createElement("tr");
        ligne.forEach(function (cellData) {
            let cell = document.createElement("td");
            if (typeof cellData == "string") {
                cell.classList.add("LigneColonne");
            }
            if (cellData === Infinity) {
                cellData = '∞';
                cell.classList.add("valeurInfinie");
            }
            cell.textContent = cellData;
            row.appendChild(cell);
        });
        table.appendChild(row);
    });

    conteneur.appendChild(table);
}

////////////////////////////////////* *************************Résoudre Problèmes de voyageur de COMMERCE******************************* */\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
function main() {
    //Donnée Fonction CREERMATRICE {Donnée ALEATOIRE}
    let pvc = creeMatrice(4);
    //Donnée nisy BUG
    /*let pvc = [
        ['', 'A', 'B', 'C', 'D', 'E', 'F', 'G'],
        ['A', Infinity, 5, 5, 2, 3, 8, 2],
        ['B', 3, Infinity, 9, 5, 5, 2, 7],
        ['C', 4, 6, Infinity, 4, 4, 9, 6],
        ['D', 5, 6, 4, Infinity, 7, 5, 4],
        ['E', 2, 5, 4, 4, Infinity, 6, 9],
        ['F', 8, 5, 1, 6, 3, Infinity, 2],
        ['G', 4, 3, 5, 1, 2, 8, Infinity],
    ];*/
    /*let pvc = [
        ['', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'],
        ['A', Infinity, 1, 5, 9, 5, 1, 3, 6, 3, 3],
        ['B', 1, Infinity, 5, 1, 3, 7, 8, 2, 5, 8],
        ['C', 3, 5, Infinity, 1, 3, 5, 1, 5, 1, 1],
        ['D', 7, 8, 6, Infinity, 5, 5, 4, 7, 6, 6],
        ['E', 3, 2, 9, 5, Infinity, 1, 2, 9, 6, 8],
        ['F', 1, 2, 9, 6, 3, Infinity, 4, 7, 1, 1],
        ['G', 2, 5, 3, 6, 3, 7, Infinity, 7, 3, 1],
        ['H', 3, 8, 1, 6, 8, 5, 7, Infinity, 1, 3],
        ['I', 2, 4, 5, 2, 2, 8, 4, 3, Infinity, 2],
        ['J', 6, 3, 9, 5, 1, 3, 5, 2, 9, Infinity],
    ];*/

    //Donnée PVC Leçon
    /*let pvc = [
        ['', 'A', 'B', 'C', 'D', 'E', 'F'],
        ['A', Infinity, 6, 7, 3, 1, 3],
        ['B', 7, Infinity, 8, 2, 9, 7],
        ['C', 5, 10, Infinity, 10, 1, 7],
        ['D', 8, 6, 5, Infinity, 5, 1],
        ['E', 7, 7, 6, 7, Infinity, 4],
        ['F', 9, 8, 8, 5, 3, Infinity]
    ];*/

    //Donnée TD3
    /*let pvc = [
        ['', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
        ['A', Infinity, 2, Infinity, 8, Infinity, Infinity, 7, 5],
        ['B', 8, Infinity, 9, 4, Infinity, Infinity, Infinity, Infinity],
        ['C', Infinity, 3, Infinity, Infinity, 3, 7, Infinity, Infinity],
        ['D', Infinity, 3, 7, Infinity, 9, Infinity, Infinity, Infinity],
        ['E', Infinity, Infinity, 3, Infinity, Infinity, Infinity, Infinity, 4],
        ['F', 4, Infinity, Infinity, 6, 4, Infinity, 5, Infinity],
        ['G', Infinity, Infinity, 6, Infinity, Infinity, 2, Infinity, Infinity],
        ['H', Infinity, 4, Infinity, Infinity, Infinity, Infinity, 3, Infinity]
    ];*/

    let sommet = pvc[0].slice(1);
    affichageMatrice(pvc);
    let copiePVC = pvc.map(row => row.slice());
    let chemin = [];
    let arbre = [];
    let valeurs = [];
    let ancParasite = [];
    let sommeDesValeursSoustraites = 0;

    //BLOC 1
    let minimumLigne = trouverMinimumLigne(pvc);
    let resultatSoustraitMinimumLigne = soustraireMinili(pvc, minimumLigne);
    let minimumColonne = trouverMinimumColonne(resultatSoustraitMinimumLigne);
    let matriceDesCoutReduites = soustraireMinico(resultatSoustraitMinimumLigne, minimumColonne);
    let racine = calculRacine(minimumLigne, minimumColonne);

    do {
        let niveauArbre = [];
        let cheminChoisi = true;

        //BLOC 2
        let resultatRegret = calculeRegret(matriceDesCoutReduites);
        let { maximumMinimorumValue, maximumMinimorumPosition } = trouverMaximumMinimorum(resultatRegret);
        let copieMatriceDesCoutReduites = matriceDesCoutReduites.map(row => row.slice());
        chemin.push(maximumMinimorumPosition);

        //BLOC 3
        let arc = null;
        let nonArc = null;
        let arcParasite = null;

        if (!(matriceDesCoutReduites.length == 1 && matriceDesCoutReduites[0].length == 1)) {
            matriceDesCoutReduites = effacerMaximumMinimorum(matriceDesCoutReduites, maximumMinimorumPosition);
        }

        if (!(matriceDesCoutReduites.length <= 2 && matriceDesCoutReduites[0].length <= 2)) {
            arcParasite = trouverParasite(chemin, ancParasite, sommet);
            matriceDesCoutReduites = bloquerArc(matriceDesCoutReduites, arcParasite);
            ancParasite.push(arcParasite);
        }

        nonArc = racine + maximumMinimorumValue;

        if (verifierZeroLigneEtZeroColonne(matriceDesCoutReduites)) {
            arc = racine;
        } else {
            //BLOC 1
            let miniLiTest = trouverMinimumLigne(matriceDesCoutReduites);
            let resultatSoustraitMiniLiTest = soustraireMinili(matriceDesCoutReduites, miniLiTest);
            let minicoTest = trouverMinimumColonne(resultatSoustraitMiniLiTest);
            sommeDesValeursSoustraites = calculRacine(miniLiTest, minicoTest);
            arc = racine + sommeDesValeursSoustraites;

        }

        racine = arc;

        //BLOC 4
        if (nonArc < arc) {
            let copieMatriceDesCoutReduitesBloqueMaxMin = bloquerArc(copieMatriceDesCoutReduites, maximumMinimorumPosition);

            //BLOC 1
            let miniLiTest = trouverMinimumLigne(copieMatriceDesCoutReduitesBloqueMaxMin);
            let resultatSoustraitMiniLiTest = soustraireMinili(copieMatriceDesCoutReduitesBloqueMaxMin, miniLiTest);
            let minicoTest = trouverMinimumColonne(resultatSoustraitMiniLiTest);
            matriceDesCoutReduites = soustraireMinico(resultatSoustraitMiniLiTest, minicoTest);
            chemin.pop();
            ancParasite.pop();
            racine = nonArc;
            cheminChoisi = false;
        }

        niveauArbre.push({ arc: 'NON ' + maximumMinimorumPosition, status: !cheminChoisi, valueSommet: nonArc, valueArc: maximumMinimorumValue }, { arc: maximumMinimorumPosition, status: cheminChoisi, valueSommet: arc, valueArc: sommeDesValeursSoustraites });
        arbre.push(niveauArbre);
        sommeDesValeursSoustraites = 0;
    } while (!(matriceDesCoutReduites.length == 1 && matriceDesCoutReduites[0].length == 1));

    console.table("Solution : " + chemin);
    console.table("Arcs parasites : " + ancParasite);
    console.log("Le coût minimale de voyage est : " + racine);
    valeurs = prendreValeursArcs(copiePVC, chemin);
    afficherMatriceSurHtml(copiePVC);
    tracerGrapheChemin(chemin, valeurs, sommet);
    tracerGrapheArbre(arbre);

}
main();
