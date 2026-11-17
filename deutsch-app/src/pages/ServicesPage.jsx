import { useEffect, useMemo, useRef, useState } from 'react';
import { examMatrix, examOptions, examSourceLibrary, initialLearners, levelOptions, skillOptions } from '../data/siteData';

const questionCatalog = {
  reading: {
    A1: [
      { type: 'texte', passage: 'Lisa wohnt in Yaoundé. Sie geht jeden Tag zur Schule und lernt Deutsch mit ihren Freunden.', question: 'Wo wohnt Lisa?', answer: 'Lisa wohnt in Yaoundé.', explanation: 'Le texte dit clairement qu’elle vit à Yaoundé.' },
      { type: 'qcm', question: 'Was bedeutet „Freund“?', options: ['ami', 'maison', 'voiture', 'chien'], answer: 'ami', explanation: '„Freund“ signifie ami.' },
      { type: 'reponse', question: 'Vervollständige: Ich ___ Deutsch.', answer: 'spreche', explanation: 'Après „Ich“ on utilise la forme „spreche“.' },
      { type: 'texte', passage: 'Am Montag kauft Peter Brot und Milch im Supermarkt. Danach geht er nach Hause.', question: 'Was kauft Peter?', answer: 'Er kauft Brot und Milch.', explanation: 'Le texte indique exactement ce qu’il achète.' }
    ],
    A2: [
      { type: 'texte', passage: 'Am Wochenende fährt Nina mit ihrer Familie nach Douala. Sie besucht eine Ausstellung und spricht mit einer deutschen Freundin.', question: 'Wohin fährt Nina am Wochenende?', answer: 'Sie fährt nach Douala.', explanation: 'Le texte précise la destination.' },
      { type: 'reponse', question: 'Was ist das Gegenteil von „schnell“?', answer: 'langsam', explanation: 'Le contraire de schnell est langsam.' },
      { type: 'qcm', question: 'Welche Antwort passt?', options: ['Ich bin müde.', 'Ich bin Schule.', 'Ich bin gern.', 'Ich bin schnell.'], answer: 'Ich bin müde.', explanation: 'Cette phrase est grammaticalement correcte.' },
      { type: 'texte', passage: 'Nach der Arbeit geht David oft ins Café. Dort trinkt er Kaffee und liest eine Zeitung.', question: 'Was macht David nach der Arbeit?', answer: 'Er geht ins Café und liest eine Zeitung.', explanation: 'La réponse reprend les actions du texte.' }
    ],
    B1: [
      { type: 'texte', passage: 'Die Firma sucht eine neue Mitarbeiterin für das Marketing. Die Bewerber müssen gute Deutschkenntnisse haben und flexibel sein.', question: 'Welche Eigenschaft wird für die Stelle verlangt?', answer: 'Flexibilität.', explanation: 'Le texte dit que les candidats doivent être flexibles.' },
      { type: 'reponse', question: 'Formuliere die Bedeutung von „Verantwortung“ auf Französisch.', answer: 'responsabilité', explanation: 'Le mot allemand correspond à responsabilité.' },
      { type: 'qcm', question: 'Welches Wort passt am besten?', options: ['Rechnung', 'Buch', 'Zug', 'Lehrer'], answer: 'Rechnung', explanation: 'Dans un contexte de travail, Rechnung correspond à facture.' },
      { type: 'texte', passage: 'Wenn es regnet, nimmt Mira den Bus zur Arbeit. Sie kommt meistens zehn Minuten zu spät, aber heute war sie pünktlich.', question: 'Warum war Mira heute pünktlich?', answer: 'Weil sie heute pünktlich war.', explanation: 'Le texte donne la réponse explicitement.' }
    ],
    B2: [
      { type: 'texte', passage: 'Die Stadt plant eine neue Fahrradroute, weil viele Menschen auf das Auto verzichten wollen. Die Initiative soll die Umwelt und den Verkehr verbessern.', question: 'Warum wird die neue Route gebaut?', answer: 'Um Umwelt und Verkehr zu verbessern.', explanation: 'Le texte dit que l’objectif est d’améliorer l’environnement et la circulation.' },
      { type: 'qcm', question: 'Welche Aussage ist logisch?', options: ['Die Initiative ist für die Umwelt unerheblich.', 'Die Stadt möchte den Verkehr entlasten.', 'Die Menschen wollen mehr Autos kaufen.', 'Die Maßnahme ist nur für Touristen.'], answer: 'Die Stadt möchte den Verkehr entlasten.', explanation: 'La ville cherche à réduire le trafic.' },
      { type: 'reponse', question: 'Schreibe die Hauptidee in einem Satz.', answer: 'Die Stadt möchte mit einer neuen Fahrradroute Umwelt und Verkehr verbessern.', explanation: 'La réponse doit résumer l’idée centrale du texte.' },
      { type: 'texte', passage: 'Obwohl der Kurs schwierig war, entschied sich Anna, weiterzumachen. Sie wollte ihre Sprachkenntnisse vertiefen und bessere Chancen auf dem Arbeitsmarkt haben.', question: 'Warum blieb Anna im Kurs?', answer: 'Weil sie ihre Sprachkenntnisse verbessern wollte.', explanation: 'Le texte précise le but de son engagement.' }
    ],
    C1: [
      { type: 'texte', passage: 'Die digitale Transformation verändert nicht nur die Arbeitswelt, sondern auch die Art, wie Menschen miteinander kommunizieren. Viele Unternehmen investieren deshalb in digitale Kompetenzen, obwohl der Übergang für manche Mitarbeiterinnen und Mitarbeiter belastend ist.', question: 'Was ist das zentrale Problem der digitalen Transformation?', answer: 'Der Übergang ist für manche Mitarbeiter belastend.', explanation: 'Le texte insiste sur la difficulté du passage au numérique.' },
      { type: 'qcm', question: 'Welche Interpretation ist am passendsten?', options: ['Technologie verbessert die Zusammenarbeit immer ohne Folgen.', 'Die Transformation hat auch soziale und psychologische Auswirkungen.', 'Digitale Kompetenz ist nur für Studenten wichtig.', 'Die Arbeitswelt bleibt unverändert.'], answer: 'Die Transformation hat auch soziale und psychologische Auswirkungen.', explanation: 'Le texte montre que les impacts sont plus larges que purement techniques.' },
      { type: 'reponse', question: 'Fasse den Absatz in einem Satz zusammen.', answer: 'Digitale Transformation verändert Arbeit und Kommunikation und birgt trotz der Chancen auch Herausforderungen für viele Beschäftigte.', explanation: 'La réponse doit capter l’argument principal et les limites.' },
      { type: 'texte', passage: 'Trotz der wirtschaftlichen Stabilität warnen Experten vor einer falschen Sicherheit. Der demografische Wandel und die geopolitischen Spannungen könnten langfristige Risiken für Investoren verursachen.', question: 'Welche Gefahr wird beschrieben?', answer: 'Langfristige Risiken durch demografischen Wandel und geopolitische Spannungen.', explanation: 'Le texte souligne les risques à long terme, pas seulement la stabilité actuelle.' }
    ]
  },
  listening: {
    A1: [
      { type: 'listening', prompt: 'Ich heiße Sara und ich bin 19 Jahre alt. Ich wohne in Yaoundé und ich gehe in die Schule.', question: 'Wie alt ist Sara?', answer: 'Sara ist 19 Jahre alt.', explanation: 'La voix dit explicitement son âge.' },
      { type: 'listening', prompt: 'Heute Abend gehen wir mit Freunden ins Kino. Danach essen wir Pizza.', question: 'Was macht ihr nach dem Kino?', answer: 'Ihr esst Pizza.', explanation: 'La phrase précise que l’on mange de la pizza après le cinéma.' },
      { type: 'listening', prompt: 'Mein Vater arbeitet im Krankenhaus. Meine Mutter ist Lehrerin.', question: 'Was macht die Mutter?', answer: 'Sie ist Lehrerin.', explanation: 'Le texte précise la profession de la mère.' },
      { type: 'listening', prompt: 'Am Wochenende gehe ich gern spazieren und ich lese ein Buch.', question: 'Was machst du gern am Wochenende?', answer: 'Ich gehe spazieren und ich lese ein Buch.', explanation: 'Les deux activités sont bien citées.' }
    ],
    A2: [
      { type: 'listening', prompt: 'Ich stehe um sechs Uhr auf, frühstücke und fahre dann zur Arbeit. Nachmittags mache ich eine Pause und gehe später nach Hause.', question: 'Wann beginnt der Arbeitstag?', answer: 'Der Arbeitstag beginnt früh am Morgen.', explanation: 'L’extrait décrit le début de la journée.' },
      { type: 'listening', prompt: 'Wenn es regnet, nehme ich den Bus. Wenn es schön ist, gehe ich zu Fuß.', question: 'Wie reist du bei schönem Wetter?', answer: 'Ich gehe zu Fuß.', explanation: 'Le bon choix est la marche quand il fait beau.' },
      { type: 'listening', prompt: 'Ich habe heute viel gearbeitet, deshalb bin ich sehr müde.', question: 'Warum ist die Person müde?', answer: 'Weil sie heute viel gearbeitet hat.', explanation: 'La raison est explicitement citée.' },
      { type: 'listening', prompt: 'Meine Schwester kauft morgen im Supermarkt ein und kocht danach das Abendessen.', question: 'Was macht sie nach dem Einkaufen?', answer: 'Sie kocht das Abendessen.', explanation: 'La séquence est claire: achat puis cuisine.' }
    ],
    B1: [
      { type: 'listening', prompt: 'Die Firma bietet einen Praktikumsplatz an. Bewerber sollten gute Kommunikationsfähigkeiten haben und bereit sein, auch im Team zu arbeiten.', question: 'Welche Fähigkeit wird besonders gern gesehen?', answer: 'Gute Kommunikationsfähigkeiten.', explanation: 'La compétence recherchée est mentionnée dans l’annonce.' },
      { type: 'listening', prompt: 'Ich habe mich auf die Prüfung vorbereitet und ich glaube, ich kann heute gut bestehen.', question: 'Warum ist die Person optimistisch?', answer: 'Weil sie sich auf die Prüfung vorbereitet hat.', explanation: 'La préparation est la cause principale.' },
      { type: 'listening', prompt: 'Wenn man im Ausland arbeitet, muss man oft schnell lernen und sich an neue Kulturen anpassen.', question: 'Was muss man im Ausland lernen?', answer: 'Man muss sich an neue Kulturen anpassen und schnell lernen.', explanation: 'Le message décrit l’adaptation culturelle et l’apprentissage rapide.' },
      { type: 'listening', prompt: 'Meine Freundin hat heute die Nachricht bekommen, dass sie die Stelle bekommen hat.', question: 'Welche gute Nachricht hat sie erhalten?', answer: 'Sie hat die Stelle bekommen.', explanation: 'La bonne nouvelle est l’obtention du poste.' }
    ],
    B2: [
      { type: 'listening', prompt: 'Viele Studenten entscheiden sich für ein Auslandssemester, obwohl es finanziell und organisatorisch schwierig ist. Trotzdem sehen sie darin eine wertvolle Gelegenheit für persönliches Wachstum.', question: 'Warum nehmen viele Studenten die Herausforderung an?', answer: 'Weil sie persönliche Entwicklung und neue Erfahrungen suchen.', explanation: 'La valeur du programme est le développement personnel.' },
      { type: 'listening', prompt: 'Die Stadt will die öffentlichen Verkehrsmittel verbessern, weil die Fahrzeiten für Berufstätige zu lang sind.', question: 'Warum will die Stadt das System verbessern?', answer: 'Weil die Fahrzeiten für Berufstätige zu lang sind.', explanation: 'Le problème cité est la longueur des temps de trajet.' },
      { type: 'listening', prompt: 'Der Redner betonte, dass die Umweltpolitik nicht nur ökologisch, sondern auch wirtschaftlich sinnvoll ist.', question: 'Welche Idee wurde betont?', answer: 'Die Umweltpolitik ist auch wirtschaftlich sinnvoll.', explanation: 'L’orateur souligne le double aspect écologique et économique.' },
      { type: 'listening', prompt: 'Zwar war der Kurs langweilig, aber die Zusammenarbeit im Team hat die Motivation gesteigert.', question: 'Was hat die Motivation gesteigert?', answer: 'Die Zusammenarbeit im Team.', explanation: 'La cohésion d’équipe est la cause évoquée.' }
    ],
    C1: [
      { type: 'listening', prompt: 'Die Studie zeigt, dass kleinere Unternehmen im digitalen Zeitalter oft an Flexibilität gewinnen, obwohl sie Ressourcen und Fachkräfte begrenzt haben. Deshalb konzentrieren sie sich auf Nischenmärkte und innovative Lösungen.', question: 'Warum setzen kleine Unternehmen auf Nischenmärkte?', answer: 'Weil sie begrenzte Ressourcen haben und sich auf innovative Lösungen fokussieren.', explanation: 'Le texte explique le choix stratégique des niches.' },
      { type: 'listening', prompt: 'Der Leiter erklärte, dass eine nachhaltige Strategie nicht nur kurzfristige Gewinne betrachtet, sondern langfristige Risiken und gesellschaftliche Verantwortung einschließt.', question: 'Was bedeutet eine nachhaltige Strategie?', answer: 'Sie berücksichtigt langfristige Risiken und gesellschaftliche Verantwortung.', explanation: 'La définition est claire: vision long terme + responsabilité sociale.' },
      { type: 'listening', prompt: 'Viele Jugendliche berichten, dass sie unter Druck stehen, ständig online verfügbar zu sein. Das hat Auswirkungen auf ihre Konzentration und ihre psychische Gesundheit.', question: 'Welchen Effekt hat die ständige Verfügbarkeit online?', answer: 'Sie beeinflusst Konzentration und psychische Gesundheit.', explanation: 'L’impact psychologique est central dans l’extrait.' },
      { type: 'listening', prompt: 'Die neue Politik soll die soziale Mobilität erhöhen, aber sie erfordert zugleich eine bessere öffentliche Verwaltung und größere Investitionen in Bildung.', question: 'Was ist für die Umsetzung nötig?', answer: 'Bessere öffentliche Verwaltung und größere Investitionen in Bildung.', explanation: 'C’est la condition de mise en œuvre mentionnée.' }
    ]
  },
  writing: {
    A1: [
      { type: 'reponse', question: 'Schreibe zwei Sätze über deine Familie.', answer: 'Ich habe eine Familie. Meine Mutter ist freundlich und mein Vater arbeitet.', explanation: 'Une réponse simple et claire convient au niveau A1.' },
      { type: 'reponse', question: 'Schreibe einen Satz über deinen Tagesablauf.', answer: 'Ich stehe früh auf und gehe zur Schule.', explanation: 'La réponse structure le rythme de la journée.' },
      { type: 'reponse', question: 'Schreibe eine kurze Nachricht an einen Freund.', answer: 'Hallo, morgen gehen wir zusammen zum Park. Bis dann!', explanation: 'La phrase est courte, naturelle et cohérente.' },
      { type: 'reponse', question: 'Schreibe einen Satz über dein Lieblingsessen.', answer: 'Mein Lieblingsessen ist Reis mit Gemüse.', explanation: 'La réponse est claire et accessible.' }
    ],
    A2: [
      { type: 'reponse', question: 'Schreibe einen kurzen Text über dein Wochenende.', answer: 'Am Wochenende gehe ich mit meiner Familie spazieren und am Abend lese ich ein Buch.', explanation: 'La réponse montre une structure claire et des activités habituelles.' },
      { type: 'reponse', question: 'Beschreibe deinen Wohnort.', answer: 'Ich wohne in einer kleinen Stadt. Dort gibt es einen Markt und viele Geschäfte.', explanation: 'Le texte décrit le lieu de vie avec précision.' },
      { type: 'reponse', question: 'Schreibe einen Satz über deine Zukunft.', answer: 'In Zukunft möchte ich an der Universität studieren.', explanation: 'La phrase sur le futur est bien formulée.' },
      { type: 'reponse', question: 'Formuliere eine kurze Bitte.', answer: 'Können Sie mir bitte helfen?', explanation: 'La forme polie est adaptée et naturelle.' }
    ],
    B1: [
      { type: 'reponse', question: 'Schreibe eine E-Mail an deinen Lehrer über ein Problem in der Schule.', answer: 'Hallo Herr Müller, ich schreibe Ihnen, weil ich gestern den Kurs verpasst habe. Bitte sagen Sie mir, welche Aufgaben ich machen muss. Vielen Dank.', explanation: 'Une réponse cohérente avec une demande claire et une formule de politesse.' },
      { type: 'reponse', question: 'Schreibe einen kurzen Text über deine beruflichen Ziele.', answer: 'Ich möchte später im Bereich Marketing arbeiten, weil ich gern mit Menschen zusammenarbeite und kreative Ideen entwickle.', explanation: 'La réponse expose un objectif clair avec justification.' },
      { type: 'reponse', question: 'Beschreibe einen Vorteil des Online-Lernens.', answer: 'Online lernen ist praktisch, weil man flexibel lernen und an jedem Ort arbeiten kann.', explanation: 'La justification est claire et structurée.' },
      { type: 'reponse', question: 'Formuliere eine Meinung zu einem aktuellen Thema.', answer: 'Ich denke, dass mehr Menschen öffentliche Verkehrsmittel nutzen sollten, weil das die Umwelt entlastet.', explanation: 'La réponse contient une opinion et une justification.' }
    ],
    B2: [
      { type: 'reponse', question: 'Schreibe einen kurzen argumentative Text über die Vorteile von Fahrradfahren.', answer: 'Fahrradfahren ist eine gute Möglichkeit, die Umwelt zu schützen und die Gesundheit zu verbessern. Es reduziert den Autoverkehr und spart Geld.', explanation: 'La réponse présente une idée principale avec des arguments concrets.' },
      { type: 'reponse', question: 'Schreibe eine Stellungnahme zu einer neuen Stadtpolitik.', answer: 'Ich finde die neue Stadtpolitik sinnvoll, weil sie den öffentlichen Verkehr verbessert und die Lebensqualität der Bürger erhöht.', explanation: 'La réponse est argumentée et bien structurée.' },
      { type: 'reponse', question: 'Gib deine Meinung zu einem digitalen Problem in der Schule.', answer: 'Die Digitalisierung hat viele Vorteile, aber sie kann auch zu Ablenkung führen, wenn die Schüler nicht gut organisiert sind.', explanation: 'La réponse présente un point de vue équilibré.' },
      { type: 'reponse', question: 'Beschreibe eine Situation, in der du eine Entscheidung treffen musstest.', answer: 'Ich musste entscheiden, ob ich eine Stelle annehmen oder weiter studieren sollte. Ich habe mich für das Studium entschieden, weil ich langfristige Perspektiven wollte.', explanation: 'La réponse est cohérente et plutôt avancée.' }
    ],
    C1: [
      { type: 'reponse', question: 'Schreibe einen akademischen Absatz über die Rolle der Technologie in der Gesellschaft.', answer: 'Technologie hat das gesellschaftliche Leben tiefgreifend verändert, doch ihre Wirkung hängt von der Art des Einsatzes ab. Wenn sie verantwortungsvoll genutzt wird, kann sie soziale Innovation fördern; wenn nicht, verstärkt sie Ungleichheit und Überforderung.', explanation: 'Le niveau de langue est analytique et réflexif, propre au C1.' },
      { type: 'reponse', question: 'Formuliere eine argumentative Stellungnahme zu den Auswirkungen des sozialen Netzwerks.', answer: 'Soziale Netzwerke fördern Kommunikation und Austausch, aber sie können auch zu Oberflächlichkeit, Mangel an Konzentration und einem verstärkten Druck führen, ständig erreichbar zu sein.', explanation: 'Le texte est argumenté et nuancé.' },
      { type: 'reponse', question: 'Schreibe eine Analyse zur Bedeutung nachhaltiger Wirtschaft.', answer: 'Eine nachhaltige Wirtschaft ist nicht nur ein ökologisches Ziel, sondern auch eine langfristige Strategie für Stabilität, Innovation und gesellschaftliche Verantwortung.', explanation: 'La réponse montre une logique analytique avancée.' },
      { type: 'reponse', question: 'Schreibe einen kurzen Essay zum Thema Beruf und Identität.', answer: 'Die Arbeit beeinflusst nicht nur das wirtschaftliche Leben, sondern auch die persönliche Identität. Sie gibt Orientierung, schafft soziale Beziehungen und formt Selbstwertgefühl.', explanation: 'Très conforme au niveau C1, structure complexe et abstraite.' }
    ]
  },
  speaking: {
    A1: [
      { type: 'speaking', prompt: 'Stelle dich mit zwei Sätzen vor.', question: 'Sprich über dich selbst auf Deutsch.', answer: 'Ich heiße Anna und ich bin 18 Jahre alt. Ich komme aus Yaoundé.', explanation: 'La réponse est simple, naturelle et bien structurée.' },
      { type: 'speaking', prompt: 'Beschreibe deine tägliche Routine.', question: 'Was machst du morgens?', answer: 'Ich stehe früh auf, frühstücke und gehe dann zur Schule.', explanation: 'La routine est clairement exprimée.' },
      { type: 'speaking', prompt: 'Erzähl von deiner Familie.', question: 'Wer wohnt bei dir?', answer: 'Bei mir wohnen meine Eltern und meine zwei Geschwister.', explanation: 'La réponse décrit le foyer avec simplicité.' },
      { type: 'speaking', prompt: 'Sage, was du gern machst.', question: 'Was machst du gern am Wochenende?', answer: 'Ich gehe gern mit Freunden spazieren und ich höre Musik.', explanation: 'La réponse donne deux activités typiques.' }
    ],
    A2: [
      { type: 'speaking', prompt: 'Beschreibe dein Zuhause.', question: 'Wie sieht dein Zuhause aus?', answer: 'Ich wohne in einem kleinen Haus mit drei Zimmern. Es gibt einen Garten und eine Küche.', explanation: 'La description est claire et cohérente.' },
      { type: 'speaking', prompt: 'Erzähl über einen wichtigen Tag.', question: 'Was hast du letzte Woche gemacht?', answer: 'Letzte Woche hatte ich eine wichtige Prüfung, aber ich habe mich vorbereitet und ich war zufrieden.', explanation: 'Le discours est narratif et précis.' },
      { type: 'speaking', prompt: 'Warum lernst du Deutsch?', question: 'Warum möchtest du Deutsch lernen?', answer: 'Ich möchte Deutsch lernen, weil ich für Arbeit und Reisen in Deutschland besser vorbereitet sein will.', explanation: 'Le but motivé est explicite.' },
      { type: 'speaking', prompt: 'Sprich über deine Zukunft.', question: 'Was möchtest du in Zukunft machen?', answer: 'In Zukunft möchte ich Informatiker werden und im Ausland arbeiten.', explanation: 'La réponse formule un objectif de carrière.' }
    ],
    B1: [
      { type: 'speaking', prompt: 'Erkläre, warum du eine bestimmte Entscheidung getroffen hast.', question: 'Warum hast du dich für dein Studium entschieden?', answer: 'Ich habe mich für mein Studium entschieden, weil ich beruflich in einem Bereich arbeiten möchte, der sowohl kreativ als auch praktisch ist.', explanation: 'La réponse met en avant une décision fondée sur un projet professionnel.' },
      { type: 'speaking', prompt: 'Sprich über einen Vorteil der digitalen Welt.', question: 'Was sind die Vorteile des Internets?', answer: 'Das Internet hilft uns, schnell Informationen zu finden, mit anderen Menschen zu kommunizieren und zu lernen.', explanation: 'La réponse est complète et adaptée au niveau B1.' },
      { type: 'speaking', prompt: 'Erzähl von einer schwierigen Erfahrung.', question: 'Was war eine schwierige Situation in deinem Leben?', answer: 'Vor einem Jahr hatte ich einen schwierigen Moment, weil ich meine Arbeit verloren hatte, aber ich habe mich schnell neu orientiert.', explanation: 'La réponse montre un récit structuré et un apprentissage.' },
      { type: 'speaking', prompt: 'Mache eine kurze Bewertung.', question: 'Was hältst du von Online-Lernen?', answer: 'Online lernen ist flexibel und praktisch, aber man braucht Disziplin, um konzentriert zu bleiben.', explanation: 'C’est une opinion équilibrée avec nuance.' }
    ],
    B2: [
      { type: 'speaking', prompt: 'Erkläre eine gesellschaftliche Entwicklung.', question: 'Wie beeinflusst die Digitalisierung unsere Gesellschaft?', answer: 'Die Digitalisierung verändert die Arbeitswelt, die Kommunikation und den Zugang zu Informationen. Sie schafft Chancen, aber sie fordert auch neue Kompetenzen und Verantwortung.', explanation: 'La réponse montre une analyse nuancée de la transformation numérique.' },
      { type: 'speaking', prompt: 'Sprich über eine persönliche Meinung zu Umweltpolitik.', question: 'Was ist deine Meinung zu nachhaltiger Politik?', answer: 'Ich finde nachhaltige Politik notwendig, weil wir die Umwelt schützen und zugleich die Lebensqualität für zukünftige Generationen sichern müssen.', explanation: 'La réponse qui présente un point de vue argumenté et prospectif.' },
      { type: 'speaking', prompt: 'Erzähle von einer Entscheidung mit Folgen.', question: 'Hast du einmal eine wichtige Entscheidung getroffen?', answer: 'Ja, ich habe mich entschieden, ein Praktikum in einer anderen Stadt zu machen, weil ich neue Erfahrungen sammeln und meine Karriere entwickeln wollte.', explanation: 'Le discours est structuré et montre une réflexion professionnelle.' },
      { type: 'speaking', prompt: 'Nimm Stellung zu einem aktuellen Thema.', question: 'Was denkst du über Fernarbeit?', answer: 'Fernarbeit ist für viele Menschen praktisch, weil sie Zeit spart und flexibel ist. Gleichzeitig kann sie die Zusammenarbeit und die Motivation beeinträchtigen.', explanation: 'Le niveau B2 est atteint grâce à une opinion nuancée.' }
    ],
    C1: [
      { type: 'speaking', prompt: 'Diskutiere die Auswirkungen von künstlicher Intelligenz auf die Gesellschaft.', question: 'Wie wirkt sich KI auf Arbeit und Bildung aus?', answer: 'Künstliche Intelligenz kann die Produktivität erhöhen und innovative Lernmethoden ermöglichen, aber sie wirft auch Fragen zur Verantwortung, Ethik und sozialen Gerechtigkeit auf.', explanation: 'La réponse est analytique, équilibrée et adaptée au niveau C1.' },
      { type: 'speaking', prompt: 'Stelle eine kritische Perspektive dar.', question: 'Ist ein Leben ohne digitale Medien heute noch denkbar?', answer: 'Ein Leben ohne digitale Medien ist heute kaum noch vorstellbar, weil sie nahezu alle Bereiche des täglichen Lebens beeinflussen. Dennoch ist ein bewusster Umgang mit Technologie entscheidend, um Überforderung zu vermeiden.', explanation: 'La proposition montre une réflexion critique et nuancée.' },
      { type: 'speaking', prompt: 'Sprich über langfristige Herausforderungen.', question: 'Was sind die größten Herausforderungen unserer Zeit?', answer: 'Die größten Herausforderungen sind der Klimawandel, die soziale Ungleichheit und die schnelle technologische Entwicklung, die sowohl Chancen als auch Risiken mit sich bringt.', explanation: 'L’argumentaire est abstrait, systémique et bien structuré.' },
      { type: 'speaking', prompt: 'Formuliere eine Meinung zu der Rolle der Bildung.', question: 'Welche Rolle spielt Bildung für die Zukunft?', answer: 'Bildung ist die Grundlage für individuelle Freiheit, gesellschaftliche Entwicklung und wirtschaftliche Stabilität. Ohne hochwertige Bildung bleiben innovation und soziale Mobilität begrenzt.', explanation: 'La réponse est poussée, abstraite et argumentée.' }
    ]
  }
};

