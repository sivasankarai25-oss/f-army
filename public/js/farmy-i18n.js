(function () {
  const translations = {
    en: {
      language: 'English',
      nav: {
        home: 'Home',
        recommend: 'Recommend',
        farm: 'My Farm',
        procurement: 'Procurement',
        crops: 'Crops',
        quiz: 'Quiz',
        tools: 'Tools',
        assistant: 'Assistant'
      },
      common: {
        back: 'Back',
        loading: 'Loading…',
        save: 'Save',
        cancel: 'Cancel',
        ok: 'OK',
        search: 'Search…',
        noData: 'No data available',
        error: 'Error',
        success: 'Success',
        demoMode: 'Demo mode',
        liveMode: 'Live mode',
        account: 'Account / Profile'
      },
      home: {
        welcome: 'Welcome back,',
        searchPlaceholder: 'Search a crop — tomato, rice, mango…',
        ctaTitle: 'Find Suitable Crop',
        ctaSubtitle: 'Answer a few questions about your land',
        weather: 'Partly cloudy',
        popular: 'Popular crops',
        tools: 'Quick tools',
        quickFarm: '🚜 My Farm',
        quickProcurement: '🛒 Procurement',
        quickPest: '🐛 Pest Check',
        quickSoil: '🧪 Soil Check',
        quickProfit: '💰 Profit Calc',
        quizCardTitle: 'FARMY QUIZ',
        quizCardText: 'Take a quick quiz and earn points.',
        quizCardAction: 'Play Quiz →',
        kharif: 'Recommended for Kharif season'
      },
      auth: {
        brand: 'Your smart farming companion',
        phone: 'Phone',
        email: 'Email',
        phoneNumber: 'Phone number',
        emailAddress: 'Email address',
        nameOptional: 'Your name (optional)',
        placeholderPhone: 'e.g. 9876543210',
        placeholderEmail: 'e.g. farmer@example.com',
        sendOtp: 'Send OTP',
        verifyCode: 'Verify your code',
        codeSent: 'Code sent to',
        enterCode: 'Enter code',
        verifyContinue: 'Verify & Continue',
        useDifferent: 'Use a different number/email',
        invalidPhone: 'Please enter a valid phone number (digits only)',
        invalidEmail: 'Please enter a valid email address',
        missingContact: 'Please enter your',
        invalidCode: 'Incorrect code. Please try again or use',
        demoOtp: 'Demo mode: Here is your local verification code:',
        liveOtp: 'Live verification code sent to',
        inbox: 'Check your',
        inboxSuffix: 'inbox.'
      },
      assistant: {
        title: 'Farmy Assistant 🌱',
        clear: 'Clear conversation',
        placeholder: 'Ask about planting, water, pests, fertilizer…',
        send: 'Send',
        typing: 'Farmy is typing…',
        clearConfirm: 'Clear chat history?',
        greeting: "Hello! I'm Farmy Assistant 🌱. How can I help your farm today?",
        fallback: 'I am running in offline Demo Mode. Try asking about a specific crop.',
        search: 'Ask about planting, water, pests, fertilizer…'
      },
      recommend: {
        title: 'Find Suitable Crop',
        hint: 'Tell us about your land and conditions — we will match them against our agricultural crop database.',
        soilType: 'Soil Type',
        soilPh: 'Soil pH',
        temp: 'Average Temperature (°C)',
        water: 'Water Availability',
        season: 'Growing Season',
        getRecommendations: 'Get Recommendations',
        analyzing: 'Analyzing crops…',
        resultsHint: 'Ranked by agronomic suitability for your exact farm conditions:',
        tryDifferent: 'Try Different Conditions',
        statusLow: 'Low (Rainfed / scarce)',
        statusMedium: 'Medium (Borewell / canal)',
        statusHigh: 'High (Abundant / flood irrigated)',
        seasonKharif: 'Kharif (Monsoon / Summer)',
        seasonRabi: 'Rabi (Winter / Post-monsoon)',
        seasonZaid: 'Zaid (Dry hot summer)'
      },
      farm: {
        title: 'My Farm Tracker',
        addCrop: 'Add Crop',
        addAnother: 'Add Another Crop',
        emptyTitle: 'No crops added yet',
        emptyText: 'Add crops you have sown to automatically calculate growth stages, watering needs, and harvest schedules.',
        browse: 'Browse Crop Catalog',
        days: 'Days since planting',
        currentStage: 'Current stage',
        irrigationRule: 'Irrigation rule',
        expectedHarvest: 'Expected harvest',
        viewGuide: 'View Guide →',
        estimateYield: 'Estimate Yield',
        removeConfirm: 'Are you sure you want to remove this crop from My Farm?'
      },
      crops: {
        title: 'Crop Database',
        searchPlaceholder: 'Search crops (e.g. tomato, rice, wheat)…',
        all: 'All',
        vegetables: 'Vegetables',
        grains: 'Grains',
        pulses: 'Pulses',
        fruits: 'Fruits',
        showing: 'Showing',
        crops: 'crops',
        noCrops: 'No crops found',
        noCropsText: 'Try searching for a different crop name or reset the category filter.'
      },
      weather: {
        title: 'Weather & Advisory',
        checkSuitability: 'Check Suitability for a Crop',
        forecastTitle: '5-Day Forecast',
        chooseCrop: 'Choose Crop',
        noData: 'Forecast unavailable',
        suitable: 'Weather is suitable for growing',
        borderline: 'Weather is borderline for',
        unsuitable: 'Weather is currently unfavourable for'
      },
      soil: {
        title: 'Soil Health Check',
        hint: 'Enter your soil test values or field observations to check nutrient balance and crop compatibility.',
        type: 'Soil Type',
        ph: 'Soil pH',
        nitrogen: 'Nitrogen (N) Level',
        phosphorus: 'Phosphorus (P) Level',
        potassium: 'Potassium (K) Level',
        moisture: 'Soil Moisture',
        check: 'Check Soil Health',
        note: 'Good soil health',
        compare: 'Compare with a Crop',
        newCheck: 'New Soil Check',
        estimateYield: 'Estimate Yield With This Soil →',
        calculating: 'Calculating…'
      },
      yield: {
        title: 'Yield Prediction',
        hint: 'Estimate expected production output based on farm area, soil condition, and farming practices.',
        crop: 'Select Crop',
        area: 'Farm Area (Acres)',
        soilScore: 'Soil Health Score (0–100)',
        method: 'Farming Method',
        methodConventional: 'Conventional (Standard fertilizers & protection)',
        methodOrganic: 'Organic / Natural (Bio-inputs, zero chemical)',
        estimate: 'Estimate Expected Yield',
        calculating: 'Calculating…',
        resultTitle: 'Estimated Yield Range',
        avg: 'Average expectation',
        reminder: 'Actual yield depends on monsoon regularity, pest control timing, and day-to-day farm management.',
        calculateProfit: 'Calculate Financial Profit →'
      },
      profit: {
        title: 'Profit Calculator',
        hint: 'Estimate costs, revenues, and projected net earnings for your farming season.',
        area: 'Farm Area (Acres)',
        seeds: 'Seeds & Saplings',
        fertilizer: 'Fertilizers & Soil Amendments',
        labour: 'Labour & Weeding',
        irrigation: 'Irrigation, Fuel & Machinery',
        other: 'Crop Protection & Other Expenses',
        yield: 'Expected Total Yield (kg)',
        price: 'Expected Mandi / Selling Price (₹/kg)',
        calculate: 'Calculate Net Profit',
        calculating: 'Calculating…',
        totalCost: 'Total Production Cost',
        revenue: 'Gross Expected Revenue',
        profit: 'Estimated Net Profit',
        perAcre: 'Net Profit per Acre',
        reminder: 'Market Reminder: Mandi prices fluctuate daily based on local arrivals. Check current wholesale rates before harvesting and selling.'
      },
      pests: {
        title: 'Pest & Disease Check',
        hint: 'Select visible symptoms to identify likely pests or diseases and safe IPM control methods:',
        filter: 'Filter by specific crop (optional)',
        noMatchTitle: 'No direct match',
        noMatchText: 'Try toggling other symptoms or clear the crop filter to view all potential diagnoses.',
        advice: 'Pesticide Safety Advisory',
        symptoms: ['Yellow leaves', 'Brown spots', 'Holes in leaves', 'Wilting', 'Insects visible', 'Mold or fungus']
      },
      quiz: {
        eyebrow: '🌱 FARMY QUIZ',
        title: 'Farmy Quiz',
        subtitle: 'Learn • Play • Grow',
        score: 'Score',
        quizzes: 'Quizzes',
        questions: 'Questions',
        totalScore: 'Total Score',
        completed: 'Completed Quizzes',
        streak: 'Current Streak',
        leaderboard: 'Global Leaderboard',
        start: 'Start Quiz',
        playAgain: 'Play Again',
        locked: 'Locked',
        nextQuestion: 'Next Question',
        finish: 'Finish Quiz',
        correct: 'Correct!',
        incorrect: 'Incorrect',
        correctAnswer: 'Correct Answer',
        completeTitle: 'QUIZ COMPLETE!',
        points: 'Points',
        nextQuiz: 'Next Quiz',
        quizHome: 'Quiz Home',
        question: 'Question',
        of: 'of',
        answered: 'Answer Streak',
        percent: 'Progress',
        best: 'Best',
        rank: 'Rank',
        player: 'Player'
      },
      procurement: {
        title: 'Procurement Queue',
        subtitle: 'Track purchases and approvals',
        create: 'Create Request',
        update: 'Update Request',
        requestId: 'Request ID',
        item: 'Item / Product',
        quantity: 'Quantity',
        requestedBy: 'Requested By',
        department: 'Department / Category',
        priority: 'Priority',
        date: 'Date',
        status: 'Status',
        notes: 'Notes',
        search: 'Search requests',
        filter: 'Filter status',
        sort: 'Sort by',
        sortNewest: 'Newest first',
        sortOldest: 'Oldest first',
        sortPriority: 'Priority',
        allStatuses: 'All statuses',
        pending: 'Pending',
        processing: 'Processing',
        approved: 'Approved',
        rejected: 'Rejected',
        completed: 'Completed',
        submit: 'Submit Request',
        reset: 'Reset',
        total: 'Total Requests',
        empty: 'No procurement requests found',
        emptyText: 'Create a request to start tracking approvals and delivery.',
        loading: 'Loading procurement queue…',
        success: 'Request created successfully.',
        error: 'Could not save this request. Please try again.',
        priorityLow: 'Low',
        priorityMedium: 'Medium',
        priorityHigh: 'High',
        priorityUrgent: 'Urgent',
        statusLabel: 'Status',
        noRecords: 'No records available',
        save: 'Save',
        cancel: 'Cancel',
        delete: 'Delete',
        edit: 'Edit'
      }
    },
    ta: {
      language: 'தமிழ்',
      nav: { home: 'முகப்பு', recommend: 'பரிந்துரை', farm: 'என் பண்ணை', procurement: 'கொள்முதல்', crops: 'பயிர்கள்', quiz: 'வினாடி', tools: 'கருவிகள்', assistant: 'அரசு உதவி' },
      common: { back: 'திரும்பு', loading: 'ஏற்றப்படுகிறது…', save: 'சேமி', cancel: 'ரத்து', ok: 'சரி', search: 'தேடு…', noData: 'தரவு இல்லை', error: 'பிழை', success: 'வெற்றி', demoMode: 'டெமோ பயன்முறை', liveMode: 'நேரடி பயன்முறை', account: 'கணக்கு / சுயவிவரம்' },
      home: { welcome: 'மீண்டும் வரவேற்கிறோம்,', searchPlaceholder: 'பயிரைத் தேடுங்கள் — தக்காளி, அரிசி, மாம்பழம்…', ctaTitle: 'சரியான பயிரைக் கண்டறியுங்கள்', ctaSubtitle: 'உங்கள் நிலைமைகளைப் பற்றிய சில கேள்விகளுக்குப் பதிலளியுங்கள்', weather: 'மிதமான மேகம்', popular: 'பிரபல பயிர்கள்', tools: 'விரைவு கருவிகள்', quickFarm: '🚜 என் பண்ணை', quickProcurement: '🛒 கொள்முதல்', quickPest: '🐛 பூச்சி சோதனை', quickSoil: '🧪 மண் சோதனை', quickProfit: '💰 லாபக் கணிப்பு', quizCardTitle: 'Farmy Quiz', quizCardText: 'ஒரு விரைவான வினாடி போட்டியை விளையாடி புள்ளிகளைப் பெறுங்கள்.', quizCardAction: 'வினாடி விளையாட்டு →', kharif: 'காரீப் பருவத்திற்கு பரிந்துரைக்கப்பட்டது' },
      auth: { brand: 'உங்கள் ஃபார்மை ஸ்மார்ட் விவசாய உதவியாளர்', phone: 'தொலைபேசி', email: 'மின்னஞ்சல்', phoneNumber: 'தொலைபேசி எண்', emailAddress: 'மின்னஞ்சல் முகவரி', nameOptional: 'உங்கள் பெயர் (விருப்பம்)', placeholderPhone: 'எ.கா. 9876543210', placeholderEmail: 'எ.கா. farmer@example.com', sendOtp: 'OTP அனுப்பு', verifyCode: 'குறியீட்டைச் சரிபார்க்கவும்', codeSent: 'குறியீடு அனுப்பப்பட்டது', enterCode: 'குறியீட்டை உள்ளிடவும்', verifyContinue: 'சரிபார்த்து தொடரவும்', useDifferent: 'வேறு எண்ணை/மின்னஞ்சலைப் பயன்படுத்தவும்', invalidPhone: 'சரியான தொலைபேசி எண் உள்ளிடவும்', invalidEmail: 'சரியான மின்னஞ்சல் முகவரி உள்ளிடவும்', missingContact: 'உங்கள்', invalidCode: 'தவறான குறியீடு. மீண்டும் முயற்சிக்கவும் அல்லது பயன்படுத்தவும்', demoOtp: 'டெமோ பயன்முறை: உங்கள் உள்ளூர் சரிபார்ப்பு குறியீடு:', liveOtp: 'நேரடி சரிபார்ப்பு குறியீடு அனுப்பப்பட்டது:', inbox: 'உங்கள்', inboxSuffix: 'இன்பாக்ஸைச் சரிபார்க்கவும்.' },
      assistant: { title: 'Farmy உதவியாளர் 🌱', clear: 'உரையாடலை அழிக்கவும்', placeholder: 'விதைப்பு, நீர், பூச்சிகள், உரம் பற்றி கேளுங்கள்…', send: 'அனுப்பு', typing: 'Farmy எழுதுகிறது…', clearConfirm: 'உரையாடல் வரலாற்றை அழிக்கவா?', greeting: 'வணக்கம்! நான் Farmy உதவியாளர் 🌱. உங்கள் பண்ணைக்கு எவ்வாறு உதவலாம்?', fallback: 'நான் ஆஃப்லைன் டெமோ பயன்முறையில் இயங்குகிறேன். குறிப்பிட்ட பயிரைப் பற்றி கேளுங்கள்.', search: 'விதைப்பு, நீர், பூச்சிகள், உரம் பற்றி கேளுங்கள்…' },
      recommend: { title: 'சரியான பயிரைக் கண்டறியுங்கள்', hint: 'உங்கள் நிலம் மற்றும் நிலைமைகளைச் சொல்லுங்கள் — நாங்கள் அவற்றை விவசாயத் தரவுத்தளத்துடன் பொருத்துவோம்.', soilType: 'மண் வகை', soilPh: 'மண் pH', temp: 'சராசரி வெப்பநிலை (°C)', water: 'நீர் கிடைப்பது', season: 'வளர்ச்சி பருவம்', getRecommendations: 'பரிந்துரைகளைப் பெறுக', analyzing: 'பயிர்களை பகுப்பாய்வு செய்கிறது…', resultsHint: 'உங்கள் நிலைமைகளுக்கு ஏற்ப சார் பொருத்தம் வரிசைப்படுத்தப்பட்டுள்ளது:', tryDifferent: 'வேறு நிலைமைகளை முயற்சிக்கவும்', statusLow: 'குறைவு (மழை / பற்றாக்குறை)', statusMedium: 'மிதமான (போர்வெல் / கால்வாய்)', statusHigh: 'அதிகம் (பெருமளவு / வெள்ள நீர்)', seasonKharif: 'காரீப் (மழைக்காலம் / கோடை)', seasonRabi: 'ரபி (சீலை / மழைக்குப் பின்)', seasonZaid: 'சைட் (வறண்ட வெப்பமான கோடை)' },
      farm: { title: 'என் பண்ணை கண்காணிப்பு', addCrop: 'பயிர் சேர்க்க', addAnother: 'மற்றொரு பயிரைச் சேர்க்கவும்', emptyTitle: 'பயிர்கள் இன்னும் சேர்க்கப்படவில்லை', emptyText: 'நீங்கள் விதைத்த பயிர்களைச் சேர்த்து வளர்ச்சி நிலைகள், நீர் தேவைகள் மற்றும் அறுவடை அட்டவணைகளை தானாகக் கணக்கிடவும்.', browse: 'பயிர் பட்டியலைப் பார்க்கவும்', days: 'விதைத்ததிலிருந்து நாட்கள்', currentStage: 'தற்போதைய நிலை', irrigationRule: 'நீர் பாய்ச்சும் விதி', expectedHarvest: 'எதிர்பார்க்கும் அறுவடை', viewGuide: 'வழிகாட்டியைப் பார்க்க →', estimateYield: 'மகசூல் மதிப்பிடு', estimateYieldShort: 'மகசூல் மதிப்பிடு', removeConfirm: 'இந்த பயிரை உங்கள் பண்ணையிலிருந்து அகற்ற விரும்புகிறீர்களா?' },
      crops: { title: 'பயிர் தரவுத்தளம்', searchPlaceholder: 'பயிர்களைத் தேடுங்கள் (எ.கா. தக்காளி, அரிசி, கோதுமை)…', all: 'அனைத்தும்', vegetables: 'காய்கறிகள்', grains: 'தானியங்கள்', pulses: 'பருப்பு வகைகள்', fruits: 'பழங்கள்', showing: 'காட்டப்படுகிறது', crops: 'பயிர்கள்', noCrops: 'பயிர்கள் எதுவும் கிடைக்கவில்லை', noCropsText: 'வேறு பெயரைத் தேடிப் பார்க்கவும் அல்லது வகை வடிகட்டியை மீண்டும் அமைக்கவும்.' },
      weather: { title: 'வானிலை & ஆலோசனை', checkSuitability: 'ஒரு பயிருக்கு பொருத்தத்தை சரிபார்க்கவும்', forecastTitle: '5 நாள் முன்னறிவிப்பு', chooseCrop: 'பயிரைத் தேர்ந்தெடுக்கவும்', suitable: 'இந்த வானிலை பயிர் வளர்ச்சிக்கு பொருத்தமானது', borderline: 'இந்த வானிலை பயிருக்கு எல்லை நிலையில் உள்ளது', unsuitable: 'இந்த வானிலை தற்போது பொருத்தமற்றது' },
      soil: { title: 'மண் ஆரோக்கிய சோதனை', hint: 'மண் சோதனை மதிப்புகள் அல்லது புலக் கணிப்புகளை உள்ளிட்டு ஊட்டச்சத்து ஏற்றத்தாழ்வுகள் மற்றும் பயிர் பொருத்தத்தை சரிபார்க்கவும்.', type: 'மண் வகை', ph: 'மண் pH', nitrogen: 'நைட்ரஜன் (N) நிலை', phosphorus: 'பாஸ்பரஸ் (P) நிலை', potassium: 'பொட்டாசியம் (K) நிலை', moisture: 'மண் ஈரப்பதம்', check: 'மண் ஆரோக்கியத்தை சரிபார்க்கவும்', note: 'நல்ல மண் ஆரோக்கியம்', compare: 'ஒரு பயிருடன் ஒப்பிடவும்', newCheck: 'மற்றொரு மண் சோதனை', estimateYield: 'இந்த மண்ணுடன் மகசூலை மதிப்பிடு →', calculating: 'கணக்கிடப்படுகிறது…' },
      yield: { title: 'மகசூல் கணிப்பு', hint: 'பண்ணை பரப்பு, மண் நிலை மற்றும் விவசாய நடைமுறைகளின் அடிப்படையில் எதிர்பார்க்கும் உற்பத்தியை மதிப்பிடவும்.', crop: 'பயிரைத் தேர்ந்தெடுக்கவும்', area: 'பண்ணை பரப்பு (ஏக்கர்)', soilScore: 'மண் ஆரோக்கிய மதிப்பெண் (0–100)', method: 'விவசாய முறை', methodConventional: 'பாரம்பரிய (நிலையான உரங்கள் & பாதுகாப்பு)', methodOrganic: 'சர்வசாதாரண / இயற்கை (பயோ-உள்ளீடுகள், இரசாயனமற்ற)', estimate: 'எதிர்பார்க்கும் மகசூலை மதிப்பிடு', calculating: 'கணக்கிடப்படுகிறது…', resultTitle: 'மகசூல் வரம்பு', avg: 'சராசரி எதிர்பார்ப்பு', reminder: 'உண்மையான மகசூல் மழை, பூச்சி கட்டுப்பாடு மற்றும் தினசரி பண்ணை நிர்வாகத்தைப் பொறுத்தது.', calculateProfit: 'நிதி லாபத்தை கணக்கிடு →' },
      profit: { title: 'லாபக் கணிப்பான்', hint: 'உங்கள் விவசாய பருவத்திற்கான செலவுகள், வருவாய் மற்றும் திட்டமிடப்பட்ட நிகர வருமானத்தை மதிப்பிடவும்.', area: 'பண்ணை பரப்பு (ஏக்கர்)', seeds: 'விதைகள் & நாற்றுகள்', fertilizer: 'உரம் & மண் திருத்தங்கள்', labour: 'தொழிலாளர் & களை எடுத்தல்', irrigation: 'நீர் பாய்ச்சல், எரிபொருள் & இயந்திரங்கள்', other: 'பூச்சி பாதுகாப்பு & பிற செலவுகள்', yield: 'எதிர்பார்க்கும் மொத்த மகசூல் (கிலோ)', price: 'எதிர்பார்க்கும் சந்தை / விற்பனை விலை (₹/கிலோ)', calculate: 'நிகர லாபத்தை கணக்கிடு', calculating: 'கணக்கிடப்படுகிறது…', totalCost: 'மொத்த உற்பத்திச் செலவு', revenue: 'மொத்த எதிர்பார்க்கும் வருவாய்', profit: 'மதிப்பிடப்பட்ட நிகர லாபம்', perAcre: 'ஏக்கருக்கு நிகர லாபம்', reminder: 'சந்தை நினைவு: மண்டி விலை தினசரி மாறுகிறது. அறுவடை மற்றும் விற்பனைக்கு முன் தற்போதைய சில்லறை விலைகளை சரிபார்க்கவும்.' },
      pests: { title: 'பூச்சி & நோய் சரிபார்ப்பு', hint: 'காணக்கூடிய அறிகுறிகளைத் தேர்ந்தெடுத்து, சாத்தியமான பூச்சிகள் அல்லது நோய்களையும் பாதுகாப்பான IPM கட்டுப்பாட்டு முறைகளையும் கண்டறியவும்:', filter: 'குறிப்பிட்ட பயிரை வடிகட்டவும் (விருப்பம்)', noMatchTitle: 'நேரடி பொருத்தம் இல்லை', noMatchText: 'வேறு அறிகுறிகளை மாற்றவும் அல்லது அனைத்து சாத்தியமான நோயறிதல்களைக் காண வகை வடிகட்டியை அழிக்கவும்.', advice: 'பூச்சிக்கொல்லி பாதுகாப்பு ஆலோசனை', symptoms: ['மஞ்சள் இலைகள்', 'பழுப்பு புள்ளிகள்', 'இலைகளில் துளைகள்', 'மெலிதானது', 'பூச்சிகள் தெரியும்', 'அச்சு அல்லது பூஞ்சை'] },
      quiz: { eyebrow: '🌱 FARMY QUIZ', title: 'Farmy Quiz', subtitle: 'கற்றுக்கொள்ளுங்கள் • விளையாடுங்கள் • வளருங்கள்', score: 'புள்ளிகள்', quizzes: 'வினாடிகள்', questions: 'கேள்விகள்', totalScore: 'மொத்த புள்ளிகள்', completed: 'முடித்த வினாடிகள்', streak: 'தற்போதைய தொடர்', leaderboard: 'உலகளாவிய லீடர்போர்டு', start: 'வினாடி தொடங்க', playAgain: 'மீண்டும் விளையாடு', locked: 'பூட்டப்பட்டுள்ளது', nextQuestion: 'அடுத்த கேள்வி', finish: 'வினாடியை முடிக்க', correct: 'சரி!', incorrect: 'தவறு', correctAnswer: 'சரியான பதில்', completeTitle: 'வினாடி முடிந்தது!', points: 'புள்ளிகள்', nextQuiz: 'அடுத்த வினாடி', quizHome: 'வினாடி முகப்பு', question: 'கேள்வி', of: 'இன்', answered: 'பதில் தொடர்', percent: 'முன்னேற்றம்', best: 'சிறந்தது', rank: 'தரம்', player: 'விளையாட்டு வீரர்' },
      procurement: { title: 'கொள்முதல் வரிசை', subtitle: 'கொள்முதல் கோரிக்கைகளைக் கண்காணிக்கவும்', create: 'கோரிக்கையை உருவாக்கவும்', update: 'கோரிக்கையை புதுப்பிக்கவும்', requestId: 'கோரிக்கை ID', item: 'பொருள் / தயாரிப்பு', quantity: 'அளவு', requestedBy: 'கோரிக்கை செய்தவர்', department: 'துறை / வகை', priority: 'முன்னுரிமை', date: 'தேதி', status: 'நிலை', notes: 'குறிப்புகள்', search: 'கோரிக்கைகளை தேடவும்', filter: 'நிலை வடிகட்டி', sort: 'வரிசைப்படுத்து', sortNewest: 'சமீபத்திய முதல்', sortOldest: 'பழைய முதல்', sortPriority: 'முன்னுரிமை', allStatuses: 'எல்லா நிலைகளும்', pending: 'நிலுவை', processing: 'செயலாக்கத்தில்', approved: 'அங்கீகரிக்கப்பட்டது', rejected: 'நிராகரிக்கப்பட்டது', completed: 'முடிந்தது', submit: 'கோரிக்கையை சமர்ப்பிக்கவும்', reset: 'மீட்டமை', total: 'மொத்த கோரிக்கைகள்', empty: 'கொள்முதல் கோரிக்கைகள் எதுவும் இல்லை', emptyText: 'முதலாவது கோரிக்கையை உருவாக்கி ஒப்புதல் மற்றும் விநியோகம் ஆகியவற்றைக் கண்காணிக்கவும்.', loading: 'கொள்முதல் வரிசை ஏற்றப்படுகிறது…', success: 'கோரிக்கை வெற்றிகரமாக உருவாக்கப்பட்டது.', error: 'இந்த கோரிக்கையை சேமிக்க முடியவில்லை. மீண்டும் முயற்சிக்கவும்.', priorityLow: 'குறைவு', priorityMedium: 'மிதமான', priorityHigh: 'அதிகம்', priorityUrgent: 'அவசரம்', statusLabel: 'நிலை', noRecords: 'பதிவுகள் எதுவும் இல்லை', save: 'சேமி', cancel: 'ரத்து', delete: 'நீக்கு', edit: 'மாற்று' }
    },
    ml: {
      language: 'മലയാളം',
      nav: { home: 'വീട്', recommend: 'നിര്ദ്ദേശം', farm: 'എന്റെ ഫാം', crops: 'പച്ചക്കറികൾ', quiz: 'ക്വിസ്', tools: 'ഉപകരണങ്ങൾ', assistant: 'അസിസ്റ്റന്റ്' },
      common: { back: 'പിറകോട്ട്', loading: 'ലോഡ് ചെയ്യുന്നു…', save: 'സംരക്ഷിക്കുക', cancel: 'റദ്ദാക്കുക', ok: 'ശരി', search: 'തിരയൂ…', noData: 'ഡാറ്റ இல்லை', error: 'പിശക്', success: 'വിജയം', demoMode: 'ഡെമോ മോഡ്', liveMode: 'ലൈവ് മോഡ്', account: 'അക്കൗണ്ട് / പ്രൊഫൈൽ' },
      home: { welcome: 'തിരിച്ചെത്തിയതിൽ സന്തോഷം,', searchPlaceholder: 'കൃഷിയെ തിരയൂ — തക്കാളി, അരി, മാമ്പഴം…', ctaTitle: 'സരിയായ വിള കണ്ടെത്തുക', ctaSubtitle: 'നിങ്ങളുടെ നിലം സംബന്ധിച്ച ചോദ്യങ്ങൾ ഉത്തരം പറയൂ', weather: 'കുറച്ച് മേഘം', popular: 'ജനപ്രിയ വിളകൾ', tools: 'വേഗത്തിലുള്ള ഉപകരണങ്ങൾ', quizCardTitle: 'Farmy Quiz', quizCardText: 'ചെറു ക്വിസിലൂടെ പോയിന്റുകൾ നേടൂ.', quizCardAction: 'ക്വിസ് ആരംഭിക്കുക →', kharif: 'കരിഫ് സീസണിനായി ശുപാർശ ചെയ്യപ്പെട്ടത്' },
      auth: { brand: 'നിങ്ങളുടെ ഫാംറുടെ സ്മാർട്ട് അസിസ്റ്റന്റ്', phone: 'ഫോൺ', email: 'ഇമെയിൽ', phoneNumber: 'ഫോൺ നമ്പർ', emailAddress: 'ഇമെയിൽ വിലാസം', nameOptional: 'നിങ്ങളുടെ പേര് (ഓപ്ഷണൽ)', placeholderPhone: 'ഉദാ. 9876543210', placeholderEmail: 'ഉദാ. farmer@example.com', sendOtp: 'OTP അയയ്ക്കുക', verifyCode: 'കോഡ് പരിശോധിക്കുക', codeSent: 'കോഡ് അയച്ചിരിക്കുന്നു', enterCode: 'കോഡ് നൽകുക', verifyContinue: 'പരിശോധിച്ച് തുടരുക', useDifferent: 'മറ്റൊരു നമ്പർ/ഇമെയിൽ ഉപയോഗിക്കുക', invalidPhone: 'സാധുവായ ഫോൺ നമ്പർ നൽകുക', invalidEmail: 'സാധുവായ ഇമെയിൽ വിലാസം നൽകുക', missingContact: 'നിങ്ങളുടെ', invalidCode: 'തെറ്റായ കോഡ്. വീണ്ടും ശ്രമിക്കുക അല്ലെങ്കിൽ ഉപയോഗിക്കുക', demoOtp: 'ഡെമോ മോഡ്: നിങ്ങളുടെ പ്രാദേശിക പരിശോധനാ കോഡ്:', liveOtp: 'തത്സമയ പരിശോധനാ കോഡ് അയച്ചിരിക്കുന്നു:', inbox: 'നിങ്ങളുടെ', inboxSuffix: 'ഇൻബോക്സിൽ പരിശോധിക്കുക.' },
      assistant: { title: 'Farmy അസിസ്റ്റന്റ് 🌱', clear: 'സംഭാഷണം മായ്ക്കുക', placeholder: 'വിത്ത്, വെള്ളം, കീടങ്ങൾ, വളം എന്നിവയെക്കുറിച്ച് ചോദിക്കുക…', send: 'അയയ്ക്കൂ', typing: 'Farmy ടൈപ്പ് ചെയ്യുന്നു…', clearConfirm: 'സംഭാഷണ ചരിത്രം മായ്ക്കണോ?', greeting: 'ഹായ്! ഞാൻ Farmy അസിസ്റ്റന്റ് 🌱. നിങ്ങളുടെ ഫാമിന് എങ്ങനെ സഹായിക്കാം?', fallback: 'ഞാൻ ഓഫ്ലൈൻ ഡെമോ മോഡിലാണ്. ഒരു പ്രത്യേക വിളയെക്കുറിച്ച് ചോദിക്കുക.', search: 'വിത്ത്, വെള്ളം, കീടങ്ങൾ, വളം എന്നിവയെക്കുറിച്ച് ചോദിക്കുക…' },
      recommend: { title: 'സരിയായ വിള കണ്ടെത്തുക', hint: 'നിങ്ങളുടെ ഭൂമി, സാഹചര്യ എന്നിവയെ പറയുക — നാം അതിനെ കാർഷിക ഡാറ്റാബേസുമായി പൊരുത്തപ്പെടുത്തും.', soilType: 'മണ്ണിന്റെ തരം', soilPh: 'മണ്ണിന്റെ pH', temp: 'ശരാശരി താപനില (°C)', water: 'വെള്ള ലഭ്യത', season: 'വളർച്ചാ കാലം', getRecommendations: 'ശുപാർശകൾ ലഭ്യമാക്കുക', analyzing: 'വളങ്ങൾ വിശകലനം ചെയ്യുന്നു…', resultsHint: 'നിങ്ങളുടെ നിലം സംബന്ധിച്ച സുസ്ഥിരതയ്ക്ക് അനുസരിച്ച് തിരഞ്ഞെടുത്തിരിക്കുന്നു:', tryDifferent: 'മറ്റൊരു സാഹചര്യത്തിൽ ശ്രമിക്കുക', statusLow: 'കുറവ് (മഴ / കുറവ്)', statusMedium: 'ഇടത്തരം (ബോർവെൽ / കുഴൽവെട്ട്)', statusHigh: 'കൂടുതൽ (സമ്പൂർണ്ണ / വെള്ളം നിറഞ്ഞു)', seasonKharif: 'കരിഫ് (മഴക്കാലം / വേനൽ)', seasonRabi: 'റാബി (ശീതകാലം / മഴക്കാലത്തിന് ശേഷം)', seasonZaid: 'സൈഡ് (വറുത്ത വേനൽ)' },
      farm: { title: 'എന്റെ ഫാം ട്രാക്കർ', addCrop: 'വള ചേർക്കുക', addAnother: 'മറ്റൊരു വിള ചേർക്കുക', emptyTitle: 'വളകൾ ഇതുവരെ ചേർക്കപ്പെട്ടിട്ടില്ല', emptyText: 'നിങ്ങൾ നട്ട വിളകൾ ചേർത്ത് വളർച്ചാ ഘട്ടങ്ങൾ, വെള്ളം, വേനൽ പോലുള്ള വിവരങ്ങൾ ഓട്ടോമാറ്റിക്കായി കാണുക.', browse: 'വള പട്ടിക കാണുക', days: 'വിത്തിനുശേഷം ദിവസങ്ങൾ', currentStage: 'നിലവിലുള്ള ഘട്ടം', irrigationRule: 'വെള്ളം കൊടുക്കുന്ന നിയമം', expectedHarvest: 'പ്രതീക്ഷിക്കുന്ന വേപ്പ്', viewGuide: 'ഗൈഡ് കാണുക →', estimateYield: 'വിളവ് പ്രവചിക്കുക', removeConfirm: 'ഈ വിളം നിങ്ങളുടെ ഫാമിൽ നിന്ന് നീക്കം ചെയ്യണോ?' },
      crops: { title: 'വള ഡാറ്റാബേസ്', searchPlaceholder: 'വളകൾ തിരയുക (ഉദാ. തക്കാളി, അരി, ഗോതമ്പ്)…', all: 'എല്ലാം', vegetables: 'പച്ചക്കറികൾ', grains: 'തൃക്കുകൾ', pulses: 'പുളിവുകൾ', fruits: 'പഴങ്ങൾ', showing: 'കാണിക്കുന്നത്', crops: 'വളകൾ', noCrops: 'വളകൾ ഒന്നും കണ്ടെത്തിയില്ല', noCropsText: 'മറ്റൊരു പേരിൽ തിരയുകയോ വിഭാഗം ഫിൽട്ടർ റീസെറ്റ് ചെയ്യുകയോ ചെയ്യുക.' },
      weather: { title: 'കാലാവസ്ഥ & ഉപദേശങ്ങൾ', checkSuitability: 'ഒരു വിളയുടെ അനുയോജ്യത പരിശോധിക്കുക', forecastTitle: '5 ദിവസത്തെ പ്രവചനം', chooseCrop: 'വള തിരഞ്ഞെടുക്കുക', suitable: 'ഈ കാലാവസ്ഥ该 വിളയ്ക്ക് അനുയോജമാണ്', borderline: 'ഈ കാലാവസ്ഥ വിളയ്ക്ക് അതിരിൽ ആണ്', unsuitable: 'ഈ കാലാവസ്ഥ ഇപ്പോൾ അനുയോജമല്ല' },
      soil: { title: 'മണ്ണിന്റെ ആരോഗ്യ പരിശോധന', hint: 'മണ്ണിന്റെ പരിശോധനാ മൂല്യങ്ങൾ അല്ലെങ്കിൽ ഫീൽഡ് നിരീക്ഷണങ്ങൾ നൽകുകയും പോഷക സമത്വവും വിളകളുടെ അനുയോജ്യതയും പരിശോധിക്കുക.', type: 'മണ്ണിന്റെ തരം', ph: 'മണ്ണിന്റെ pH', nitrogen: 'നൈട്രജൻ (N) നില', phosphorus: 'ഫോസ്ഫറസ് (P) നില', potassium: 'പോട്ടാഷ്യം (K) നില', moisture: 'മണ്ണിന്റെ ഈർപ്പം', check: 'മണ്ണിന്റെ ആരോഗ്യ പരിശോധന', note: 'നന്നായി നിലനിൽക്കുന്ന മണ്ണ്', compare: 'വളയുമായി താരപ്പയിയ്ക്കുക', newCheck: 'പുതിയ മണ്ണ് പരിശോധന', estimateYield: 'ഈ മണ്ണിനൊപ്പം വിളവ് പ്രവചിക്കുക →', calculating: 'കണക്കാക്കുന്നു…' },
      yield: { title: 'വിളവ് പ്രവചനം', hint: 'ഫാം ഏരിയ, മണ്ണിന്റെ നില, വേനൽ എന്നിവയുടെ അടിസ്ഥാനത്തിൽ പ്രതീക്ഷിക്കുന്ന ഉത്പാദനം കണക്കാക്കുക.', crop: 'വള തിരഞ്ഞെടുക്കുക', area: 'ഫാം ഏരിയ (ഏക്കർ)', soilScore: 'മണ്ണിന്റെ ആരോഗ്യ സ്കോർ (0–100)', method: 'കൃഷി രീതി', methodConventional: 'പാരമ്പര്യമായി (സാധാരണ വളം & പ്രതിരോധം)', methodOrganic: 'ജൈവ / സ്വാഭാവിക (ബയോ-ഇൻപുട്ടുകൾ, രാസവസ്തു ഇല്ല)', estimate: 'പ്രതീക്ഷിക്കുന്ന വിളവിനെ കണക്കാക്കുക', calculating: 'കണക്കാക്കുന്നു…', resultTitle: 'വിളവ് പരിധി', avg: 'ശരാശരി പ്രതീക്ഷ', reminder: 'യഥാർത്ഥ വിളവ് മഴ, കീടനിയന്ത്രണം, ദിവസവും ഫാം മാനേജ്മെൻ്റ് എന്നിവയെ ആശ്രയിച്ചിരിക്കും.', calculateProfit: 'മൂല്യവത്തായ ലാഭം കണക്കാക്കുക →' },
      profit: { title: 'ലാഭ കണക്കെടുപ്പ്', hint: 'നിങ്ങളുടെ ഫാം സീസണിനുള്ള ചെലവുകൾ, വരുമാനം, സമ്പാദിച്ചു പോകുന്ന ലാഭം എന്നിവ കണക്കാക്കുക.', area: 'ഫാം ഏരിയ (ഏക്കർ)', seeds: 'വിത്തുകൾ & നട്ടുപിടിപ്പുകൾ', fertilizer: 'വളം & മണ്ണ് പരിഷ്കാരങ്ങൾ', labour: 'പണി & വേലി', irrigation: 'വെള്ളം, ഇന്ധനം & యന്ത്രങ്ങൾ', other: 'കീടനിരോധനം & മറ്റ് ചെലവുകൾ', yield: 'പ്രതീക്ഷിക്കുന്ന മുടക്കം വിളവ് (കിലോ)', price: 'പ്രതീക്ഷിക്കുന്ന മണ്ടി / വിൽപ്പന വില (₹/കിലോ)', calculate: 'നികര ലാഭം കണക്കാക്കുക', calculating: 'കണക്കാക്കുന്നു…', totalCost: 'മൊത്തം ഉത്പാദന ചെലവ്', revenue: 'മൊത്തം പ്രതീക്ഷിക്കുന്ന വരുമാനം', profit: 'പ്രതീക്ഷിക്കുന്ന നികര ലാഭം', perAcre: 'ഏക്കറിന് നികര ലാഭം', reminder: 'വിപണി അറിയിപ്പ്: മണ്ടി വിലകൾ ഓരോ ദിവസവും മാറും. വേപ്പ് പിടിക്കലിന് മുമ്പ് നിലവിലെ മൊത്തം വില പരിശോധിക്കുക.' },
      pests: { title: 'കീട & രോഗ പരിശോധന', hint: 'കാണാവുന്ന ലക്ഷണങ്ങൾ തിരഞ്ഞെടുക്കുക, സാധ്യതയുള്ള കീടങ്ങൾ അല്ലെങ്കിൽ രോഗങ്ങൾ, സുരക്ഷിത IPM നിയന്ത്രണങ്ങൾ എന്നിവ കണ്ടെത്തുക:', filter: 'ഒരു குறிப்பிட்ட വിള ഫിൽട്ടർ ചെയ്യുക (ഓപ്ഷണൽ)', noMatchTitle: 'നേരിട്ടുള്ള പൊരുത്തം കണ്ടെത്തിയില്ല', noMatchText: 'മറ്റു ലക്ഷണങ്ങൾ തിരഞ്ഞെടുക്കുക അല്ലെങ്കിൽ എല്ലാ സാധ്യതകളെയും കാണാൻ ഫിൽട്ടർ നീക്കം ചെയ്യുക.', advice: 'പെസ്റ്റിസൈഡ് സുരക്ഷാ ഉപദേശം', symptoms: ['മഞ്ഞ ഇലകൾ', 'പച്ചപ്പുകട്ടി ചുവപ്പ് البقع', 'ഇലകളിൽ സുഷിരങ്ങൾ', 'ക Urdu', 'കാണാം', 'കൂട് / ഫംഗസ്'] },
      quiz: { title: 'Farmy Quiz', subtitle: 'പഠിക്കൂ • കളിക്കൂ • വളരൂ', score: 'സ്കോർ', quizzes: 'ക്വിസുകൾ', questions: 'ചോദ്യങ്ങൾ', totalScore: 'മൊത്തം സ്കോർ', completed: 'പൂർത്തിയാക്കിയ ക്വിസുകൾ', streak: 'നിലവിലുള്ള സ്റ്രീക്ക്', leaderboard: 'ലീഡർഷിപ്പ്', start: 'ക്വിസ് ആരംഭിക്കുക', playAgain: 'വീണ്ടും കളിക്കുക', locked: 'പൂട്ടിയിരിക്കുന്നു', nextQuestion: 'അടുത്ത ചോദ്യങ്ങൾ', finish: 'ക്വിസ് പൂർത്തിയാക്കുക', correct: 'ശരി!', incorrect: 'തെറ്റ്', correctAnswer: 'ശരിയായ ഉത്തരം', completeTitle: 'ക്വിസ് പൂർത്തിയായി!', points: 'പോയിന്റുകൾ', nextQuiz: 'അടുത്ത ക്വിസ്', quizHome: 'ക്വിസ് ഹോം', question: 'ചോദ്യങ്ങൾ', of: 'ഇൻ', answered: 'ഉത്തരം സ്റ്റ്രീക്ക്', percent: 'പുരോഗതി' },
      procurement: { title: 'വാങ്ങൽ വരBlocking', subtitle: 'വാങ്ങൽ അഭ്യർത്ഥനകൾ കണ്ടുപിടിക്കുക', create: 'അഭ്യർത്ഥന സൃഷ്ടിക്കുക', update: 'അഭ്യർത്ഥന പുതുക്കുക', requestId: 'അഭ്യർത്ഥന ID', item: 'ഇനം / ഉൽപ്പന്നം', quantity: 'അളവ്', requestedBy: 'അഭ്യർത്ഥിച്ചത്', department: 'വകുപ്പ് / വിഭാഗം', priority: 'മുൻഗണന', date: 'തിയതി', status: 'നില', notes: 'കുറിപ്പുകൾ', search: 'അഭ്യർത്ഥനകൾ തിരയുക', filter: 'നില ഫിൽട്ടർ', sort: 'അടുക്കം', allStatuses: 'എല്ലാ നിലകളും', pending: 'തീർച്ചപ്പെടാത്തത്', processing: 'പ്രോസസ്സ് ചെയ്യുന്നു', approved: 'അംഗീകാരം ലഭിച്ചു', rejected: 'നിരസിച്ചു', completed: 'പൂർത്തിയായി', submit: 'അഭ്യർത്ഥന സമർപ്പിക്കുക', reset: 'റീസെറ്റ്', total: 'മൊത്തം അഭ്യർത്ഥനകൾ', empty: 'വാങ്ങൽ അഭ്യർത്ഥനകൾ ഒന്നും ഇല്ല', emptyText: 'അദ്യത്തെ അഭ്യർത്ഥന സൃഷ്ടിച്ച് അംഗീകാരം, വിതരണം എന്നിവ നിരീക്ഷിക്കൂ.', loading: 'വാങ്ങൽ വരBlocking ലോഡ് ചെയ്യുന്നു…', success: 'അഭ്യർത്ഥന വിജയകരമായി സൃഷ്ടിച്ചു.', error: 'അഭ്യർത്ഥന ശേഖരിക്കാൻ സാധിച്ചില്ല. വീണ്ടും ശ്രമിക്കുക.', priorityLow: 'കുറവ്', priorityMedium: 'ഇടത്തരം', priorityHigh: 'ഉയർന്ന', priorityUrgent: 'അപേക്ഷിതം', statusLabel: 'നില', noRecords: 'രേഖകൾ ഇല്ല', save: 'സംരക്ഷിക്കുക', cancel: 'റദ്ദാക്കുക', delete: 'നീക്കം ചെയ്യുക', edit: 'തിരുത്തുക' }
    },
    hi: {
      language: 'हिन्दी',
      nav: { home: 'होम', recommend: 'सुझाव', farm: 'मेरा फार्म', procurement: 'खरीद', crops: 'फसलें', quiz: 'क्विज़', tools: 'टूल्स', assistant: 'सहायक' },
      common: { back: 'वापस', loading: 'लोड हो रहा है…', save: 'सेव', cancel: 'रद्द करें', ok: 'ठीक है', search: 'खोजें…', noData: 'डेटा उपलब्ध नहीं है', error: 'त्रुटि', success: 'सफल', demoMode: 'डेमो मोड', liveMode: 'लाइव मोड', account: 'अकाउंट / प्रोफाइल' },
      home: { welcome: 'फिर से स्वागत है,', searchPlaceholder: 'फसल खोजें — टमाटर, धान, आम…', ctaTitle: 'उपयुक्त फसल ढूंढें', ctaSubtitle: 'अपने खेत की कुछ जानकारी दें', weather: 'आंशिक बादल', popular: 'लोकप्रिय फसलें', tools: 'त्वरित टूल्स', quickFarm: '🚜 मेरा फार्म', quickProcurement: '🛒 खरीद', quickPest: '🐛 कीट जाँच', quickSoil: '🧪 मिट्टी जाँच', quickProfit: '💰 लाभ गणना', quizCardTitle: 'FARMY QUIZ', quizCardText: 'एक छोटी क्विज़ खेलें और अंक कमाएं।', quizCardAction: 'क्विज़ खेलें →', kharif: 'खरीफ मौसम के लिए अनुशंसित' },
      auth: { brand: 'आपका स्मार्ट कृषि सहायक', phone: 'फोन', email: 'ईमेल', phoneNumber: 'फोन नंबर', emailAddress: 'ईमेल पता', nameOptional: 'आपका नाम (वैकल्पिक)', placeholderPhone: 'जैसे 9876543210', placeholderEmail: 'जैसे farmer@example.com', sendOtp: 'OTP भेजें', verifyCode: 'कोड सत्यापित करें', codeSent: 'कोड भेजा गया', enterCode: 'कोड दर्ज करें', verifyContinue: 'सत्यापित करें और जारी रखें', useDifferent: 'दूसरा नंबर/ईमेल उपयोग करें', invalidPhone: 'कृपया सही फोन नंबर दर्ज करें', invalidEmail: 'कृपया सही ईमेल पता दर्ज करें', missingContact: 'कृपया अपना', invalidCode: 'गलत कोड. फिर से प्रयास करें या उपयोग करें', demoOtp: 'डेमो मोड: आपका लोकल सत्यापन कोड है:', liveOtp: 'लाइव सत्यापन कोड भेजा गया है:', inbox: 'आपका', inboxSuffix: 'इनबॉक्स देखें.' },
      assistant: { title: 'Farmy सहायक 🌱', clear: 'बातचीत साफ़ करें', placeholder: 'बीज, पानी, कीट, उर्वरक के बारे में पूछें…', send: 'भेजें', typing: 'Farmy टाइप कर रहा है…', clearConfirm: 'चैट इतिहास साफ़ करें?', greeting: 'नमस्ते! मैं Farmy सहायक 🌱 हूँ. आपके खेत में कैसे मदद कर सकता हूँ?', fallback: 'मैं ऑफ़लाइन डेमो मोड में चल रहा हूँ. किसी विशेष फसल के बारे में पूछें.', search: 'बीज, पानी, कीट, उर्वरक के बारे में पूछें…' },
      recommend: { title: 'उपयुक्त फसल ढूंढें', hint: 'अपने खेत और परिस्थितियों के बारे में बताएं — हम उन्हें कृषि डेटाबेस से मिलाएंगे.', soilType: 'मिट्टी का प्रकार', soilPh: 'मिट्टी का pH', temp: 'औसत तापमान (°C)', water: 'पानी की उपलब्धता', season: 'उगाने का मौसम', getRecommendations: 'सुझाव पाएं', analyzing: 'फसलों का विश्लेषण किया जा रहा है…', resultsHint: 'आपकी खेत की परिस्थितियों के अनुसार पसंदीदा परिणाम:', tryDifferent: 'अलग परिस्थितियाँ आजमाएँ', statusLow: 'कम (बारिश / कमी)', statusMedium: 'मध्यम (बोरवेल / नहर)', statusHigh: 'उच्च (अधिक / बाढ़ सिंचाई)', seasonKharif: 'खरीफ (मानसून / गर्मी)', seasonRabi: 'रबी (सर्दी / मानसून के बाद)', seasonZaid: 'जायद (सूखी गर्मी)' },
      farm: { title: 'मेरा फार्म ट्रैकर', addCrop: 'फसल जोड़ें', addAnother: 'एक और फसल जोड़ें', emptyTitle: 'अभी तक कोई फसल नहीं जोड़ी गई', emptyText: 'आपने बोई हुई फसलों को जोड़ें ताकि विकास चरण, जल आवश्यकता और कटाई की समय सारणी स्वचालित रूप से दिखाई दे।', browse: 'फसल कैटलॉग देखें', days: 'बुवाई के बाद दिन', currentStage: 'वर्तमान चरण', irrigationRule: 'सिंचाई नियम', expectedHarvest: 'अपेक्षित कटाई', viewGuide: 'गाइड देखें →', estimateYield: 'उपज का अनुमान', removeConfirm: 'क्या आप इस फसल को मेरे फार्म से हटाना चाहते हैं?' },
      crops: { title: 'फसल डेटाबेस', searchPlaceholder: 'फसलें खोजें (जैसे टमाटर, धान, गेहूँ)…', all: 'सभी', vegetables: 'सब्जियाँ', grains: 'अनाज', pulses: 'दालें', fruits: 'फल', showing: 'दिखा रहे हैं', crops: 'फसलें', noCrops: 'कोई फसल नहीं मिली', noCropsText: 'अलग नाम खोजें या श्रेणी फ़िल्टर रीसेट करें।' },
      weather: { title: 'मौसम और सलाह', checkSuitability: 'किसी फसल की उपयुक्तता जांचें', forecastTitle: '5-दिवसीय पूर्वानुमान', chooseCrop: 'फसल चुनें', suitable: 'यह मौसम फसल के लिए उपयुक्त है', borderline: 'यह मौसम फसल के लिए सीमांत स्थिति में है', unsuitable: 'यह मौसम अभी उपयुक्त नहीं है' },
      soil: { title: 'मिट्टी स्वास्थ्य जाँच', hint: 'मिट्टी परीक्षण मान या खेत के अवलोकन दर्ज करें ताकि पोषक तत्व संतुलन और फसल उपयुक्तता जांची जा सके।', type: 'मिट्टी का प्रकार', ph: 'मिट्टी का pH', nitrogen: 'नाइट्रोजन (N) स्तर', phosphorus: 'फॉस्फोरस (P) स्तर', potassium: 'पोटैशियम (K) स्तर', moisture: 'मिट्टी की नमी', check: 'मिट्टी स्वास्थ्य जांचें', note: 'अच्छा मिट्टी स्वास्थ्य', compare: 'किसी फसल से तुलना करें', newCheck: 'नई मिट्टी जांच', estimateYield: 'इस मिट्टी के साथ उपज का अनुमान →', calculating: 'गणना हो रही है…' },
      yield: { title: 'उपज अनुमान', hint: 'खेत का क्षेत्र, मिट्टी की स्थिति और कृषि पद्धति के आधार पर अपेक्षित उत्पादन का अनुमान लगाएं।', crop: 'फसल चुनें', area: 'खेत का क्षेत्रफल (एकड़)', soilScore: 'मिट्टी स्वास्थ्य स्कोर (0–100)', method: 'कृषि पद्धति', methodConventional: 'परंपरागत (मानक उर्वरक और संरक्षण)', methodOrganic: 'जैव / प्राकृतिक (बायो-इनपुट, शून्य रसायन)', estimate: 'अपेक्षित उपज का अनुमान लगाएं', calculating: 'गणना हो रही है…', resultTitle: 'उपज सीमा', avg: 'औसत उम्मीद', reminder: 'वास्तविक उपज पर बारिश, कीट नियंत्रण और दैनिक खेत प्रबंधन का प्रभाव पड़ता है।', calculateProfit: 'वित्तीय लाभ की गणना करें →' },
      profit: { title: 'लाभ कैलकुलेटर', hint: 'अपने कृषि सीज़न के लिए लागत, राजस्व और अनुमानित शुद्ध लाभ का अनुमान लगाएँ।', area: 'खेत का क्षेत्रफल (एकड़)', seeds: 'बीज और पौधे', fertilizer: 'उर्वरक और मिट्टी संशोधन', labour: 'श्रम और झाड़ी हटाना', irrigation: 'सिंचाई, ईंधन और मशीनरी', other: 'कीट प्रबंधन और अन्य व्यय', yield: 'अपेक्षित कुल उपज (kg)', price: 'अपेक्षित मंडी / बिक्री मूल्य (₹/kg)', calculate: 'शुद्ध लाभ की गणना करें', calculating: 'गणना हो रही है…', totalCost: 'कुल उत्पादन लागत', revenue: 'कुल अपेक्षित आय', profit: 'अनुमानित शुद्ध लाभ', perAcre: 'प्रति एकड़ शुद्ध लाभ', reminder: 'मार्केट रिमाइंडर: मंडी कीमतें दैनिक आधार पर बदलती हैं. कटाई से पहले वर्तमान थोक दर देखें.' },
      pests: { title: 'कीट और रोग जांच', hint: 'दिखाई देने वाले लक्षण चुनें ताकि संभावित कीट या रोग और सुरक्षित IPM नियंत्रण विधियाँ ज्ञात हो सकें:', filter: 'विशिष्ट फसल को फ़िल्टर करें (वैकल्पिक)', noMatchTitle: 'कोई सीधा मेल नहीं है', noMatchText: 'अन्य लक्षण बदलें या सभी संभावित निदान देखने के लिए फ़िल्टर साफ़ करें।', advice: 'कीटनाशक सुरक्षा सलाह', symptoms: ['पीली पत्तियाँ', 'भूरी धब्बे', 'पत्तियों में छेद', 'मुरझाना', 'कीट दिखाई दे रहे हैं', 'फफूंदी या कवक'] },
      quiz: { eyebrow: '🌱 FARMY QUIZ', title: 'Farmy Quiz', subtitle: 'सीखें • खेलें • बढ़ें', score: 'स्कोर', quizzes: 'क्विज़', questions: 'प्रश्न', totalScore: 'कुल स्कोर', completed: 'पूर्ण क्विज़', streak: 'मौजूदा स्ट्रीक', leaderboard: 'ग्लोबल लीडरबोर्ड', start: 'क्विज़ शुरू करें', playAgain: 'दोबारा खेलें', locked: 'लॉक', nextQuestion: 'अगला प्रश्न', finish: 'क्विज़ खत्म करें', correct: 'सही!', incorrect: 'गलत', correctAnswer: 'सही उत्तर', completeTitle: 'क्विज़ पूरा हुआ!', points: 'अंक', nextQuiz: 'अगला क्विज़', quizHome: 'क्विज़ होम', question: 'प्रश्न', of: 'का', answered: 'उत्तर स्ट्रीक', percent: 'प्रगति', best: 'सबसे अच्छा', rank: 'रैंक', player: 'खिलाड़ी' },
      procurement: { title: 'खरीद सूची', subtitle: 'क्रय अनुरोधों को ट्रैक करें', create: 'अनुरोध बनाएं', update: 'अनुरोध अपडेट करें', requestId: 'अनुरोध ID', item: 'आइटम / उत्पाद', quantity: 'मात्रा', requestedBy: 'अनुरोधकर्ता', department: 'विभाग / श्रेणी', priority: 'प्राथमिकता', date: 'तारीख', status: 'स्थिति', notes: 'नोट्स', search: 'अनुरोध खोजें', filter: 'स्थिति फ़िल्टर', sort: 'क्रमबद्ध करें', sortNewest: 'नवीनतम पहले', sortOldest: 'सबसे पुराना पहले', sortPriority: 'प्राथमिकता', allStatuses: 'सभी स्थिति', pending: 'लंबित', processing: 'प्रक्रिया में', approved: 'स्वीकृत', rejected: 'अस्वीकृत', completed: 'पूर्ण', submit: 'अनुरोध सबमिट करें', reset: 'रीसेट', total: 'कुल अनुरोध', empty: 'कोई खरीद अनुरोध नहीं मिला', emptyText: 'पहला अनुरोध बनाकर अनुमोदन और डिलीवरी को ट्रैक करें।', loading: 'खरीद सूची लोड हो रही है…', success: 'अनुरोध सफलतापूर्वक बनाया गया।', error: 'अनुरोध सेव नहीं हो पाया. कृपया पुनः प्रयास करें.', priorityLow: 'कम', priorityMedium: 'मध्यम', priorityHigh: 'उच्च', priorityUrgent: 'तत्काल', statusLabel: 'स्थिति', noRecords: 'कोई रिकॉर्ड नहीं', save: 'सेव', cancel: 'रद्द करें', delete: 'हटाएँ', edit: 'संपादित करें' }
    },
    ar: {
      language: 'العربية',
      nav: { home: 'الرئيسية', recommend: 'التوصية', farm: 'مزرعتي', procurement: 'المشتريات', crops: 'المحاصيل', quiz: 'اختبار', tools: 'الأدوات', assistant: 'المساعد' },
      common: { back: 'رجوع', loading: 'جارٍ التحميل…', save: 'حفظ', cancel: 'إلغاء', ok: 'موافق', search: 'بحث…', noData: 'لا توجد بيانات', error: 'خطأ', success: 'نجاح', demoMode: 'وضع تجريبي', liveMode: 'وضع مباشر', account: 'الحساب / الملف الشخصي' },
      home: { welcome: 'مرحباً بعودتك،', searchPlaceholder: 'ابحث عن محصول — طماطم، أرز، مانجو…', ctaTitle: 'ابحث عن المحصول المناسب', ctaSubtitle: 'أجب على بعض الأسئلة حول أرضك', weather: 'غائم جزئياً', popular: 'المحاصيل الشعبية', tools: 'أدوات سريعة', quickFarm: '🚜 مزرعتي', quickProcurement: '🛒 المشتريات', quickPest: '🐛 فحص الآفات', quickSoil: '🧪 فحص التربة', quickProfit: '💰 حساب الربح', quizCardTitle: 'اختبار فارمـي', quizCardText: 'قم باختبار قصير وكسب نقاط.', quizCardAction: 'ابدأ الاختبار →', kharif: 'موصى به لموسم الخريف' },
      auth: { brand: 'مساعدك الزراعي الذكي', phone: 'الهاتف', email: 'البريد الإلكتروني', phoneNumber: 'رقم الهاتف', emailAddress: 'عنوان البريد الإلكتروني', nameOptional: 'اسمك (اختياري)', placeholderPhone: 'مثال: 9876543210', placeholderEmail: 'مثال: farmer@example.com', sendOtp: 'إرسال رمز التحقق', verifyCode: 'تحقق من الرمز', codeSent: 'تم إرسال الرمز إلى', enterCode: 'أدخل الرمز', verifyContinue: 'تحقق ومتابعة', useDifferent: 'استخدم رقمًا أو بريدًا إلكترونيًا مختلفًا', invalidPhone: 'يرجى إدخال رقم هاتف صالح', invalidEmail: 'يرجى إدخال عنوان بريد إلكتروني صالح', missingContact: 'يرجى إدخال', invalidCode: 'رمز غير صحيح. حاول مرة أخرى أو استخدم', demoOtp: 'وضع تجريبي: هذا هو رمز التحقق المحلي:', liveOtp: 'تم إرسال رمز التحقق المباشر إلى:', inbox: 'تحقق من', inboxSuffix: 'صندوقك.' },
      assistant: { title: 'مساعد فارمـي 🌱', clear: 'مسح المحادثة', placeholder: 'اسأل عن الزراعة والماء والآفات والأسمدة…', send: 'إرسال', typing: 'Farmy يكتب…', clearConfirm: 'هل تريد مسح سجل المحادثة؟', greeting: 'مرحبًا! أنا مساعد فارمـي 🌱. كيف يمكنني مساعدتك في مزرعتك؟', fallback: 'أنا أعمل في وضع تجريبي غير متصل. جرّب سؤالاً عن محصول معين.', search: 'اسأل عن الزراعة والماء والآفات والأسمدة…' },
      recommend: { title: 'ابحث عن محصول مناسب', hint: 'أخبرنا عن أرضك وظروفها — سنقارنها بقاعدة بيانات المحاصيل الزراعية.', soilType: 'نوع التربة', soilPh: 'أس هيدروجيني للتربة', temp: 'متوسط درجة الحرارة (°C)', water: 'توفر المياه', season: 'موسم النمو', getRecommendations: 'الحصول على التوصيات', analyzing: 'جارٍ تحليل المحاصيل…', resultsHint: 'مرتبة حسب ملاءمة الظروف الدقيقة لحقلك:', tryDifferent: 'جرّب ظروفًا مختلفة', statusLow: 'منخفض (مطر / نقص)', statusMedium: 'متوسط (آبار / قناة)', statusHigh: 'عالي (كثرة / ري الفيض)', seasonKharif: 'الخريف (موسم المطر / الصيف)', seasonRabi: 'الربيع (الشتاء / ما بعد المطر)', seasonZaid: 'زايد (صيف حار جاف)' },
      farm: { title: 'متتبع مزرعتي', addCrop: 'إضافة محصول', addAnother: 'إضافة محصول آخر', emptyTitle: 'لم تتم إضافة أي محاصيل بعد', emptyText: 'أضف المحاصيل التي زرعتها لتحصل على مراحل النمو واحتياجات الري وجدول الحصاد تلقائيًا.', browse: 'تصفح كتالوج المحاصيل', days: 'عدد الأيام منذ الزراعة', currentStage: 'المرحلة الحالية', irrigationRule: 'قاعدة الري', expectedHarvest: 'الحصاد المتوقع', viewGuide: 'عرض الدليل →', estimateYield: 'تقدير الإنتاج', removeConfirm: 'هل تريد حذف هذا المحصول من مزرعتك؟' },
      crops: { title: 'قاعدة بيانات المحاصيل', searchPlaceholder: 'ابحث عن المحاصيل (مثل الطماطم، الأرز، القمح)…', all: 'الكل', vegetables: 'الخضروات', grains: 'الحبوب', pulses: 'البقوليات', fruits: 'الفواكه', showing: 'عرض', crops: 'محاصيل', noCrops: 'لم يتم العثور على محاصيل', noCropsText: 'جرّب البحث باسم آخر أو أعد ضبط فلتر الفئة.' },
      weather: { title: 'الطقس والتوجيه', checkSuitability: 'تحقق من ملاءمة محصول', forecastTitle: 'توقعات 5 أيام', chooseCrop: 'اختر محصولًا', suitable: 'هذا الطقس مناسب لنمو المحصول', borderline: 'هذا الطقس حدودي للمحصول', unsuitable: 'هذا الطقس غير مناسب حاليًا' },
      soil: { title: 'فحص صحة التربة', hint: 'أدخل قيم فحص التربة أو ملاحظات الحقل للتحقق من توازن العناصر الغذائية وملاءمة المحصول.', type: 'نوع التربة', ph: 'أس هيدروجيني للتربة', nitrogen: 'مستوى النيتروجين (N)', phosphorus: 'مستوى الفوسفور (P)', potassium: 'مستوى البوتاسيوم (K)', moisture: 'رطوبة التربة', check: 'فحص صحة التربة', note: 'تربة صحية جيدة', compare: 'قارن بمحصول', newCheck: 'فحص تربة جديد', estimateYield: 'تقدير الإنتاج مع هذه التربة →', calculating: 'جارٍ الحساب…' },
      yield: { title: 'تقدير الإنتاج', hint: 'قدّر الإنتاج المتوقع بناءً على مساحة المزرعة وحالة التربة وممارسات الزراعة.', crop: 'اختر محصولًا', area: 'مساحة المزرعة (فدان)', soilScore: 'درجة صحة التربة (0–100)', method: 'طريقة الزراعة', methodConventional: 'تقليدية (أسمدة عادية وحماية)', methodOrganic: 'عضوية / طبيعية (مدخلات حيوية، بدون كيمياء)', estimate: 'تقدير الإنتاج المتوقع', calculating: 'جارٍ الحساب…', resultTitle: 'نطاق الإنتاج', avg: 'المتوسط المتوقع', reminder: 'يعتمد الإنتاج الفعلي على انتظام المطر ومكافحة الآفات والإدارة اليومية للمزرعة.', calculateProfit: 'احسب الربح المالي →' },
      profit: { title: 'حاسبة الربح', hint: 'قدّر التكاليف والإيرادات والأرباح الصافية المتوقعة للموسم الزراعي.', area: 'مساحة المزرعة (فدان)', seeds: 'البذور والشتلات', fertilizer: 'الأسمدة وتعديلات التربة', labour: 'العمالة وإزالة الأعشاب', irrigation: 'الري والوقود والآلات', other: 'وقاية المحاصيل والنفقات الأخرى', yield: 'إجمالي الإنتاج المتوقع (كجم)', price: 'سعر السوق المتوقع / البيع (₹/كجم)', calculate: 'احسب صافي الربح', calculating: 'جارٍ الحساب…', totalCost: 'إجمالي تكلفة الإنتاج', revenue: 'إجمالي الإيرادات المتوقعة', profit: 'صافي الربح المتوقع', perAcre: 'صافي الربح للفدان', reminder: 'تذكير السوق: تتقلب أسعار السوق يوميًا. راجع الأسعار الحالية قبل الحصاد والبيع.' },
      pests: { title: 'فحص الآفات والأمراض', hint: 'اختر الأعراض المرئية لتحديد الآفات أو الأمراض المحتملة وطرق المكافحة الآمنة.', filter: 'تصفية محصول محدد (اختياري)', noMatchTitle: 'لا توجد مباراة مباشرة', noMatchText: 'جرّب تبديل الأعراض الأخرى أو امسح فلتر المحصول لرؤية جميع التشخيصات المحتملة.', advice: 'نصائح السلامة للمبيدات', symptoms: ['أوراق صفراء', 'بقع بنية', 'ثقوب في الأوراق', 'ذبول', 'آفات مرئية', 'عفن أو فطريات'] },
      quiz: { eyebrow: '🌱 FARMY QUIZ', title: 'اختبار فارمـي', subtitle: 'تعلم • العب • نمُ', score: 'النتيجة', quizzes: 'اختبارات', questions: 'أسئلة', totalScore: 'إجمالي النقاط', completed: 'الاختبارات المكتملة', streak: 'السلسلة الحالية', leaderboard: 'لوحة المتصدرين', start: 'ابدأ الاختبار', playAgain: 'العب مرة أخرى', locked: 'مغلق', nextQuestion: 'السؤال التالي', finish: 'إنهاء الاختبار', correct: 'صحيح!', incorrect: 'خطأ', correctAnswer: 'الإجابة الصحيحة', completeTitle: 'اكتمل الاختبار!', points: 'نقاط', nextQuiz: 'الاختبار التالي', quizHome: 'الرئيسية', question: 'السؤال', of: 'من', answered: 'سلسلة الإجابات', percent: 'التقدم', best: 'الأفضل', rank: 'الرتبة', player: 'اللاعب' },
      procurement: { title: 'قائمة المشتريات', subtitle: 'تتبع طلبات الشراء والموافقة', create: 'إنشاء طلب', update: 'تحديث الطلب', requestId: 'رقم الطلب', item: 'العنصر / المنتج', quantity: 'الكمية', requestedBy: 'مقدم الطلب', department: 'القسم / الفئة', priority: 'الأولوية', date: 'التاريخ', status: 'الحالة', notes: 'ملاحظات', search: 'بحث الطلبات', filter: 'تصفية الحالة', sort: 'ترتيب', sortNewest: 'الأحدث أولاً', sortOldest: 'الأقدم أولاً', sortPriority: 'الأولوية', allStatuses: 'كل الحالات', pending: 'قيد الانتظار', processing: 'قيد المعالجة', approved: 'موافق عليه', rejected: 'مرفوض', completed: 'مكتمل', submit: 'إرسال الطلب', reset: 'إعادة تعيين', total: 'إجمالي الطلبات', empty: 'لا توجد طلبات شراء', emptyText: 'أنشئ طلبًا أولاً لبدء متابعة الموافقة والتسليم.', loading: 'جارٍ تحميل قائمة المشتريات…', success: 'تم إنشاء الطلب بنجاح.', error: 'تعذّر حفظ الطلب. حاول مرة أخرى.', priorityLow: 'منخفض', priorityMedium: 'متوسط', priorityHigh: 'عالي', priorityUrgent: 'طارئ', statusLabel: 'الحالة', noRecords: 'لا توجد سجلات', save: 'حفظ', cancel: 'إلغاء', delete: 'حذف', edit: 'تعديل' }
    }
  };

  function getLanguage() {
    const stored = (typeof localStorage !== 'undefined') ? localStorage.getItem('farmy_language') : null;
    return stored && translations[stored] ? stored : 'en';
  }

  function setLanguage(lang) {
    if (!translations[lang]) return;
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('farmy_language', lang);
    }
    applyLanguage();
  }

  function t(key, fallback) {
    const lang = getLanguage();
    const value = key.split('.').reduce((obj, part) => (obj && obj[part] !== undefined ? obj[part] : undefined), translations[lang]) ||
      key.split('.').reduce((obj, part) => (obj && obj[part] !== undefined ? obj[part] : undefined), translations.en) ||
      fallback || key;
    return value;
  }

  function applyLanguage() {
    const lang = getLanguage();
    const html = document.documentElement;
    html.lang = lang;
    html.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.body.classList.toggle('rtl', lang === 'ar');
    document.body.classList.toggle('ltr', lang !== 'ar');

    const nodes = document.querySelectorAll('[data-i18n]');
    nodes.forEach((node) => {
      const value = t(node.dataset.i18n, node.textContent);
      node.textContent = value;
    });

    const placeholders = document.querySelectorAll('[data-i18n-placeholder]');
    placeholders.forEach((node) => {
      const value = t(node.dataset.i18nPlaceholder, node.placeholder || node.getAttribute('placeholder'));
      node.placeholder = value;
    });

    const heads = document.querySelectorAll('[data-i18n-title]');
    heads.forEach((node) => {
      const value = t(node.dataset.i18nTitle, node.title || '');
      if (value) node.title = value;
    });

    const opts = document.querySelectorAll('[data-i18n-option]');
    opts.forEach((node) => {
      const key = node.dataset.i18nOption;
      node.textContent = t(key, node.textContent);
    });

    const languageValue = document.getElementById('farmyLanguageValue');
    if (languageValue) languageValue.textContent = translations[lang].language;

    document.dispatchEvent(new CustomEvent('farmy:language-change', { detail: { lang } }));
    if (window.renderHome) window.renderHome();
    if (window.renderFarm) window.renderFarm();
    if (window.renderCrops) window.renderCrops();
    if (window.renderWeather) window.renderWeather();
    if (window.renderChat) window.renderChat();
    if (window.updatePageText) window.updatePageText();
    if (typeof window !== 'undefined' && window.renderBreadcrumbs) window.renderBreadcrumbs();
  }

  function renderLanguageSwitcher() {
    const existing = document.getElementById('farmyLanguageSwitcher');
    if (existing) existing.remove();

    const wrap = document.createElement('div');
    wrap.id = 'farmyLanguageSwitcher';
    wrap.className = 'lang-switcher';
    wrap.innerHTML = `
      <label class="lang-label">🌐</label>
      <select id="farmyLanguageSelect" aria-label="Select language">
        <option value="en">English</option>
        <option value="ta">தமிழ்</option>
        <option value="ml">മലയാളം</option>
        <option value="hi">हिन्दी</option>
        <option value="ar">العربية</option>
      </select>
    `;
    const appWrap = document.getElementById('appwrap');
    if (appWrap) {
      appWrap.insertBefore(wrap, appWrap.firstChild);
    }

    const select = document.getElementById('farmyLanguageSelect');
    if (select) {
      select.value = getLanguage();
      select.addEventListener('change', (event) => setLanguage(event.target.value));
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    renderLanguageSwitcher();
    applyLanguage();
  });

  window.FARMY_I18N = {
    translations,
    getLanguage,
    setLanguage,
    t,
    applyLanguage,
    renderLanguageSwitcher
  };
  window.getCurrentLanguage = getLanguage;
  window.t = t;
  window.setCurrentLanguage = setLanguage;
})();
