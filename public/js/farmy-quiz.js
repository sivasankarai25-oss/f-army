(function () {
  const QUIZ_STORAGE_KEY = 'farmy_quiz_progress';
  const QUIZ_LEADERBOARD_KEY = 'farmy_quiz_leaderboard';
  const t = (key, fallback) => (window.FARMY_I18N ? window.FARMY_I18N.t(key, fallback) : (fallback || key));

  function getQuizCatalog() {
    const questionBank = buildQuestionBank();
    const quizTitles = [
      'Farmy Starter', 'Soil & Seed', 'Green Explorer', 'Sunrise Farmer', 'Sprout Sprint',
      'Root Runner', 'Farmy Basics', 'Growing Good', 'World Wonder', 'Sun & Soil',
      'Happy Harvest', 'Leaf Learner', 'Nature Notes', 'Fresh Fields', 'Garden Glow',
      'Field Friend', 'Earth Explorer', 'Bloom Basics', 'Green Thumb', 'Farmy Fun',
      'Clever Crops', 'Seed Wisdom', 'Nature Quest', 'Farmy Play', 'Harvest Habit',
      'Bright Botany', 'Farmy Spark', 'Paddy Path', 'Cool Crops', 'Rural Riddle',
      'Smart Soil', 'Bloom Buddy', 'Fresh Farmer', 'Tiny Tractor', 'Earth Explorer',
      'Farmy First', 'Plant Power', 'Easy Growth', 'Green Routine', 'Soil Story',
      'Farmy Arcade', 'Weather Watch', 'Village Wisdom', 'Crop Corner', 'Tiny Team',
      'Green Genius', 'Farmy Delight', 'Nature Basics', 'The Big Grow', 'Farmy Master'
    ];

    const difficultyBands = [
      'Very Easy', 'Very Easy', 'Very Easy', 'Very Easy', 'Very Easy', 'Very Easy', 'Very Easy', 'Very Easy', 'Very Easy', 'Very Easy',
      'Easy', 'Easy', 'Easy', 'Easy', 'Easy', 'Easy', 'Easy', 'Easy', 'Easy', 'Easy',
      'Easy', 'Easy', 'Easy', 'Easy', 'Easy', 'Easy', 'Easy', 'Easy', 'Easy', 'Easy',
      'Easy-Medium', 'Easy-Medium', 'Easy-Medium', 'Easy-Medium', 'Easy-Medium', 'Easy-Medium', 'Easy-Medium', 'Easy-Medium', 'Easy-Medium', 'Easy-Medium',
      'Medium', 'Medium', 'Medium', 'Medium', 'Medium', 'Medium', 'Medium', 'Medium', 'Medium', 'Medium'
    ];

    return Array.from({ length: 50 }, (_, quizIndex) => {
      const start = quizIndex * 10;
      const questionSlice = questionBank.slice(start, start + 10);
      return {
        id: `quiz-${quizIndex + 1}`,
        number: quizIndex + 1,
        title: quizTitles[quizIndex] || `Farmy Quiz ${quizIndex + 1}`,
        description: `Learn general knowledge facts about the world, nature, culture, and everyday life.`,
        difficulty: difficultyBands[quizIndex] || 'Easy',
        questions: questionSlice.map((question, qIndex) => ({
          ...question,
          quizNumber: quizIndex + 1,
          questionNumber: qIndex + 1,
          id: `quiz-${quizIndex + 1}-q-${qIndex + 1}`
        }))
      };
    });
  }

  function buildQuestionBank() {
    const bank = [];
    const facts = [
      { question: 'What is the capital of France?', options: ['Rome', 'Paris', 'Berlin', 'Madrid'], answer: 'Paris', explanation: 'Paris is the capital city of France.', category: 'Geography', difficulty: 'Easy' },
      { question: 'Which planet is known as the Red Planet?', options: ['Earth', 'Mars', 'Venus', 'Jupiter'], answer: 'Mars', explanation: 'Mars is called the Red Planet because iron minerals on its surface give it a reddish appearance.', category: 'Space', difficulty: 'Easy' },
      { question: 'Which part of a plant absorbs water from the soil?', options: ['Flower', 'Root', 'Fruit', 'Leaf'], answer: 'Root', explanation: 'Roots absorb water and nutrients from the soil.', category: 'Nature', difficulty: 'Very Easy' },
      { question: 'Which animal is the largest mammal on Earth?', options: ['Elephant', 'Giraffe', 'Blue whale', 'Hippo'], answer: 'Blue whale', explanation: 'The blue whale is the largest mammal in the world.', category: 'Animals', difficulty: 'Easy' },
      { question: 'What do plants use to make food?', options: ['Sunlight', 'Plastic', 'Sand', 'Stone'], answer: 'Sunlight', explanation: 'Plants use sunlight during photosynthesis to make their food.', category: 'Nature', difficulty: 'Very Easy' },
      { question: 'Which organ pumps blood around the body?', options: ['Liver', 'Brain', 'Heart', 'Lungs'], answer: 'Heart', explanation: 'The heart pumps blood to all parts of the body.', category: 'Human Body', difficulty: 'Easy' },
      { question: 'Which ocean is the largest on Earth?', options: ['Atlantic Ocean', 'Pacific Ocean', 'Indian Ocean', 'Arctic Ocean'], answer: 'Pacific Ocean', explanation: 'The Pacific Ocean is the largest and deepest ocean on Earth.', category: 'Geography', difficulty: 'Easy' },
      { question: 'What gas do plants take in from the air?', options: ['Oxygen', 'Carbon dioxide', 'Helium', 'Hydrogen'], answer: 'Carbon dioxide', explanation: 'Plants absorb carbon dioxide during photosynthesis.', category: 'Science', difficulty: 'Easy' },
      { question: 'Which device is used to type text on a computer?', options: ['Monitor', 'Keyboard', 'Printer', 'Speaker'], answer: 'Keyboard', explanation: 'A keyboard lets you enter letters and numbers.', category: 'Technology', difficulty: 'Easy' },
      { question: 'Which language has the most native speakers worldwide?', options: ['English', 'Mandarin Chinese', 'Spanish', 'Hindi'], answer: 'Mandarin Chinese', explanation: 'Mandarin Chinese has the most native speakers worldwide.', category: 'Language', difficulty: 'Easy' },
      { question: 'Which country is home to the Great Pyramids?', options: ['Greece', 'Egypt', 'Mexico', 'Italy'], answer: 'Egypt', explanation: 'The Great Pyramids are located in Egypt.', category: 'History', difficulty: 'Easy' },
      { question: 'What is the largest desert in the world?', options: ['Gobi Desert', 'Kalahari Desert', 'Sahara Desert', 'Antarctic Desert'], answer: 'Antarctic Desert', explanation: 'The Antarctic Desert is the largest desert by area, though it is covered in ice.', category: 'Geography', difficulty: 'Easy' },
      { question: 'Which bird is famous for mimicking human speech?', options: ['Pigeon', 'Parrot', 'Owl', 'Penguin'], answer: 'Parrot', explanation: 'Parrots are well known for mimicking sounds and speech.', category: 'Animals', difficulty: 'Very Easy' },
      { question: 'What is the boiling point of water at sea level?', options: ['90°C', '100°C', '120°C', '80°C'], answer: '100°C', explanation: 'Water boils at 100°C at standard atmospheric pressure at sea level.', category: 'Science', difficulty: 'Easy' },
      { question: 'Which instrument has 88 keys?', options: ['Violin', 'Piano', 'Flute', 'Trumpet'], answer: 'Piano', explanation: 'A standard piano has 88 keys.', category: 'Music', difficulty: 'Easy' },
      { question: 'Which is the longest river in the world?', options: ['Amazon River', 'Nile River', 'Yangtze River', 'Mississippi River'], answer: 'Amazon River', explanation: 'The Amazon River is generally considered the longest river in the world.', category: 'Geography', difficulty: 'Easy' },
      { question: 'What color is produced by mixing blue and yellow?', options: ['Green', 'Orange', 'Purple', 'Red'], answer: 'Green', explanation: 'Blue and yellow mix to make green.', category: 'Art', difficulty: 'Very Easy' },
      { question: 'What is the largest continent by land area?', options: ['Africa', 'Asia', 'Europe', 'North America'], answer: 'Asia', explanation: 'Asia is the largest continent by land area.', category: 'Geography', difficulty: 'Easy' },
      { question: 'Which planet is famous for its rings?', options: ['Mars', 'Jupiter', 'Venus', 'Mercury'], answer: 'Jupiter', explanation: 'Jupiter is known for its spectacular ring system, though Saturn is the most famous for rings.', category: 'Space', difficulty: 'Easy' },
      { question: 'Which is the largest moon of Saturn?', options: ['Europa', 'Titan', 'Ganymede', 'Io'], answer: 'Titan', explanation: 'Titan is the largest moon of Saturn and has a thick atmosphere.', category: 'Space', difficulty: 'Easy' },
      { question: 'Which metal is liquid at room temperature?', options: ['Iron', 'Gold', 'Mercury', 'Copper'], answer: 'Mercury', explanation: 'Mercury is a metal that is liquid at room temperature.', category: 'Science', difficulty: 'Easy' },
      { question: 'Which festival is known as the Festival of Lights?', options: ['Eid', 'Christmas', 'Diwali', 'Holi'], answer: 'Diwali', explanation: 'Diwali is widely known as the Festival of Lights.', category: 'Culture', difficulty: 'Easy' },
      { question: 'Which country hosted the 2016 Summer Olympics?', options: ['China', 'Brazil', 'Japan', 'UK'], answer: 'Brazil', explanation: 'Rio de Janeiro, Brazil hosted the 2016 Summer Olympics.', category: 'Sports', difficulty: 'Easy' },
      { question: 'Which is the tallest animal on Earth?', options: ['Elephant', 'Giraffe', 'Camel', 'Horse'], answer: 'Giraffe', explanation: 'The giraffe is the tallest land animal.', category: 'Animals', difficulty: 'Easy' },
      { question: 'How many sides does a hexagon have?', options: ['5', '6', '7', '8'], answer: '6', explanation: 'A hexagon has six sides.', category: 'Shapes', difficulty: 'Easy' },
      { question: 'Which gas is most abundant in Earth’s atmosphere?', options: ['Oxygen', 'Carbon dioxide', 'Nitrogen', 'Argon'], answer: 'Nitrogen', explanation: 'Nitrogen makes up the majority of Earth’s atmosphere.', category: 'Science', difficulty: 'Easy' },
      { question: 'Which organ helps us see?', options: ['Lungs', 'Eyes', 'Ears', 'Skin'], answer: 'Eyes', explanation: 'The eyes allow us to see the world around us.', category: 'Human Body', difficulty: 'Very Easy' },
      { question: 'Which country is famous for the Eiffel Tower?', options: ['Italy', 'France', 'Spain', 'Germany'], answer: 'France', explanation: 'The Eiffel Tower is one of the most famous landmarks in France.', category: 'Travel', difficulty: 'Easy' },
      { question: 'Which animal is known as the king of the jungle?', options: ['Tiger', 'Lion', 'Elephant', 'Leopard'], answer: 'Lion', explanation: 'The lion is often called the king of the jungle.', category: 'Animals', difficulty: 'Very Easy' },
      { question: 'Which month comes after June?', options: ['May', 'July', 'August', 'September'], answer: 'July', explanation: 'July comes after June in the calendar year.', category: 'General Knowledge', difficulty: 'Very Easy' },
      { question: 'Which continent is the Sahara Desert located in?', options: ['Asia', 'Australia', 'Africa', 'South America'], answer: 'Africa', explanation: 'The Sahara Desert spans much of North Africa.', category: 'Geography', difficulty: 'Easy' },
      { question: 'Which vitamin is produced when skin gets sunlight?', options: ['Vitamin A', 'Vitamin C', 'Vitamin D', 'Vitamin K'], answer: 'Vitamin D', explanation: 'The body produces vitamin D when skin is exposed to sunlight.', category: 'Health', difficulty: 'Easy' },
      { question: 'Which is the largest planet in the solar system?', options: ['Earth', 'Mars', 'Jupiter', 'Saturn'], answer: 'Jupiter', explanation: 'Jupiter is the largest planet in our solar system.', category: 'Space', difficulty: 'Easy' },
      { question: 'Which instrument do doctors use to listen to the heart?', options: ['Thermometer', 'Stethoscope', 'Microscope', 'X-ray'], answer: 'Stethoscope', explanation: 'Doctors use stethoscopes to listen to heart and lung sounds.', category: 'Health', difficulty: 'Easy' },
      { question: 'Which is the smallest prime number?', options: ['0', '1', '2', '3'], answer: '2', explanation: 'Two is the smallest prime number.', category: 'General Knowledge', difficulty: 'Easy' },
      { question: 'Who wrote the play Romeo and Juliet?', options: ['Charles Dickens', 'William Shakespeare', 'Jane Austen', 'Leo Tolstoy'], answer: 'William Shakespeare', explanation: 'Romeo and Juliet was written by William Shakespeare.', category: 'Literature', difficulty: 'Easy' },
      { question: 'Which ocean lies between Africa and Australia?', options: ['Atlantic Ocean', 'Indian Ocean', 'Arctic Ocean', 'Pacific Ocean'], answer: 'Indian Ocean', explanation: 'The Indian Ocean lies between Africa and Australia.', category: 'Geography', difficulty: 'Easy' },
      { question: 'Which animal can live both on land and in water?', options: ['Camel', 'Frog', 'Eagle', 'Rabbit'], answer: 'Frog', explanation: 'Frogs are amphibians that live both on land and in water.', category: 'Animals', difficulty: 'Easy' },
      { question: 'Which country is home to the city of Kyoto?', options: ['China', 'Japan', 'South Korea', 'Thailand'], answer: 'Japan', explanation: 'Kyoto is a historic city in Japan.', category: 'Travel', difficulty: 'Easy' },
      { question: 'What do bees collect from flowers?', options: ['Stone', 'Nectar', 'Sand', 'Paper'], answer: 'Nectar', explanation: 'Bees collect nectar from flowers and turn it into honey.', category: 'Nature', difficulty: 'Easy' },
      { question: 'Which planet is closest to the Sun?', options: ['Earth', 'Mercury', 'Venus', 'Mars'], answer: 'Mercury', explanation: 'Mercury is the planet closest to the Sun.', category: 'Space', difficulty: 'Easy' },
      { question: 'Which is a famous landmark in New York City?', options: ['Eiffel Tower', 'Statue of Liberty', 'Big Ben', 'Colosseum'], answer: 'Statue of Liberty', explanation: 'The Statue of Liberty is a famous landmark in New York City.', category: 'Travel', difficulty: 'Easy' },
      { question: 'Which fruit is known as a berry but is actually a seed inside a fleshy fruit?', options: ['Apple', 'Strawberry', 'Orange', 'Banana'], answer: 'Banana', explanation: 'Botanically, bananas are berries, though the term is often used differently in everyday speech.', category: 'Food', difficulty: 'Easy' },
      { question: 'Which country has the flag with a maple leaf?', options: ['Canada', 'Sweden', 'Brazil', 'Australia'], answer: 'Canada', explanation: 'Canada’s flag features a maple leaf.', category: 'Geography', difficulty: 'Easy' },
      { question: 'Which kind of animal is a shark?', options: ['Mammal', 'Bird', 'Fish', 'Reptile'], answer: 'Fish', explanation: 'Sharks are cartilaginous fish.', category: 'Animals', difficulty: 'Easy' },
      { question: 'Which is the main source of energy for Earth?', options: ['Moon', 'Wind', 'Sun', 'Ocean'], answer: 'Sun', explanation: 'The Sun is the main source of energy for Earth.', category: 'Science', difficulty: 'Easy' },
      { question: 'Which body part helps us breathe?', options: ['Brain', 'Lungs', 'Teeth', 'Hands'], answer: 'Lungs', explanation: 'The lungs are the organs used for breathing.', category: 'Human Body', difficulty: 'Very Easy' },
      { question: 'Which of these is a mammal?', options: ['Shark', 'Dolphin', 'Eagle', 'Lizard'], answer: 'Dolphin', explanation: 'Dolphins are mammals that live in the sea.', category: 'Animals', difficulty: 'Easy' },
      { question: 'Which shape has three sides?', options: ['Square', 'Triangle', 'Circle', 'Rectangle'], answer: 'Triangle', explanation: 'A triangle has three sides and three angles.', category: 'Shapes', difficulty: 'Very Easy' },
      { question: 'Which is the coldest continent?', options: ['Europe', 'Antarctica', 'Asia', 'South America'], answer: 'Antarctica', explanation: 'Antarctica is the coldest continent on Earth.', category: 'Geography', difficulty: 'Easy' },
      { question: 'What is the capital of Japan?', options: ['Seoul', 'Tokyo', 'Kyoto', 'Osaka'], answer: 'Tokyo', explanation: 'Tokyo is the capital city of Japan.', category: 'Geography', difficulty: 'Easy' },
      { question: 'Which gas helps plants make food?', options: ['Carbon dioxide', 'Oxygen', 'Helium', 'Hydrogen'], answer: 'Carbon dioxide', explanation: 'Plants use carbon dioxide during photosynthesis.', category: 'Nature', difficulty: 'Easy' },
      { question: 'Which desert is famous for camels and sand dunes?', options: ['Gobi', 'Atacama', 'Sahara', 'Antarctic'], answer: 'Sahara', explanation: 'The Sahara Desert is famous for its huge sand dunes and camels.', category: 'Geography', difficulty: 'Easy' },
      { question: 'Which famous structure is in Pisa, Italy?', options: ['Eiffel Tower', 'Leaning Tower of Pisa', 'Big Ben', 'Statue of Liberty'], answer: 'Leaning Tower of Pisa', explanation: 'The Leaning Tower of Pisa is a famous tilted bell tower in Italy.', category: 'Travel', difficulty: 'Easy' },
      { question: 'Which animal is the fastest land animal?', options: ['Cheetah', 'Horse', 'Lion', 'Rabbit'], answer: 'Cheetah', explanation: 'The cheetah is the fastest land animal.', category: 'Animals', difficulty: 'Easy' },
      { question: 'Which country is famous for the pyramids of Giza?', options: ['Mexico', 'Egypt', 'Morocco', 'Jordan'], answer: 'Egypt', explanation: 'The pyramids of Giza are one of Egypt’s most famous landmarks.', category: 'History', difficulty: 'Easy' },
      { question: 'Which is the largest ocean animal?', options: ['Blue whale', 'Elephant seal', 'Shark', 'Octopus'], answer: 'Blue whale', explanation: 'The blue whale is the largest known animal on Earth.', category: 'Animals', difficulty: 'Easy' },
      { question: 'Which planet is famous for its prominent rings?', options: ['Mars', 'Saturn', 'Neptune', 'Venus'], answer: 'Saturn', explanation: 'Saturn is best known for its beautiful rings.', category: 'Space', difficulty: 'Easy' },
      { question: 'Which body part is used for hearing?', options: ['Eyes', 'Ears', 'Nose', 'Mouth'], answer: 'Ears', explanation: 'The ears detect sound and help us hear.', category: 'Human Body', difficulty: 'Very Easy' },
      { question: 'Which country has the most time zones?', options: ['United States', 'France', 'Russia', 'Brazil'], answer: 'France', explanation: 'France has the most time zones because of its overseas territories.', category: 'Geography', difficulty: 'Easy' },
      { question: 'Who painted the Mona Lisa?', options: ['Vincent van Gogh', 'Leonardo da Vinci', 'Pablo Picasso', 'Claude Monet'], answer: 'Leonardo da Vinci', explanation: 'The Mona Lisa was painted by Leonardo da Vinci.', category: 'Art', difficulty: 'Easy' },
      { question: 'Which is the capital of Australia?', options: ['Sydney', 'Melbourne', 'Canberra', 'Perth'], answer: 'Canberra', explanation: 'Canberra is the capital city of Australia.', category: 'Geography', difficulty: 'Easy' },
      { question: 'Which color is associated with a stop sign?', options: ['Blue', 'Red', 'Yellow', 'Green'], answer: 'Red', explanation: 'Stop signs are red to signal drivers to stop.', category: 'Everyday life', difficulty: 'Very Easy' },
      { question: 'Which continent is the Amazon rainforest mainly located in?', options: ['Africa', 'Asia', 'South America', 'Europe'], answer: 'South America', explanation: 'The Amazon rainforest is mainly located in South America.', category: 'Geography', difficulty: 'Easy' },
      { question: 'Which animal is known for carrying its home on its back?', options: ['Snail', 'Bear', 'Horse', 'Rabbit'], answer: 'Snail', explanation: 'A snail carries its shell, which acts like its home.', category: 'Animals', difficulty: 'Very Easy' },
      { question: 'Which country is famous for the city of Venice?', options: ['France', 'Italy', 'Spain', 'Greece'], answer: 'Italy', explanation: 'Venice is a famous city in Italy built on canals.', category: 'Travel', difficulty: 'Easy' },
      { question: 'Which metal is often used to make coins?', options: ['Silver', 'Gold', 'Iron', 'Copper'], answer: 'Copper', explanation: 'Copper is commonly used in coinage and electrical wiring.', category: 'Science', difficulty: 'Easy' },
      { question: 'Which is the national flower of India?', options: ['Rose', 'Lotus', 'Sunflower', 'Tulip'], answer: 'Lotus', explanation: 'The lotus is the national flower of India.', category: 'Culture', difficulty: 'Easy' },
      { question: 'Which planet has the most moons in our solar system?', options: ['Mars', 'Jupiter', 'Saturn', 'Neptune'], answer: 'Saturn', explanation: 'Saturn is known to have the largest number of moons in our solar system.', category: 'Space', difficulty: 'Easy' },
      { question: 'Which is the largest bird in the world?', options: ['Eagle', 'Ostrich', 'Penguin', 'Condor'], answer: 'Ostrich', explanation: 'The ostrich is the largest bird in the world.', category: 'Animals', difficulty: 'Easy' },
      { question: 'Which layer of Earth do we live on?', options: ['Core', 'Mantle', 'Crust', 'Outer core'], answer: 'Crust', explanation: 'The crust is the outermost solid layer of Earth we live on.', category: 'Science', difficulty: 'Easy' },
      { question: 'Which is the national animal of India?', options: ['Tiger', 'Elephant', 'Peacock', 'Lion'], answer: 'Tiger', explanation: 'The tiger is the national animal of India.', category: 'Culture', difficulty: 'Easy' },
      { question: 'Which instrument is played by blowing air into it?', options: ['Drum', 'Guitar', 'Flute', 'Piano'], answer: 'Flute', explanation: 'The flute is played by blowing air through it.', category: 'Music', difficulty: 'Easy' },
      { question: 'Which country is called the Land of the Rising Sun?', options: ['China', 'Japan', 'South Korea', 'Thailand'], answer: 'Japan', explanation: 'Japan is often called the Land of the Rising Sun.', category: 'Geography', difficulty: 'Easy' },
      { question: 'Which currency is used in the United Kingdom?', options: ['Euro', 'Dollar', 'Pound sterling', 'Yen'], answer: 'Pound sterling', explanation: 'The United Kingdom uses the pound sterling.', category: 'Finance', difficulty: 'Easy' },
      { question: 'Which continent has the most countries?', options: ['Europe', 'Africa', 'Asia', 'North America'], answer: 'Africa', explanation: 'Africa has the most countries of any continent.', category: 'Geography', difficulty: 'Easy' },
      { question: 'Which of these is a renewable energy source?', options: ['Coal', 'Natural gas', 'Solar power', 'Oil'], answer: 'Solar power', explanation: 'Solar power is a renewable energy source because it comes from sunlight.', category: 'Environment', difficulty: 'Easy' },
      { question: 'Which animal is the largest land animal?', options: ['Giraffe', 'Elephant', 'Hippo', 'Rhino'], answer: 'Elephant', explanation: 'The African elephant is the largest land animal.', category: 'Animals', difficulty: 'Easy' },
      { question: 'Which direction does the Sun rise from?', options: ['West', 'North', 'East', 'South'], answer: 'East', explanation: 'The Sun appears to rise in the east.', category: 'Nature', difficulty: 'Very Easy' },
      { question: 'Which city is known as the City of Love?', options: ['Paris', 'Rome', 'London', 'New York'], answer: 'Paris', explanation: 'Paris is often known as the City of Love.', category: 'Travel', difficulty: 'Easy' },
      { question: 'Which type of tree is known for producing acorns?', options: ['Oak', 'Pine', 'Maple', 'Birch'], answer: 'Oak', explanation: 'Oak trees produce acorns.', category: 'Nature', difficulty: 'Easy' },
      { question: 'Which is the tallest mountain above sea level?', options: ['K2', 'Mount Kilimanjaro', 'Mount Everest', 'Denali'], answer: 'Mount Everest', explanation: 'Mount Everest is the highest mountain above sea level.', category: 'Geography', difficulty: 'Easy' },
      { question: 'Which sea is between Europe and Africa?', options: ['Red Sea', 'Black Sea', 'Mediterranean Sea', 'Baltic Sea'], answer: 'Mediterranean Sea', explanation: 'The Mediterranean Sea lies between Europe and Africa.', category: 'Geography', difficulty: 'Easy' },
      { question: 'Which is the symbol for the element gold?', options: ['Ag', 'Au', 'Gd', 'Go'], answer: 'Au', explanation: 'The chemical symbol for gold is Au.', category: 'Science', difficulty: 'Easy' },
      { question: 'What is the capital of Canada?', options: ['Toronto', 'Vancouver', 'Ottawa', 'Montreal'], answer: 'Ottawa', explanation: 'Ottawa is the capital city of Canada.', category: 'Geography', difficulty: 'Easy' },
      { question: 'Which of these is a source of protein?', options: ['Rice', 'Eggs', 'Sugar', 'Butter'], answer: 'Eggs', explanation: 'Eggs are a rich source of protein.', category: 'Food', difficulty: 'Easy' },
      { question: 'Which animal is famous for black and white stripes?', options: ['Tiger', 'Zebra', 'Giraffe', 'Horse'], answer: 'Zebra', explanation: 'Zebras are known for their black-and-white stripes.', category: 'Animals', difficulty: 'Easy' },
      { question: 'What do we call a baby frog?', options: ['Puppy', 'Cub', 'Tadpole', 'Chick'], answer: 'Tadpole', explanation: 'A baby frog is called a tadpole.', category: 'Animals', difficulty: 'Easy' },
      { question: 'Which country is home to the city of Barcelona?', options: ['France', 'Spain', 'Portugal', 'Italy'], answer: 'Spain', explanation: 'Barcelona is a major city in Spain.', category: 'Travel', difficulty: 'Easy' },
      { question: 'Which renewable resource powers wind turbines?', options: ['Sun', 'Wind', 'Coal', 'Oil'], answer: 'Wind', explanation: 'Wind turbines generate electricity from moving air.', category: 'Environment', difficulty: 'Easy' },
      { question: 'Which is the capital of Germany?', options: ['Berlin', 'Munich', 'Hamburg', 'Frankfurt'], answer: 'Berlin', explanation: 'Berlin is the capital of Germany.', category: 'Geography', difficulty: 'Easy' },
      { question: 'Which country is famous for the Great Wall?', options: ['India', 'China', 'Japan', 'Mongolia'], answer: 'China', explanation: 'The Great Wall is one of the most famous landmarks in China.', category: 'History', difficulty: 'Easy' },
      { question: 'Which sense helps detect smell?', options: ['Taste', 'Smell', 'Touch', 'Hearing'], answer: 'Smell', explanation: 'Our nose helps us detect smell.', category: 'Human Body', difficulty: 'Very Easy' },
      { question: 'Which is the largest island in the world?', options: ['Madagascar', 'Greenland', 'Borneo', 'Sumatra'], answer: 'Greenland', explanation: 'Greenland is the largest island in the world.', category: 'Geography', difficulty: 'Easy' },
      { question: 'What is the hardest natural substance?', options: ['Iron', 'Diamond', 'Granite', 'Gold'], answer: 'Diamond', explanation: 'Diamond is the hardest naturally occurring substance on Earth.', category: 'Science', difficulty: 'Easy' }
    ];

    for (let i = 0; i < 500; i++) {
      const fact = facts[i % facts.length];
      const question = {
        id: `q-${i + 1}`,
        question: fact.question,
        options: fact.options.slice(0, 4).map(String),
        correctAnswer: String(fact.answer),
        explanation: fact.explanation,
        category: fact.category,
        difficulty: fact.difficulty,
        sequence: i + 1
      };
      bank.push(question);
    }

    return bank;
  }

  function createQuestion(questionText, options, answer, explanation, category, difficulty) {
    const safeOptions = Array.isArray(options) ? options.slice(0, 4) : [];
    const cleaned = safeOptions.map((option) => String(option));
    const correctAnswer = String(answer);
    return {
      question: questionText,
      options: cleaned,
      correctAnswer,
      explanation,
      category: category || 'General Knowledge',
      difficulty: difficulty || 'Easy'
    };
  }

  function getNormalizedProgress() {
    const base = {
      unlockedQuizNumber: 1,
      totalScore: 0,
      completedQuizzes: 0,
      currentStreak: 0,
      longestStreak: 0,
      completed: {},
      bestScores: {},
      lastPlayedQuiz: null,
      userId: null,
      username: null
    };
    const current = Storage.get(QUIZ_STORAGE_KEY, base);
    return { ...base, ...current, completed: current.completed || {}, bestScores: current.bestScores || {} };
  }

  function saveProgress(progress) {
    Storage.set(QUIZ_STORAGE_KEY, progress);
  }

  function getQuizProgress() {
    const user = (typeof FarmyState !== 'undefined' && FarmyState.user) || null;
    const key = user && user.id ? `${QUIZ_STORAGE_KEY}_${user.id}` : QUIZ_STORAGE_KEY;
    const base = getNormalizedProgress();
    const stored = Storage.get(key, base);
    const merged = { ...base, ...stored, completed: stored.completed || base.completed, bestScores: stored.bestScores || base.bestScores };
    if (user && user.id) merged.userId = user.id;
    if (user && user.name) merged.username = user.name;
    return merged;
  }

  function saveQuizProgress(progress) {
    const user = (typeof FarmyState !== 'undefined' && FarmyState.user) || null;
    const key = user && user.id ? `${QUIZ_STORAGE_KEY}_${user.id}` : QUIZ_STORAGE_KEY;
    Storage.set(key, progress);
  }

  function getDemoLeaderboard() {
    return [
      { rank: 1, player: 'Alex', score: 4920 },
      { rank: 2, player: 'Priya', score: 4870 },
      { rank: 3, player: 'Rahul', score: 4810 },
      { rank: 4, player: 'Siva', score: 4750 },
      { rank: 5, player: 'Nina', score: 4680 }
    ];
  }

  async function fetchLeaderboard() {
    try {
      const data = await apiFetch('/quiz/leaderboard');
      const leaderboard = Array.isArray(data && data.leaderboard) ? data.leaderboard : getDemoLeaderboard();
      const source = data && data.source === 'demo' ? 'Demo leaderboard' : 'Global leaderboard';
      return { leaderboard, source };
    } catch (e) {
      return { leaderboard: getDemoLeaderboard(), source: 'Demo leaderboard' };
    }
  }

  async function sendQuizProgress(payload) {
    try {
      return await apiFetch('/quiz/progress', {
        method: 'POST',
        body: JSON.stringify(payload)
      });
    } catch (e) {
      return { ok: true, demo: true, progress: payload };
    }
  }

  async function sendQuizScore(payload) {
    try {
      return await apiFetch('/quiz/score', {
        method: 'POST',
        body: JSON.stringify(payload)
      });
    } catch (e) {
      return { ok: true, demo: true, result: payload };
    }
  }

  function renderLeaderboard(leaderboard, sourceLabel) {
    const container = document.getElementById('quizLeaderboard');
    if (!container) return;
    container.innerHTML = `
      <div class="leaderboard-header">
        <div>🏆 ${t('quiz.leaderboard', 'Global Leaderboard')}</div>
        <span class="source-pill">${sourceLabel}</span>
      </div>
      <table>
        <thead>
          <tr><th>${t('quiz.rank', 'Rank')}</th><th>${t('quiz.player', 'Player')}</th><th>${t('quiz.score', 'Score')}</th></tr>
        </thead>
        <tbody>
          ${leaderboard.map((row) => `
            <tr>
              <td>#${row.rank}</td>
              <td>${row.player}</td>
              <td>${row.score}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;
  }

  function updateDashboardSummary() {
    const root = document.getElementById('quizDashboard');
    if (!root) return;
    const progress = getQuizProgress();
    const completedCount = Object.keys(progress.completed || {}).length;
    const totalScore = Object.values(progress.bestScores || {}).reduce((sum, score) => sum + Number(score || 0), 0);
    const user = (typeof FarmyState !== 'undefined' && FarmyState.user) || null;
    const scoreDisplay = user && user.name ? user.name : 'Farmer';
    root.innerHTML = `
      <div class="quiz-dashboard-card">
        <div class="quiz-brand-row">
          <div>
            <p class="quiz-eyebrow">🌱 FARMY QUIZ</p>
            <h2>${t('quiz.title', 'Farmy Quiz')}</h2>
            <p class="quiz-subtitle">${t('quiz.subtitle', 'Learn • Play • Grow')}</p>
          </div>
          <div class="quiz-mini-score">${t('quiz.score', 'Score')}: ${totalScore} 🔥 ${progress.currentStreak || 0}</div>
        </div>
        <div class="quiz-stats-grid">
          <div class="stat-box"><strong>50</strong><span>${t('quiz.quizzes', 'Quizzes')}</span></div>
          <div class="stat-box"><strong>500</strong><span>${t('quiz.questions', 'Questions')}</span></div>
          <div class="stat-box"><strong>${totalScore}</strong><span>${t('quiz.totalScore', 'Total Score')}</span></div>
          <div class="stat-box"><strong>${completedCount}</strong><span>${t('quiz.completed', 'Completed Quizzes')}</span></div>
          <div class="stat-box"><strong>${progress.currentStreak || 0}</strong><span>${t('quiz.streak', 'Current Streak')}</span></div>
        </div>
      </div>
    `;
  }

  function quizCardHtml(quiz, progress) {
    const completed = progress.completed && progress.completed[quiz.number];
    const unlocked = quiz.number <= (progress.unlockedQuizNumber || 1);
    const best = progress.bestScores && progress.bestScores[quiz.number];

    if (completed) {
      return `
        <div class="quiz-card completed">
          <div class="quiz-card-header">
            <div>
              <div class="quiz-card-number">Quiz ${quiz.number}</div>
              <h3>${quiz.title}</h3>
            </div>
            <span class="quiz-badge success">✓ ${t('quiz.completed', 'Completed')}</span>
          </div>
          <div class="quiz-meta">${quiz.questions.length} ${t('quiz.questions', 'Questions')}</div>
          <div class="quiz-result-line">${t('quiz.score', 'Score')}: ${completed.score}/10</div>
          <div class="quiz-result-line">${t('quiz.best', 'Best')}: ${best || completed.score}/10</div>
          <button class="btn-primary small" onclick="startQuiz(${quiz.number})">${t('quiz.playAgain', 'Play Again')}</button>
        </div>
      `;
    }

    if (unlocked) {
      return `
        <div class="quiz-card">
          <div class="quiz-card-header">
            <div>
              <div class="quiz-card-number">Quiz ${quiz.number}</div>
              <h3>${quiz.title}</h3>
            </div>
            <span class="quiz-badge neutral">${quiz.difficulty}</span>
          </div>
          <div class="quiz-meta">${quiz.questions.length} ${t('quiz.questions', 'Questions')}</div>
          <button class="btn-primary small" onclick="startQuiz(${quiz.number})">${t('quiz.start', 'Start Quiz')}</button>
        </div>
      `;
    }

    return `
      <div class="quiz-card locked">
        <div class="quiz-card-header">
          <div>
            <div class="quiz-card-number">Quiz ${quiz.number}</div>
            <h3>${quiz.title}</h3>
          </div>
          <span class="quiz-badge locked">🔒 ${t('quiz.locked', 'Locked')}</span>
        </div>
        <div class="quiz-meta">${quiz.questions.length} ${t('quiz.questions', 'Questions')}</div>
        <button class="btn-secondary small" disabled>${t('quiz.locked', 'Locked')}</button>
      </div>
    `;
  }

  function renderQuizCards() {
    const container = document.getElementById('quizCards');
    if (!container) return;
    const progress = getQuizProgress();
    const catalog = getQuizCatalog();
    container.innerHTML = catalog.map((quiz) => quizCardHtml(quiz, progress)).join('');
  }

  function renderQuizHome() {
    updateDashboardSummary();
    renderQuizCards();
    const leaderboardData = getDemoLeaderboard();
    renderLeaderboard(leaderboardData, 'Demo leaderboard');
    fetchLeaderboard().then(({ leaderboard, source }) => renderLeaderboard(leaderboard, source)).catch(() => {});
  }

  function renderQuizPlayArea() {
    const container = document.getElementById('quizPlayArea');
    if (!container || !window.__farmyQuizSession) return;
    const session = window.__farmyQuizSession;
    const quiz = session.quiz;
    const q = quiz.questions[session.currentQuestionIndex];
    const answered = session.answered;
    const percent = ((session.currentQuestionIndex + (answered ? 1 : 0)) / quiz.questions.length) * 100;

    container.innerHTML = `
      <div class="quiz-session-card">
        <div class="quiz-inline-header">
          <div>
            <div class="quiz-card-number">Quiz ${quiz.number} — ${quiz.title}</div>
            <h3>${t('quiz.question', 'Question')} ${session.currentQuestionIndex + 1} ${t('quiz.of', 'of')} ${quiz.questions.length}</h3>
          </div>
          <div class="quiz-streak-pill">🔥 ${session.streak || 0} ${t('quiz.answered', 'Answer Streak')}</div>
        </div>
        <div class="progressbar"><span style="width:${percent}%"></span></div>
        <div class="question-block">
          <div class="question-label">${t('quiz.question', 'Question')}</div>
          <h4>${q.question}</h4>
        </div>
        <div class="answer-list">
          ${q.options.map((option, idx) => {
            const selected = answered && option === session.selectedAnswer;
            const correct = answered && option === q.correctAnswer;
            const className = answered
              ? (correct ? 'answer-option correct' : selected ? 'answer-option incorrect' : 'answer-option disabled')
              : 'answer-option';
            return `
              <button class="${className}" data-option="${option.replace(/"/g, '&quot;')}" onclick="selectAnswer('${option.replace(/'/g, "\\'").replace(/"/g, '\\"')}')" ${answered ? 'disabled' : ''}>
                <span>${String.fromCharCode(65 + idx)}.</span> ${option}
              </button>
            `;
          }).join('')}
        </div>
        ${answered ? `
          <div class="answer-feedback ${session.isCorrect ? 'correct' : 'incorrect'}">
            <div class="feedback-status">${session.isCorrect ? '✓ ' + t('quiz.correct', 'Correct!') : '✗ ' + t('quiz.incorrect', 'Incorrect')}</div>
            <div class="feedback-answer">${t('quiz.correctAnswer', 'Correct Answer')}: ${q.correctAnswer}</div>
            <div class="feedback-explanation">${q.explanation}</div>
          </div>
        ` : ''}
        <div class="action-row">
          ${answered ? `<button class="btn-primary" onclick="advanceQuestion()">${session.currentQuestionIndex === quiz.questions.length - 1 ? t('quiz.finish', 'Finish Quiz') : t('quiz.nextQuestion', 'Next Question')}</button>` : ''}
        </div>
      </div>
    `;
  }

  function startQuiz(quizNumber) {
    const catalog = getQuizCatalog();
    const quiz = catalog.find(item => item.number === Number(quizNumber));
    if (!quiz) return;
    const progress = getQuizProgress();
    if (quiz.number > (progress.unlockedQuizNumber || 1)) {
      return;
    }
    const session = {
      quiz,
      currentQuestionIndex: 0,
      answered: false,
      selectedAnswer: null,
      isCorrect: false,
      score: 0,
      correct: 0,
      wrong: 0,
      streak: progress.currentStreak || 0
    };
    window.__farmyQuizSession = session;
    document.getElementById('quizDashboard').style.display = 'none';
    document.getElementById('quizCards').style.display = 'none';
    document.getElementById('quizPlayArea').style.display = 'block';
    renderQuizPlayArea();
  }

  function selectAnswer(optionText) {
    const session = window.__farmyQuizSession;
    if (!session || session.answered) return;
    const q = session.quiz.questions[session.currentQuestionIndex];
    const isCorrect = optionText === q.correctAnswer;
    session.answered = true;
    session.selectedAnswer = optionText;
    session.isCorrect = isCorrect;
    session.score += isCorrect ? 10 : 0;
    session.correct += isCorrect ? 1 : 0;
    session.wrong += isCorrect ? 0 : 1;
    session.streak = isCorrect ? (session.streak || 0) + 1 : 0;

    const progress = getQuizProgress();
    progress.currentStreak = session.streak;
    progress.longestStreak = Math.max(progress.longestStreak || 0, session.streak);
    saveQuizProgress(progress);
    renderQuizPlayArea();
  }

  function advanceQuestion() {
    const session = window.__farmyQuizSession;
    if (!session) return;
    const isLastQuestion = session.currentQuestionIndex >= session.quiz.questions.length - 1;
    if (!isLastQuestion) {
      session.currentQuestionIndex += 1;
      session.answered = false;
      session.selectedAnswer = null;
      session.isCorrect = false;
      renderQuizPlayArea();
      return;
    }
    finishQuiz(session);
  }

  async function finishQuiz(session) {
    const progress = getQuizProgress();
    const quizNumber = session.quiz.number;
    const score = session.score;
    const prevBest = progress.bestScores && progress.bestScores[quizNumber];
    const nextBest = Math.max(Number(prevBest || 0), Number(score || 0));
    progress.bestScores = progress.bestScores || {};
    progress.bestScores[quizNumber] = nextBest;
    progress.completed = progress.completed || {};
    progress.completed[quizNumber] = {
      score,
      correct: session.correct,
      wrong: session.wrong,
      completedAt: new Date().toISOString()
    };
    progress.totalScore = Object.values(progress.bestScores).reduce((sum, item) => sum + Number(item || 0), 0);
    progress.completedQuizzes = Object.keys(progress.completed).length;
    progress.unlockedQuizNumber = Math.min(50, Math.max(progress.unlockedQuizNumber || 1, quizNumber + 1));
    progress.lastPlayedQuiz = quizNumber;
    saveQuizProgress(progress);

    const payload = {
      userId: (typeof FarmyState !== 'undefined' && FarmyState.user && FarmyState.user.id) || 'demo-user',
      username: (typeof FarmyState !== 'undefined' && FarmyState.user && FarmyState.user.name) || 'Farmer',
      quizNumber,
      quizId: `quiz-${quizNumber}`,
      score,
      correctAnswers: session.correct,
      wrongAnswers: session.wrong,
      currentStreak: progress.currentStreak || 0,
      longestStreak: progress.longestStreak || 0,
      completedAt: new Date().toISOString()
    };

    await sendQuizScore(payload);
    await sendQuizProgress({
      userId: payload.userId,
      username: payload.username,
      quizNumber,
      totalScore: progress.totalScore,
      completedQuizzes: progress.completedQuizzes,
      currentStreak: progress.currentStreak,
      longestStreak: progress.longestStreak,
      bestQuizScore: nextBest,
      lastPlayedQuiz: quizNumber
    });

    const resultContainer = document.getElementById('quizPlayArea');
    const nextQuizNumber = Math.min(50, quizNumber + 1);
    const hasNextQuiz = nextQuizNumber <= 50;
    const correctCount = session.correct;
    const scoreOutOfTen = correctCount;
    const pointsEarned = correctCount * 10;

    resultContainer.innerHTML = `
      <div class="quiz-session-card summary-card">
        <div class="summary-badge">🎉 ${t('quiz.completeTitle', 'QUIZ COMPLETE!')}</div>
        <h3>${scoreOutOfTen} / 10</h3>
        <div class="summary-score-row">
          <div><span class="small-label">${pointsEarned} ${t('quiz.points', 'Points')}</span></div>
          <div><span class="small-label">🔥 ${t('quiz.streak', 'Current Streak')}: ${progress.currentStreak || 0}</span></div>
        </div>
        <div class="summary-metrics">
          <div><span>${t('quiz.correct', 'Correct')}</span><strong>${correctCount}</strong></div>
          <div><span>${t('quiz.incorrect', 'Incorrect')}</span><strong>${session.wrong}</strong></div>
        </div>
        <div class="action-row stacked">
          ${hasNextQuiz ? `<button class="btn-primary" onclick="startQuiz(${nextQuizNumber})">${t('quiz.nextQuiz', 'Next Quiz')}</button>` : ''}
          <button class="btn-secondary" onclick="restartCurrentQuiz(${quizNumber})">${t('quiz.playAgain', 'Play Again')}</button>
          <button class="btn-secondary" onclick="returnToQuizHome()">${t('quiz.quizHome', 'Quiz Home')}</button>
        </div>
      </div>
    `;

    renderQuizHome();
  }

  function restartCurrentQuiz(quizNumber) {
    startQuiz(quizNumber);
  }

  function returnToQuizHome() {
    document.getElementById('quizDashboard').style.display = 'block';
    document.getElementById('quizCards').style.display = 'grid';
    document.getElementById('quizPlayArea').style.display = 'none';
    renderQuizHome();
  }

  function initQuizPage() {
    const root = document.getElementById('quizPageRoot');
    if (!root) return;
    renderBottomNav('quiz');
    renderQuizHome();
    document.getElementById('quizHomeBtn')?.addEventListener('click', returnToQuizHome);
    window.startQuiz = startQuiz;
    window.selectAnswer = selectAnswer;
    window.advanceQuestion = advanceQuestion;
    window.restartCurrentQuiz = restartCurrentQuiz;
    window.returnToQuizHome = returnToQuizHome;
    window.__farmyQuizSession = null;
  }

  if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', initQuizPage);
  }

  if (typeof globalThis !== 'undefined') {
    Object.assign(globalThis, {
      buildQuestionBank,
      getQuizCatalog,
      getQuizProgress,
      saveQuizProgress,
      renderQuizHome,
      fetchLeaderboard,
      sendQuizProgress,
      sendQuizScore,
      getDemoLeaderboard
    });
  }
})();
