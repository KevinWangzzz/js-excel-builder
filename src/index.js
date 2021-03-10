const XLSX = require("xlsx-pro");
const bufferFrom = require("buffer-from");
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
            const sheetOptions = e.sheetOptions;
            this.workBook.SheetNames.push(sheetName);
            this.workBook.Sheets[sheetName] = sheetBuilder.build(sheetData, sheetOptions);
        });
        const excelData = XLSX.write(this.workBook, { ...this.defaultOptions, ...options });
        return excelData instanceof Buffer ? excelData : bufferFrom(excelData, "binary");
    }
}

module.exports = { WorkbookBuilder };
