# How to Create an Excel File for Batch Certificate Generation

## Excel Format Requirements

Your Excel file must have data in the following columns:

| Column A | Column B | Column C | Column D | Column E |
|----------|----------|----------|----------|----------|
| Name | Event | Date | Issuer | Category (Optional) |

## Example Data

### Example 1: Same Category for All
```
Name                 | Event                    | Date        | Issuer           | Category
John Doe            | Web Design Course        | 2026-01-20  | Tech Academy     | (empty)
Jane Smith          | Web Design Course        | 2026-01-20  | Tech Academy     | (empty)
Alice Johnson       | Web Design Course        | 2026-01-20  | Tech Academy     | (empty)
Bob Wilson          | Web Design Course        | 2026-01-20  | Tech Academy     | (empty)
```

### Example 2: Different Categories
```
Name                 | Event                       | Date        | Issuer              | Category
John Smith          | 100m Sprint Championship    | 2026-01-20  | City Sports Academy | sports
Jane Doe            | Landscape Painting Prize    | 2026-01-20  | Arts Institute      | arts
Ahmed Hassan        | Mathematics Olympiad        | 2026-01-20  | Education Board     | academics
Lisa Chen           | Innovation Award            | 2026-01-20  | Tech Corporation    | innovation
David Brown         | Leadership Excellence Award | 2026-01-20  | Management Board    | leadership
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
   - E1: `Category`
4. Starting from row 2, enter participant data:
   - Column A: Full name of participant
   - Column B: Event or course title
   - Column C: Date of completion (e.g., 2026-01-20)
   - Column D: Organization or institution name
   - Column E: Category (optional - sports, arts, academics, participation, excellence, achievement, leadership, innovation)
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

## Available Categories

Use these category names in Column E (case-insensitive):

| Category | Use For | Suggested Templates |
|----------|---------|-------------------|
| `sports` | Sports competitions, athletics | Sports Dynamic, Sports Medal, Sports Champion |
| `arts` | Art exhibitions, creative work | Arts Creative, Arts Vibrant, Arts Gallery |
| `academics` | Educational achievements | Academic Formal, Academic Modern, Academic Distinction |
| `participation` | General participation | Modern, Classic, Achievement Bold |
| `excellence` | Excellence awards | Excellence Premium, Gold |
| `achievement` | Achievements, milestones | Achievement Bold, Sports Medal |
| `leadership` | Leadership awards | Leadership Elite, Excellence Premium |
| `innovation` | Innovation awards | Arts Creative, Modern |

## Tips

- **Keep data consistent**: Use the same event name for all participants in one category
- **Date format**: You can use any date format (2026-01-20, 01/20/2026, Jan 20 2026, etc.)
- **Names**: Make sure names are spelled correctly as they will appear on certificates
- **No special characters in names**: Avoid special characters in names for file naming
- **Category is optional**: Leave Column E empty to use the category selected in the form
- **Mixed categories**: Add different categories in Column E for personalized templates per participant

## What Happens When You Upload

1. The application reads your Excel file
2. Extracts participant information from each row
3. **Reads category from Column E** (if provided)
4. Selects appropriate template for each category
5. Generates a certificate for each participant
6. Creates both PNG and PDF versions
7. Compresses all files into a single ZIP file
8. Automatically downloads the ZIP to your computer

## Category-Specific Processing

### Same Category Mode
- All participants have Column E empty
- System uses the category selected in the form
- All certificates use the same template family
- Fastest processing

### Mixed Category Mode
- Each participant has their own category in Column E
- System automatically selects best template for each
- Different templates for different participants
- More personalized output

## Troubleshooting

**"No valid participant data found"**
- Check that your data is in columns A through D
- Ensure there's actual data in the rows
- Verify the file is saved as .xlsx format
- Ensure Column A (Name) has values

**"Error processing Excel"**
- The file might be corrupted
- Try opening and re-saving it
- Ensure it's not a .xls file from Excel 2003
- Check for special characters in filenames

**Missing certificates in the ZIP**
- Check for rows with empty names (Column A must have a value)
- Remove completely empty rows
- Verify all rows have data in columns A through D
- Category (Column E) can be empty

**All certificates use same template despite different categories**
- Make sure Column E has category values
- Verify category spelling is correct
- Check that categories match available options
- Re-upload the file

**Certificate layout looks wrong**
- Verify category name is spelled correctly
- Check that category is in lowercase
- Ensure date format is standard
- Try with default category

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
5. Certificates are organized by filename (alphabetically)
6. Print or share as needed

## Example Folder Structure After Extraction

```
certificates_1674673200/
├── Ahmed_Hassan.pdf
├── Ahmed_Hassan.png
├── Alice_Johnson.pdf
├── Alice_Johnson.png
├── Bob_Wilson.pdf
├── Bob_Wilson.png
├── David_Brown.pdf
├── David_Brown.png
├── Jane_Doe.pdf
├── Jane_Doe.png
├── Jane_Smith.pdf
├── Jane_Smith.png
├── John_Doe.pdf
├── John_Doe.png
├── John_Smith.pdf
├── John_Smith.png
├── Lisa_Chen.pdf
└── Lisa_Chen.png
```

## Category Examples

### Sports Category Example
```
John Smith | 100m Sprint Championship | 2026-01-20 | City Sports Academy | sports
```
Result: Certificate with sports-themed template (dynamic energy, athletic colors)

### Arts Category Example
```
Jane Doe | Landscape Painting Exhibition | 2026-01-20 | Arts Institute | arts
```
Result: Certificate with arts-themed template (creative colors, artistic design)

### Academics Category Example
```
Ahmed Hassan | Mathematics Olympiad Gold Medal | 2026-01-20 | Education Board | academics
```
Result: Certificate with academic-themed template (formal, educational style)

### Mixed Example
Each participant gets their appropriate category template automatically!

---

**Need help?** Check CATEGORIES_TEMPLATES_GUIDE.md for complete template information.
