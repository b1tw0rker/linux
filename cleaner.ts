/**
 *
 * Version: 1.1.0
 * last-modified. 23.11.2023
 * © 2011 - 2023 by Dipl. Wirt.-Ing. Nick Herrmann
 *
 * Disclaimer
 * 
 * This program is WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * 
 * Find and print unsued images in your project
 * Usage: tsc cleaner.ts , node cleaner.js
 * Replace Variables to your needs
 * 
 * License: MIT
 *
 */

/**
 *
 * Required modules (commonjs modulesystem)
 *
 */
import * as fs from 'fs';
import * as path from 'path';

/**
 *
 * Variables (fix to your needs)
 *
 */
const dir = '../assets/img'; // where are your Images located (absoulte or relative paths are allowed) - no ending slash.
const dirpages = '../'; // location of your webpages (absoulte or relative paths are allowed)  - no ending slash.
const extensionsPictures = ['.jpg', '.gif', '.png', '.webp']; // pictureFiles to search for
const extensionsFiles = ['.php', '.html', '.css', '.scss', '.json', '.js']; // files to search for

/**
 *
 * DO NOT CHANGE ANYTHING BELOW
 *
 */
let imgArray: string[] = [];
let pageArray: string[] = [];
let hitArray: string[] = [];

/**
 *
 * Get all files from folder 'dir'
 *
 */
let files = skyWalker(dir);
let pages = skyWalker(dirpages);

/**
 *
 * Get Images only from files Array
 *
 */
files.forEach((pix: string) => {
      const type = path.extname(pix);
      if (extensionsPictures.includes(type)) {
            const last = path.basename(pix);
            imgArray.push(last);
      }
});

/**
 *
 * Get Pages only from files Array
 *
 */
pages.forEach((page: string) => {
      const type = path.extname(page);
      if (extensionsFiles.includes(type)) {
            pageArray.push(page);
      }
});

/**
 *
 * Image Array durchlaufen und im Array Pages Array durchlaufen.
 * Page einlese und Zeileiweise nach Bild durchsuchen
 *
 */
imgArray.forEach((image: string) => {
      // Pages Array durchlaufen
      pageArray.forEach((page: string) => {
            /**
             *
             * Read file line wise
             *
             */
            const inspectArray = fs.readFileSync(page).toString().replace(/\r\n/g, '\n').split('\n');
            for (let line of inspectArray) {
                  const hit = line.indexOf(image);
                  if (hit !== -1) {
                        hitArray.push(image);
                        break;
                  }
            }
      });
});

/**
 *
 * Array ImgArray und HitArray vergleich, suche nach nicht vorhanden Bildern in HitArray
 *
 */
let difference = imgArray.filter((x) => !hitArray.includes(x)).concat(hitArray.filter((x) => !imgArray.includes(x)));
console.log(difference);

/**
 *
 * FUNCTIONS
 *
 */

function skyWalker(dir: string, files_: string[] = []): string[] {
      const files = fs.readdirSync(dir);
      for (let file of files) {
            const name = path.join(dir, file);
            if (fs.statSync(name).isDirectory()) {
                  skyWalker(name, files_);
            } else {
                  files_.push(name);
            }
      }
      return files_;
}