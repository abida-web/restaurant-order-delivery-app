import { Post } from "@/types";

export const personalBlog: Post[] = [
  {
    id: 1,
    title: "Exploring the Hidden Beaches of Thailand",
    longDescription:
      "Thailand's coastline is dotted with countless hidden gems waiting to be discovered. From the pristine sands of Railay Beach to the secluded coves of Koh Lipe, this journey takes us through some of the most breathtaking coastal landscapes in Southeast Asia. The crystal-clear waters, vibrant marine life, and friendly local communities make these destinations truly special. Join me as I share my experiences navigating these tropical paradises and the unforgettable memories created along the way.",
    slug: "exploring-hidden-beaches-thailand",
    categories: "Travel",
    tags: ["adventure", "beaches", "southeast-asia", "backpacking"],
    author: "Abida Hakime",
    date: "2024-01-15",
    readTime: "7 min read",
    thumbnail: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a",
    summary:
      "Discover Thailand's secret coastal gems away from the tourist crowds",
    isFeatured: true,
    likes: 234,
    comments: [
      {
        name: "TravelEnthusiast",
        text: "Amazing photos! Adding these to my bucket list",
        date: "2024-01-16",
      },
      {
        name: "Wanderlust23",
        text: "Which beach was your favorite?",
        date: "2024-01-17",
      },
    ],
    relatedPosts: [2, 5, 8],
  },
  {
    id: 2,
    title: "Morning Rituals for a Productive Day",
    longDescription:
      "Establishing a consistent morning routine can transform your entire day. Through months of experimentation and research, I've discovered the perfect combination of habits that boost productivity and mental clarity. From meditation and journaling to strategic exercise and nutrition, each element plays a crucial role in setting the tone for success. This comprehensive guide breaks down the science behind effective morning rituals and provides practical steps you can implement starting tomorrow.",
    slug: "morning-rituals-productive-day",
    categories: "Wellness",
    tags: ["productivity", "self-care", "routine", "mindfulness"],
    author: "Michael Chen",
    date: "2024-01-12",
    readTime: "6 min read",
    thumbnail: "https://images.unsplash.com/photo-1498837167922-ddd27525d352",
    summary:
      "Transform your mornings with these science-backed rituals for peak performance",
    isFeatured: false,
    likes: 189,
    comments: [
      {
        name: "WellnessWarrior",
        text: "Life-changing advice! Already seeing results",
        date: "2024-01-13",
      },
    ],
    relatedPosts: [3, 7, 12],
  },
  {
    id: 3,
    title: "Sustainable Fashion: Beyond the Trends",
    longDescription:
      "The fashion industry is undergoing a revolutionary shift towards sustainability, but what does it truly mean to build an eco-conscious wardrobe? This deep dive explores the environmental impact of fast fashion, highlights ethical brands making a difference, and provides practical tips for making more conscious purchasing decisions. From understanding fabric certifications to embracing circular fashion principles, learn how to align your style with your values without compromising on aesthetics.",
    slug: "sustainable-fashion-beyond-trends",
    categories: "Fashion",
    tags: ["sustainability", "ethical-fashion", "slow-fashion", "eco-friendly"],
    author: "Emma Rodriguez",
    date: "2024-01-08",
    readTime: "8 min read",
    thumbnail: "https://images.unsplash.com/photo-1445205170230-053b83016050",
    summary:
      "How to build a stylish wardrobe that respects both people and planet",
    isFeatured: true,
    likes: 312,
    comments: [
      {
        name: "EcoFashionista",
        text: "Finally a comprehensive guide to sustainable fashion!",
        date: "2024-01-09",
      },
      {
        name: "GreenThreads",
        text: "Would love more brand recommendations",
        date: "2024-01-10",
      },
    ],
    relatedPosts: [4, 9, 15],
  },
  {
    id: 4,
    title: "The Power of Small Consistent Actions",
    longDescription:
      "Grand gestures and massive overnight changes often capture our attention, but the true secret to lasting transformation lies in the power of small, consistent actions. Drawing from psychology, neuroscience, and real-life success stories, this article explores how incremental progress compounds over time to create extraordinary results. Whether you're pursuing personal growth, professional development, or creative endeavors, understanding this principle can revolutionize your approach to achieving goals.",
    slug: "power-small-consistent-actions",
    categories: "Inspiring",
    tags: ["personal-growth", "habits", "motivation", "self-improvement"],
    author: "David Thompson",
    date: "2024-01-05",
    readTime: "5 min read",
    thumbnail: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe",
    summary: "How tiny daily habits lead to massive long-term transformations",
    isFeatured: false,
    likes: 267,
    comments: [],
    relatedPosts: [2, 6, 11],
  },
  {
    id: 5,
    title: "Italian Cooking: From Nonna's Kitchen",
    longDescription:
      "There's something magical about Italian grandmothers' approach to cooking – a blend of tradition, intuition, and love passed down through generations. After spending a summer in Tuscany learning from local nonnas, I'm sharing their priceless wisdom and authentic recipes that have stood the test of time. From perfecting homemade pasta to understanding the true essence of 'cucina povera,' this culinary journey will transform how you think about Italian food and its rich cultural heritage.",
    slug: "italian-cooking-nonnas-kitchen",
    categories: "Food",
    tags: [
      "italian-cuisine",
      "traditional-recipes",
      "cooking-tips",
      "authentic",
    ],
    author: "Maria Lombardi",
    date: "2024-01-03",
    readTime: "9 min read",
    thumbnail: "https://images.unsplash.com/photo-1551183053-bf91a1d81141",
    summary:
      "Authentic Italian recipes and wisdom straight from grandmothers' kitchens",
    isFeatured: true,
    likes: 421,
    comments: [
      {
        name: "FoodieTraveler",
        text: "The pasta recipe changed my life!",
        date: "2024-01-04",
      },
      {
        name: "ItalianFoodLover",
        text: "Finally, real Italian cooking without the fusion twists",
        date: "2024-01-05",
      },
    ],
    relatedPosts: [1, 10, 18],
  },
  {
    id: 6,
    title: "Digital Detox: Reconnecting with the Real World",
    longDescription:
      "In an increasingly connected digital world, many of us are experiencing the negative effects of constant screen time and information overload. This personal account details my 30-day digital detox journey – the challenges, breakthroughs, and profound insights gained from disconnecting to reconnect. Learn practical strategies for setting healthy boundaries with technology, rediscovering offline pleasures, and cultivating more meaningful connections in an age of digital distraction.",
    slug: "digital-detox-reconnecting-real-world",
    categories: "Wellness",
    tags: ["digital-detox", "mindfulness", "mental-health", "technology"],
    author: "Alex Turner",
    date: "2023-12-28",
    readTime: "7 min read",
    thumbnail: "https://images.unsplash.com/photo-1547658719-da2b51169166",
    summary:
      "A 30-day journey to break free from digital addiction and rediscover life",
    isFeatured: false,
    likes: 198,
    comments: [
      {
        name: "DigitalMinimalist",
        text: "Inspired me to start my own detox journey",
        date: "2023-12-29",
      },
    ],
    relatedPosts: [2, 7, 14],
  },
  {
    id: 7,
    title: "Minimalist Wardrobe for Maximum Impact",
    longDescription:
      "Building a capsule wardrobe isn't about deprivation – it's about curating a collection of versatile, high-quality pieces that work harmoniously together. This guide walks you through the process of creating a minimalist wardrobe that reflects your personal style while reducing decision fatigue and environmental impact. From essential building blocks to strategic accessories, discover how fewer clothes can actually lead to more outfit possibilities and greater confidence in your daily style choices.",
    slug: "minimalist-wardrobe-maximum-impact",
    categories: "Fashion",
    tags: ["capsule-wardrobe", "minimalism", "style", "sustainable-fashion"],
    author: "Jessica Park",
    date: "2023-12-25",
    readTime: "6 min read",
    thumbnail: "https://images.unsplash.com/photo-1485231183945-fffde7cc1865",
    summary: "How to create a versatile capsule wardrobe with just 30 pieces",
    isFeatured: true,
    likes: 289,
    comments: [
      {
        name: "StyleSimplified",
        text: "This approach saved me so much time and money!",
        date: "2023-12-26",
      },
    ],
    relatedPosts: [3, 9, 16],
  },
  {
    id: 8,
    title: "Japanese Ryokan: Ultimate Cultural Experience",
    longDescription:
      "Staying in a traditional Japanese ryokan offers more than just accommodation – it's an immersive cultural experience that transports you to a world of tranquility and ancient traditions. From the meticulous kaiseki meals to the therapeutic onsens and tatami-matted rooms, every aspect of the ryokan stay is designed to nurture both body and spirit. This comprehensive guide covers everything from etiquette and booking tips to personal experiences that will convince you to make ryokan stays an essential part of any Japan itinerary.",
    slug: "japanese-ryokan-cultural-experience",
    categories: "Travel",
    tags: ["japan", "cultural-experience", "traditional", "wellness-travel"],
    author: "Kenji Tanaka",
    date: "2023-12-20",
    readTime: "8 min read",
    thumbnail: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9",
    summary:
      "Immerse yourself in Japanese tradition through authentic ryokan stays",
    isFeatured: false,
    likes: 324,
    comments: [
      {
        name: "JapanTraveler",
        text: "Stayed at a ryokan after reading this - unforgettable!",
        date: "2023-12-22",
      },
    ],
    relatedPosts: [1, 5, 13],
  },
  {
    id: 9,
    title: "Mindful Eating: Transform Your Relationship with Food",
    longDescription:
      "Mindful eating isn't another diet trend – it's a revolutionary approach to transforming your relationship with food. By bringing conscious awareness to the eating experience, you can break free from emotional eating patterns, rediscover the joy of nourishment, and develop a healthier connection with your body's signals. This practice combines ancient mindfulness techniques with modern nutritional science to create sustainable eating habits that honor both physical health and emotional well-being.",
    slug: "mindful-eating-transform-relationship-food",
    categories: "Wellness",
    tags: ["mindful-eating", "nutrition", "mental-health", "healthy-habits"],
    author: "Dr. Rachel Green",
    date: "2023-12-18",
    readTime: "7 min read",
    thumbnail: "https://images.unsplash.com/photo-1490645935967-10de6ba17061",
    summary:
      "How mindfulness can revolutionize your approach to food and eating",
    isFeatured: false,
    likes: 215,
    comments: [],
    relatedPosts: [2, 5, 12],
  },
  {
    id: 10,
    title: "Street Food Adventures in Mexico City",
    longDescription:
      "Mexico City's streets are a living, breathing culinary laboratory where ancient traditions meet innovative flavors. From dawn until late night, the city's food stalls serve up an incredible array of authentic dishes that tell the story of Mexican culture and history. Join me on a gastronomic tour through the city's most legendary markets and hidden street food gems, where every bite reveals another layer of this vibrant culinary landscape and the passionate artisans who keep these traditions alive.",
    slug: "street-food-adventures-mexico-city",
    categories: "Travel",
    tags: ["mexico", "street-food", "culinary-travel", "food-culture"],
    author: "Carlos Mendez",
    date: "2023-12-15",
    readTime: "9 min read",
    thumbnail: "https://images.unsplash.com/photo-1511796381893-5fa965f8f755",
    summary:
      "A culinary journey through Mexico City's most incredible street food scenes",
    isFeatured: true,
    likes: 378,
    comments: [
      {
        name: "FoodAdventurer",
        text: "Your taco recommendations were spot on!",
        date: "2023-12-16",
      },
    ],
    relatedPosts: [1, 5, 18],
  },
  {
    id: 11,
    title: "Overcoming Fear: Stories of Courage and Resilience",
    longDescription:
      "Fear is a universal human experience, but what separates those who are paralyzed by it from those who use it as fuel for growth? Through intimate interviews with individuals who've faced extraordinary challenges – from climbing Mount Everest to starting businesses against all odds – this collection of stories reveals the psychological tools and mindset shifts that enable ordinary people to accomplish extraordinary things. Discover how to transform fear from a barrier into a catalyst for personal transformation.",
    slug: "overcoming-fear-stories-courage-resilience",
    categories: "Inspiring",
    tags: ["courage", "resilience", "personal-growth", "mindset"],
    author: "Lisa Wang",
    date: "2023-12-12",
    readTime: "8 min read",
    thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
    summary:
      "Inspiring stories of ordinary people who conquered extraordinary fears",
    isFeatured: false,
    likes: 298,
    comments: [
      {
        name: "CourageSeeker",
        text: "This gave me the push I needed to pursue my dreams",
        date: "2023-12-13",
      },
    ],
    relatedPosts: [4, 14, 19],
  },
  {
    id: 12,
    title: "Yoga for Beginners: Finding Your Flow",
    longDescription:
      "Starting a yoga practice can feel intimidating, but the journey of a thousand poses begins with a single breath. This comprehensive beginner's guide demystifies the world of yoga, breaking down foundational poses, breathing techniques, and meditation practices in an accessible way. Whether you're seeking physical flexibility, mental clarity, or spiritual connection, learn how to establish a sustainable practice that grows with you. From choosing the right mat to understanding different yoga styles, everything you need to begin your journey is right here.",
    slug: "yoga-beginners-finding-your-flow",
    categories: "Wellness",
    tags: ["yoga", "beginners-guide", "meditation", "fitness"],
    author: "Priya Sharma",
    date: "2023-12-10",
    readTime: "6 min read",
    thumbnail: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b",
    summary:
      "Your complete guide to starting a yoga practice that actually sticks",
    isFeatured: true,
    likes: 245,
    comments: [
      {
        name: "YogaNewbie",
        text: "Finally a yoga guide that doesn't assume prior knowledge!",
        date: "2023-12-11",
      },
    ],
    relatedPosts: [2, 6, 9],
  },
  {
    id: 13,
    title: "Parisian Style Secrets: Effortless Elegance",
    longDescription:
      "There's an undeniable allure to Parisian style – that seemingly effortless elegance that French women embody with such grace. After living in Paris for two years and studying with local stylists, I'm revealing the secrets behind this timeless aesthetic. It's not about following trends but understanding the principles of quality, fit, and personal expression. Learn how to build a wardrobe foundation, master the art of accessorizing, and cultivate the confidence that makes Parisian style so captivating and universally admired.",
    slug: "parisian-style-secrets-effortless-elegance",
    categories: "Fashion",
    tags: ["parisian-style", "elegance", "french-fashion", "timeless"],
    author: "Sophie Laurent",
    date: "2023-12-08",
    readTime: "7 min read",
    thumbnail: "https://images.unsplash.com/photo-1441986300917-64674bd600d8",
    summary:
      "Decoding the secrets of French women's timeless and effortless style",
    isFeatured: false,
    likes: 356,
    comments: [
      {
        name: "StyleStudent",
        text: "The tip about investing in quality basics was revolutionary",
        date: "2023-12-09",
      },
    ],
    relatedPosts: [3, 7, 16],
  },
  {
    id: 14,
    title: "Hiking the Inca Trail to Machu Picchu",
    longDescription:
      "The ancient Inca Trail to Machu Picchu is more than just a hike – it's a pilgrimage through history, culture, and breathtaking natural beauty. This day-by-day account of the four-day trek captures the physical challenges, spiritual moments, and overwhelming sense of accomplishment that comes with reaching the Sun Gate. From preparing for high altitude to understanding the archaeological significance of the ruins along the way, this guide provides everything you need to make this bucket-list adventure a reality.",
    slug: "hiking-inca-trail-machu-picchu",
    categories: "Travel",
    tags: ["hiking", "peru", "adventure", "cultural-heritage"],
    author: "Miguel Torres",
    date: "2023-12-05",
    readTime: "10 min read",
    thumbnail: "https://images.unsplash.com/photo-1587595431973-160d0d94add1",
    summary:
      "A transformative journey along the ancient path to the lost city of the Incas",
    isFeatured: true,
    likes: 412,
    comments: [
      {
        name: "AdventureSeeker",
        text: "Bucket list item checked thanks to your detailed guide!",
        date: "2023-12-06",
      },
    ],
    relatedPosts: [1, 8, 20],
  },
  {
    id: 15,
    title: "The Art of Sourdough: From Starter to Perfect Loaf",
    longDescription:
      "Sourdough baking is both science and art – a beautiful dance between wild yeast, flour, water, and time. This comprehensive guide takes you through the entire process, from cultivating your own starter from scratch to achieving that perfect crust and airy crumb. Learn the techniques that professional bakers use, understand the fermentation process, and discover how to troubleshoot common problems. Whether you're a complete beginner or looking to refine your skills, this deep dive will transform your relationship with bread making.",
    slug: "art-sourdough-starter-perfect-loaf",
    categories: "Food",
    tags: ["sourdough", "baking", "bread", "artisan"],
    author: "Thomas Baker",
    date: "2023-12-03",
    readTime: "11 min read",
    thumbnail: "https://images.unsplash.com/photo-1549931319-a545dcf3bc73",
    summary:
      "Master the ancient craft of sourdough baking from start to finish",
    isFeatured: false,
    likes: 334,
    comments: [
      {
        name: "BreadLover",
        text: "My first successful loaf thanks to your starter recipe!",
        date: "2023-12-04",
      },
    ],
    relatedPosts: [5, 10, 22],
  },
  {
    id: 16,
    title: "Finding Your Personal Style: A Journey of Self-Discovery",
    longDescription:
      "Personal style isn't about copying trends or following fashion rules – it's a powerful form of self-expression that evolves as we do. This reflective guide helps you uncover your authentic style by exploring your personality, lifestyle, and values. Through practical exercises and thoughtful questions, you'll learn to curate a wardrobe that truly represents who you are. From color analysis to understanding body proportions, discover how to develop a signature style that feels uniquely you and gives you confidence in any situation.",
    slug: "finding-personal-style-journey-self-discovery",
    categories: "Fashion",
    tags: ["personal-style", "self-expression", "wardrobe", "confidence"],
    author: "Nina Patel",
    date: "2023-11-30",
    readTime: "6 min read",
    thumbnail: "https://images.unsplash.com/photo-1496747611176-843222e1e57c",
    summary:
      "How to discover and cultivate a wardrobe that reflects your true self",
    isFeatured: false,
    likes: 278,
    comments: [
      {
        name: "StyleExplorer",
        text: "The style personality quiz was incredibly insightful",
        date: "2023-12-01",
      },
    ],
    relatedPosts: [3, 7, 13],
  },
  {
    id: 17,
    title: "Meditation for Busy People: 5-Minute Practices",
    longDescription:
      "You don't need hours of silent sitting to experience the benefits of meditation. For those with packed schedules and endless to-do lists, these practical 5-minute meditation techniques can be seamlessly integrated into your busiest days. From breath awareness exercises you can do at your desk to mindful walking during lunch breaks, discover how micro-meditations can reduce stress, improve focus, and bring moments of calm to even the most chaotic days. These accessible practices prove that everyone has time for mindfulness.",
    slug: "meditation-busy-people-5-minute-practices",
    categories: "Wellness",
    tags: ["meditation", "stress-relief", "mindfulness", "busy-lifestyle"],
    author: "Dr. James Wilson",
    date: "2023-11-28",
    readTime: "5 min read",
    thumbnail: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b",
    summary: "Quick and effective meditation techniques for the time-poor",
    isFeatured: true,
    likes: 223,
    comments: [
      {
        name: "BusyProfessional",
        text: "The 5-minute breathing technique has been a game changer",
        date: "2023-11-29",
      },
    ],
    relatedPosts: [2, 6, 12],
  },
  {
    id: 18,
    title: "Vietnamese Street Food: A Flavor Journey",
    longDescription:
      "Vietnamese cuisine is a symphony of flavors – sweet, sour, salty, bitter, and umami dancing together in perfect harmony. This culinary exploration takes you through the bustling streets of Hanoi and Ho Chi Minh City, where each corner offers a new taste sensation. From the complex broth of pho to the fresh crunch of banh mi, learn about the ingredients, techniques, and cultural stories behind Vietnam's most beloved street foods. Plus, get authentic recipes you can recreate at home to bring these vibrant flavors to your own kitchen.",
    slug: "vietnamese-street-food-flavor-journey",
    categories: "Food",
    tags: [
      "vietnamese-food",
      "street-food",
      "asian-cuisine",
      "culinary-travel",
    ],
    author: "Linh Nguyen",
    date: "2023-11-25",
    readTime: "8 min read",
    thumbnail: "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43",
    summary:
      "Exploring the vibrant and complex world of Vietnamese street cuisine",
    isFeatured: false,
    likes: 389,
    comments: [
      {
        name: "FoodExplorer",
        text: "Your pho recipe is the closest I've found to authentic Hanoi style",
        date: "2023-11-26",
      },
    ],
    relatedPosts: [5, 10, 15],
  },
  {
    id: 19,
    title: "Turning Failure into Fuel: Lessons from Setbacks",
    longDescription:
      "Society often teaches us to fear failure, but what if we viewed it as essential feedback rather than final judgment? This deeply personal exploration reframes failure as a necessary component of growth and innovation. Through stories of professional setbacks, creative blocks, and personal challenges, discover how to extract wisdom from disappointment, build resilience, and use adversity as rocket fuel for future success. Learn practical strategies for bouncing back stronger and developing the growth mindset that turns obstacles into opportunities.",
    slug: "turning-failure-into-fuel-lessons-setbacks",
    categories: "Inspiring",
    tags: ["failure", "resilience", "growth-mindset", "success"],
    author: "Marcus Reynolds",
    date: "2023-11-22",
    readTime: "7 min read",
    thumbnail: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85",
    summary:
      "How to transform your biggest setbacks into your greatest comebacks",
    isFeatured: true,
    likes: 301,
    comments: [
      {
        name: "GrowthSeeker",
        text: "This came at the perfect time - thank you for the perspective shift",
        date: "2023-11-23",
      },
    ],
    relatedPosts: [4, 11, 24],
  },
  {
    id: 20,
    title: "Road Tripping the California Coast: Pacific Highway 1",
    longDescription:
      "There are few drives in the world as iconic as California's Pacific Coast Highway. This epic road trip guide takes you from the rugged cliffs of Big Sur to the charming towns of Central Coast, with plenty of hidden stops along the way. Discover secluded beaches, world-class wineries, and breathtaking viewpoints that most travelers miss. From planning your itinerary to finding the best clam chowder, this comprehensive guide ensures you experience the magic of one of America's most spectacular coastal journeys.",
    slug: "road-tripping-california-coast-pacific-highway",
    categories: "Travel",
    tags: ["road-trip", "california", "adventure", "coastal-drive"],
    author: "Jennifer Martinez",
    date: "2023-11-20",
    readTime: "9 min read",
    thumbnail: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29",
    summary: "The ultimate guide to America's most spectacular coastal drive",
    isFeatured: false,
    likes: 445,
    comments: [
      {
        name: "RoadTripper",
        text: "Your hidden gem recommendations made our trip unforgettable!",
        date: "2023-11-21",
      },
    ],
    relatedPosts: [1, 8, 14],
  },
  {
    id: 21,
    title: "The Science of Sleep: Optimizing Your Rest",
    longDescription:
      "Sleep isn't just downtime – it's an active, essential process that affects every aspect of our health and performance. This evidence-based guide explores the latest sleep science, from circadian rhythms and sleep cycles to the profound impact of quality rest on memory, immunity, and emotional regulation. Learn practical strategies for improving sleep quality, from optimizing your bedroom environment to establishing pre-sleep rituals that signal your brain it's time to wind down. Transform your relationship with sleep and unlock your full potential.",
    slug: "science-sleep-optimizing-your-rest",
    categories: "Wellness",
    tags: ["sleep", "health", "productivity", "science"],
    author: "Dr. Amanda Foster",
    date: "2023-11-18",
    readTime: "8 min read",
    thumbnail: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55",
    summary:
      "Evidence-based strategies for achieving deeper, more restorative sleep",
    isFeatured: false,
    likes: 267,
    comments: [
      {
        name: "SleepSeeker",
        text: "The temperature tip alone improved my sleep quality dramatically",
        date: "2023-11-19",
      },
    ],
    relatedPosts: [2, 6, 17],
  },
  {
    id: 22,
    title: "Farm to Table: Cooking with Seasonal Ingredients",
    longDescription:
      "There's a special kind of magic that happens when you cook with ingredients at their peak season. This celebration of seasonal eating takes you through the year, highlighting the best produce each season offers and providing recipes that let these ingredients shine. Learn how to shop farmers markets like a pro, preserve seasonal bounty, and develop an intuitive understanding of flavor pairings. From spring's tender asparagus to winter's hearty root vegetables, discover how eating with the seasons transforms both your cooking and your connection to food.",
    slug: "farm-table-cooking-seasonal-ingredients",
    categories: "Food",
    tags: ["seasonal-cooking", "farm-to-table", "local", "sustainable-eating"],
    author: "Olivia Green",
    date: "2023-11-15",
    readTime: "7 min read",
    thumbnail: "https://images.unsplash.com/photo-1542838132-92c53300491e",
    summary:
      "How to create delicious meals using seasonal, locally-sourced ingredients",
    isFeatured: true,
    likes: 323,
    comments: [
      {
        name: "LocalFoodie",
        text: "The seasonal produce guide is now permanently on my fridge",
        date: "2023-11-16",
      },
    ],
    relatedPosts: [5, 15, 18],
  },
  {
    id: 23,
    title: "The Joy of Missing Out: Embracing a Slower Life",
    longDescription:
      "In a world obsessed with FOMO (Fear of Missing Out), there's a quiet revolution happening – the embrace of JOMO (Joy of Missing Out). This philosophical exploration challenges the constant pursuit of more and makes a compelling case for the richness found in less. Through personal anecdotes and cultural analysis, discover how intentionally opting out of the endless cycle of busyness can lead to deeper connections, more meaningful experiences, and genuine contentment. Learn practical ways to cultivate stillness in a noisy world.",
    slug: "joy-missing-out-embracing-slower-life",
    categories: "Inspiring",
    tags: ["minimalism", "mindfulness", "slow-living", "contentment"],
    author: "Benjamin Carter",
    date: "2023-11-12",
    readTime: "6 min read",
    thumbnail: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
    summary: "Finding fulfillment by consciously choosing what to miss out on",
    isFeatured: false,
    likes: 289,
    comments: [
      {
        name: "SlowLiving",
        text: "This article perfectly captures why I've been feeling overwhelmed",
        date: "2023-11-13",
      },
    ],
    relatedPosts: [4, 6, 19],
  },
  {
    id: 24,
    title: "Building a Creative Practice That Lasts",
    longDescription:
      "Creativity isn't a mysterious gift bestowed upon a chosen few – it's a muscle that strengthens with consistent practice. This guide explores how to build a sustainable creative practice that withstands busy schedules, self-doubt, and the inevitable ebbs and flows of inspiration. Drawing from interviews with artists, writers, and innovators, learn practical strategies for overcoming creative blocks, establishing productive routines, and maintaining momentum on long-term projects. Discover how to make creativity an integral part of your daily life, not just a sporadic hobby.",
    slug: "building-creative-practice-that-lasts",
    categories: "Inspiring",
    tags: ["creativity", "art", "productivity", "inspiration"],
    author: "Isabella Rossi",
    date: "2023-11-10",
    readTime: "7 min read",
    thumbnail: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0",
    summary: "How to cultivate and maintain creativity as a daily practice",
    isFeatured: true,
    likes: 312,
    comments: [
      {
        name: "CreativeSoul",
        text: "The morning pages technique has unlocked so much creativity for me",
        date: "2023-11-11",
      },
    ],
    relatedPosts: [4, 11, 19],
  },
  {
    id: 25,
    title: "Winter Comfort Foods from Around the World",
    longDescription:
      "When temperatures drop and days grow shorter, cultures around the world turn to their own versions of comfort food to warm both body and soul. This global culinary tour explores winter traditions from Swedish meatballs to Korean kimchi stew, Moroccan tagine to American chili. Each recipe tells a story of geography, climate, and cultural heritage while providing the warmth and nourishment we crave during colder months. Learn to make these international comfort classics and bring the world's coziest flavors to your winter table.",
    slug: "winter-comfort-foods-around-world",
    categories: "Food",
    tags: [
      "comfort-food",
      "winter-recipes",
      "international-cuisine",
      "hearty-meals",
    ],
    author: "Anya Petrova",
    date: "2023-11-08",
    readTime: "8 min read",
    thumbnail: "https://images.unsplash.com/photo-1476124369491-e7addf5db371",
    summary: "A global tour of the world's most comforting winter dishes",
    isFeatured: false,
    likes: 398,
    comments: [
      {
        name: "ComfortFoodLover",
        text: "The Korean army stew is now a weekly rotation in our house!",
        date: "2023-11-09",
      },
    ],
    relatedPosts: [5, 15, 22],
  },
];

export const mobileNavigation = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Blog",
    href: "/blog",
  },
  {
    name: "About",
    href: "/about",
  },
  {
    name: "Contact",
    href: "/contact",
  },
];
