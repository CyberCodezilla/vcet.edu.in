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
    "https://vcet.edu.in/wp-content/uploads/2021/10/vcet-logo.jpeg",
    "https://vcet.edu.in/wp-content/uploads/2021/10/vcet-logo-300x300.jpeg",
    "https://vcet.edu.in/wp-content/uploads/2021/10/vcet-logo-150x150.jpeg",
    "https://vcet.edu.in/wp-content/uploads/2021/10/vcet-logo-450x450.jpeg",
    "https://vcet.edu.in/wp-content/uploads/2021/11/College-Logo.png",
    "https://vcet.edu.in/wp-content/uploads/2021/11/facebook.png",
    "https://vcet.edu.in/wp-content/uploads/2021/11/instagram.png",
    "https://vcet.edu.in/wp-content/uploads/2021/11/linkedin.png",
    "https://vcet.edu.in/wp-content/uploads/2021/11/youtube.png",
    "https://vcet.edu.in/wp-content/uploads/2021/11/info-1.png",
    "https://vcet.edu.in/wp-content/uploads/2021/11/cropped-College-Logo-32x32.png",
    "https://vcet.edu.in/wp-content/uploads/2021/11/cropped-College-Logo-192x192.png",
    "https://vcet.edu.in/wp-content/uploads/2021/11/cropped-College-Logo-180x180.png",
    "https://vcet.edu.in/wp-content/uploads/2021/11/cropped-College-Logo-270x270.png",
    "https://vcet.edu.in/wp-content/plugins/essential-addons-for-elementor-lite/assets/admin/images/templately/logo-icon.svg",
]

OUTPUT_DIR = "Best Practices And Institutional Distinctiveness"

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
