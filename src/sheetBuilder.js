class SheetBuilder {
    constructor() {
        this.sheet = {};
        this.defaultIniPos = {
            s: { c: 0, r: 0 },
            e: { c: 0, r: 0 }
        };
        this.currentPos = {};
    }

    buildSection(data) {
        return data;
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