const examProfileMap = {
  reading: { A1: 'Goethe', A2: 'ÖSD', B1: 'TELC', B2: 'Goethe', C1: 'ECL' },
  listening: { A1: 'TELC', A2: 'Goethe', B1: 'ÖSD', B2: 'TELC', C1: 'ECL' },
  writing: { A1: 'Goethe', A2: 'ÖSD', B1: 'TELC', B2: 'ECL', C1: 'Goethe' },
  speaking: { A1: 'Goethe', A2: 'TELC', B1: 'ÖSD', B2: 'ECL', C1: 'TELC' }
};

const examContextMap = {
  Goethe: {
    A1: 'Présentation personnelle',
    A2: 'Vie quotidienne',
    B1: 'Contexte professionnel',
    B2: 'Débat citoyen',
    C1: 'Analyse critique'
  },
  TELC: {
    A1: 'Informations simples',
    A2: 'Routines et loisirs',
    B1: 'Travail et communication',
    B2: 'Société et culture',
    C1: 'Argumentation avancée'
  },
  ÖSD: {
    A1: 'Formules de base',
    A2: 'Activités du quotidien',
    B1: 'Mise en situation pratique',
    B2: 'Texte argumenté',
    C1: 'Synthèse complexe'
  },
  ECL: {
    A1: 'Compréhension immédiate',
    A2: 'Contexte personnel',
    B1: 'Apprentissage et emploi',
    B2: 'Médiations sociales',
    C1: 'Pensée critique'
  }
};

