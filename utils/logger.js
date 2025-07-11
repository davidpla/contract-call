const logger = {
    log: (...args) => {
        const message = args.map(arg => 
            typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
        ).join(' ');
        process.stdout.write(`${message}\n`);
    },
    error: (...args) => {
        const message = args.map(arg => 
            typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
        ).join(' ');
        // Write to stderr with ERROR prefix
        process.stderr.write(`ERROR: ${message}\n`);
    },
    warn: (...args) => {
        const message = args.map(arg => 
            typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
        ).join(' ');
        process.stderr.write(`WARN: ${message}\n`);
    }
};

module.exports = logger;