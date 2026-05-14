from pathlib import Path
p = Path('backend/data_from_neon.json')
if not p.exists():
    print('file not found')
else:
    b = p.read_bytes()
    bom = b"\xef\xbb\xbf"
    if b.startswith(bom):
        b = b[len(bom):]
        p.write_bytes(b)
        print('removed BOM')
    else:
        print('no BOM')
