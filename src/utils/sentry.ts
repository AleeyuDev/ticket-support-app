// // import * as Sentry from '"@sentry/nextjs';




// type LogLevel = 'fatal'| 'error' | 'warning' | 'info'| 'debug'






// export function logEvent(
//     message: string,
//     category: string,
//     data?: Record<string, any>,
//     logEvent: LogLevel = 'info',
//     error?: unknown,
// ) {
//     Sentry.addBreadCrumb(
//         category,
//         message,
//         data,
//         level
//     );
//     if (error) {
//         Sentry.captureException(error,{extra:data})
        
//     }
//     else {
//         Sentry.captureMessage(message, level)
//     }
// }