# Self-hosted Fonts

This directory contains self-hosted WOFF2 fonts to avoid Google Fonts CDN dependency.

## Required Files

Download from Google Fonts (https://fonts.google.com/) or use google-webfonts-helper:

### Caveat (handwritten headings)
- `caveat-v18-latin-600.woff2`
- `caveat-v18-latin-700.woff2`

### Inter (English body text)
- `inter-v18-latin-400.woff2`
- `inter-v18-latin-500.woff2`
- `inter-v18-latin-600.woff2`
- `inter-v18-latin-700.woff2`

### Noto Sans SC (Chinese body text)
- `noto-sans-sc-v37-chinese-simplified-400.woff2`
- `noto-sans-sc-v37-chinese-simplified-500.woff2`
- `noto-sans-sc-v37-chinese-simplified-600.woff2`
- `noto-sans-sc-v37-chinese-simplified-700.woff2`

## Download Tool

Use https://gwfh.mranftl.com/fonts (google-webfonts-helper) to download optimized WOFF2 files.

## Subsetting (Optional)

For Chinese fonts, consider subsetting to reduce file size:
```bash
pyftsubset NotoSansSC-Regular.otf --text-file=chinese-chars.txt --output-file=noto-sans-sc-subset.woff2 --flavor=woff2
```
