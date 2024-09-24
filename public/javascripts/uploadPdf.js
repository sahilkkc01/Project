export function printText(text, pageCount) {
    // Create a new window or tab
    const printWindow = window.open('', '', 'height=600,width=800');

    // Add content to the new window
    printWindow.document.open();
    printWindow.document.write(`
        <html>
            <head>
                <title>LifeLinkr</title>
                <style>
                    @page {
                        size: 7in 5in; /* Set the size in landscape (width x height) */
                        margin: 0.5in; /* Set margins as needed */
                    }
                    body {
                        font-family: Arial, sans-serif;
                        margin: 20px;
                        font-size: 20px;
                    }
                    .page {
                        page-break-after: always; /* Ensure each div is treated as a new page */
                        position: relative;
                        height: 100%;
                    }
                    .page-number {
                        position: absolute;
                        bottom: 0;
                        right: 0;
                        font-size: 12px;
                    }
                </style>
            </head>
            <body>
                ${Array.from({ length: pageCount }, (_, i) => `
                    <div class="page">
                        <h1>${text}</h1>
                    </div>
                `).join('')}
            </body>
        </html>
    `);
    printWindow.document.close();

    // Wait for the document to be fully loaded and then trigger the print dialog
    printWindow.onload = function() {
        printWindow.focus(); // Focus on the print window
        printWindow.print(); // Trigger the print dialog
    };

    // Optional: Close the print window after printing
    printWindow.onafterprint = function() {
        printWindow.close();
    };
}
