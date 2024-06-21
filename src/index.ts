import * as fs from 'fs'
import * as path from "path";
import {glob} from "glob";

function clearAndUpper(text: string) {
    return text.replace(/-/, '').toUpperCase();
}

function toPascalCase(str: string) {
    return str.replace(/(^\w|-\w)/g, clearAndUpper);
}

/**
 * file rename to pascal case
 * @param dir
 */
function renameFiles(dir: string) {
    fs.readdirSync(dir).forEach((file: string) => {
        const fullPath = path.join(dir, file);
        if (fs.lstatSync(fullPath).isDirectory()) {
            renameFiles(fullPath);
        } else if (path.extname(fullPath) === '.vue') {
            const newFileName = toPascalCase(path.basename(fullPath, '.vue')) + '.vue';
            const newFullPath = path.join(dir, newFileName);
            fs.renameSync(fullPath, newFullPath);
            console.log(`Renamed: ${fullPath} -> ${newFullPath}`);
        }
    });
}

/**
 * change import in files
 * @param dir
 */
function updateReferences(dir: string) {
    const files = glob.sync(`${dir}/**/*.{js,ts,vue}`);
    files.forEach(file => {
        let content = fs.readFileSync(file, 'utf8');
        const matches = content.match(/import\s+.*\s+from\s+['"].*['"]/g) || [];
        matches.forEach(match => {
            const importPath = match.match(/['"](.*)['"]/)?.[1] || '';
            const newImportPath = importPath.split('/').map(part => {
                return part.endsWith('.vue') ? toPascalCase(part.replace('.vue', '')) + '.vue' : part;
            }).join('/');
            content = content.replace(importPath, newImportPath);
        });
        fs.writeFileSync(file, content, 'utf8');
        console.log(`Updated references in: ${file}`);
    });
}

function renameVueFilesPlugin(options = { srcDir: 'src' }) {
    const srcDir = path.resolve(options.srcDir || 'src');
    renameFiles(srcDir)
    updateReferences(srcDir)
}

module.exports = renameVueFilesPlugin;
