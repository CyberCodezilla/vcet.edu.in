import os
import requests
from urllib.parse import urlparse

urls = [
    "https://vcet.edu.in/wp-content/uploads/2026/02/College_Logo_R-removebg-preview.png",
    "https://vcet.edu.in/wp-content/uploads/2026/02/College_Logo_R-removebg-preview-300x300.png",
    "https://vcet.edu.in/wp-content/uploads/2026/02/College_Logo_R-removebg-preview-150x150.png",
    "https://vcet.edu.in/wp-content/uploads/2026/02/College_Logo_R-removebg-preview-450x450.png",
    "https://vcet.edu.in/wp-content/uploads/2021/11/College-Logo.png",
    "https://vcet.edu.in/wp-content/uploads/2021/12/WhatsApp-Image-2021-12-07-at-3.07.24-PM-1024x703.jpeg",
    "https://vcet.edu.in/wp-content/uploads/2021/12/WhatsApp-Image-2021-12-07-at-3.07.24-PM-300x206.jpeg",
    "https://vcet.edu.in/wp-content/uploads/2021/12/WhatsApp-Image-2021-12-07-at-3.07.24-PM-768x527.jpeg",
    "https://vcet.edu.in/wp-content/uploads/2021/12/WhatsApp-Image-2021-12-07-at-3.07.24-PM.jpeg",
    "https://vcet.edu.in/wp-content/uploads/2021/11/facebook.png",
    "https://vcet.edu.in/wp-content/uploads/2021/11/instagram.png",
    "https://vcet.edu.in/wp-content/uploads/2021/11/linkedin.png",
    "https://vcet.edu.in/wp-content/uploads/2021/11/youtube.png",
    "https://vcet.edu.in/wp-content/uploads/2021/11/info-1.png",
    "https://vcet.edu.in/wp-content/uploads/2021/11/cropped-College-Logo-32x32.png",
    "https://vcet.edu.in/wp-content/uploads/2021/11/cropped-College-Logo-192x192.png",
    "https://vcet.edu.in/wp-content/uploads/2021/11/cropped-College-Logo-180x180.png",
    "https://vcet.edu.in/wp-content/uploads/2021/11/cropped-College-Logo-270x270.png",
    "https://vcet.edu.in/wp-content/uploads/2021/10/vcet-logo.jpeg",
]

OUTPUT_DIR = "Ladies Common Room"

def download_images(urls, output_dir):
    urls = list(dict.fromkeys(urls))  # Remove duplicates, preserve order
    print(f"Total unique URLs: {len(urls)}\n")
    os.makedirs(output_dir, exist_ok=True)

    headers = {
        "User-Agent": (
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
            "AppleWebKit/537.36 (KHTML, like Gecko) "
            "Chrome/120.0.0.0 Safari/537.36"
        )
    }

    success, failed = 0, 0

    for url in urls:
        filename = os.path.basename(urlparse(url).path)
        filepath = os.path.join(output_dir, filename)

        try:
            response = requests.get(url, headers=headers, timeout=15)
            response.raise_for_status()
            with open(filepath, "wb") as f:
                f.write(response.content)
            print(f"[OK]  {filename}")
            success += 1
        except requests.RequestException as e:
            print(f"[FAIL] {filename} — {e}")
            failed += 1

    print(f"\nDone: {success} downloaded, {failed} failed.")
    print(f"Images saved to: ./{output_dir}/")

if __name__ == "__main__":
    download_images(urls, OUTPUT_DIR)
