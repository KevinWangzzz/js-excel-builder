const XLSX = require("xlsx");

class SheetBuilder {
    constructor() {
        this.sheet = {};
        this.defaultIniPos = { c: 0, r: 0 };
        this.currentPos = {};
    }

    updatePos(sectionRange, sectionGap) {
        this.currentPos = {
            c: this.defaultIniPos.c,
            r: sectionRange.e.r + sectionGap + 1
        };
    }

    buildCell(cellData) {
        const cell = {};
        cell.v = cellData;
        const dataType = typeof cellData;
        switch (dataType) {
            case "boolean":
                cell.t = "b";
                break;
            case "number":
                cell.t = "n";
                break;
            case "object":
                cell.t = "z";
                break;
            default:
                cell.t = "s";
                break;
        }
        return cell;
    }

    buildSection(sectionData, sectionGap) {
        const section = {};
        const sectionWidth = section[0].length;
        const sectionHeight = section.length;
        const sectionRange = {
            s: { c: this.currentPos.c, r: this.currentPos.r },
            e: { c: this.currentPos.c + sectionWidth - 1, r: this.currentPos.r + sectionHeight - 1 }
        };
        for (let R = sectionRange.s.r; R <= sectionRange.e.r; ++R) {
            for (let C = sectionRange.s.c; C <= sectionRange.e.c; ++C) {
                const cellRef = XLSX.utils.encode_cell({ c: C, r: R });
                section[cellRef] = this.buildCell(sectionData[R][C]);
            }
        }
        Object.assign(this.sheet, section);
        this.updatePos(sectionRange, sectionGap);
    }

    build(sheetData, options, initPos = {}) {
        this.currentPos = Object.assign(this.defaultIniPos, initPos);

        sheetData.forEach((e) => {
            const sectionData = e.sectionData;
            const sectionGap = e.sectionGap || 0;
            this.buildSection(sectionData, sectionGap);
        });
        return Object.assign(this.sheet, ...options);
    }
}

module.exports = { SheetBuilder };
