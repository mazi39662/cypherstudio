export interface Project {
    id: string;
    name: string;
    tagline: string;
    description: string;
    longDescription?: string;
    icon: string;
    color: string;
    demoUrl: string;
    features: string[];
    mediaUrl: string; // Video or image
    logoUrl?: string;
    featuredUrl?: string;
    screenshots?: string[];
    about?: string;
    purpose?: string;
    androidUrl?: string;
    webTestUrl?: string;
    stats: {
        label: string;
        value: string;
    }[];
}

export const projects: Project[] = [
    {
        id: 'notibee',
        name: 'NotiBee',
        tagline: 'Feel the Connection. Stay in the Buzz.',
        description: 'NotiBee is a notification-first social platform designed for instant, tactile connections. Stay in sync with your inner circle through real-time "Buzzes," haptic interactions, and a vibrant, gamified ecosystem.',
        longDescription: 'NotiBee reimagines social interaction by focusing on the core of modern connection: instant presence. Stripping away the clutter of traditional social media, NotiBee centers around a sleek, bee-themed ecosystem where every interaction feels alive.\n\nAt the heart of the app is the Hive, your central hub for activity and "Buzzes"—instant notifications that can trigger real-time haptic feedback on your friends\' devices, bringing a physical dimension to digital chat. Share your fleeting moments through Nectar (aesthetic stories), track your friends on the Radar, and maintain daily interaction streaks to unlock achievements. With its premium gold-on-black glassmorphic design, NotiBee turns staying in touch into a high-vibration experience where you can harvest "Honey" just by being a part of the colony.',
        about: 'NotiBee was born from the idea that communication should be as instinctive and energetic as a "buzz." We wanted to create a space that feels responsive—where a notification isn\'t just an alert, but a pulse of connection. Every feature, from the "Vibrate" pokes to the blossoming garden streaks, is designed to make digital presence feel rewarding and effortless. It’s more than an app; it’s a living, breathing social hive for you and your closest friends.',
        purpose: 'The purpose of NotiBee is to bridge the gap between "texting" and "being there." By leveraging low-friction communication tools like quick-tap buzzes and location-based awareness, NotiBee aims to foster closer bonds without the pressure of traditional social media. Our mission is to provide a minimalist yet meaningful environment that prioritizes speed, aesthetics, and the genuine joy of shared moments.',
        androidUrl: 'https://play.google.com/store/apps/details?id=com.cypherstudio.notibee',
        webTestUrl: 'https://play.google.com/apps/testing/com.cypherstudio.notibee',
        icon: 'Bell',
        color: '#FFD700',
        demoUrl: '#',
        features: [
            'Real-time Haptic "Buzzes"',
            'Nectar Aesthetic Stories',
            'Bee-Themed Mini-Games',
            'Live Radar Sync'
        ],
        mediaUrl: '/notibee/video/Recording 2026-01-24 142438.mp4',
        logoUrl: '/notibee/logo.png',
        screenshots: [
            '/notibee/screenshot/Screenshot 2026-01-24 134151.png',
            '/notibee/screenshot/Screenshot 2026-01-24 134219.png',
            '/notibee/screenshot/Screenshot 2026-01-24 134252.png',
            '/notibee/screenshot/Screenshot 2026-01-24 134323.png'
        ],
        stats: [
            { label: 'Status', value: 'Live' },
            { label: 'Palette', value: 'Gold on Black' },
            { label: 'Role', value: 'Social Hub' }
        ]
    },
    {
        id: 'the-fold',
        name: 'The Fold',
        tagline: 'Yesterday’s Charm. Today’s Truth.',
        description: 'The Fold is a digital news aggregator that blends the timeless elegance of a vintage newspaper with the speed of modern reporting. Experience curated dispatches, live weather integration, and classic mental puzzles in a premium parchment-styled interface.',
        longDescription: 'Step into the golden age of journalism without sacrificing the convenience of the digital era. The Fold transforms your device into a meticulously crafted daily broadsheet, delivering global news with the gravitas it deserves.\n\nBeyond a simple reader, The Fold offers a holistic intellectual experience:\n\n• The Wire: A personalized RSS news feed featuring high-standard dispatches from the world’s most trusted sources.\n• The Masthead: A dynamic header that integrates live weather conditions and your current location.\n• Arcade Edition: Keep your mind sharp with mental exercises like Anagrams and Cipher Word Searches.\n• The Private Archive: Save articles to build your personal library.\n• Parchment Aesthetics: Every pixel is designed to mimic newsprint with high-contrast serif typography.',
        about: 'The Fold was born from a desire to bring back the focus and elegance of physical media. Named after the primary viewing area of a traditional newspaper, the app is built on a philosophy of "Distinguished Reading." We believe that news shouldn\'t just be consumed; it should be an experience. By combining the latest web technologies with a design system inspired by 19th-century telegraphy, we provide a focused sanctuary for the modern reader.',
        purpose: 'The purpose of The Fold is to strip away the distractions of social-media-driven news and return to a curated, high-vibe reading environment. It serves as a unified hub for centralized discovery, cognitive engagement through puzzles, and aesthetic utility that doubles as a statement piece for your digital workspace.',
        androidUrl: 'https://play.google.com/store/apps/details?id=com.thefold.app',
        webTestUrl: 'https://play.google.com/apps/testing/com.thefold.app',
        icon: 'Layers',
        color: '#f3f4f6',
        demoUrl: '#',
        features: [
            'Personalized News Wire',
            'Dynamic Live Masthead',
            'Mental Exercise Arcade',
            'Premium Parchment UI'
        ],
        mediaUrl: '/the fold/video/Recording 2026-01-24 155250.mp4',
        logoUrl: '/the fold/logo.png',
        featuredUrl: '/the fold/featured/features.png',
        screenshots: [
            '/the fold/screenshot/Screenshot 2026-01-24 155331.png',
            '/the fold/screenshot/Screenshot 2026-01-24 155351.png',
            '/the fold/screenshot/Screenshot 2026-01-24 155458.png',
            '/the fold/screenshot/Screenshot 2026-01-24 155546.png',
            '/the fold/screenshot/Screenshot 2026-01-24 155628.png'
        ],
        stats: [
            { label: 'Format', value: 'Broadsheet' },
            { label: 'Focus', value: 'Distinguished' },
            { label: 'Era', value: 'Modern Vintage' }
        ]
    }
];
