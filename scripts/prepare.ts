import fs from 'fs-extra'
import { colorsMap } from './generate-themes'

await fs.writeJSON('src/constants/themes.json', colorsMap, { spaces: 2, EOL: '\n' })
await fs.writeFile('src/styles/default-theme.css', `:root {\n${Object.entries(colorsMap[0][1]).map(([k, v]) => `  ${k}: ${v};`).join('\n')}\n}\n`, { encoding: 'utf-8' })
