"""
OCR for scanned official textbooks (WBBSE / Banglar Shiksha e-Text Books have no text layer).

    python -I scripts/content/ocrTextbook.py <book.pdf> <out_dir> [--first N] [--last M] [--dpi 300]

Renders each page with PyMuPDF and reads it with Tesseract (Bengali + English, tessdata_best models).
Writes <out_dir>/page_0001.txt ... and <out_dir>/all.txt (pages separated by form feeds, so page numbers
stay countable). Pages already done are skipped, so an interrupted run can be resumed.

Needs: Tesseract 5 (winget UB-Mannheim.TesseractOCR) and ben.traineddata in TESSDATA_DIR
(default C:/Users/<you>/tessdata), and `pip install pymupdf`.
"""
import argparse
import os
import subprocess
import sys
import tempfile

import pymupdf

TESSERACT = os.environ.get("TESSERACT", r"C:\Program Files\Tesseract-OCR\tesseract.exe")
TESSDATA = os.environ.get("TESSDATA_DIR", os.path.join(os.path.expanduser("~"), "tessdata"))


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("pdf")
    ap.add_argument("out")
    ap.add_argument("--first", type=int, default=1)
    ap.add_argument("--last", type=int, default=0)
    ap.add_argument("--dpi", type=int, default=300)
    a = ap.parse_args()
    os.makedirs(a.out, exist_ok=True)
    doc = pymupdf.open(a.pdf)
    last = a.last or doc.page_count
    with tempfile.TemporaryDirectory() as tmp:
        for n in range(a.first, last + 1):
            target = os.path.join(a.out, f"page_{n:04d}.txt")
            if os.path.exists(target):
                continue
            png = os.path.join(tmp, "p.png")
            doc[n - 1].get_pixmap(dpi=a.dpi).save(png)
            base = os.path.join(tmp, "o")
            subprocess.run([TESSERACT, png, base, "--tessdata-dir", TESSDATA, "-l", "ben+eng", "--psm", "3"], check=True, capture_output=True)
            with open(base + ".txt", encoding="utf-8") as f, open(target, "w", encoding="utf-8") as g:
                g.write(f.read())
            print(f"page {n}/{last}", flush=True)
    pages = []
    for n in range(1, doc.page_count + 1):
        p = os.path.join(a.out, f"page_{n:04d}.txt")
        pages.append(open(p, encoding="utf-8").read() if os.path.exists(p) else "")
    with open(os.path.join(a.out, "all.txt"), "w", encoding="utf-8") as g:
        g.write("\f".join(pages))


if __name__ == "__main__":
    sys.exit(main())
