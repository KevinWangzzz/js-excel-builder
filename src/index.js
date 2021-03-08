const XLSX = require("xlsx");
const { SheetBuilder } = require("./sheetBuilder");

class WorkbookBuilder {
    constructor() {
        this.workBook = {
            SheetNames: [],
            Sheets: {}
        };

        this.defaultOptions = {
            bookType: "xlsx",
            bookSST: false,
            type: "binary"
        };
    }

    build(data, options = {}) {
        const sheetBuilder = new SheetBuilder();
        data.map((e) => {
            const sheetName = e.sheetName || "Excel";
            const sheetData = e.sheetData || [];
            this.workBook.SheetNames.push(sheetName);
            this.workBook.Sheets[sheetName] = {};
            Object.assign(this.workBook.Sheets[sheetName], sheetBuilder.build(sheetData, options));
        });
        const excelData = XLSX.write(this.workBook, { ...this.defaultOptions, ...options });
        return excelData;
    }
}

module.exports = {
    WorkbookBuilder
};
