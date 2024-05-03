exports.getFinancialYearString = () => {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth(); // 0 for January, 11 for December
  
    if (currentMonth >= 9) {
      // If October or later, the financial year starts this year
      const startYear = currentYear;
      const endYear = currentYear + 1;
      return `${startYear.toString().slice(-2)}${endYear.toString().slice(-2)}`;
    } else {
      // If before October, the financial year started last year
      const startYear = currentYear - 1;
      const endYear = currentYear;
      return `${startYear.toString().slice(-2)}${endYear.toString().slice(-2)}`;
    }
  }