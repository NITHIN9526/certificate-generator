# How to Create an Excel File for Batch Certificate Generation

## Excel Format Requirements

Your Excel file must have data in the following columns:

| Column A | Column B | Column C | Column D |
|----------|----------|----------|----------|
| Name | Event | Date | Issuer |

## Example Data

```
Name                 | Event                    | Date        | Issuer
John Doe            | Web Design Course        | 2026-01-20  | Tech Academy
Jane Smith          | Web Design Course        | 2026-01-20  | Tech Academy
Alice Johnson       | Web Design Course        | 2026-01-20  | Tech Academy
Bob Wilson          | Web Design Course        | 2026-01-20  | Tech Academy
Carol Davis         | Web Design Course        | 2026-01-20  | Tech Academy
```

## Step-by-Step Instructions

### Using Microsoft Excel

1. Open Microsoft Excel
2. Create a new blank workbook
3. Add the header row (optional):
   - A1: `Name`
   - B1: `Event`
   - C1: `Date`
   - D1: `Issuer`
4. Starting from row 2 (or row 1 if no header), enter participant data:
   - Column A: Full name of participant
   - Column B: Event or course title
   - Column C: Date of completion (e.g., 2026-01-20)
   - Column D: Organization or institution name
5. Save the file as `.xlsx` format (Excel 2007+)

### Using Google Sheets

1. Open [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Add the data in the same format as above
4. Download as Excel (.xlsx):
   - Click File → Download → Microsoft Excel (.xlsx)

### Using LibreOffice Calc

1. Open LibreOffice Calc
2. Create a new spreadsheet
3. Add the participant data
4. Save as Excel format (.xlsx)

## Tips

- **Keep data consistent**: Use the same event name and issuer for all participants in one batch
- **Date format**: You can use any date format (2026-01-20, 01/20/2026, Jan 20 2026, etc.)
- **Names**: Make sure names are spelled correctly as they will appear on certificates
- **No special characters in names**: Avoid special characters in names for file naming

## What Happens When You Upload

1. The application reads your Excel file
2. Extracts participant information from each row
3. Generates a certificate for each participant
4. Creates both PNG and PDF versions
5. Compresses all files into a single ZIP file
6. Automatically downloads the ZIP to your computer

## Troubleshooting

**"No valid participant data found"**
- Check that your data is in columns A through D
- Ensure there's actual data in the rows
- Verify the file is saved as .xlsx format

**"Error processing Excel"**
- The file might be corrupted
- Try opening and re-saving it
- Ensure it's not a .xls file from Excel 2003

**Missing certificates in the ZIP**
- Check for rows with empty names (Column A must have a value)
- Remove completely empty rows
- Verify all rows have data in all four columns

## File Size Limits

- There's no theoretical limit, but very large files (1000+ participants) may take longer to process
- The browser may become slower with extremely large batches
- Process in smaller batches if needed (100-200 participants per batch is ideal)

## After Downloading

Once you download the ZIP file:

1. Extract the ZIP file to a folder
2. You'll see individual certificate files for each participant
3. Files are named based on participant names
4. Both PNG and PDF versions are included
5. Print or share as needed

---

**Need help?** Check the FEATURES.md file for more information about the Certificate Generator.
