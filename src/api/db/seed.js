const { MongoClient, ObjectId } = require('mongodb');
const { passwordHash } = require('../utils/auth');
const { ENGLISH, SPANISH } = require('../../shared/lang');
const { STAFF_ROLE } = require('../../shared/roles');
const { TRANSACTIONAL_EMAIL } = require('../../shared/emailFrequency');

(async function() {
  console.log('Seeding database...');

  const client = await MongoClient.connect(process.env.MONGODB_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });

  db = client.db();

  await db.dropDatabase();

  const defaultMediaObjects = [
    {
      _id: 'default',
      type: 'image',
      source: 'https://www.incimages.com/uploaded_files/image/1920x1080/Tedra-Cobb-3_371741.jpg',
      alt: 'Tedra in a parade',
    },
    {
      _id: 'default3',
      type: 'image',
      source: 'https://www.tedracobb.com/wp-content/uploads/2018/09/tedra-cobb-cover-1.jpg',
      alt: 'Tedra at an event',
    },
    {
      _id: 'default2',
      type: 'image',
      source: 'https://s.hdnux.com/photos/74/35/57/15850449/9/1200x0.jpg',
      alt: 'Tedra in a meeting',
    },
    {
      _id: 'default4',
      type: 'image',
      source: 'https://www.tedracobb.com/wp-content/uploads/2017/09/Senior-Center.jpg',
      alt: 'Tedra at a community breakfast',
    },
    {
      _id: 'default5',
      type: 'image',
      source: '  https://www.northcountrypublicradio.org/news/images/cobb1wins062718.jpg',
      alt: 'Tedra celebrating',
    },
    {
      _id: 'default6',
      type: 'image',
      source: '  https://bloximages.chicago2.vip.townnews.com/saratogian.com/content/tncms/assets/v3/editorial/c/93/c939dd50-e35a-56f8-b00c-f909e5dd39bd/5b9fc2a6e9683.image.jpg?crop=1763%2C992%2C0%2C91&resize=1763%2C992&order=crop%2Cresize',
      alt: 'Tedra distributing literature',
    },
    {
      _id: 'default7',
      type: 'image',
      source: 'https://www.localsyr.com/wp-content/uploads/sites/63/2019/04/TedraCobb_PotsdamTwnHall-1_1555434174645_82765276_ver1.0.jpg',
      alt: 'Tedra at a town hall meeting',
    },
  ];


  const media = db.collection('media');
  await media.insertMany(defaultMediaObjects);

  const config = JSON.stringify({
    disableNavDonate: true,
    media: defaultMediaObjects.map((object) => object._id),
    defaultMedia: {
      _id: 'tedra-event',
      type: 'image',
      source: 'https://www.incimages.com/uploaded_files/image/1920x1080/Tedra-Cobb-3_371741.jpg',
      alt: 'Tedra at an event',
    },
  });

  const copy = JSON.stringify({
    'idQuestions.support.label': {
      [ENGLISH]: 'Will you vote to elect Tedra Cobb to Congress on November 3rd?',
      [SPANISH]: '¿Votará para reelegir a Tedra Tedra al Senado de los Estados Unidos el 1 de septiembre?',
    },
    'idQuestions.support.options': {
      [ENGLISH]: [
        'Definitely',
        'Probably',
        'Undecided',
        'Probably not',
        'Definitely not',
        'Too Young/Ineligible to Vote',
      ],
      [SPANISH]: [
        'Definitivamente',
        'Probablemente',
        'Indeciso',
        'Probablemente no',
        'Definitivamente no',
        'Demasiado joven/Inelegible para votar',
      ],
    },
    'idQuestions.volunteer.label': {
      [ENGLISH]: 'Will you volunteer with Team Tedra?',
      [SPANISH]: '¿Quiéres ser voluntario con el Equipo Tedra?',
    },
    'idQuestions.volunteer.options': {
      [ENGLISH]: [
        'Yes',
        'Maybe',
        'Later',
        'No',
      ],
      [SPANISH]: [
        'Sí',
        'Tal vez',
        'Más tarde',
        'No',
      ],
    },
    'idQuestions.vote.label': {
      [ENGLISH]: 'Are you planning to vote by mail for Tedra?',
    },
    'idQuestions.vote.subtitle': {
      [ENGLISH]: 'Voting by mail is the safest way to make your voice heard in this election, and new laws have expanded access to vote by mail in New York for every registered voter. An application to vote by mail will be mailed to each registered voter in NY (or you can download one and mail or email it in). Just complete that application, send it back, and you’ll receive a ballot to vote for Tedra by mail. Skip the polls, stay safe, and get your vote for Tedra in early -- vote by mail!',
    },
    'idQuestions.vote.options': {
      [ENGLISH]: [
        'Yes, and I’ve already sent in my vote by mail application',
        'Yes, and I need a vote by mail application',
        'No, I’m not sure about voting by mail',
        'I’d like to learn more about voting by mail',
      ],
    },
    'voteStatus.label': {
      [ENGLISH]: 'Make a plan to vote for Tedra!',
    },
    'voteStatus.subtitle': {
      [ENGLISH]: 'Our future is on the line. Make your voice heard by making a plan to vote for Tedra. If you have not already applied to vote by mail, please make a plan to vote early or on Election Day.',
    },
    'voteStatus.options': {
      [ENGLISH]: [
        'I’ve already voted',
        'I’ve received my mail-in ballot and still need to return it',
        'I’m planning to vote early between August 22-28',
        'I’m planning to vote on Election Day, September 1',
      ],
    },
    'actions.gotv.label': {
      [ENGLISH]: 'GOTV Actions',
    },
    'actions.gotv.options': {
      [ENGLISH]: [
        'Received Ballot Application',
        'Mailed in Ballot Application',
        'Received Ballot',
        'Voted for Tedra! (Mailed in completed ballot)',
      ],
    },
    'homepage.formTitle': {
      [ENGLISH]: 'Create your own Tedra Cobb supporter page',
      [SPANISH]: 'Crea tu propia página de apoyo para Tedra Tedra',
    },
    'homepage.formSubtitle': {
      [ENGLISH]: 'Our grassroots campaign is powered by people like you who are connecting with family, friends, and neighbors about this important election. Complete the sections below to create your own personal supporter page and reach out to your network about why you’re a member of Team Tedra!',
      [SPANISH]: 'Nuestra campaña está impulsada por gente como tú que se está conectando con familia, amigos y vecinos sobre esta elección importante. Completa las siguientes secciones para crear tu propia página de apoyo personal y hablarle a tus redes de por qué eres miembro del Equipo Tedra!',
    },
    'homepage.customizeTitle': {
      [ENGLISH]: 'Customize your page',
      [SPANISH]: 'Personaliza tu página',
    },
    'homepage.customizeSubtitle': {
      [ENGLISH]: `Fill out the sections below to personalize the title, description, and design of your supporter page to tell your network why you’re Voting Tedra. Share your story of why you’re a member of this movement -- feel free to get creative!`,
      [SPANISH]: `Llena las siguientes secciones para personalizar el título, la descripción y el diseño de tu página de apoyo para decirle a tus redes por qué estás #ConEd. Comparte tu historia de por qué eres miembro de este movimiento. ¡Siéntete libre de ser creativo!`,
    },
    'homepage.formButtonLabel': {
      [ENGLISH]: 'next',
      [SPANISH]: 'siguiente',
    },
    'homepage.createButtonLabel': {
      [ENGLISH]: 'create page',
      [SPANISH]: 'crear página',
    },
    'homepage.defaultTitle': {
      [ENGLISH]: `{{FIRST_NAME}} is voting Tedra because...`,
      [SPANISH]: '{{FIRST_NAME}} está #ConEd porque...'
    },
    'homepage.defaultSubtitle': {
      [ENGLISH]: 'Tedra has been fighting for the North Country for more than 30 years. She is running a people-powered campaign, and it’s up to us to help make sure she can fight in Congress for our shared values. Let me know that you are with me, and help me reach my goal!',
      [SPANISH]: 'Ed viene de una familia trabajadora y está luchando con todo su corazón por la clase trabajadora. Tedra está llevando a cabo una campaña impulsada por la gente y depende de nosotros asegurarnos de que pueda seguir luchando en el Senado por nuestros valores progresistas. ¡Háganme saber que están conmigo y ayúdenme a alcanzar mi meta!',
    },
    'signupPage.postSignupSubtitle': {
      [ENGLISH]: 'Next, keep up the momentum by sharing this link with your friends, family, and network, and help {{FIRST_NAME}} reach their goal! Or, make your own page and get everyone you know to join the fight.',
      [SPANISH]: '¡Mantén el impulso compartiendo este enlace con tus amigos, familia y redes y ayuda a {{FIRST_NAME}} alcanzar su objetivo! O haz tu propia página y haz que todo el que conoces se una a la lucha.',
    },
    'signupPage.postSignupCreateTitle': {
      [ENGLISH]: 'Make your own page',
      [SPANISH]: 'Haz tu propia página',
    },
    'signupPage.postSignupCreateSubtitle': {
      [ENGLISH]: 'Create your own supporter page and become a grassroots organizer for Tedra. We’ll show you how!',
      [SPANISH]: 'Crea tu propia página de apoyo y conviértete en un organizador en tu comunidad para Ed. ¡Te mostraremos cómo!',
    },
    'signupPage.postSignupCreateButtonLabel': {
      [ENGLISH]: 'Get started',
      [SPANISH]: 'Comenzar',
    },
    'signupPage.modalTitle': {
      [ENGLISH]: `Here's how you can join Tedra's fight`,
      [SPANISH]: 'Como puedes unirte a la lucha de Ed',
    },
    'signupPage.modalCopy': {
      [ENGLISH]: [
        `### Send your link far and wide`,
        `Share this page with your network to help us grow Team Tedra! Your friends, family, neighbors, colleagues, roommates, classmates, Facebook friends, Twitter peeps, your Zoom hangout friends -- the sky's the limit, and we need to reach everyone.`,
        `### Relational organizing tips`,
        ` - Call 5 friends and ask them to fill out your link`,
        ` - Email your link to 50 people`,
        ` - Share it on your Facebook and other social media`,
        ` - Go through your contact list in your phone and text the link to at least 10 people!`,
        ' ',
        `### Volunteer with Team Tedra`,
        `[Join the movement here](http://tedracobb.com/volunteer).`,
      ],
      [SPANISH]: [
        '### Comparte tu enlace',
        `¡Comparte esta página con tus redes para ayudarnos a crecer el Equipo Tedra! Tus amigos, familia, vecinos, colegas, compañeros de habitación, compañeros de clase, amigos de Facebook, seguidores en Twitter, tus amigos de Zoom...el cielo es el límite y tenemos que llegar a todos.`,
        `### Consejos para organizar relacionalmente`,
        ` - Llama a 5 amigos y pídeles que llenen tu enlace`,
        ` - Envía tu enlace a 50 personas`,
        ` - Compártelo en tu Facebook y otras redes sociales`,
        ` - ¡Revisa la lista de contactos de tu teléfono y envía el enlace al menos a 10 personas!`,
        ` `,
        `### Ser voluntario con el Equipo Tedra`,
        `[Únete al movimiento aquí](http://edTedra.com/volunteer).`,
      ],
    },
    'signupPage.modalCloseLabel': {
      [ENGLISH]: 'Okay, got it',
      [SPANISH]: 'Perfecto, lo tengo.',
    },
    'nav.logoAlt': {
      [ENGLISH]: 'Tedra Logo',
      [SPANISH]: 'Logo de Tedra Tedra para el Senado',
    },
    'nav.return': {
      [ENGLISH]: '← return to tedracobb.com',
      [SPANISH]: '← volver a edTedra.com',
    },
    'nav.returnLink': {
      [ENGLISH]: 'https://www.tedracobb.com/',
      [SPANISH]: 'https://www.edTedra.com/es/',
    },
    'nav.donateForm': {
      [ENGLISH]: 'https://secure.actblue.com/donate/tedra-cobb-for-congress-1',
    },
    'phonebankPage.title': {
      [ENGLISH]: 'Add a Contact',
      [SPANISH]: 'Añadir un contacto',
    },
    'phonebankPage.subtitle': {
      [ENGLISH]: 'Enter your friends, family, and people in your network. Grow your list of the people you’re personally bringing to this grassroots movement, let Tedra know if they support him, and help make sure this campaign reaches its goals.',
      [SPANISH]: 'Añade a tus amigos, familiares y personas de tu red. Crece tu lista de personas que personalmente trajiste a este movimiento impulsado por el pueblo, déjale saber a Tedra si lo apoyan y ayuda a la campaña a alcanzar sus metas.',
    },
    'phonebankPage.successfullySubmitted': {
      [ENGLISH]: 'Successfully submitted contact!',
      [SPANISH]: '¡Contacto creado con éxito!',
    },
    'privacyPolicy.label': {
      [ENGLISH]: 'Privacy Policy',
      [SPANISH]: 'Política de privacidad',
    },
    'privacyPolicy.link': {
      [ENGLISH]: 'https://www.tedracobb.com/privacy-policy/',
      [SPANISH]: 'https://www.edTedra.com/es/privacy-policy/',
    },
    'politicalDiclaimer': {
      [ENGLISH]: 'PAID FOR BY THE COMMITTEE TO ELECT TEDRA COBB',
      [SPANISH]: 'PAGADO POR THE Tedra COMMITTEE',
    },
    'smsDisclaimer': {
      [ENGLISH]: 'By providing your cell phone number you consent to receive periodic campaign updates from the Tedra Cobb Committee. Text HELP for help, STOP to end. Message & data rates may apply. https://www.tedracobb.com/privacy-policy/',
      [SPANISH]: 'Al proporcionar su número de teléfono celular usted consiente en recibir actualizaciones periódicas de la campaña de The Tedra Committee. Envíe un mensaje de texto que diga HELP para pedir ayuda o STOP para descontinuar los mensajes. Pueden aplicar tarifas de mensajes y data. https://www.edTedra.com/privacy-policy/',
    },
    'genericError': {
      [ENGLISH]: 'Looks like we had an error, try again? If this continues to happen, please contact us https://www.tedracobb.com/contact-us/',
      [SPANISH]: 'Parece que tuvimos un error, ¿intentar de nuevo? Si esto continúa sucediendo, por favor contáctenos https://www.edTedra.com/contact-us/',
    },
  });

  const campaigns = db.collection('campaigns');
  const campaignResult = await campaigns.insertOne({
    domains: ['localhost:5000'],
    name: 'Friendbank Dev',
    copy,
    config,
  });

  const campaign = campaignResult.ops[0];
  const campaignId = campaign._id.toString();

  const hashedPassword = await passwordHash('password');
  const users = db.collection('users');

  const userInsertResult = await users.insertOne({
    campaign: campaignId,
    email: 'admin@friendbank.us',
    password: hashedPassword,
    firstName: 'Joe',
    zip: '00000',
    emailFrequency: TRANSACTIONAL_EMAIL,
    createdAt: Date.now(),
    lastUpdatedAt: Date.now(),
    lastAuthenticationUpdate: Date.now(),
    role: STAFF_ROLE,
  });

  const adminUser = userInsertResult.ops[0];

  const signups = db.collection('signups');
  const signupSeed = new Array(5).fill({
    email: `${Math.round(Math.random() * 10000)}@gmail.com`,
    recruitedBy: adminUser._id.toString(),
    campaign: campaign._id.toString(),
    type: 'contact',
    lastUpdatedAt: Date.now(),
    firstName: 'First',
    phone: '',
    zip: '',
    supportLevel: '',
    volunteerLevel: '',
  }).map((signup, index) => ({
    ...signup,
    _id: new ObjectId(),
    lastName: `${index}`,
    note: `This is a note ${Math.random()}`,
  }));

  await signups.insertMany(signupSeed);
})();
