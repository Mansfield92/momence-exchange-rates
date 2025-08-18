import {DailyResponse} from "../types/DailyResponse";
import {ExchangeRate} from "../types/ExchangeRate";
import {YearlyResponse} from "../types/YearlyResponse";

export const parseDailyRates = (data: string): DailyResponse => {
    const lines = data.trim().split('\n');

    // Validate minimum number of lines to make sure there is data to parse
    if (lines.length < 3) {
        throw new Error('Invalid data structure: Expected at least 3 lines');
    }

    // The first line contains the date and sequence number, for example, "19 Aug 2025 #160"
    const firstLine = lines[0];
    const dateMatch = firstLine.match(/^(\d{1,2} \w+ \d{4})/);
    if (!dateMatch) {
        throw new Error('Invalid data structure: First line does not contain a valid date format');
    }
    const date = dateMatch[1];

    // Validate second line header
    const secondLine = lines[1];
    const expectedHeader = 'Country|Currency|Amount|Code|Rate';
    if (secondLine.trim() !== expectedHeader) {
        throw new Error(`Invalid data structure: Second line header expected "${expectedHeader}", got "${secondLine.trim()}"`);
    }

    const rates: ExchangeRate[] = lines
        .slice(2)
        .map(line => line.trim())
        // Valid lines should have 5 values separated by '|'
        .filter(line => line && line.split('|').length === 5)
        .map(line => {
            const data = line.split('|');
            return {
                country: data[0],
                currency: data[1],
                amount: parseInt(data[2], 10),
                code: data[3],
                rate: parseFloat(data[4])
            } as ExchangeRate;
        });


    return {
        date,
        rates
    };
}

export const parseYearlyRates = (data: string): YearlyResponse => {
    const lines = data.trim().split('\n');

    // Validate minimum number of lines
    if (lines.length < 2) {
        throw new Error('Invalid data structure: Expected at least 2 lines (header and data)');
    }

    // Parse header line to get currency codes and amounts
    const headerLine = lines[0];
    const headers = headerLine.split('|');

    // Validate that first column is "Date"
    if (headers[0] !== 'Date') {
        throw new Error('Invalid data structure: First column must be "Date"');
    }

    // Extract currency information from headers (skip the "Date" column)
    const currencyHeaders = headers.slice(1);

    const dataEntries = lines
        .slice(1) // Skip header
        .map((line, index) => ({line: line.trim(), lineNumber: index + 2})) // Keep track of line numbers for errors
        .filter(({line}) => line) // Skip empty lines
        .flatMap(({line, lineNumber}) => {
            const values = line.split('|');

            // Validate that we have the expected number of columns
            if (values.length !== headers.length) {
                throw new Error(`Invalid data structure: Line ${lineNumber} has ${values.length} columns, expected ${headers.length}`);
            }

            const date = values[0];

            return values.slice(1).map((value, index) => {
                const currencyHeader = currencyHeaders[index];
                const rate = parseFloat(value);

                if (isNaN(rate)) {
                    throw new Error(`Invalid rate value: "${value}" for currency "${currencyHeader}" on date "${date}"`);
                }

                // Extract currency code from header (e.g., "1 USD" -> "USD", "100 JPY" -> "JPY")
                const currencyCodeMatch = currencyHeader.match(/([A-Z]{3})$/);
                if (!currencyCodeMatch) {
                    throw new Error(`Invalid currency header format: "${currencyHeader}"`);
                }

                const currencyCode = currencyCodeMatch[1];

                return {
                    currencyCode,
                    date,
                    rate
                };
            });
        });

    // Transform data into a map of currency codes to arrays of rates
    return dataEntries.reduce((acc, {currencyCode, date, rate}) => ({
        ...acc, [currencyCode]: [...acc[currencyCode] ?? [], {date, rate}]
    }), {} as YearlyResponse);
}
