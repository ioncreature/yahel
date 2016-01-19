yahel
=====

Yet another HTTP errors library


Example
=======

```js
var httpError = require( 'yahel' );

app.get( '/not-found', function( req, res, next ){
    next( new httpError.NotFound );
});

app.get( '/forbidden', function( req, res, next ){
    next( new httpError.Forbidden );
});

app.get( '/internal-error', function( req, res, next ){
    next( new httpError.InternalServerError('Wow! Such an error!') );
});

app.use( function( error, req, res, next ){
    res.json( error.status || 500, {
        message: error.message,
        stack: error.stack
    });
});


// Also it is possible to shorten the code above:
var httpError = require( 'yahel' );
    NotFound = httpError.NotFound,
    Forbidden = httpError.Forbidden;

app.get( '/not-found', function( req, res, next ){
    next( NotFound() );
});

app.get( '/forbidden', function( req, res, next ){
    next( Forbidden('Oh, no') );
});

// ...

```


API
===

* {Function} ErrorClass( {string?} message, {*} info )
* {string} ErrorClass.message
* {number} ErrorClass.status
* {string} ErrorClass.stack
* {string} ErrorClass.info

Parameter `info` is optional and non-standart but useful when you want to send some meta info inside error instance.
You can assign what you want to `info`.


Available error classes
=======================

```
Conflict
Gone
LengthRequired
PreconditionFailed
RequestEntityTooLarge
RequestUriTooLong
UnsupportedMediaType
RequestedRangeNotSatisfiable
ExpectationFailed
ImATeapot
EnhanceYourCalm
UnprocessableEntity
Locked
FailedDependency
UnorderedCollection
UpgradeRequired
PreconditionRequired
TooManyRequests
RequestHeaderFieldsTooLarge
NoResponse
RetryWith
BlockedByWindowsParentalControls
UnavailableForLegalReasons
ClientClosedRequest
InternalServerError
NotImplemented
BadGateway
ServiceUnavailable
GatewayTimeout
HttpVersionNotSupported
VariantAlsoNegotiates
InsufficientStorage
LoopDetected
BandwidthLimitExceeded
NotExtended
NetworkAuthenticationRequired
```