const buildExercises = () => {
  const result = [];

  skillOptions.forEach((skill) => {
    levelOptions.forEach((level) => {
      const levelQuestions = questionCatalog[skill.id]?.[level] || [];

      levelQuestions.forEach((exercise, index) => {
        const exam = examProfileMap[skill.id]?.[level] || 'Goethe';

        result.push({
          id: `${skill.id}-${level}-${index}`,
          skill: skill.id,
          label: skill.label,
          level,
          exam,
          examContext: examContextMap[exam]?.[level] || 'Contexte de préparation',
          difficulty: exercise.difficulty ?? (level === 'A1' ? 1 : level === 'A2' ? 2 : level === 'B1' ? 3 : level === 'B2' ? 4 : 5),
          ...exercise
        });
      });
    });
  });

  return result;
};

export default function ServicesPage({ language = 'fr' }) {
  const isGerman = language === 'de';
  const [selectedSkill, setSelectedSkill] = useState('reading');
  const [selectedLevel, setSelectedLevel] = useState('A1');
  const [selectedExam, setSelectedExam] = useState('All');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [answer, setAnswer] = useState('');
  const [showReview, setShowReview] = useState(false);
  const [currentFeedback, setCurrentFeedback] = useState(null);
  const [sessionResults, setSessionResults] = useState([]);
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);

  const exercises = useMemo(() => buildExercises(), []);

  const filteredExercises = useMemo(
    () => exercises.filter((exercise) => exercise.skill === selectedSkill && exercise.level === selectedLevel && (selectedExam === 'All' || exercise.exam === selectedExam)),
    [exercises, selectedExam, selectedLevel, selectedSkill]
  );

  const currentExercise = filteredExercises[currentIndex] || null;
  const totalAvailable = filteredExercises.length;
  const progress = totalAvailable ? Math.round((currentIndex / totalAvailable) * 100) : 0;
  const successRate = sessionResults.length ? Math.round((sessionResults.filter((result) => result.isCorrect).length / sessionResults.length) * 100) : 0;

  useEffect(() => {
    const SpeechRecognitionCtor = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognitionCtor) {
      return undefined;
    }

    const recognition = new SpeechRecognitionCtor();
    recognition.lang = 'de-DE';
    recognition.interimResults = true;
    recognition.continuous = false;

    recognition.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0]?.transcript ?? '')
        .join(' ')
        .trim();

      setAnswer(transcript);
    };

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognitionRef.current = recognition;

    return () => {
      recognition.stop();
    };
  }, []);

  const toggleVoiceCapture = () => {
    if (!recognitionRef.current) {
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
      return;
    }

    try {
      recognitionRef.current.start();
      setIsListening(true);
    } catch (error) {
      setIsListening(false);
    }
  };

  const stopWords = new Set([
    'ich', 'du', 'er', 'sie', 'es', 'wir', 'ihr', 'sie', 'der', 'die', 'das', 'und', 'oder', 'aber', 'dass',
    'weil', 'wenn', 'dann', 'mit', 'nach', 'vor', 'für', 'aus', 'auf', 'im', 'am', 'in', 'zu', 'von', 'bei',
    'als', 'war', 'ist', 'sind', 'hat', 'haben', 'hatte', 'wird', 'werden', 'muss', 'kann', 'möchte', 'will',
    'gibt', 'mehr', 'einer', 'eine', 'einen', 'keine', 'keiner', 'auch', 'doch', 'nicht', 'nur', 'sehr'
  ]);

  const normalizeFreeAnswer = (value) => String(value ?? '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[.,;!?()\[\]{}"'`]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  const evaluateFreeAnswer = (userAnswer, expectedAnswer) => {
    const user = normalizeFreeAnswer(userAnswer);
    const expected = normalizeFreeAnswer(expectedAnswer);

    if (!user || !expected) return false;
    if (user === expected) return true;
    if (user.includes(expected) || expected.includes(user)) return true;

    const userWords = user.split(' ').filter(Boolean);
    const expectedWords = expected.split(' ').filter(Boolean);
    const expectedKeyWords = expectedWords.filter((word) => !stopWords.has(word) && word.length > 2);

    if (expectedKeyWords.length > 0) {
      const overlap = expectedKeyWords.filter((word) => userWords.includes(word)).length;
      const threshold = Math.max(1, Math.ceil(expectedKeyWords.length * 0.6));

      if (overlap >= threshold) {
        return true;
      }

      const lastMeaningfulChunk = expectedKeyWords.slice(-3).join(' ');
      if (lastMeaningfulChunk && user.includes(lastMeaningfulChunk)) {
        return true;
      }
    }

    return false;
  };

  const normalize = (value) => String(value ?? '').trim().toLowerCase();

  const resetPractice = () => {
    setCurrentIndex(0);
    setCorrectAnswers(0);
    setCompleted(false);
    setAnswer('');
    setShowReview(false);
    setCurrentFeedback(null);
    setSessionResults([]);
  };

  const handleSkillChange = (skillId) => {
    setSelectedSkill(skillId);
    setCurrentIndex(0);
    setCorrectAnswers(0);
    setCompleted(false);
    setAnswer('');
    setShowReview(false);
    setCurrentFeedback(null);
    setSessionResults([]);
  };

  const handleLevelChange = (level) => {
    setSelectedLevel(level);
    setCurrentIndex(0);
    setCorrectAnswers(0);
    setCompleted(false);
    setAnswer('');
    setShowReview(false);
    setCurrentFeedback(null);
    setSessionResults([]);
  };

  const handleExamChange = (exam) => {
    setSelectedExam(exam);
    setCurrentIndex(0);
    setCorrectAnswers(0);
    setCompleted(false);
    setAnswer('');
    setShowReview(false);
    setCurrentFeedback(null);
    setSessionResults([]);
  };

  const playPrompt = () => {
    if (!currentExercise || !('speechSynthesis' in window)) return;

    const text = currentExercise.prompt || currentExercise.question || '';
    if (!text) return;

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'de-DE';
    window.speechSynthesis.speak(utterance);
  };

  const handleAnswerSubmit = (selectedValue) => {
    if (!currentExercise || showReview) return;

    const answerToCheck = selectedValue ?? answer;
    const trimmedAnswer = String(answerToCheck ?? '').trim();

    if (!trimmedAnswer) return;

    const isCorrect =
      currentExercise.type === 'qcm'
        ? normalize(answerToCheck) === normalize(currentExercise.answer)
        : evaluateFreeAnswer(answerToCheck, currentExercise.answer);

    const feedback = {
      id: `${currentExercise.id}-${Date.now()}`,
      question: currentExercise.question || currentExercise.task || currentExercise.prompt,
      userAnswer: trimmedAnswer,
      expectedAnswer: String(currentExercise.answer).trim(),
      explanation: currentExercise.explanation || 'La correction montre la bonne formulation et la logique attendue.',
      isCorrect,
      skill: currentExercise.label,
      level: currentExercise.level
    };

    setCurrentFeedback(feedback);
    setSessionResults((prev) => [...prev, feedback]);

    if (isCorrect) {
      setCorrectAnswers((prev) => prev + 1);
    }

    setShowReview(true);
  };

  const advanceExercise = () => {
    if (currentIndex < totalAvailable - 1) {
      setCurrentIndex((prev) => prev + 1);
      setAnswer('');
      setCurrentFeedback(null);
      setShowReview(false);
      return;
    }

    setCompleted(true);
    setCurrentFeedback(null);
    setShowReview(false);
  };

  const visibleSources = selectedExam === 'All' ? examSourceLibrary.official : examSourceLibrary.official.filter((source) => source.exam === selectedExam);
  const learners = initialLearners.slice(0, 4);

  return (
    <main className="page-shell exercise-page-shell">
      <div className="container exercise-shell">
        <section className="exercise-focus-panel reveal">
          <div className="exercise-title-block">
            <span className="eyebrow">Deutsch-AllApp</span>
            <h1>{isGerman ? 'Préparation ciblée aux examens' : 'Prüfungsvorbereitung'}</h1>
            <p className="exercise-helper-text">
              {isGerman
                ? 'Choisis un examen, un niveau et une compétence pour commencer immédiatement.'
                : 'Wähle eine Prüfung, ein Niveau und eine Kompetenz, um sofort zu starten.'}
            </p>
          </div>

          <div className="compact-filter-row">
            <div className="selector-block compact-selector">
              <span>{isGerman ? 'Prüfung' : 'Examen'}</span>
              <div className="chip-grid">
                {examOptions.map((exam) => (
                  <button
                    key={exam}
                    type="button"
                    className={selectedExam === exam ? 'chip active' : 'chip'}
                    onClick={() => handleExamChange(exam)}
                  >
                    {exam}
                  </button>
                ))}
              </div>
            </div>

            <div className="selector-block compact-selector">
              <span>{isGerman ? 'Compétence' : 'Kompetenz'}</span>
              <div className="chip-grid">
                {skillOptions.map((skill) => (
                  <button
                    key={skill.id}
                    type="button"
                    className={selectedSkill === skill.id ? 'chip active' : 'chip'}
                    onClick={() => handleSkillChange(skill.id)}
                  >
                    <span>{skill.icon}</span>
                    {skill.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="selector-block compact-selector">
              <span>{isGerman ? 'Niveau' : 'Niveau'}</span>
              <div className="chip-grid level-grid">
                {levelOptions.map((level) => (
                  <button
                    key={level}
                    type="button"
                    className={selectedLevel === level ? 'chip active' : 'chip'}
                    onClick={() => handleLevelChange(level)}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="compact-source-strip">
            {visibleSources.slice(0, 2).map((source) => (
              <div key={`${source.exam}-${source.role}`} className="source-mini-card">
                <span>{source.exam}</span>
                <strong>{source.role}</strong>
                <a href={source.url} target="_blank" rel="noreferrer">{isGerman ? 'Ouvrir' : 'Open'}</a>
              </div>
            ))}
          </div>
        </section>

        <div className="exercise-workspace single-column">
          <div className="exercise-main-panel reveal">
            <div className="scoreboard reveal">
              <div>
                <span>{isGerman ? 'Fortschritt' : 'Progression'}</span>
                <strong>{progress}%</strong>
              </div>
              <div>
                <span>{isGerman ? 'Questions' : 'Fragen'}</span>
                <strong>{Math.min(currentIndex + 1, totalAvailable)}/{totalAvailable}</strong>
              </div>
              <div>
                <span>{isGerman ? 'Réussites' : 'Richtig'}</span>
                <strong>{correctAnswers}</strong>
              </div>
              <div>
                <span>{isGerman ? 'Taux' : 'Quote'}</span>
                <strong>{successRate}%</strong>
              </div>
            </div>

            {!completed && currentExercise && !showReview ? (
              <div className="exercise-practice reveal">
                <div className="exercise-header-practice">
                  <span>{currentExercise.level}</span>
                  <span>{currentExercise.exam}</span>
                  <span>{currentExercise.label}</span>
                </div>

                <div className="task-meta">
                  <span>{isGerman ? 'Examen' : 'Prüfung'} : {currentExercise.exam}</span>
                  <span>{isGerman ? 'Contexte' : 'Kontext'} : {currentExercise.examContext}</span>
                  <span>{isGerman ? 'Niveau' : 'Niveau'} : {currentExercise.level}</span>
                  <span>{isGerman ? 'Difficulté' : 'Schwierigkeit'} : {currentExercise.difficulty}/5</span>
                </div>

                {currentExercise.type === 'listening' && (
                  <div className="answer-block">
                    <div className="oral-panel">
                      <button type="button" className="secondary-btn" onClick={playPrompt}>
                        {isGerman ? 'Écouter la consigne' : 'Aufgabe anhören'}
                      </button>
                      <p>{currentExercise.prompt}</p>
                    </div>
                    <h3>{currentExercise.question}</h3>
                    <textarea value={answer} onChange={(event) => setAnswer(event.target.value)} placeholder={isGerman ? 'Réponds en allemand...' : 'Antworte auf Deutsch...'} rows="4" />
                    <button type="button" className="primary-btn" onClick={() => handleAnswerSubmit()}>
                      {isGerman ? 'Valider la réponse' : 'Antwort prüfen'}
                    </button>
                  </div>
                )}

                {currentExercise.type === 'speaking' && (
                  <div className="answer-block">
                    <div className="oral-panel">
                      <button
                        type="button"
                        className={isListening ? 'secondary-btn microphone-button is-listening' : 'secondary-btn microphone-button'}
                        onClick={toggleVoiceCapture}
                        aria-pressed={isListening}
                      >
                        <span className="microphone-icon">🎙️</span>
                        {isListening ? (isGerman ? 'Enregistrement...' : 'Aufnahme...') : (isGerman ? 'Parler avec ma voix' : 'Mit meiner Stimme sprechen')}
                      </button>
                      <p>{currentExercise.prompt || currentExercise.question}</p>
                    </div>
                    <textarea value={answer} onChange={(event) => setAnswer(event.target.value)} placeholder={isGerman ? 'Votre réponse orale...' : 'Deine Antwort...'} rows="4" />
                    <button type="button" className="primary-btn" onClick={() => handleAnswerSubmit()}>
                      {isGerman ? 'Soumettre la réponse' : 'Antwort senden'}
                    </button>
                  </div>
                )}

                {currentExercise.type === 'qcm' && (
                  <>
                    <h3>{currentExercise.question}</h3>
                    <div className="option-list">
                      {currentExercise.options.map((option) => (
                        <button key={option} type="button" className="option-btn" onClick={() => handleAnswerSubmit(option)}>
                          {option}
                        </button>
                      ))}
                    </div>
                  </>
                )}

                {(currentExercise.type === 'reponse' || currentExercise.type === 'texte') && (
                  <div className="answer-block">
                    {currentExercise.type === 'texte' && <div className="reading-box">{currentExercise.passage}</div>}
                    <h3>{currentExercise.question}</h3>
                    <textarea value={answer} onChange={(event) => setAnswer(event.target.value)} placeholder={isGerman ? 'Réponds en allemand...' : 'Auf Deutsch antworten...'} rows="4" />
                    <button type="button" className="primary-btn" onClick={() => handleAnswerSubmit()}>
                      {isGerman ? 'Valider la réponse' : 'Antwort prüfen'}
                    </button>
                  </div>
                )}
              </div>
            ) : null}

            {showReview && currentFeedback && !completed && (
              <div className="exercise-feedback reveal">
                <div className={`feedback-badge ${currentFeedback.isCorrect ? 'success' : 'warning'}`}>
                  {currentFeedback.isCorrect ? (isGerman ? 'Bonne réponse' : 'Richtig') : (isGerman ? 'À revoir' : 'Noch üben')}
                </div>

                <div className="feedback-grid">
                  <div>
                    <span>{isGerman ? 'Votre réponse' : 'Deine Antwort'}</span>
                    <strong>{currentFeedback.userAnswer}</strong>
                  </div>
                  <div>
                    <span>{isGerman ? 'Réponse attendue' : 'Erwartete Antwort'}</span>
                    <strong>{currentFeedback.expectedAnswer}</strong>
                  </div>
                </div>

                <div className="feedback-copy">
                  <p>
                    <strong>{isGerman ? 'Le point clé' : 'Kernpunkt'} :</strong> {currentFeedback.explanation}
                  </p>
                  <p>
                    <strong>{isGerman ? 'Correction' : 'Korrektur'} :</strong> {currentFeedback.expectedAnswer}.
                  </p>
                </div>

                <button type="button" className="primary-btn" onClick={advanceExercise}>
                  {currentIndex < totalAvailable - 1 ? (isGerman ? 'Question suivante' : 'Nächste Frage') : (isGerman ? 'Voir le score final' : 'Endergebnis anzeigen')}
                </button>
              </div>
            )}

            {!completed && !showReview && !currentExercise && (
              <div className="exercise-practice final-state reveal">
                <h3>{isGerman ? 'Aucun exercice disponible' : 'Keine Übung verfügbar'}</h3>
                <button type="button" className="primary-btn" onClick={resetPractice}>{isGerman ? 'Réinitialiser' : 'Zurücksetzen'}</button>
              </div>
            )}

            {completed && (
              <div className="exercise-practice reveal final-state">
                <h3>{isGerman ? 'Score final' : 'Gesamtpunktzahl'}</h3>
                <div className="final-summary">
                  <div>
                    <span>{isGerman ? 'Réponses justes' : 'Richtige Antworten'}</span>
                    <strong>{correctAnswers}/{totalAvailable}</strong>
                  </div>
                  <div>
                    <span>{isGerman ? 'Taux de réussite' : 'Erfolgsquote'}</span>
                    <strong>{successRate}%</strong>
                  </div>
                </div>

                <div className="review-list">
                  {sessionResults.map((result, index) => (
                    <div key={result.id} className="review-item">
                      <div className="review-item-head">
                        <span>{isGerman ? 'Exercice' : 'Übung'} {index + 1}</span>
                        <span className={result.isCorrect ? 'review-pill success' : 'review-pill warning'}>
                          {result.isCorrect ? (isGerman ? 'Réussi' : 'Erfolgreich') : (isGerman ? 'À revoir' : 'Noch üben')}
                        </span>
                      </div>
                      <p><strong>{isGerman ? 'Question' : 'Frage'} :</strong> {result.question}</p>
                      <p><strong>{isGerman ? 'Votre réponse' : 'Deine Antwort'} :</strong> {result.userAnswer}</p>
                      <p><strong>{isGerman ? 'Bonne réponse' : 'Richtige Antwort'} :</strong> {result.expectedAnswer}</p>
                      <p><strong>{isGerman ? 'Correction' : 'Korrektur'} :</strong> {result.explanation}</p>
                    </div>
                  ))}
                </div>

                <button type="button" className="primary-btn" onClick={resetPractice}>
                  {isGerman ? 'Recommencer' : 'Neu starten'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
