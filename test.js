var assert = require( 'assert' ),
    httpError = require( './index' );

assert( httpError.NotFound instanceof Function, 'error constructor should be function' );

var e = new httpError.NotFound;
assert( e instanceof Error, 'new object should be instance of error' );
assert.equal( e.message, 'Not Found', 'new error should contain default error message' );
assert.equal( e.status, 404, 'error have correct http status code' );
assert( e.name, 'error object should contain error name' );
assert( e.stack, 'error object should contain error stack' );

var e2 = new httpError.Forbidden( 'wow', {some: 'meta'} );
assert.equal( e2.message, 'wow', 'error message should be redefined' );
assert.equal( e2.status, 403, 'error have correct http status code' );
assert.deepEqual( e2.info, {some: 'meta'}, 'info should be passed to .info property' );

var e3 = httpError.Forbidden( 'yeah' );
assert( e3 instanceof httpError.Forbidden, 'it should create error object without "new" operator' );
assert.equal( e3.message, 'yeah', 'error message should be redefined' );

var e4 = httpError.fromStatus( 500, 'my message', {some: 'meta'} );
assert( e4 instanceof httpError.InternalServerError, 'it should return instance from correct error class' );
assert.equal( e4.name, 'InternalServerError', 'error name should be passed' );
assert.equal( e4.status, 500, 'error have correct http status code' );
assert.equal( e4.message, 'my message', 'message passed correctly' );
assert.deepEqual( e4.info, {some: 'meta'}, 'info passed correctly' );
assert.equal( JSON.stringify(e4), '{"message":"my message","status":500}', 'JSON.stringify returns custom message and status' );

var e5 = httpError.fromStatus( 401 );
assert( e5 instanceof httpError.Unauthorized, 'error should be instance of Unauthorized' );
assert.equal( e5.message, 'Unauthorized', 'default message passed if not given' );
assert.equal( e5.name, 'Unauthorized', 'error name passed correctly' );
assert.equal( e5.status, 401, 'error have correct http status code' );
assert.equal( e5.info, undefined, 'info ins undefined by default' );
assert.equal( JSON.stringify(e5), '{"message":"Unauthorized","status":401}', 'JSON.stringify returns default message and status' );
