/**
 * @author Alexander Marenin
 * @date November 2014
 */

var assert = require( 'assert' );

var statusCodes = {
    400: "Bad Request",
    401: "Unauthorized",
    402: "Payment Required",
    403: "Forbidden",
    404: "Not Found",
    405: "Method Not Allowed",
    406: "Not Acceptable",
    407: "Proxy Authentication Required",
    408: "Request Timeout",
    409: "Conflict",
    410: "Gone",
    411: "Length Required",
    412: "Precondition Failed",
    413: "Request Entity Too Large",
    414: "Request-URI Too Long",
    415: "Unsupported Media Type",
    416: "Requested Range Not Satisfiable",
    417: "Expectation Failed",
    418: "I'm a Teapot",
    420: "Enhance Your Calm",
    422: "Unprocessable Entity",
    423: "Locked",
    424: "Failed Dependency",
    425: "Unordered Collection",
    426: "Upgrade Required",
    428: "Precondition Required",
    429: "Too Many Requests",
    431: "Request Header Fields Too Large",
    444: "No Response",
    449: "Retry With",
    450: "Blocked By Windows Parental Controls",
    499: "Client Closed Request",
    500: "Internal Server Error",
    501: "Not Implemented",
    502: "Bad Gateway",
    503: "Service Unavailable",
    504: "Gateway Timeout",
    505: "HTTP Version Not Supported",
    506: "Variant Also Negotiates",
    507: "Insufficient Storage",
    508: "Loop Detected",
    509: "Bandwidth Limit Exceeded",
    510: "Not Extended",
    511: "Network Authentication Required"
};


function httpError( code ){
    var fn = ErrorConstructor
            .toString()
            .replace( /ErrorConstructor/g, toCamelCase(statusCodes[code]) )
            .replace( '500', Number(code) )
            .replace( 'error', statusCodes[code] ),
        constructor = (new Function('return ' + fn))();

    constructor.prototype = Object.create( Error.prototype, {constructor: {value: constructor}} );
    return constructor;
}


function ErrorConstructor( message ){
    Error.apply( this, arguments );
    Error.captureStackTrace(this, ErrorConstructor);
    this.name = ErrorConstructor.name;
    this.status = 500;
    this.message = message || "error";
}


function toCamelCase( str ){
    return str
        .toLowerCase()
        .replace( /'/g, '' )
        .replace( /\-/g, ' ' )
        .replace( /(?:(^.)|(\s+.))/g, function( match ){
            return match.charAt( match.length - 1 ).toUpperCase();
        });
}


/*
 * Implicitly create all http errors constructors
 */
Object.keys( statusCodes ).forEach( function( code ){
    exports[toCamelCase(statusCodes[code])] = httpError( code );
});


/*
 * Explicitly define most popular errors. This is for IDEs
 */

/**
 * @constructor
 * @extends Error
 */
exports.BadRequest = httpError( 400 );

/**
 * @constructor
 * @extends Error
 */
exports.Unauthorized = httpError( 401 );

/**
 * @constructor
 * @extends Error
 */
exports.PaymentRequired = httpError( 402 );

/**
 * @constructor
 * @extends Error
 */
exports.Forbidden = httpError( 403 );

/**
 * @constructor
 * @extends Error
 */
exports.NotFound = httpError( 404 );

/**
 * @constructor
 * @extends Error
 */
exports.MethodNotAllowed = httpError( 405 );

/**
 * @constructor
 * @extends Error
 */
exports.NotAcceptable = httpError( 406 );

/**
 * @constructor
 * @extends Error
 */
exports.ProxyAuthenticationRequired = httpError( 407 );

/**
 * @constructor
 * @extends Error
 */
exports.RequestTimeout = httpError( 408 );

/**
 * @constructor
 * @extends Error
 */
exports.Conflict = httpError( 409 );

/**
 * @constructor
 * @extends Error
 */
exports.InternalServerError = httpError( 500 );

/**
 * @constructor
 * @extends Error
 */
exports.NotImplemented = httpError( 501 );

/**
 * @constructor
 * @extends Error
 */
exports.BadGateway = httpError( 502 );

/**
 * @constructor
 * @extends Error
 */
exports.ServiceUnavailable = httpError( 503 );

/**
 * @constructor
 * @extends Error
 */
exports.GatewayTimeout = httpError( 504 );


(function(){
    assert( exports.NotFound instanceof Function, 'error constructor should be function' );
    var e = new exports.NotFound;
    assert( e instanceof Error, 'new object should be instance of error' );
    assert.equal( e.message, 'Not Found', 'new error should contain default error message' );
    assert( e.name, 'error object should contain error name' );
    assert( e.stack, 'error object should contain error stack' );
})();
