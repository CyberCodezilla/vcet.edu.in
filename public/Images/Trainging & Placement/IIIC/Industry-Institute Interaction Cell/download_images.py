import os
import requests
from urllib.parse import urlparse, parse_qs, unquote

def extract_real_url(url):
    """Unwrap Google redirect URLs to get the real URL."""
    if "google.com/search?q=" in url:
        parsed = urlparse(url)
        query = parse_qs(parsed.query)
        if "q" in query:
            return unquote(query["q"][0])
    if "google.com/url?" in url:
        parsed = urlparse(url)
        query = parse_qs(parsed.query)
        if "q" in query:
            return unquote(query["q"][0])
    return url

raw_urls = [
    "https://vcet.edu.in/wp-content/uploads/2026/02/College_Logo_R-removebg-preview.png",
    "https://vcet.edu.in/wp-content/uploads/2021/11/College-Logo.png",
    "https://vcet.edu.in/wp-content/uploads/2021/10/vcet-logo.jpeg",
    "https://vcet.edu.in/wp-content/uploads/2021/12/c1.png",
    "https://vcet.edu.in/wp-content/uploads/2021/12/c2.png",
    "https://vcet.edu.in/wp-content/uploads/2021/12/c3.png",
    "https://vcet.edu.in/wp-content/uploads/2021/12/WhatsApp-Image-2021-12-07-at-3.07.24-PM.jpeg",
    "https://vcet.edu.in/wp-content/uploads/2024/06/Sports-Achievement1.jpg",
    "https://vcet.edu.in/wp-content/uploads/2024/06/Sports-Achievement2.jpg",
    "https://vcet.edu.in/wp-content/uploads/2024/06/Sports-Achievement3.jpg",
    "https://vcet.edu.in/wp-content/uploads/2024/06/Sports-Achievement4.jpg",
    "https://www.google.com/search?q=https://vcet.edu.in/wp-content/uploads/2024/06/Sports-Achievement5.jpg",
    "https://vcet.edu.in/wp-content/uploads/2024/06/Sports-Achievement6.jpg",
    "https://vcet.edu.in/wp-content/uploads/2021/11/cricket.jpg",
    "https://vcet.edu.in/wp-content/uploads/2021/11/football.png",
    "https://vcet.edu.in/wp-content/uploads/2021/11/gym_2.png",
    "https://www.google.com/search?q=https://vcet.edu.in/wp-content/uploads/2021/11/Ms-Neha-Gharat.jpg",
    "https://www.google.com/search?q=https://vcet.edu.in/wp-content/uploads/2021/11/Mr.-Prafulla-Patil-2.jpg",
    "https://www.google.com/search?q=https://vcet.edu.in/wp-content/uploads/2021/11/Mr.-Sanket-Patil.jpg",
    "https://www.google.com/search?q=https://vcet.edu.in/wp-content/uploads/2025/03/Higher-Studies-Website.png",
    "https://www.google.com/search?q=https://vcet.edu.in/wp-content/uploads/2025/03/Package-Website.png",
    "https://vcet.edu.in/wp-content/uploads/2025/01/Placement-New.jpg",
    "https://vcet.edu.in/wp-content/uploads/2021/11/facebook.png",
    "https://vcet.edu.in/wp-content/uploads/2021/11/instagram.png",
    "https://vcet.edu.in/wp-content/uploads/2021/11/linkedin.png",
    "https://vcet.edu.in/wp-content/uploads/2021/11/youtube.png",
    "https://vcet.edu.in/wp-content/uploads/2021/11/info-1.png",
    "https://vcet.edu.in/wp-content/uploads/2021/11/cropped-College-Logo-32x32.png",
    "https://vcet.edu.in/wp-content/uploads/2021/11/cropped-College-Logo-192x192.png",
    "https://vcet.edu.in/wp-content/uploads/2021/11/cropped-College-Logo-180x180.png",
    "https://vcet.edu.in/wp-content/uploads/2021/11/cropped-College-Logo-270x270.png",
    "https://vcet.edu.in/wp-content/uploads/2021/11/logo-on-white.png",
    "https://vcet.edu.in/wp-content/uploads/2021/11/papacodingpic1-2.png",
    "https://vcet.edu.in/wp-content/uploads/2021/11/cocubes.jpg",
    "https://vcet.edu.in/wp-content/uploads/2021/11/MATPO.png",
    "https://vcet.edu.in/wp-content/uploads/2021/11/CampusCredentials-logo.png",
    "https://vcet.edu.in/wp-content/uploads/2021/11/College-Logo-1.png",
    "https://vcet.edu.in/wp-content/uploads/2021/11/ims-learning-resources-squarelogo.png",
    "https://vcet.edu.in/wp-content/uploads/2021/11/Swapnil-Karvir.jpg",
    "https://vcet.edu.in/wp-content/uploads/2021/11/Aishwarya-Mohol.jpg",
    "https://vcet.edu.in/wp-content/uploads/2021/11/Hemant-Tendolkar.jpg",
    "https://vcet.edu.in/wp-content/uploads/2021/11/Dr-Ben-Baliga.jpg",
    "https://vcet.edu.in/wp-content/uploads/2021/11/Gejo-Srineevasan.jpg",
    "https://vcet.edu.in/wp-content/uploads/2021/11/Bhupesh-Daheria.jpg",
    "https://vcet.edu.in/wp-content/uploads/2021/11/Tarapur-Mgmt-Association.jpg",
    "https://vcet.edu.in/wp-content/uploads/2021/11/placement.png",
    "https://www.google.com/search?q=https://vcet.edu.in/wp-content/uploads/2021/11/Mr.-Vikrant-Agaskar.jpg",
]

OUTPUT_DIR = "Industry-Institute Interaction Cell"

def download_images(raw_urls, output_dir):
    urls = list(dict.fromkeys(extract_real_url(u) for u in raw_urls))
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
    download_images(raw_urls, OUTPUT_DIR)
