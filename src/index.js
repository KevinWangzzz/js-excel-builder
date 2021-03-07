import XLSX from "xlsx";

const build = () => {
  return XLSX.write();
};

module.exports = { build };
