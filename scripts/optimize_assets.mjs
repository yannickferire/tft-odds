import { Jimp } from 'jimp';

// Assets to resize (In-place optimization)
const assetsToOptimize = [
    'public/hero-reroll-v3-transparent.png',
    'public/hero-coin-transparent.png',
    'public/hero-card-transparent.png',
    'public/hero-coin-spatula-transparent.png',
    'public/hero-coin-spatula-angle2-transparent.png',
    'public/hero-coin-spatula-angle3-transparent.png',
    'public/hero-card-bard-transparent.png',
    'public/hero-card-yunara-transparent.png',
    'public/hero-card-brock-transparent.png',
    'public/hex-frame-green-transparent.png',
    'public/hex-frame-purple-transparent.png',
    'public/hex-frame-gold-transparent.png'
];

async function optimizeImages() {
    console.log("Starting Optimization (Resize to 500px)...");
    
    for (const filePath of assetsToOptimize) {
        try {
            console.log(`Reading ${filePath}...`);
            const image = await Jimp.read(filePath);
            
            if (image.bitmap.width > 500) {
                console.log(`Resizing ${filePath} from ${image.bitmap.width}px to 500px...`);
                image.resize({ w: 500 });
                await image.write(filePath);
                console.log(`Optimized ${filePath}`);
            } else {
                console.log(`Skipping ${filePath} (already small: ${image.bitmap.width}px)`);
            }
        } catch (err) {
            console.log(`Could not process ${filePath}: File not found or error.`);
        }
    }
    console.log("Optimization Complete.");
}

optimizeImages();
