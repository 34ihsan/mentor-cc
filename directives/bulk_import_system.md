# Directive: Educational Institution Bulk Import & Scraper

## Goal
Automate the process of adding universities, high schools, language schools, summer schools, and master's programs to the platform using an Excel file containing official names and links.

## Inputs
- **Excel File**: Col A: Institution Name, Col B: Official Website/Link, Col C: Category (University, High School, etc.), Col D: Country, Col E: City (Optional).
- **Target Category**: The service category the institutions belong to.

## Tools & Scripts
1. **Execution Script (Python)**: `execution/scrape_institutions.py`
    - Uses `BeautifulSoup` or `Playwright` to fetch content.
    - Extracts: Description, Logo (if possible), Main Image (if possible), Programs/Courses.
    - Feeds content to an LLM (via `execution/utils/ai_summarizer.py`) to generate a professional summary and structured content (HTML format).
2. **Import Script (Node)**: `execution/import_excel_data.js`
    - Parses the Excel file.
    - Checks for existing institutions (avoids duplicates by slug).
    - Calls the Python scraper for each new entry.
    - Upserts data into the `Institution` and `Program` tables via Prisma.
3. **Next.js Action**: `src/app/actions/excel-actions.ts`
    - Receives the file upload.
    - Triggers the scripts in the background or sequentially.
    - Provides progress updates via a status field in the database or polling.

## Workflow
1. Admin uploads Excel file in `/dashboard/admin/import`.
2. System parses rows and starts a background process.
3. For each row:
    - Generate slug from name.
    - Scrape official link.
    - Generate AI-enhanced description and structured content.
    - Create `Institution` record.
    - (Optionally) Link to `Service` and `Country`.
4. Detailed logs are visible to the Admin.

## Edge Cases
- **Broken Links**: Skip and log as "FAILED".
- **Blocked Crawling**: Use generic descriptions if scraping fails.
- **Duplicate Names**: Append unique ID to slug.
- **Large Files**: Handle via batching to avoid timeouts.
