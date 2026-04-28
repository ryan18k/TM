let _gameStarted = false;

async function say(speaker, text, isThought=false){
  const display = isThought ? '\u00AB\u00A0' + text + '\u00A0\u00BB' : text;
  showDialogue(speaker, display, isThought);
  await waitContinue();
}

async function runGame(){
  sceneEl.classList.remove('visible');
  stageHideAll();

  // ════════════════════════════════════════════════════════
  //  ACTE I — La veille
  // ════════════════════════════════════════════════════════
  await showAct(1,'hospital');
  setProgress(3);
  playMusicAmbiance();
  await showLocation('CHUV - Chambre 113','18:09');

  SCENE_CAST = {
    'Claude': {key:'claude'},
    'Gérard': {key:'gerard'},
  };

  await say('Claude','Demain matin. Sept heures. La salle deux est réservée. Bonne lumière, bon équipement, la meilleure équipe.');
  SCENE_CAST['Gérard'] = {key:'gerard_serieux'};
  await say('Gérard','Vous dites ça à tous vos patients ?');
  SCENE_CAST['Claude'] = {key:'claude_med_sourire'};
  await say('Claude','Non. Seulement quand c\'est vrai.');
  await say(null,'Un silence confortable s\'installa. Dehors, le lac était couleur d\'étain sous un ciel de mai qui n\'arrivait pas à se décider.',true);
  await say('Gérard','Vous savez ce que ma femme m\'a dit ce matin, avant de rentrer chez nous ? Elle m\'a dit de faire confiance au docteur. Comme si c\'était aussi simple que ça.');
  await say('Claude','Elle a raison.');
  SCENE_CAST['Gérard'] = {key:'gerard_souriant'};
  await say('Gérard','Après trente-quatre ans de mariage, je dois l\'admettre, elle a toujours raison.');
  await say(null,'Claude posa son dossier. Il avait lu et relu les scans de Gérard depuis une semaine. L\'anévrisme était logé à un endroit particulièrement traître, juste à la bifurcation de l\'aorte descendante, là où la paroi artérielle s\'amincissait comme du papier de soie.',true);
  SCENE_CAST['Claude'] = {key:'claude_med_neutre'};
  await say('Claude','Je vais être honnête avec vous, Gérard.');
  SCENE_CAST['Gérard'] = {key:'gerard_serieux'};
  await say('Gérard','Je préfère ça.');
  await say('Claude','L\'opération est complexe. Ce que nous allons faire demain, peu de chirurgiens en Suisse en sont capables. Mais j\'ai énormément d\'expérience et je connais votre dossier par cœur.');
  SCENE_CAST['Gérard'] = {key:'gerard_serieux'};
  await say('Gérard','Vous pouvez me promettre que je rentrerai chez moi ?');
  await say(null,'Claude hésita. Il ne mentait jamais à ses patients. Pas sur ça.',true);
  await say('Claude','Je peux vous promettre que je ferai tout ce qui est en mon pouvoir et que mon pouvoir est considérable.');
  SCENE_CAST['Gérard'] = {key:'gerard_souriant'};
  await say('Gérard','C\'est une bonne réponse pour un homme qui ne veut pas mentir.');
  await say('Claude','Dormez. Votre corps aura besoin de toutes ses ressources demain.');
  SCENE_CAST['Gérard'] = {key:'gerard_serieux'};
  await say('Gérard','Et vous, qu\'allez-vous faire ?');
  await say('Claude','Je vais essayer de me reposer.');
  SCENE_CAST['Gérard'] = {key:'gerard_souriant'};
  await say('Gérard','En relisant vos dossiers ? Curieuse manière de \"se reposer\".');
  await say(null,'Claude sourit malgré lui. C\'était la première fois en six ans de suivi qu\'il voyait Gérard faire de l\'humour.',true);
  SCENE_CAST['Gérard'] = {key:'gerard'};
  SCENE_CAST['Claude'] = {key:'claude_souriant'};
  setProgress(10);

  // ════════════════════════════════════════════════════════
  //  ACTE II — La nuit avant
  // ════════════════════════════════════════════════════════
  await fadeOut(800); stageHideAll(); await sleep(200);
  await showAct(2,'apartment');
  setProgress(18);
  await showLocation('Crissier - Appartement de Claude','00:47');

  SCENE_CAST = {
    'Claude': {key:'claude_civil_neutre'},
    'Lucas':  {key:'lucas_pyj_inquiet'},
  };

  await say(null,'La bibliothèque sentait le vieux bois et le café froid. Les braises mouraient dans la cheminée. Claude était assis dans le canapé, entouré de scanners et d\'articles qu\'il connaissait déjà par cœur.',true);
  await say(null,'Sur l\'étagère, la photo de Sophie. Les yeux fermés face au soleil de Bretagne, les cheveux dans le vent. Quatre ans qu\'elle était partie. Quatre ans qu\'il travaillait trop, rentrait trop tard, et que Lucas ne se plaignait jamais de rien.',true);
  await say('Claude','Trois heures, peut-être quatre si les adhérences sont plus importantes que prévu. Il faudra surveiller la pression au niveau de la bifurcation à chaque instant, sinon…');
  await say(null,'Il s\'arrêta. Parler seul à voix haute était une vieille habitude. Façon de mettre de l\'ordre dans sa tête. Ça inquiétait Lucas, au début. Maintenant son fils faisait semblant de ne pas entendre.',true);
  await say('Lucas','Papa ?');
  await say('Claude','Lucas. Il est presque une heure. Qu\'est-ce que tu fais debout ?');
  await say('Lucas','J\'entendais ta voix. Je pensais que tu téléphonais à quelqu\'un.');
  await say('Claude','Non. Je… réfléchissais à voix haute. Rendors-toi.');
  await say('Lucas','Je dormais pas.');
  await say(null,'Claude le regarda. Neuf ans. Ces yeux trop grands qui ne rataient rien.',true);
  await say('Claude','Tu as fait un cauchemar ?');
  await say('Lucas','Non. Je pensais au monsieur.');
  await say('Claude','Quel monsieur ?');
  await say('Lucas','Celui de demain. L\'opération. Tu m\'en avais parlé une fois, en octobre. Tu avais l\'air différent. J\'ai l\'habitude de te voir fatigué, mais là tu avais l\'air inquiet. C\'était la première fois.');
  await say(null,'Claude ne répondit pas tout de suite. Il ne savait pas que Lucas avait retenu ça.',true);
  SCENE_CAST['Claude'] = {key:'claude_civile_tendre'};
  await say('Claude','Viens là.');
  await say(null,'Lucas vint s\'asseoir à côté de lui. Il ne dit rien. Il resta juste là, l\'épaule contre l\'épaule de son père.',true);
  await say('Lucas','Il a des enfants, le monsieur ?');
  await say('Claude','Deux. Un garçon de douze ans et une fille de neuf ans. Comme toi.');
  SCENE_CAST['Claude'] = {key:'claude_civil_neutre'};
  await say('Lucas','Alors tu dois le sauver.');
  await say('Claude','Je vais faire de mon mieux.');
  await say('Lucas','Non. Tu dois le sauver. Pour ses enfants. Parce que si tu ne le sauves pas, ils vont vivre sans leur papa. Et moi je sais ce que c\'est de grandir sans sa maman.');
  await say(null,'La phrase tomba dans le silence comme une pierre dans un puits. Claude sentit quelque chose se comprimer dans sa poitrine.',true);
  await say('Claude','Tu es trop intelligent pour ton âge, tu sais ça ?');
  SCENE_CAST['Lucas'] = {key:'lucas_pyj_sourire'};
  await say('Lucas','Maman disait que j\'avais tes yeux. Que c\'était pour ça.');
  await say(null,'Claude serra son fils contre lui sans rien dire. Le feu finissait de mourir. Dehors, Lausanne dormait sous la pluie fine.',true);
  SCENE_CAST['Lucas'] = {key:'lucas_pyj_calme'};
  await say('Lucas','Tu es le meilleur docteur du monde. Je le sais. Et demain, tu vas revenir à la maison, et le monsieur va rentrer chez lui, et ses enfants vont avoir leur papa.');
  await say(null,'Claude ferma les yeux. Il resta longtemps ainsi, à sentir le poids léger de son fils contre son épaule, à écouter la pluie. À essayer de croire ce que Lucas venait de dire.',true);
  setProgress(28);

  // ════════════════════════════════════════════════════════
  //  ACTE III — Le bloc
  // ════════════════════════════════════════════════════════
  await fadeOut(800); stageHideAll(); await sleep(200);
  await showAct(3,'hospital',playMusicTension);
  setProgress(34);
  await showLocation('CHUV - Bloc opératoire n°2','08:23');

  SCENE_CAST = {
    'Claude':  {key:'claude_chir_mask'},
    'Antoine': {key:'antoine_masque'},
  };

  await say(null,'Le bloc sentait l\'antiseptique et l\'acier froid. Les lumières du plafond écrasaient tout en blanc. Gérard dormait déjà, les yeux clos, les bras le long du corps. Cette confiance absolue qu\'un homme place dans les mains d\'un autre.',true);
  SCENE_CAST['Claude'] = {key:'claude_chir_mask'};
  await say('Claude','Antoine. Respire.');
  SCENE_CAST['Antoine'] = {key:'antoine_serieux'};
  await say('Antoine','Je respire.');
  await say('Claude','Non. Tu hyperventiles depuis que tu es entré dans ce couloir. Calme-toi et respire.');
  await say(null,'Antoine avait vingt-sept ans. Tout juste promu chirurgien, brillant. Claude l\'avait choisi lui-même. Ce matin, ses mains tremblaient légèrement.',true);
  SCENE_CAST['Antoine'] = {key:'antoine_serieux'};
  await say('Antoine','Je n\'ai jamais vu un anévrisme à cet endroit. Pas en vrai. Seulement sur les images.');
  await say('Claude','Moi non plus la première fois. Tu regardes, tu apprends, et quand je te demande quelque chose, tu exécutes. C\'est le rôle de l\'assistant. Tu comprends ?');
  SCENE_CAST['Antoine'] = {key:'antoine_serieux'};
  await say('Antoine','Compris.');
  await say('Claude','Bien. Préparons le champ.');
  setProgress(40);

  sceneEl.classList.remove('visible');
  await sleep(400);

  let mg1, _ctx1={fails:0};
  do {
    mg1 = await runMG_circles({
      total:15, maxErrors:2, speed:1.6, maxActive:6,
      title:'Préparer le champ opératoire',
      subtitle:'Chaque point de stérilisation doit être validé avant l\'incision',
      failMessage:'Le champ n\'est pas stérile. En chirurgie, l\'approximation n\'existe pas. Recommencez.',
      _ctx:_ctx1,
    });
  } while(mg1===false);

  await fadeIn(400);
  sceneEl.classList.add('visible');

  SCENE_CAST['Antoine'] = {key:'antoine_chir_serieux'};
  SCENE_CAST['Claude'] = {key:'claude_chir_nomask'};
  await say(null,'Neuf heures vingt. L\'incision était nette. Claude travaillait avec cette économie de gestes qui n\'appartient qu\'aux chirurgiens qui ont des milliers d\'heures dans les mains. Chaque mouvement était précis, débarrassé de toute hésitation.',true);
  await say('Antoine','La pression se stabilise. Bon signe.');
  await say('Claude','Ne te réjouis pas trop tôt. Le plus difficile commence maintenant. Regarde comment je positionne les écarteurs. Tu te souviens pourquoi cette approche ?');
  await say('Antoine','Voie postéro-latérale gauche. Pour minimiser l\'exposition du plexus nerveux.');
  await say('Claude','Exact. Ça rallonge l\'opération d\'une heure. Mais dans six mois, quand ce patient se lèvera de sa chaise sans douleur chronique, il ne saura pas que cette décision a été prise ce matin pour lui.');
  await say('Antoine','Il ne vous remerciera jamais pour ça.');
  await say('Claude','C\'est pour ça que c\'est la bonne décision.');
  setProgress(48);

  sceneEl.classList.remove('visible');
  await sleep(400);

  let mg2, _ctx2={fails:0};
  do {
    mg2 = await runMG_dosage({
      duration:7000,
      title:'Maintenir la perfusion',
      subtitle:'Barre du haut : niveau de perfusion · Barre du bas : contrôle du débit',
      failMessage:'La perfusion est tombée à zéro. Sans irrigation constante, les tissus nécrosent. Chaque seconde compte.',
      _ctx:_ctx2,
    });
  } while(mg2===false);

  await fadeIn(400);
  sceneEl.classList.add('visible');

  await say('Antoine','Déjà deux heures d\'opération. L\'anévrisme est exposé. C\'est… la taille est plus importante que sur les scans.');
  await say('Claude','C\'est souvent le cas. Le vivant est plus complexe que l\'image. Pince vasculaire, douce. Voilà. Tu vois comment la paroi réagit ?');
  await say('Antoine','Oui. Elle est très fragile à cet endroit.');
  await say('Claude','Fragile mais travaillable. On isole, on suture, et on ferme. Regarde bien. Je ne ferai pas ça deux fois.');
  setProgress(55);

  // ════════════════════════════════════════════════════════
  //  L'IRRUPTION — Le dilemme
  // ════════════════════════════════════════════════════════
  await say(null,'C\'est à ce moment précis que la porte du sas s\'ouvrit.',true);

  SCENE_CAST['Infirmière'] = {key:'infirmiere_inquiete'};
  await say('Infirmière','Docteur. Je dois vous parler.');
  await say('Claude','Pas maintenant. On est en pleine anastomose.');
  await say('Infirmière','Docteur.');
  await say(null,'Le ton. Il y avait quelque chose dans le ton qui fit lever les yeux à Claude. L\'infirmière se tenait dans l\'encadrement du sas, visiblement en état de choc contrôlé, ce contrôle qu\'on apprend dans les couloirs des urgences.',true);
  await say('Claude','Antoine, tu maintiens la pression. Ne bouge pas. Je reviens dans trente secondes.');
  await say(null,'Il s\'approcha de l\'infirmière. Elle lui parla à voix basse, mais dans le silence du bloc, tout s\'entendait.',true);
  await say('Infirmière','Votre fils. Lucas. Il a été admis aux urgences pédiatriques il y a vingt minutes. Accident de vélo, traumatisme crânien grave. Ils ont besoin d\'un neurochirurgien pour une craniotomie d\'urgence.');
  await say(null,'Le temps s\'arrêta.',true);
  await say('Infirmière','Le docteur Dévaud est en arrêt maladie depuis hier. Le docteur Rexha est à Genève pour une conférence, injoignable. Il n\'y a personne d\'autre de disponible. Le chef de service m\'a demandé de vous prévenir personnellement.');
  await say('Claude','…');
  await say('Infirmière','Docteur. Votre fils a besoin d\'une intervention dans les quarante minutes, sinon…');
  await say(null,'Elle n\'acheva pas sa phrase. Elle n\'avait pas besoin.',true);

  SCENE_CAST = {
    'Claude':  {key:'claude_chir_nomask'},
    'Antoine': {key:'antoine_chir_serieux'},
    'Infirmière': {key:'infirmiere_inquiete'},
  };

  await say('Antoine','Claude… qu\'est-ce qui se passe ?');
  await say(null,'Claude se retourna vers la table d\'opération. Gérard était ouvert. L\'anévrisme exposé. Abandonner maintenant, c\'était une condamnation à mort. Partir, c\'était peut-être sauver Lucas. Peut-être.',true);
  await say('Claude','Antoine. Écoute-moi.');
  await say('Antoine','Qu\'est-ce qu\'il y a ? Qu\'est-ce qu\'elle vous a dit ?');
  await say('Claude','C\'est Lucas. Mon fils. Il est aux urgences. Traumatisme crânien. Ils ont besoin d\'un neurochirurgien.');
  await say(null,'Le silence dans le bloc fut total. Même le moniteur semblait retenir son souffle.',true);
  await say('Antoine','Bon sang…');
  await say('Claude','Il n\'y a pas d\'autre chirurgien disponible. C\'est toi ou moi. L\'un de nous doit aller là-bas.');
  await say('Antoine','Claude. Je ne peux pas terminer ça seul. Vous le savez. Ce n\'est pas de la modestie, c\'est la réalité. Si je perds la pression au niveau de la bifurcation, je ne saurai pas quoi faire.');
  await say('Claude','Tu sauras. J\'ai vu tes mains ce matin. Elles ne tremblent plus.');
  await say('Antoine','Et si je rate ? Si Gérard meurt sur cette table parce que vous n\'êtes pas là ?');
  await say('Claude','Nous n\'avons pas le choix.');
  await say(null,'Antoine ferma les yeux une seconde. Il rouvrit les yeux. Ses mains, maintenant, ne tremblaient pas du tout.',true);
  await say('Antoine','Je ne pense pas pouvoir assumer ça.');
  await say('Claude','Nous ne pouvons pas nous permettre de penser, nous devons agir.');

  setProgress(62);
  playMusicTension();

  // ── PREMIER CHOIX ──
  sceneEl.classList.remove('visible');
  await sleep(400);

  const choix1 = await showChoice({
    duration:10, fast:true, allowRandom:false,
    left:  {label:'Rester avec Gérard', sub:'envoyer Antoine opérer Lucas'},
    right: {label:'Aller opérer Lucas', sub:'laisser Antoine opérer Gérard'},
  });

  await fadeIn(400);
  sceneEl.classList.add('visible');

  if(choix1==='left'){
    await say('Claude','Antoine. Tu vas aller opérer Lucas.');
    await say('Antoine','Non. Claude, je ne peux pas, la responsabilité est trop grande. Une craniotomie d\'urgence, ce n\'est pas ma spécialité.');
    await say('Claude','Tu as fait six mois de neurochirurgie lors de ton internat. Le protocole est dans ta tête, tu le sais.');
    await say('Antoine','C\'est votre fils. Je ne peux pas être responsable de ça.');
    await say('Claude','Antoine. Regarde-moi.');
    await say(null,'Antoine leva les yeux. Il y avait quelque chose dans le regard de Claude qu\'il n\'avait jamais vu. Pas de la peur, mais quelque chose de plus profond que la peur. Une douleur qu\'il contrôlait à la force du monde.',true);
    await say('Claude','Je reste ici parce que si je pars, Gérard meurt dans les vingt minutes. Ce n\'est pas un pronostic, c\'est une certitude. Et lui aussi a des enfants. Tu comprends ce que je te dis ?');
    await say('Antoine','Je comprends.');
    await say('Claude','Alors va. Va et fais ce que tu sais faire. Mon fils a neuf ans et il a besoin de toi.');
    await say('Antoine','Et si je n\'y arrive pas ?');
    await say('Claude','Tu y arriveras. Parce que tu n\'as pas le droit de ne pas y arriver.');
  } else {
    await say('Claude','Antoine. Tu vas finir ici. Seul.');
    await say('Antoine','Claude. Non. Vous ne pouvez pas partir maintenant. Si la suture lâche, si la pression chute, je ne saurai pas quoi faire.');
    await say('Claude','Tu sais quoi faire. Je t\'ai tout montré. Les étapes sont claires.');
    await say('Antoine','Et si quelque chose tourne mal ? Gérard ne survivra pas si je suis seul.');
    await say('Claude','Et Lucas ne survivra pas si personne ne va là-bas.');

    await say('Antoine','Et si je rate ?');
    await say('Claude','Antoine. Regarde-moi. Tu as les mains que j\'avais à ton âge. Peut-être meilleures. Je ne dis pas ça pour te rassurer, je le dis parce que c\'est vrai et que tu dois le savoir maintenant.');
    await say('Antoine','Je ferai tout ce que je peux.');
    await say('Claude','Je le sais. C\'est pour ça que je te fais confiance.');
  }

  await say(null,'Antoine ne dit plus rien. Il hocha la tête, une seule fois, et ses mâchoires se serrèrent.',true);
  setProgress(68);

  // ── DEUXIÈME CHOIX — sans retour ──
  SCENE_CAST['Antoine'] = {key:'antoine_chir_serieux'};
  await say(null,'Mais alors Antoine prit la parole, d\'une voix qu\'il essayait de garder stable.',true);
  if(choix1==='left'){
    await say('Antoine','Claude, attendez. Êtes-vous complètement sûr de votre choix ? C\'est notre dernière chance.');
    await say('Claude','…');
    await say('Antoine','Préférez-vous réellement rester ici, continuer l\'opération de Gérard et qu\'un chirurgien sans expérience comme moi s\'occupe du cas urgent de votre fils ?');
  } else {
    await say('Antoine','Claude, attendez. Êtes-vous complètement sûr de votre choix ? C\'est notre dernière chance.');
    await say('Claude','…');
    await say('Antoine','Préférez-vous réellement sortir de cette salle, et qu\'un chirurgien sans expérience comme moi s\'occupe du cas extrêmement complexe de Gérard ?');
  }
  await say(null,'Claude regarda Gérard sur la table. L\'homme qui lui avait demandé une promesse la veille. Dont les enfants avaient neuf et douze ans.',true);
  await say(null,'Il pensa à Lucas. Neuf ans. Ses yeux trop grands. “Parce que si tu ne le sauves pas, ils vont vivre sans leur papa. Et moi je sais ce que c\'est.”',true);
  await say(null,'Il n\'y avait pas de bonne réponse. Il n\'y avait qu\'une décision.',true);

  sceneEl.classList.remove('visible');
  await sleep(400);

  const choix2 = await showChoice({
    duration:10, fast:true, allowRandom:false,
    left:  {label:'Rester avec Gérard', sub:'Antoine ira opérer Lucas'},
    right: {label:'Partir opérer Lucas', sub:'laisser Antoine opérer Gérard'},
  });

  await fadeIn(400);
  sceneEl.classList.add('visible');

  setProgress(75);

  // ════════════════════════════════════════════════════════
  //  ACTE IV — L'opération
  // ════════════════════════════════════════════════════════
  await fadeOut(600); stageHideAll(); await sleep(300);
  await showAct(4,'hospital');
  setProgress(80);
  await showLocation(choix2==='left'?'CHUV - Bloc opératoire n°2':'CHUV - Bloc opératoire n°4','11:28');

  SCENE_CAST = {
    'Claude':  {key:'claude_masque'},
    'Antoine': {key:'antoine_masque'},
  };

  if(choix2==='left'){
    // Claude reste avec Gérard, Antoine opère Lucas
    await say(null,'Claude resta. Antoine parti depuis moins de deux minutes, le bloc redevint silencieux.',true);
    await say(null,'Il y avait désormais deux salles d\'opération dans ce bâtiment, séparées par cent mètres de couloir et une éternité.',true);
    await say(null,'Dans l\'une, Claude opérait un homme qu\'il connaissait depuis six ans. Dans l\'autre, Antoine essayait de sauver le fils de son patron.',true);

    sceneEl.classList.remove('visible');
    await sleep(400);

    let mg3, _ctx3a={fails:0};
    do {
      mg3 = await runMG_traces({
        total:10, maxErrors:3, maxSim:2,
        title:'Suture vasculaire',
        subtitle:'Chaque point de suture doit être parfait',
        failMessage:'La suture a cédé. En chirurgie vasculaire, il n\'y a pas de second essai. Le tissu ne pardonne pas.',
        _ctx:_ctx3a,
      });
    } while(mg3===false);

    await fadeIn(400);
    sceneEl.classList.add('visible');

    await say(null,'Quatorze heures vingt-deux. Claude posa ses instruments.',true);
    SCENE_CAST['Claude'] = {key:'claude_chir_nomask'};
    await say('Claude','C\'est fermé. La suture tient. Stabilisez et préparez la sortie de bloc.');
    SCENE_CAST['Claude'] = {key:'claude_chir_mask'};
    await say(null,'Il retira ses gants. Il avait les mains qui ne tremblaient pas. C\'était l\'étrange grâce de la chirurgie, que la technique survive à l\'effondrement intérieur.',true);
    await say(null,'Maintenant il fallait savoir.',true);

  } else {
    // Claude part opérer Lucas, Antoine reste avec Gérard
    await say(null,'Claude sortit du bloc.',true);
    await say(null,'Il courut. Pour la première fois depuis des années, Claude courut dans un couloir d\'hôpital.',true);
    await say(null,'Dans le bloc qu\'il venait de quitter, Antoine prit une longue inspiration, regarda les mains de l\'homme endormi devant lui, et se mit au travail.',true);

    SCENE_CAST = {'Claude':{key:'claude_chir_nomask'}};

    await say(null,'La salle de neurochirurgie pédiatrique était au bout du couloir. Quand Claude entra, l\'équipe leva les yeux vers lui avec un soulagement qui le brûla.',true);
    await say(null,'Sur la table, Lucas, son fils. Ces yeux qu\'il ne verrait pas ce soir, ils étaient fermés, le front bandé d\'un pansement provisoire, le visage anormalement calme pour un enfant.',true);
  SCENE_CAST['Claude'] = {key:'claude_chir_nomask'};
    await say('Claude','Bilan.');
    await say(null,'L\'interne lui tendit le rapport en deux phrases. Hématome épidural temporal droit, engagement imminent, fenêtre thérapeutique critique.',true);
    await say(null,'Claude regarda son fils une seconde. Une seule. Puis il tendit la main pour les instruments.',true);

    sceneEl.classList.remove('visible');
    await sleep(400);

    let mg3, _ctx3b={fails:0};
    do {
      mg3 = await runMG_traces({
        total:10, maxErrors:3, maxSim:2,
        title:'Craniotomie d\'urgence',
        subtitle:'Précision absolue, chaque millimètre compte',
        failMessage:'L\'hématome se propage. Une craniotomie ne tolère aucune imprécision. La vie est dans vos mains.',
        _ctx:_ctx3b,
      });
    } while(mg3===false);

    await fadeIn(400);
    sceneEl.classList.add('visible');

    await say(null,'Quatorze heures dix-neuf. L\'hématome était évacué. La pression intracrânienne chutait.',true);
    await say(null,'Claude retira ses instruments lentement. Ses mains étaient parfaitement stables. C\'était la chose la plus difficile qu\'il ait jamais faite.',true);
    await say(null,'Maintenant il fallait savoir ce qui s\'était passé dans l\'autre salle.',true);
  }

  setProgress(88);
  playMusicAmbiance();

  // ════════════════════════════════════════════════════════
  //  ACTE V — Ce qu'on apprend
  // ════════════════════════════════════════════════════════
  await fadeOut(800); stageHideAll(); await sleep(200);
  await showAct(5,'or');
  setProgress(92);
  await showLocation('CHUV - Couloirs','14:35');

  SCENE_CAST = {'Claude':{key:'claude_chir_mask'}};

  if(choix2==='left'){
    // Claude a sauvé Gérard — Lucas est mort
    await say(null,'Il sortit du bloc dans le couloir. L\'air y était différent, plus lourd, comme si la lumière elle-même s\'était épaissie.',true);
    await say(null,'Ses collègues étaient là. Trois infirmières. Le chef de service. Ils ne souriaient pas. Ils ne parlaient pas. Ils regardaient le sol.',true);
    await say(null,'Claude s\'arrêta.',true);
    await say(null,'Quelqu\'un murmura quelque chose qu\'il n\'entendit pas. Quelqu\'un d\'autre posa une main sur son épaule.',true);
    await say(null,'Il n\'eut pas besoin qu\'on lui dise quoi que ce soit.',true);
    await say(null,'Il s\'assit sur le banc du couloir. Le même banc où il s\'était assis des centaines de fois en vingt ans de service. Cette fois, il ne se releva pas tout de suite.',true);
    await say(null,'Dehors, dans la salle d\'attente des urgences pédiatriques, la famille de Lucas n\'existait pas. Il n\'y avait que lui. Pas de mère. Pas de frère ou sœur. Juste le vide qui attendait.',true);
    await say(null,'Dans la chambre 113, Gérard reprenait connaissance.',true);
    await say(null,'Claude resta sur ce banc longtemps. Jusqu\'à ce que le couloir soit vide. Jusqu\'à ce que les lumières du soir prennent le relais des néons. Il pensait à la voix de Lucas dans la bibliothèque la nuit précédente.',true);
    await say(null,'“Parce que si tu ne le sauves pas, ils vont vivre sans leur papa. Et moi je sais ce que c\'est.”',true);
    await say(null,'Lui aussi, maintenant, il savait.',true);

  } else {
    // Claude a sauvé Lucas — Gérard est mort
    await say(null,'Il retira son masque dans le couloir. Ses mains tremblaient enfin. Maintenant que c\'était fini, maintenant que le corps pouvait se permettre de trembler.',true);
    SCENE_CAST['Claude'] = {key:'claude_chir_mask'};
    await say(null,'Antoine était là. Il était sorti du bloc quelques minutes avant lui. Il avait les yeux rouges. Il regardait ses propres mains comme s\'il ne les reconnaissait pas.',true);
    SCENE_CAST['Antoine'] = {key:'antoine_inquiet_civil'};
    await say(null,'Claude comprit avant qu\'Antoine ouvre la bouche.',true);
    await say('Antoine','J\'ai tout fait. Exactement comme vous m\'aviez montré. Mais à un moment, la suture a cédé. Il y a eu une déchirure que je n\'ai pas pu contrôler.');
    await say('Claude','Antoine.');
    await say('Antoine','Je suis désolé. Je suis tellement désolé. J\'aurais dû faire mieux.');
    await say('Claude','Antoine. Arrête.');
    await say(null,'Dans la salle d\'attente au bout du couloir, la famille de Gérard était là. Sa femme. Un garçon de douze ans et une fille de neuf ans. Ils ne savaient pas encore.',true);
    await say(null,'Claude regarda leur direction un long moment. Il allait devoir y aller. C\'était son métier. Annoncer. Rester debout quand les autres s\'effondraient.',true);
    await say(null,'Il pensa à la question que Gérard lui avait posée la veille.',true);
    await say(null,'Il avait dit qu\'il ferait tout ce qui était en son pouvoir…',true);
    await say(null,'… Et que son pouvoir était considérable.',true);
    await say(null,'La fille de Gérard avait neuf ans. Comme Lucas. Comme la fille que Lucas lui avait demandé de préserver.',true);
    await say(null,'Il y avait des équations que les mathématiques ne permettent pas de résoudre.',true);
    await say(null,'Claude s\'approcha de la salle d\'attente. Il prit une inspiration. Il ouvrit la porte.',true);
  }

  setProgress(100);
  await fadeOut(1200);
  stageHideAll();
  await sleep(600);

  // ── FIN ──
  let endLines;
  if(choix2==='left'){
    endLines=[
      'Gérard rentra chez lui dix-neuf jours plus tard.',
      'Il n\'apprit jamais les circonstances exactes de cette journée.',
      'Lucas fut enterré cinq jours plus tard.',
      'Il pleuvait sur Lausanne.',
      'Claude reprit le travail trois semaines après.',
      'Il n\'en parla jamais à personne.',
      'Il opéra encore pendant vingt-deux ans.',
      'Chaque opération réussie était une dette qu\'il ne saurait jamais rembourser.',
    ];
  } else {
    endLines=[
      'Lucas passa quinze jours en soins intensifs pédiatriques.',
      'Il rentra à la maison un jeudi.',
      'Gérard fut enterré la semaine d\'après.',
      'Sa femme éleva seule ses deux enfants.',
      'Claude ne sut jamais si son choix avait été le bon.',
      'Il n\'y avait peut-être pas de bon choix.',
      'Seulement des conséquences.',
      'Et la façon dont on apprend à les porter.',
    ];
  }

  await sleep(400);
  await fadeIn(900);
  await showEndScreen(endLines);
}

