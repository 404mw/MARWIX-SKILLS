# /// script
# requires-python = ">=3.10"
# dependencies = ["pillow>=11.2"]
# ///
"""mw-image-gen conversion step: raster masters (PNG/JPEG) -> WebP and/or AVIF.

Which formats and qualities to use is the host project's law; this script just
executes. Run via uv (resolves Pillow from the inline metadata above):

    uv run convert.py --input <file-or-dir> [--out-dir <dir>] [--formats webp,avif]
                      [--quality 82] [--resize WxH]
"""

import argparse
import sys
from pathlib import Path

from PIL import Image

SOURCE_EXTS = {".png", ".jpg", ".jpeg"}


def convert_one(src: Path, out_dir: Path, formats: list[str], quality: int, resize: tuple[int, int] | None) -> None:
    with Image.open(src) as img:
        if resize:
            img = img.resize(resize, Image.LANCZOS)
        for fmt in formats:
            dest = out_dir / src.with_suffix(f".{fmt}").name
            try:
                img.save(dest, fmt.upper(), quality=quality)
            except Exception as exc:  # AVIF missing => Pillow too old or wheel without libavif
                sys.exit(f"error saving {dest.name}: {exc} (for AVIF, ensure Pillow >= 11.2)")
            before, after = src.stat().st_size // 1024, dest.stat().st_size // 1024
            print(f"{src.name} ({before} KB) -> {dest.name} ({after} KB)")


def main() -> None:
    ap = argparse.ArgumentParser(description="Convert PNG/JPEG masters to WebP/AVIF.")
    ap.add_argument("--input", required=True, help="source file or directory")
    ap.add_argument("--out-dir", help="output directory (default: alongside the source)")
    ap.add_argument("--formats", default="webp,avif", help="comma-separated: webp, avif")
    ap.add_argument("--quality", type=int, default=82)
    ap.add_argument("--resize", help="WxH downscale applied before encoding (for oversampled masters)")
    args = ap.parse_args()

    src = Path(args.input)
    if not src.exists():
        sys.exit(f"error: input not found: {src}")
    files = [src] if src.is_file() else sorted(p for p in src.iterdir() if p.suffix.lower() in SOURCE_EXTS)
    if not files:
        sys.exit(f"error: no PNG/JPEG files in {src}")

    formats = [f.strip().lower() for f in args.formats.split(",") if f.strip()]
    unknown = [f for f in formats if f not in ("webp", "avif")]
    if unknown:
        sys.exit(f"error: unsupported format(s): {', '.join(unknown)}")

    resize = None
    if args.resize:
        try:
            w, h = args.resize.lower().split("x")
            resize = (int(w), int(h))
        except ValueError:
            sys.exit(f"error: --resize must be WxH, got: {args.resize}")

    out_dir = Path(args.out_dir) if args.out_dir else (src.parent if src.is_file() else src)
    out_dir.mkdir(parents=True, exist_ok=True)

    for f in files:
        convert_one(f, out_dir, formats, args.quality, resize)
    print(f"done: {len(files)} file(s) x {len(formats)} format(s)")


if __name__ == "__main__":
    main()
