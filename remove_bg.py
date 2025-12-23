
import sys
from PIL import Image

def remove_background(input_path, output_path):
    img = Image.open(input_path).convert("RGBA")
    datas = img.getdata()

    new_data = []
    for item in datas:
        r, g, b, a = item
        
        # Calculate brilliance/luminance
        # Using a weighted average for better perceptual accuracy or just max() for glowing effects.
        brightness = max(r, g, b)
        
        # Logic: 
        # If very dark (< 25), make it fully transparent.
        # If bright, make it opaque.
        # In between, use a power curve to fall off transparency quickly, 
        # which helps remove the "halo" effect.
        
        if brightness < 20:
            new_a = 0
        elif brightness > 200:
            new_a = 255
        else:
            # Normalized brightness 0-1
            norm = (brightness - 20) / (200 - 20)
            # Apply a power curve to "tighten" the glow and avoid greyish fringes
            new_a = int(pow(norm, 1.2) * 255)
            
        new_data.append((r, g, b, new_a))

    img.putdata(new_data)
    img.save(output_path, "PNG")
    print(f"Saved to {output_path}")

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Usage: python script.py input_image output_image")
    else:
        remove_background(sys.argv[1], sys.argv[2])