async function startGame(){
  if(_gameStarted)return;
  _gameStarted=true;
  if(!AC){
    AC=new (window.AudioContext||window.webkitAudioContext)();
    window._actx=AC;
  }
  if(AC.state==='suspended') AC.resume();
  const splash=document.getElementById('splash-screen');
  splash.classList.add('hiding');
  await sleep(900);
  splash.style.display='none';
  // Disclaimer
  const disc=document.getElementById('disclaimer-screen');
  disc.classList.add('visible');
  await new Promise(resolve=>{
    document.getElementById('disclaimer-continue').addEventListener('click',resolve,{once:true});
  });
  disc.style.transition='opacity 0.6s ease';
  disc.classList.remove('visible');
  await sleep(650);
  disc.style.display='none';
  await runGame();
}

function goToQuestionnaire(){
  window.open('https://forms.gle/JzQHqqxaEAHJrgeL6','_blank');
}

function restartGame(){
  _gameStarted=false;
  document.getElementById('end-screen').classList.remove('active');
  document.getElementById('credits-screen').classList.remove('active');
  stopMusic();
  startGame();
}

document.getElementById('splash-btn').addEventListener('click',startGame);

// Musique principale dès le chargement (avant tout clic)
(function autoStartMusic(){
  function tryStart(){
    if(!AC){
      try{
        AC=new (window.AudioContext||window.webkitAudioContext)();
        window._actx=AC;
        initMusic();
        // Sur mobile il faut un geste — on écoute le premier touch/click
        if(AC.state==='suspended'){
          const resume=()=>{ AC.resume().then(()=>{ playMusicAmbiance(); }); document.removeEventListener('touchstart',resume); document.removeEventListener('click',resume); };
          document.addEventListener('touchstart',resume,{once:true,passive:true});
          document.addEventListener('click',resume,{once:true});
        } else {
          playMusicAmbiance();
        }
      }catch(e){}
    }
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',tryStart);
  else tryStart();
})();
