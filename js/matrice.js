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
                let ville = String.fromCharCode(65 + Math.max(i, j) - 1); // ASCII 'A' est 65
                row.push(ville);
            } else if (i === j) {
                row.push(Infinity);
            } else {
                let isInfinity = Math.random() < 0.3;
                (isInfinity) ? row.push(Infinity) : row.push(Math.floor(Math.random() * 9) + 1);
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
        let minimumPourUneLigne = Infinity;
        for (let j = 1; j < nbColonnes; j++) {
            // Trouver le minimum par ligne
            if (matriceInitial[i][j] < minimumPourUneLigne) {
                minimumPourUneLigne = matriceInitial[i][j];
            }
        }
        minimumLigne.push(minimumPourUneLigne);
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
    let minimumColonne = new Array(nbColonnes - 1).fill(Infinity);

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

//CALCUL DU RACINE DE L'ARBRE ( SOMME(minili et minico))
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
    let [ligne, colonne] = maxminPosition.split('');
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
    let valeurEntrerSortie = {};
    for (const node of noeud) {
        valeurEntrerSortie[node] = { in: 0, out: 0 };
    }

    // Mettre à jour les degrés entrants et sortants
    for (const arc of arcSolution) {
        const [source, dest] = arc.split('');
        valeurEntrerSortie[source].out++;
        valeurEntrerSortie[dest].in++;
    }

    for (let noeud in valeurEntrerSortie) {
        if (valeurEntrerSortie.hasOwnProperty(noeud)) {
            // ---1---> A ---0--->
            if (valeurEntrerSortie[noeud].in === 1 && valeurEntrerSortie[noeud].out === 0) {
                parasiteSource.push(noeud);
            }
            // ---0---> A ---1--->
            if (valeurEntrerSortie[noeud].in === 0 && valeurEntrerSortie[noeud].out === 1) {
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
function tracerGrapheArbre(donnee, id) {
    var container = document.getElementById(id);
    let sommet = [];
    let arcarbre = [];
    let racineValue = donnee[0][1].valueSommet - donnee[0][1].valueArc;
    // Noeud racine
    var racine = { id: 'R', label: 'R : ' + racineValue };
    let racineTemporaire = null;
    sommet.push(racine);

    for (let i = 0; i < donnee.length; i++) {
        for (let j = 0; j < donnee[i].length; j++) {
            let elem = donnee[i][j];
            let node = { id: elem.arc, label: elem.arc + " : " + String(elem.valueSommet) };
            sommet.push(node);

            let edge = { from: racine.id, to: elem.arc, label: String(elem.valueArc) };

            if (elem.status) {
                racineTemporaire = node;
            }
            arcarbre.push(edge);
        }
        racine = racineTemporaire;
    }

    //Proprieté des sommet
    for (let node of sommet) {
        //Défini la couleur des noeuds
        if (node.id != 'R') {
            node.color = {
                background: (node.label.includes("NON")) ? "red" : "green"
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
        edges: {
            length: 50,
        },
        nodes: {
            shape: "circle",
        }

    };
    new vis.Network(container, data, options);
}

//TRACER GRAPHE CHEMIN VIS JS
function tracerGrapheChemin(arcsSolution, valeursDesArcs, noeuds, id, parasite) {

    var edgesArray = [];

    arcsSolution.forEach(function (edge, index) {
        //edgesArray.push({ from: edge[0], to: edge[1] });
        edgesArray.push({ from: edge[0], to: edge[1], label: String(valeursDesArcs[index]), arrows: "to" });
    });

    if (parasite != null) {
        edgesArray.push({ from: parasite[0], to: parasite[1], label: 'Parasite', arrows: "to", color: { background: 'red' } });
    }

    var nodesArray = noeuds.map(function (node) {
        /*
         var size = new go.Size(width, height);
          size.height = size.width;
          var figure = 'Ellipse';
           return {key: node, text: node,figure: figure,size: size};
        */
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

    //myDiagram.model.nodeDataArray = nodeArray;
    // myDiagram.model.linkDataArray = edgesArray;
    var container = document.getElementById(id);
    new vis.Network(container, graphData, options);
}

//TRACER GRAPHE CHEMIN GO JS
function tracerGrapheCheminGo(solution, valeursDesArcs, noeuds, id, parasite) {
    let arcsSolution = solution.slice();
    arcsSolution.push(parasite);
    const goJS = go.GraphObject.make;

    var graphe = new go.Diagram(
        id,
        {
            initialAutoScale: go.AutoScale.UniformToFill,
            layout: goJS(go.CircularLayout),
        }
    );

    //Style des noeuds
    graphe.nodeTemplate = goJS(go.Node,
        'Spot',
        { locationSpot: go.Spot.Center },
        new go.Binding('text', 'text'),
        goJS(go.Shape,
            'Ellipse',
            {
                fill: 'lightgray',
                stroke: null,
                desiredSize: new go.Size(40, 40),
            },
            /*    new go.Binding('figure', 'figure'),
                new go.Binding('fill', 'fill'),
                new go.Binding('desiredSize', 'size')*/
        ),
        goJS(go.TextBlock, new go.Binding('text', 'text'))
    );

    //Style des liens
    graphe.linkTemplate = goJS(
        go.Link,
        { curve: go.Curve.Bezier, toShortLength: 1 },
        goJS(
            go.Shape,
            {
                strokeWidth: 1.5,
            },
            new go.Binding("stroke", "parasite", val => (val ? "red" : "black"))
        ),
        goJS(
            go.Shape,
            {
                toArrow: "Standard",
                scale: 1
            },
            new go.Binding("stroke", "parasite", val => (val ? "red" : "black"))
        ),
        goJS(
            go.TextBlock,
            new go.Binding("text", "text"),
            new go.Binding("stroke", "parasite", val => (val ? "red" : "black")),
            { segmentOffset: new go.Point(0, -15) }
        )
    );

    //Remplissage des noeuds et ARCS
    graphe.startTransaction('generateCircle');

    var nodesArray = noeuds.map(function (node) {
        return { key: node, text: node };

    });

    var edgesArray = [];
    arcsSolution.forEach(function (edge, index) {
        let valParasite = edge === parasite ? true : false;
        edgesArray.push({ from: edge[0], to: edge[1], text: valeursDesArcs[index], parasite: valParasite });
    });

    /*if (parasite != null) {
        edgesArray.push({ from: edge[0], to: edge[1] });
    }*/
    graphe.startTransaction('change Layout');
    var lay = graphe.layout;
    lay.aspectRatio = 1;
    lay.startAngle = -180;
    lay.sweepAngle = 360;
    lay.spacing = 60;
    lay.arrangement = go.CircularArrangement.ConstantDistance;
    lay.nodeDiameterFormula = go.CircularNodeDiameterFormula.Pythagorean;
    lay.direction = go.CircularDirection.Clockwise;
    lay.sorting = go.CircularSorting.Forwards;
    graphe.commitTransaction('change Layout');
    graphe.commitTransaction('generateCircle');

    //Afficher la graphe
    graphe.model = new go.GraphLinksModel(nodesArray, edgesArray);
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

////////////////////////////////////* *************************Résoudre Problèmes de voyageur de COMMERCE******************************* */\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
function main(pvc) {
    //Donnée Fonction CREERMATRICE {Donnée ALEATOIRE}
    //Donnée nisy BUG
    /*let pvc = [
        ['', 'A', 'B', 'C', 'D', 'E'],
        ['A', Infinity, 6, 4, 9, 6],
        ['B', Infinity, Infinity, Infinity, 7, 8],
        ['C', 6, Infinity, Infinity, 4, Infinity],
        ['D', 5, 4, 5, Infinity, 6],
        ['E', Infinity, Infinity, 6, 5, Infinity]
    ];*/
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
    let copiePVC = pvc.map(row => row.slice());
    let chemin = [];
    let arbre = [];
    let valeurs = [];
    let ancParasite = [];
    let sommeDesValeursSoustraites = 0;

    //BLOC 1
    let minimumLigne = trouverMinimumLigne(pvc);
    let resultatSoustraitMinimumLigne = soustraireMinili(pvc, minimumLigne);
    let soustraireMinimumLigne = resultatSoustraitMinimumLigne.map(row => row.slice());
    let minimumColonne = trouverMinimumColonne(resultatSoustraitMinimumLigne);
    let matriceDesCoutReduites = soustraireMinico(resultatSoustraitMinimumLigne, minimumColonne);
    let racine = calculRacine(minimumLigne, minimumColonne);
    affichageFirstStep(copiePVC, minimumLigne, minimumColonne, soustraireMinimumLigne, matriceDesCoutReduites, racine);
    let i = 0;

    do {
        let niveauArbre = [];
        let cheminChoisi = true;
        let matriceDesCoutReduitesCopie = matriceDesCoutReduites.map(row => row.slice());
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
            matriceDesCoutReduites = soustraireMinico(resultatSoustraitMiniLiTest, minicoTest);
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
        valeurs = prendreValeursArcs(copiePVC, chemin);
        affichageStepByStep(matriceDesCoutReduites, matriceDesCoutReduitesCopie, arcParasite, resultatRegret, maximumMinimorumPosition, chemin, valeurs, sommet, arbre, i);
        sommeDesValeursSoustraites = 0;
        i++;
    } while (!(matriceDesCoutReduites.length == 1 && matriceDesCoutReduites[0].length == 1));

    console.table("Solution : " + chemin);
    console.table("Arcs parasites : " + ancParasite);
    console.log("Le coût minimale de voyage est : " + racine);
    tracerGrapheChemin(chemin, valeurs, sommet, 'network');
    return { racine, chemin };
}
////////////////////////////////////* *************************************************************************************************** */\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

//CREER UNE TABLEAU HTML A PARTIR DU NOMBRE DE VILLE DONNER
function createTableauPvcHTML(nombreDeVille) {

    var table = $('<table></table>').addClass('table table-bordered');

    for (var i = 0; i < nombreDeVille + 1; i++) {
        var row = $('<tr></tr>');

        for (var j = 0; j < nombreDeVille + 1; j++) {
            var cell;
            if (i === 0 && j === 0) {
                cell = $('<th class="pt-3-half text-center"></th>');
            } else if (i === 0) {
                cell = $('<th class="pt-3-half text-center table-info"></th>').text(String.fromCharCode(65 + j - 1));
            } else if (j === 0) {
                cell = $('<th class="pt-3-half text-center table-info"></th>').text(String.fromCharCode(65 + i - 1));
            } else if (i === j) {
                cell = $('<td class="pt-3-half text-center table-danger"></td>').text('∞');
            } else {
                cell = $('<td class="pt-3-half text-center" contenteditable="true"></td>');
            }

            row.append(cell);
        }

        table.append(row);
    }

    return table;
}

//AFFICHER MATRICE INITIAL
function afficheMatriceInitialSurHTML(pvc) {
    let copiePVC = pvc.map(row => row.slice());
    var table = document.createElement("table");
    copiePVC.forEach(function (ligne, indiceLigne) {
        let row = document.createElement("tr");
        ligne.forEach(function (cellData, indiceColonne) {
            let cell = document.createElement("td");
            if (typeof cellData == "string") {
                cell.classList.add("LigneColonne");
            }
            if (indiceLigne === indiceColonne && indiceLigne != 0) {

                cell.classList.add("valeurInfinie");
            }
            if (cellData === Infinity) {
                //cellData = '∞';
                cellData = '';
                //cell.classList.add("valeurInfinie");
            }
            cell.textContent = cellData;
            row.appendChild(cell);
        });
        table.appendChild(row);
    });

    return table;
}

//AFFICHER MATRICE SOUSTRAIT LIGNE
function afficheMinimumParLigneSurHTML(pvc, min) {
    let copiePVC = pvc.map(row => row.slice());
    var table = document.createElement("table");
    const nbLignes = copiePVC.length;
    const nbColonnes = copiePVC[0].length;

    for (let i = 0; i < nbLignes; i++) {
        let row = document.createElement("tr");
        for (let j = 0; j < nbColonnes + 1; j++) {
            let cell = document.createElement("td");
            if (j === nbColonnes) {
                cell.classList.add("valeurRouge");
                cell.classList.add("LigneColonne")
                cell.textContent = i === 0 ? '' : min[i - 1];

            } else {
                if (typeof copiePVC[i][j] === "string") {
                    cell.classList.add("LigneColonne");
                }
                if (i === j && i != 0) {
                    copiePVC[i][j] = '';
                    cell.classList.add("valeurInfinie");
                }
                if (copiePVC[i][j] === Infinity) {
                    copiePVC[i][j] = '';
                }
                cell.textContent = copiePVC[i][j];
            }
            row.appendChild(cell);
        }
        table.appendChild(row);
    }
    return table;
}

//AFFICHER MATRICE SOUSTRAIT COLONNE
function afficheMinimumParColonneSurHTML(pvc, min) {
    let copiePVC = pvc.map(row => row.slice());
    var table = document.createElement("table");
    const nbLignes = copiePVC.length;
    const nbColonnes = copiePVC[0].length;

    for (let i = 0; i < nbLignes + 1; i++) {
        let row = document.createElement("tr");
        for (let j = 0; j < nbColonnes; j++) {
            let cell = document.createElement("td");
            if (i === nbLignes) {
                cell.classList.add("valeurRouge");
                cell.classList.add("LigneColonne");
                cell.textContent = j === 0 ? '' : min[j - 1];

            } else {
                if (typeof copiePVC[i][j] === "string") {
                    cell.classList.add("LigneColonne");
                }
                if (i === j && i != 0) {
                    copiePVC[i][j] = '';
                    cell.classList.add("valeurInfinie");
                }
                if (copiePVC[i][j] === Infinity) {
                    copiePVC[i][j] = '';
                }
                cell.textContent = copiePVC[i][j];
            }
            row.appendChild(cell);
        }
        table.appendChild(row);
    }
    return table;
}

//Afficher Matrice des Cout réduites sur HTML
function afficheCoutReduitesSurHTML(matrice) {
    let copieMatriceDesCoutReduites = matrice.map(row => row.slice());
    var table = document.createElement("table");

    copieMatriceDesCoutReduites.forEach(function (ligne) {
        let row = document.createElement("tr");
        ligne.forEach(function (cellData) {
            let cell = document.createElement("td");
            if (typeof cellData == "string") {
                cell.classList.add("LigneColonne");
            }
            if (cellData === Infinity) {
                cellData = '';
                cell.classList.add("valeurInfinie");
            }
            if (cellData === -Infinity) {
                cellData = '';
            }
            /*if (indiceLigne === sourceIndice && indiceColonne === destIndice) {
                cell.classList.add("parasite");
                cellData = '∞';
            }*/
            if (cellData === 0) {
                cell.classList.add("valeurRouge");
            }
            cell.textContent = cellData;
            row.appendChild(cell);
        });
        table.appendChild(row);
    });

    return table;
}

//Afficher Nouvelle Matrice des Cout réduites sur HTML
function afficheNouvelleCoutReduitesSurHTML(matrice) {
    let copieMatriceDesCoutReduites = matrice.map(row => row.slice());
    var table = document.createElement("table");
    copieMatriceDesCoutReduites.forEach(function (ligne, indiceLigne) {
        let row = document.createElement("tr");
        ligne.forEach(function (cellData, indiceColonne) {
            let cell = document.createElement("td");
            if (typeof cellData == "string") {
                cell.classList.add("LigneColonne");
            }
            if (cellData === Infinity) {
                cellData = '';
            }
            if (indiceLigne === indiceColonne && indiceLigne != 0) {
                cell.classList.add("valeurInfinie");
            }
            if (cellData === -Infinity) {
                cellData = '';
            }
            if (cellData === 0) {
                cell.classList.add("valeurRouge");
            }
            cell.textContent = cellData;
            row.appendChild(cell);
        });
        table.appendChild(row);
    });

    return table;
}

//Suppression du Maximum Minimorum sur HTML
function afficheSuppressionMaximumMinimorumSurHTML(matrice, parasite, maximumMinimorum) {
    let copieMatriceDesCoutReduites = matrice.map(row => row.slice());
    var table = document.createElement("table");
    let source, dest = null;
    let [sourceMax, destMax] = maximumMinimorum.split('');
    let destIndiceMax = copieMatriceDesCoutReduites[0].indexOf(destMax);
    if (!(parasite === null)) {
        [source, dest] = parasite.split('');
    }
    let destIndice = copieMatriceDesCoutReduites[0].indexOf(dest);
    copieMatriceDesCoutReduites.forEach(function (ligne, indiceLigne) {
        let row = document.createElement("tr");
        let sourceIndice = ligne[0] === source ? indiceLigne : null;
        let sourceIndiceMax = ligne[0] === sourceMax ? indiceLigne : null;
        ligne.forEach(function (cellData, indiceColonne) {
            let cell = document.createElement("td");
            if (typeof cellData == "string") {
                cell.classList.add("LigneColonne");
            }
            if (cellData === Infinity) {
                cellData = '';
                cell.classList.add("valeurInfinie");
            }
            if (cellData === -Infinity) {
                cellData = '';
            }
            if (indiceLigne === sourceIndice && indiceColonne === destIndice) {
                cell.classList.add("parasite");
                cellData = '∞';
            }
            if (cellData === 0) {
                cell.classList.add("valeurRouge");
            }
            if (indiceColonne === destIndiceMax || indiceLigne === sourceIndiceMax) {
                cell.classList.add("supprimerCellule");
            }
            cell.textContent = cellData;
            row.appendChild(cell);
        });
        table.appendChild(row);
    });

    return table;
}

//Afficher Regret sur HTML
function afficherRegretSurtHTML(matrice, maximumMinimorum) {
    let matriceCopie = matrice.map(row => row.slice());
    var table = document.createElement("table");
    let [source, dest] = maximumMinimorum.split('');
    let destIndice = matriceCopie[0].indexOf(dest);
    matriceCopie.forEach(function (ligne, indiceLigne) {
        let sourceIndice = ligne[0] === source ? indiceLigne : null;
        let row = document.createElement("tr");
        ligne.forEach(function (cellData, indiceColonne) {
            let cell = document.createElement("td");
            if (typeof cellData == "string") {
                cell.classList.add("LigneColonne");
            }
            if (cellData === Infinity) {
                cellData = '∞';
            }
            if (cellData === -Infinity) {
                cellData = '';
            }
            if (indiceLigne === sourceIndice && indiceColonne === destIndice) {
                cell.classList.add("maximumMinimorum");
            }
            if (!(indiceLigne === 0 || indiceColonne === 0)) {
                cell.classList.add("valeurRouge");
            }
            cell.textContent = cellData;
            row.appendChild(cell);
        });
        table.appendChild(row);
    });

    return table;
}

//AJOUTER UNE NOUVELLE VILLE {NOUVELLE LIGNE ET COLONNE } SUR LE TABLEAU HTML
function ajouterUneNouvelleVille(matricePvc) {
    const nbLignes = matricePvc.length;
    const nbColonnes = matricePvc[0].length;
    var table = $('<table></table>').addClass('table table-bordered');

    for (var i = 0; i < nbLignes + 1; i++) {
        var row = $('<tr></tr>');

        for (var j = 0; j < nbColonnes + 1; j++) {
            var cell;
            if (i === 0 && j === 0) {
                cell = $('<th class="pt-3-half text-center"></th>');
            } else if (i === 0) {
                let codeAsci = matricePvc[i][nbColonnes - 1].charCodeAt(0);
                cell = (j === nbColonnes) ? $('<th class="pt-3-half text-center table-info"></th>').text(String.fromCharCode(codeAsci + 1)) : $('<th class="pt-3-half text-center table-info"></th>').text(matricePvc[i][j]);
            } else if (j === 0) {
                let codeAsci = matricePvc[nbLignes - 1][j].charCodeAt(0);
                cell = (i === nbColonnes) ? $('<th class="pt-3-half text-center table-info"></th>').text(String.fromCharCode(codeAsci + 1)) : $('<th class="pt-3-half text-center table-info"></th>').text(matricePvc[i][j]);
            } else if (i === j) {
                cell = $('<td class="pt-3-half text-center table-danger"></td>').text('∞');
            } else {
                if (i === nbLignes || j === nbColonnes) {
                    cell = $('<td class="pt-3-half text-center" contenteditable="true"></td>');
                }
                else {
                    let text = (matricePvc[i][j] === Infinity) ? '' : matricePvc[i][j];
                    cell = $('<td class="pt-3-half text-center" contenteditable="true"></td>').text(text);
                }
            }

            row.append(cell);
        }

        table.append(row);
    }

    return table;
}

//SUPPRIMER UNE VILLE 
function supprimerVille(matrice, villeASupprimer) {
    let matricePvc = effacerMaximumMinimorum(matrice, villeASupprimer + villeASupprimer);
    const nbLignes = matricePvc.length;
    const nbColonnes = matricePvc[0].length;
    var table = $('<table></table>').addClass('table table-bordered');

    for (var i = 0; i < nbLignes; i++) {
        var row = $('<tr></tr>');

        for (var j = 0; j < nbColonnes; j++) {
            var cell;
            if (i === 0 && j === 0) {
                cell = $('<th class="pt-3-half text-center"></th>');
            } else if (i === 0) {
                cell = $('<th class="pt-3-half text-center table-info"></th>').text(matricePvc[i][j]);
            } else if (j === 0) {
                cell = $('<th class="pt-3-half text-center table-info"></th>').text(matricePvc[i][j]);
            } else if (i === j) {
                cell = $('<td class="pt-3-half text-center table-danger"></td>').text('∞');
            } else {
                let text = (matricePvc[i][j] === Infinity) ? '' : matricePvc[i][j];
                cell = $('<td class="pt-3-half text-center" contenteditable="true"></td>').text(text);
            }

            row.append(cell);
        }

        table.append(row);
    }

    return table;
}

//PRENDRE LES VALEURS DU TABLEAU HTML ET TRANSFORMER SOUS FORME DE MATRICE
function prendreValeurTableauHTML() {
    var matricepvc = [];
    $('#matricepvc table tr').each(function (indiceLigne, lignes) {
        var ligne = [];
        $(lignes).find('td,th').each(function (indiceColonne, cellule) {
            if (indiceLigne === 0 && indiceColonne === 0) {
                ligne.push('');
            } else if (indiceLigne === 0 || indiceColonne === 0) {
                let ville = $(cellule).text();
                ligne.push(ville);
            } else if (indiceLigne === indiceColonne) {
                ligne.push(Infinity);
            } else {
                let value = ($(cellule).text() === '') ? Infinity : parseInt($(cellule).text());
                ligne.push(value);
            }
        });
        matricepvc.push(ligne);
    });
    return matricepvc;
}

//REMPLIR LA LISTE DES VILLES A SUPPRIMER
function remplirListVille(tableauVille) {
    let selectVille = $("#listVille");
    selectVille.empty();
    $.each(tableauVille, function (index, ville) {
        selectVille.append($("<option></option>").attr("value", ville).text(ville));
    });
}
//AFFICHAGE FIRST STEP BY STEP
function affichageFirstStep(matriceInitial, miniLi, miniCo, soustraitLigne, soustraitColonne, racineValue) {
    // Création de la première colonne
    var col1 = $('<div>').addClass('col-md-3 col-sm-4').append(
        $('<center>').append(
            $('<div>').addClass('panel panel-default').append(
                $('<div>').addClass('panel-heading').text('Matrice Initial'),
                $('<div>').addClass('panel-body').attr('id', 'initial'),
                $('<br>')
            )
        )
    );
    // Création de la première colonne
    var col2 = $('<div>').addClass('col-md-3 col-sm-4').append(
        $('<center>').append(
            $('<div>').addClass('panel panel-default').append(
                $('<div>').addClass('panel-heading').text('Matrice Soustraite Ligne'),
                $('<div>').addClass('panel-body').attr('id', 'soustraitLigne'),
                $('<br>')
            )
        )
    );
    // Création de la première colonne
    var col3 = $('<div>').addClass('col-md-3 col-sm-4').append(
        $('<center>').append(
            $('<div>').addClass('panel panel-default').append(
                $('<div>').addClass('panel-heading').text('Matrice Soustraite Colonne'),
                $('<div>').addClass('panel-body').attr('id', 'soustraitColonne'),
                $('<br>')
            )
        )
    );
    // Création de la première colonne
    var col4 = $('<div>').addClass('col-md-3 col-sm-4').append(
        $('<center>').append(
            $('<div>').addClass('panel panel-default').append(
                $('<div>').addClass('panel-heading').text('Matrice des Couts réduites'),
                $('<div>').addClass('panel-body').attr('id', 'coutReduites'),
                $('<br>'),
                $('<div>').addClass('panel-footer').text('R = ' + racineValue)
            )
        )
    );


    // Création de la rangée // Classe pour centrer verticalement  : align-items-center
    var row = $('<div>').addClass('row').attr('id', 'row').append(col1, col2, col3, col4);
    $('#stepBystep').append(row, $('<br>'));
    var init = afficheMatriceInitialSurHTML(matriceInitial);
    var minimumParLigne = afficheMinimumParLigneSurHTML(matriceInitial, miniLi);
    var minimumParColonne = afficheMinimumParColonneSurHTML(soustraitLigne, miniCo);
    var cout = afficheNouvelleCoutReduitesSurHTML(soustraitColonne);

    $('#initial').append(init);
    $('#soustraitLigne').append(minimumParLigne);
    $('#soustraitColonne').append(minimumParColonne);
    $('#coutReduites').append(cout);
    row.hide().fadeIn(3000);
}

//AFFICHAGE STEP BY STEP
function affichageStepByStep(nouvelleMatriceDesCoutReduites, coutReduites, arcParasite, matriceRegret, arcMaximumMinimorum, arcSolution, valeurArc, noued, arbre, valID) {
    let cheminID = 'chemin' + valID.toString();
    let arbreID = 'arbre' + valID.toString();
    let coutReduitesID = 'matricesDesCoutsReduits' + valID.toString();
    let regretID = 'matricesDesRegrets' + valID.toString();
    arcParasite = arcParasite === null ? 'Aucune' : arcParasite;
    var descriptionR = $('<br><span>').text('Maximum Minimorum : ' + arcMaximumMinimorum);

    // Création de la première colonne
    var col1 = $('<div>').addClass('col-md-3 col-sm-4').append(
        $('<center>').append(
            $('<div>').addClass('panel panel-default').append(
                $('<div>').addClass('panel-heading').text('Matrice des coûts réduites'),
                $('<div>').addClass('panel-body').attr('id', coutReduitesID),
                $('<br><div>').addClass('panel-footer').text('Suppression de l\'arc : ' + arcMaximumMinimorum + '\n Bloquer l\'arc parasite : ' + arcParasite)
            )
        )
    );

    // Création de la deuxième colonne
    var col2 = $('<div>').addClass('col-md-3 col-sm-4').append(
        $('<center>').append(
            $('<div>').addClass('panel panel-default').append(
                $('<div>').addClass('panel-heading').text('Matrice des Regrets'),
                $('<div>').addClass('panel-body').attr('id', regretID),
                $('<br><div>').addClass('panel-footer').text('Nouvelle matrice des coûts réduites')
            )
        )
    );

    // Création des deux colonnes pour les graphiques
    var col3 = $('<div>').addClass('col-md-3 col-sm-4').append(
        $('<center>').append(
            $('<div>').addClass('panel panel-default').append(
                //$('<div>').addClass('panel-heading').text('Matrice des Regrets'),
                $('<div>').addClass('panel-body no-boder panel-vis-graph').attr('id', cheminID),
                $('<br><div>').addClass('panel-footer').text('Arc parasite : ' + arcParasite)
            )
        )
    );

    var col4 = $('<div>').addClass('col-md-3 col-sm-4 text-center no-boder panel-vis-graph').attr('id', arbreID);

    // Création de la rangée // Classe pour centrer verticalement  : align-items-center
    var row = $('<div>').addClass('row').attr('id', 'row').append(col1, col2, col3, col4);
    $('#stepBystep').append(row, $('<br>'));
    var matriceCoutReduites = afficheCoutReduitesSurHTML(coutReduites);
    var matriceSupprimerMaximumMinimorum = afficheSuppressionMaximumMinimorumSurHTML(coutReduites, arcParasite, arcMaximumMinimorum);
    var regret = afficherRegretSurtHTML(matriceRegret, arcMaximumMinimorum);
    var nouvelleMCR = afficheCoutReduitesSurHTML(nouvelleMatriceDesCoutReduites);
    $('#' + coutReduitesID).append(matriceCoutReduites);
    $('#' + coutReduitesID).append($('<br>'));
    $('#' + coutReduitesID).append(matriceSupprimerMaximumMinimorum);
    $('#' + regretID).append(regret);
    $('#' + regretID).append(descriptionR);
    $('#' + regretID).append(nouvelleMCR);
    tracerGrapheCheminGo(arcSolution, valeurArc, noued, cheminID, arcParasite);
    tracerGrapheArbre(arbre, arbreID);
    row.hide().slideDown(2000 * valID);
}

//JQUERY
$(document).ready(function () {
    $('#boutonControlePvc,#resoudrepvc, #stepBystep,.conteneur-graphe').hide();
    $('#creertab').click(function () {
        let tailleMatrice = parseInt($('#tailleMatricePvc').val());
        if (!isNaN(tailleMatrice) && tailleMatrice > 0) {
            let matricepvcTable = createTableauPvcHTML(tailleMatrice);
            $('#matricepvc').html(matricepvcTable);
            $('#tailleMatricePvc').val('');
            $('#boutonControlePvc,#resoudrepvc,#matricepvc').show();
            let matricePVC = prendreValeurTableauHTML();
            remplirListVille(matricePVC[0].slice(1));
            $('#creerPvc').hide();
        } else {
            alert('Veuillez entrer une taille de tableau valide.');
        }
    });

    //Résoudre le problème de Voyageur de commerce et affiche le  graphe associer
    $('#resoudrepvc').click(function () {
        $('#stepBystep').empty();
        let matricePVC = prendreValeurTableauHTML();
        let resultat = main(matricePVC);
        $("#coutMinimal").text(resultat.racine.toString());
        $('#stepBystep,.conteneur-graphe').show();
    });

    //Recréer une nouvelle tableau de donnée 
    $('#recreerPvc').click(function () {
        $('#boutonControlePvc,#resoudrepvc,#matricepvc,#stepBystep,.conteneur-graphe').hide();
        $("#coutMinimal").text(0);
        $('#creerPvc').show();
    });

    // Ajouter une Nouvelle ville
    $('#ajouterVille').click(function () {
        let matricePVC = prendreValeurTableauHTML();
        let matricepvcTable = ajouterUneNouvelleVille(matricePVC);
        $('#matricepvc').html(matricepvcTable);
        matricePVC = prendreValeurTableauHTML();
        remplirListVille(matricePVC[0].slice(1));
    });

    //Supprimer une ville donnée
    $('#supprimerVille').click(function () {
        let matricePVC = prendreValeurTableauHTML();
        if (matricePVC.length === 3) {
            alert("Vous ne pouvez plus supprimer une ville.")
        } else {
            var matricepvcTable = supprimerVille(matricePVC, $('#listVille').val());
            $('#matricepvc').html(matricepvcTable);
            matricePVC = prendreValeurTableauHTML();
            remplirListVille(matricePVC[0].slice(1));
        }

    });
});