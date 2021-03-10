const XLSX = require("xlsx");

class SheetBuilder {
    constructor() {
        this.sheet = {};
        this.defaultIniPos = { c: 0, r: 0 };
        this.currentPos = {};
        this.sheetRange = {
            s: { c: 0, r: 0 },
            e: { c: 0, r: 0 }
        };
    }

    updatePos(sectionRange, sectionGap) {
        /** update the start position for next section */
        this.currentPos = {
            c: this.defaultIniPos.c,
            r: sectionRange.e.r + sectionGap + 1
        };
        /** update the max effective range of the sheet */
        this.sheetRange.e.r = sectionRange.e.r + sectionGap + 1;
        if (sectionRange.e.c > this.sheetRange.e.c) this.sheetRange.e.c = sectionRange.e.c;
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
        const sectionWidth = section[0] && section[0].length;
        const sectionHeight = section.length;
        const sectionRange = {
            s: { c: this.currentPos.c, r: this.currentPos.r },
            e: { c: this.currentPos.c + sectionWidth - 1, r: this.currentPos.r + sectionHeight - 1 }
        };
        for (let R = sectionRange.s.r; R <= sectionRange.e.r; ++R) {
            for (let C = sectionRange.s.c; C <= sectionRange.e.c; ++C) {
                /** convert col and row num into excel coordinate */
                const cellRef = XLSX.utils.encode_cell({ c: C, r: R });
                /** remove the offset */
                section[cellRef] = this.buildCell(sectionData[R - this.currentPos.r][C - this.currentPos.c]);
            }
        }
        Object.assign(this.sheet, section);
        this.updatePos(sectionRange, sectionGap);
    }

    build(sheetData, options, initPos = {}) {
        this.currentPos = Object.assign(this.defaultIniPos, initPos);

        /** sheetData is devided into multiple sections */
        sheetData.forEach((e) => {
            const sectionData = e.sectionData || [];
            const sectionGap = e.sectionGap || 0;
            this.buildSection(sectionData, sectionGap);
        });
        const ref = xlsx.utils.encode_range(this.sheetRange);
        return Object.assign(this.sheet, { "!ref": ref }, ...options);
    }
}

module.exports = { SheetBuilder };
